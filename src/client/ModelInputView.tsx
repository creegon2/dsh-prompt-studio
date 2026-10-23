import { useState, type ReactNode } from 'react'
import type { ModelInputCatalog } from '../shared.ts'
import styles from './PromptStudioView.module.css'

type Category = 'messages' | 'system' | 'tools' | 'context' | 'json'

function sourceOf(message: Record<string, unknown>): string {
  const source = message['source'] as Record<string, unknown> | undefined
  return String(source?.['kind'] ?? message['role'] ?? 'unknown')
}

function isContext(message: Record<string, unknown>): boolean {
  return !['user', 'model', 'tool', 'system-prompt'].includes(sourceOf(message))
}

function MessageBody({ message }: { message: Record<string, unknown> }): ReactNode {
  const content = message['content']
  if (!Array.isArray(content)) return <pre className={styles['inputText']}>{JSON.stringify(content, null, 2) ?? '（未设置 content）'}</pre>
  return <>{content.map((block: Record<string, unknown>, index) => (
    <div key={index}>
      <span className={styles['blockLabel']}>{String(block['type'] ?? 'block')}</span>
      <pre className={styles['inputText']}>{typeof block['text'] === 'string' ? block['text'] : JSON.stringify(block, null, 2)}</pre>
    </div>
  ))}</>
}

export function ModelInputView({ input, refresh }: { input: ModelInputCatalog | null; refresh: () => void }): ReactNode {
  const [mode, setMode] = useState<'latest' | 'current'>('latest')
  const [category, setCategory] = useState<Category>('messages')
  const [expanded, setExpanded] = useState(false)
  const [feedback, setFeedback] = useState('')
  if (input === null) return <p className={styles['notice']}>正在载入完整模型输入…</p>
  const latest = input.latest
  const current = mode === 'current' || latest === null
  const request = current ? {
    system: input.current.system, tools: input.current.tools, messages: [],
  } : latest.request
  const messages = request.messages
  const tools = request.tools ?? []
  const json = JSON.stringify(request, null, 2)
  const selected = messages.map((message, index) => ({ message, index })).filter(({ message }) => (
    category === 'messages' || (category === 'system' ? message['role'] === 'system' : isContext(message))
  ))
  const systemCount = messages.filter(message => message['role'] === 'system').length + (typeof request['system'] === 'string' ? 1 : 0)
  const contextCount = messages.filter(isContext).length
  const categories: [Category, string][] = [
    ['messages', `全部消息 · ${messages.length}`], ['system', `System · ${systemCount}`],
    ['tools', `工具定义 · ${tools.length}`], ['context', `注入上下文 · ${contextCount}`], ['json', '完整 JSON'],
  ]
  const exportInput = (): void => {
    const url = URL.createObjectURL(new Blob([JSON.stringify({
      source: current ? 'current-preview' : latest.source,
      recordedAt: current ? input.current.assembledAt : latest.recordedAt,
      request,
    }, null, 2)], { type: 'application/json' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `dsh-model-input-${current ? 'preview' : latest.sessionId}.json`
    anchor.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  return <div className={styles['inputRoot']}>
    <div className={styles['pageHeader']}>
      <div>
        <h1 className={styles['title']}>完整模型输入</h1>
        <p className={styles['intro']}>按真实顺序查看消息、完整工具说明和参数。这里只读；修改 system 请切到“System 编辑器”。</p>
      </div>
      <div className={styles['headerActions']}>
        <button className={styles['secondaryButton']} onClick={refresh}>刷新输入</button>
        <button className={styles['secondaryButton']} onClick={() => {
          void navigator.clipboard.writeText(json).then(() => setFeedback('已复制完整 JSON')).catch(() => setFeedback('复制失败，请使用导出 JSON'))
        }}>复制完整 JSON</button>
        <button className={styles['secondaryButton']} onClick={exportInput}>导出 JSON</button>
      </div>
    </div>
    <div className={styles['inputPanel']}>
      <div className={styles['inputToolbar']}>
        <label>查看来源 <select className={styles['select']} value={current ? 'current' : 'latest'} onChange={event => { setMode(event.target.value as 'latest' | 'current'); setFeedback('') }}>
          <option value="latest" disabled={latest === null}>最近一次请求{latest?.source === 'reconstructed' ? '（日志重建）' : '（直接捕获）'}</option>
          <option value="current">当前配置（预览）</option>
        </select></label>
        <span className={styles['inputMeta']}>{json.length.toLocaleString()} 字符 · {tools.length} 个工具 · {messages.length} 条消息</span>
        <button className={styles['textButton']} onClick={() => setExpanded(value => !value)}>{expanded ? '收起全部' : '展开全部'}</button>
      </div>
      <p className={styles['inputNotice']}>
        {current ? '当前配置预览：展示现在组装的 system 和工具。动态上下文、历史消息以真实请求为准，不在这里冒充“完整请求”。'
          : latest.source === 'captured' ? '直接捕获：插件在 llm/stream 处观测的完整逻辑参数。表示已发起调用，不代表上游已成功返回。'
            : `日志重建：使用 dsh 官方 Session 折叠器恢复最后一次模型回复之前的输入（事件 #${latest.boundarySeq}）。不是当时逐字抓包，调用层额外处理可能未记录。`}
      </p>
      <p className={styles['inputMeta']}>{current ? '预览时间' : latest.source === 'captured' ? '捕获时间' : '重建时间'}：{current ? input.current.assembledAt : latest.recordedAt}{current ? '' : ` · ${latest.sessionId}`} · 不包含 HTTP 鉴权信息；后续插件及上游适配器仍可能转换格式。{latest === null ? ' 本会话还没有可恢复的模型请求。' : ''}</p>
      {input.error ? <p className={styles['error']}>{input.error}</p> : null}
      {feedback ? <p role="status">{feedback}</p> : null}
      <nav className={styles['inputCategories']} aria-label="输入类别">
        {categories.map(([id, label]) => <button key={id} className={category === id ? styles['categoryActive'] : styles['categoryButton']} aria-pressed={category === id} onClick={() => setCategory(id)}>{label}</button>)}
      </nav>
      {category === 'json' ? <pre aria-label="完整请求 JSON" className={styles['inputText']}>{json}</pre> : category === 'tools' ? (
        tools.length === 0 ? <p>没有工具定义。</p> : tools.map((tool, index) => <details key={`${index}-${expanded}`} className={styles['inputEntry']} open={expanded || index === 0}>
          <summary><span className={styles['entryNumber']}>{index + 1}</span><strong>{String(tool['name'] ?? (tool['function'] as Record<string, unknown>)?.['name'] ?? 'tool')}</strong><span className={styles['inputMeta']}>完整说明 + 参数 schema · {JSON.stringify(tool).length.toLocaleString()} 字符</span></summary>
          <pre className={styles['inputText']}>{JSON.stringify(tool, null, 2)}</pre>
        </details>)
      ) : <>
        {(category === 'system' || category === 'messages') && typeof request['system'] === 'string' ? <details className={styles['inputEntry']} open><summary>system（独立字段）</summary><pre className={styles['inputText']}>{request['system']}</pre></details> : null}
        {selected.map(({ message, index }) => <details key={`${index}-${expanded}`} className={styles['inputEntry']} open={expanded || index === 0}>
          <summary><span className={styles['entryNumber']}>{index + 1}</span><strong>{String(message['role'])}</strong><span>{sourceOf(message)}</span><span className={styles['inputMeta']}>{JSON.stringify(message).length.toLocaleString()} 字符</span></summary>
          <MessageBody message={message} />
          <details className={styles['sourceDetails']}><summary>此消息的完整 JSON（含来源、非文本块和其他字段）</summary><pre className={styles['inputText']}>{JSON.stringify(message, null, 2)}</pre></details>
        </details>)}
        {selected.length === 0 && category !== 'system' ? <p>{current ? '当前预览不含会话消息，请选择最近一次请求。' : '此类别没有消息。'}</p> : null}
      </>}
    </div>
  </div>
}
