/** Read-only snapshots at the logical LLM boundary, not provider HTTP payloads. */
import { createHash } from 'node:crypto'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { GenerateOptions } from '@deepseek-ai/dsh-llm'
import { Session } from '@deepseek-ai/dsh-session'
import type { ModelInputSnapshot } from './shared.ts'

const CALL_FIELDS = ['provider', 'model', 'reasoningEffort', 'messages', 'system', 'tools', 'toolHistory', 'temperature', 'maxTokens', 'stop', 'sessionId', 'purpose'] as const

export function captureModelInput(options: GenerateOptions): ModelInputSnapshot {
  const request: Record<string, unknown> = {}
  for (const field of CALL_FIELDS) {
    if (options[field] !== undefined) request[field] = options[field]
  }
  return {
    version: 1, source: 'captured', sessionId: String(options.sessionId),
    recordedAt: new Date().toISOString(),
    // The call's JSON data is detached; the original options are never modified.
    request: JSON.parse(JSON.stringify(request)),
  }
}

/** Replay the prefix before the last model settlement using dsh's own surface fold. */
export function reconstructModelInput(session: Session): ModelInputSnapshot | null {
  const events = session.snapshotEvents()
  const boundary = events.findLastIndex(event => event.type === 'assistant/message' || event.type === 'assistant/attempt')
  if (boundary < 0) return null
  const prefix = events.slice(0, boundary)
  // No live Session is changed or published by Session.create.
  const detached = Session.create(session.id, prefix, session.header, session.inheritedEventCount)
  const header = detached.requestHeader()
  if (header === undefined) return null
  const result = captureModelInput({
    ...header.config,
    messages: detached.deriveMessages(),
    toolHistory: detached.toolHistory(),
    ...(header.tools === undefined ? {} : { tools: header.tools }),
    sessionId: session.id,
  })
  return { ...result, source: 'reconstructed', boundarySeq: events[boundary]!.seq }
}

/** Only the latest captured call per session is retained. Reads survive host restart. */
export class ModelInputStore {
  private readonly memory = new Map<string, ModelInputSnapshot>()
  private readonly writes = new Map<string, Promise<void>>()
  constructor(private readonly directory: string) {}

  private path(sessionId: string): string {
    return join(this.directory, `${createHash('sha256').update(sessionId).digest('hex')}.json`)
  }

  save(snapshot: ModelInputSnapshot): Promise<void> {
    this.memory.set(snapshot.sessionId, structuredClone(snapshot))
    const task = (this.writes.get(snapshot.sessionId) ?? Promise.resolve()).catch(() => {}).then(async () => {
      await mkdir(this.directory, { recursive: true })
      const path = this.path(snapshot.sessionId)
      const temporary = `${path}.tmp`
      await writeFile(temporary, JSON.stringify(snapshot), 'utf8')
      await rename(temporary, path)
    })
    this.writes.set(snapshot.sessionId, task)
    return task
  }

  async load(sessionId: string): Promise<ModelInputSnapshot | null> {
    const cached = this.memory.get(sessionId)
    if (cached !== undefined) return structuredClone(cached)
    try {
      const value = JSON.parse(await readFile(this.path(sessionId), 'utf8')) as ModelInputSnapshot
      if (value.version !== 1 || value.sessionId !== sessionId || !Array.isArray(value.request?.messages)) {
        throw new Error('已保存的完整输入快照格式无效。')
      }
      this.memory.set(sessionId, value)
      return structuredClone(value)
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null
      throw error
    }
  }
}
