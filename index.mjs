// src/index.ts
import { homedir as homedir2 } from "node:os";
import { join as join3 } from "node:path";
import { renderPrompt } from "@deepseek-ai/dsh-system-prompt";

// src/config.ts
import z from "@deepseek-ai/schemastery";

// src/shared.ts
var PROMPT_STUDIO_NAMESPACE = "prompt-studio";
var PROMPT_STUDIO_STATE_PATH = "/prompt-studio/state";
var PROMPT_STUDIO_SETTINGS_PATH = "/prompt-studio/settings";
var PROMPT_STUDIO_RESOURCE_PATH = "/prompt-studio/resource";
var PROMPT_STUDIO_INPUT_PATH = "/api/prompt-studio/input";
var PROMPT_STUDIO_VIEW_ORDER = 20;
var DEFAULT_SUPPLEMENT_ORDER = 100;
var PROMPT_STUDIO_OVERRIDE_MARKER_PREFIX = "prompt-studio:override-marker:";
var PROMPT_STUDIO_MESSAGE_SOURCE = "moeblack/prompt-studio";
var KINDS = /* @__PURE__ */ new Set(["native", "supplement"]);
var POSITIONS = /* @__PURE__ */ new Set(["after_system", "anchored", "tail"]);
var ROLES = /* @__PURE__ */ new Set(["system", "user", "assistant"]);
function validateIdentifier(value, label) {
  if (value.length === 0 || value.trim() !== value) {
    throw new TypeError(`${label} must be non-empty and have no surrounding whitespace`);
  }
}
function isNativeOverride(component) {
  return component.kind === "supplement" && component.origin !== void 0;
}
function validatePromptComponents(components, allowNative = false) {
  const ids = /* @__PURE__ */ new Set();
  const overrideTargets = /* @__PURE__ */ new Set();
  for (const component of components) {
    validateIdentifier(component.id, "prompt component ids");
    if (!KINDS.has(component.kind)) throw new TypeError(`prompt component "${component.id}" has an invalid kind`);
    if (!ROLES.has(component.role)) throw new TypeError(`prompt component "${component.id}" has an invalid role`);
    if (component.role === "system") {
      if (component.position !== void 0) {
        throw new TypeError(`system prompt component "${component.id}" cannot define a message position`);
      }
    } else if (component.position === void 0 || !POSITIONS.has(component.position)) {
      throw new TypeError(`message prompt component "${component.id}" has an invalid position`);
    }
    if (component.blockType !== void 0) {
      if (component.blockType !== "text" && component.blockType !== "reasoning") {
        throw new TypeError(`prompt component "${component.id}" has an invalid block type`);
      }
      if (component.role !== "assistant") {
        throw new TypeError(`prompt component "${component.id}" blockType applies only to assistant components`);
      }
    }
    if (!Number.isFinite(component.order)) {
      throw new TypeError(`prompt component "${component.id}" order must be a finite number`);
    }
    if (component.id.startsWith(PROMPT_STUDIO_OVERRIDE_MARKER_PREFIX)) {
      throw new TypeError(`prompt component ids beginning with "${PROMPT_STUDIO_OVERRIDE_MARKER_PREFIX}" are reserved`);
    }
    if (ids.has(component.id)) throw new TypeError(`prompt component "${component.id}" is listed more than once`);
    ids.add(component.id);
    if (component.kind === "native") {
      if (!allowNative) throw new TypeError(`native prompt component "${component.id}" cannot be persisted`);
      if (component.origin !== void 0) {
        throw new TypeError(`native prompt component "${component.id}" cannot override another component`);
      }
      if (component.role !== "system") {
        throw new TypeError(`native prompt component "${component.id}" must use the system role`);
      }
      continue;
    }
    if (component.origin === void 0) continue;
    validateIdentifier(component.origin, `supplement "${component.id}" native target`);
    if (overrideTargets.has(component.origin)) {
      throw new TypeError(`native prompt component "${component.origin}" is overridden more than once`);
    }
    overrideTargets.add(component.origin);
  }
}
function uniqueComponentId(preferred, used) {
  if (!used.has(preferred)) {
    used.add(preferred);
    return preferred;
  }
  for (let suffix = 2; ; suffix += 1) {
    const candidate = `${preferred}-${String(suffix)}`;
    if (used.has(candidate)) continue;
    used.add(candidate);
    return candidate;
  }
}
function renderSupplementBoundary(_id, text) {
  return text;
}
function systemPreviewComponent(component) {
  const snapshot = {
    ...component,
    template: renderSupplementBoundary(component.id, component.template)
  };
  delete snapshot.position;
  return snapshot;
}
function buildDraftSystemComponents(native, configured) {
  validatePromptComponents(native, true);
  validatePromptComponents(configured);
  const nativeIds = new Set(native.map((component) => component.id));
  const overrides = new Map(configured.filter(isNativeOverride).map((component) => [component.origin, component]));
  const ordered = native.flatMap((component, declaration) => {
    const override = overrides.get(component.id);
    if (override === void 0) {
      return component.enabled ? [{ component: { ...component }, declaration }] : [];
    }
    return [];
  });
  for (const [declaration, component] of configured.entries()) {
    if (!component.enabled || component.role !== "system") continue;
    if (component.origin !== void 0 && !nativeIds.has(component.origin)) continue;
    ordered.push({
      component: systemPreviewComponent(component),
      declaration: native.length + declaration
    });
  }
  return ordered.sort((left, right) => left.component.order - right.component.order || left.declaration - right.declaration).map((entry) => entry.component);
}
function renderKnownVariables(text, variables) {
  return text.replace(/\{\{([a-z][a-z0-9_]*)\}\}/g, (reference, key) => variableValue(variables, key) ?? reference);
}
function renderStudioText(text, variables) {
  return text.replace(/<[Uu][Ss][Ee][Rr]>|\{\{([a-z][a-z0-9_]*)\}\}/g, (reference, key) => variableValue(variables, key ?? "user") ?? reference);
}
function variableValue(variables, key) {
  return Object.hasOwn(variables, key) ? variables[key] : void 0;
}
function renderStudioSections(assembly, ownedSectionNames) {
  assembly.sections = assembly.sections.map((section) => section.interpolate === false || !ownedSectionNames.has(section.name) ? section : { ...section, text: renderStudioText(section.text, assembly.variables), interpolate: false });
}
function renderSystemPreview(components, variables) {
  return components.map((component) => variables === void 0 ? component.template : (component.kind === "native" ? renderKnownVariables : renderStudioText)(component.template, variables)).filter((text) => text.length > 0).join("\n\n");
}
function nextSupplementId(components) {
  const used = new Set(components.map((component) => component.id));
  return uniqueComponentId("supplement:message", used);
}
function nextOverrideId(components, target) {
  const used = new Set(components.map((component) => component.id));
  return uniqueComponentId(`override:${target}`, used);
}

// src/config.ts
var finiteOrder = z.transform(z.number(), (value) => {
  if (!Number.isFinite(value)) throw new TypeError("prompt component order must be a finite number");
  return value;
}, true);
var kindSchema = z.union([
  z.const("native"),
  z.const("supplement")
]);
var positionSchema = z.union([
  z.const("after_system"),
  z.const("anchored"),
  z.const("tail")
]);
var roleSchema = z.union([
  z.const("system"),
  z.const("user"),
  z.const("assistant")
]);
var blockTypeSchema = z.union([
  z.const("text"),
  z.const("reasoning")
]);
var componentSchema = z.object({
  id: z.string().min(1),
  kind: kindSchema,
  role: roleSchema,
  position: positionSchema.default(void 0),
  order: z.number(),
  enabled: z.boolean().default(true),
  template: z.string(),
  origin: z.string().min(1).default(void 0),
  blockType: blockTypeSchema.default(void 0)
});
var uniqueComponents = z.transform(z.array(componentSchema), (components) => {
  const normalized = components.map((component) => {
    if (component.role !== "system") return component;
    if (component.position !== void 0 && component.position !== "after_system") return component;
    const snapshot = { ...component };
    delete snapshot.position;
    return snapshot;
  });
  validatePromptComponents(normalized);
  return normalized;
}, true);
var studioConfigSchema = z.object({
  components: z.array(componentSchema).default([]).volatile(),
  userName: z.string().default("").description("Studio \u6BB5\u843D\u91CC {{user}} \u548C <user> \u66FF\u6362\u6210\u4EC0\u4E48\uFF08\u7559\u7A7A\u5219\u4FDD\u6301\u539F\u6837\uFF09\uFF1B\u6539\u540E\u91CD\u542F dsh \u751F\u6548")
});

// src/capture.ts
var CONVERSATION_SOURCE_KINDS = /* @__PURE__ */ new Set(["user", "model", "tool"]);
function sourceRecord(message) {
  return structuredClone(message.source);
}
function blockText(block) {
  const record = block;
  if ((block.type === "text" || block.type === "reasoning") && typeof record["text"] === "string") {
    return record["text"];
  }
  return JSON.stringify(block, null, 2);
}
function renderMessageContent(message) {
  return message.content.map(blockText).join("\n\n");
}
function instructionResources(source) {
  if (source["form"] !== "instructions" || !Array.isArray(source["changes"])) return [];
  const resources = [];
  for (const change of source["changes"]) {
    if (typeof change !== "object" || change === null || Array.isArray(change)) continue;
    const record = change;
    const action = record["action"];
    const path = record["path"];
    const digest = record["digest"];
    if (action !== "set" && action !== "replace" && action !== "remove" || typeof path !== "string") continue;
    resources.push({
      id: `resource:${String(resources.length)}`,
      path,
      action,
      ...typeof digest === "string" ? { digest } : {},
      editable: action !== "remove" && typeof digest === "string"
    });
  }
  return resources;
}
function isInjectedContextMessage(message) {
  const source = message.source;
  const kind = source["kind"];
  if (typeof kind !== "string" || CONVERSATION_SOURCE_KINDS.has(kind)) return false;
  return !(kind === "plugin" && source["plugin"] === PROMPT_STUDIO_MESSAGE_SOURCE);
}
function captureInjectedMessages(messages) {
  return messages.flatMap((message, order) => {
    if (!isInjectedContextMessage(message)) return [];
    const source = sourceRecord(message);
    const sourceKind = String(source["kind"]);
    const plugin = source["plugin"];
    const form = source["form"];
    const summary = source["summary"];
    return [{
      id: `captured:${String(message.id)}`,
      kind: "captured",
      role: message.role,
      order,
      enabled: true,
      template: renderMessageContent(message),
      messageId: String(message.id),
      sourceKind,
      producer: sourceKind === "plugin" && typeof plugin === "string" ? plugin : sourceKind,
      ...typeof form === "string" ? { form } : {},
      ...typeof summary === "string" ? { summary } : {},
      source,
      resources: instructionResources(source)
    }];
  });
}
function requestLayout(messages) {
  let userAnchor = null;
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index];
    if (message?.role === "user" && message.source.kind === "user") {
      userAnchor = index;
      break;
    }
  }
  return { messageCount: messages.length, userAnchor };
}

// src/input.ts
import { createHash } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { Session } from "@deepseek-ai/dsh-session";
var CALL_FIELDS = ["provider", "model", "reasoningEffort", "messages", "system", "tools", "toolHistory", "temperature", "maxTokens", "stop", "sessionId", "purpose"];
function captureModelInput(options) {
  const request = {};
  for (const field of CALL_FIELDS) {
    if (options[field] !== void 0) request[field] = options[field];
  }
  return {
    version: 1,
    source: "captured",
    sessionId: String(options.sessionId),
    recordedAt: (/* @__PURE__ */ new Date()).toISOString(),
    // The call's JSON data is detached; the original options are never modified.
    request: JSON.parse(JSON.stringify(request))
  };
}
function reconstructModelInput(session) {
  const events = session.snapshotEvents();
  const boundary = events.findLastIndex((event) => event.type === "assistant/message" || event.type === "assistant/attempt");
  if (boundary < 0) return null;
  const prefix = events.slice(0, boundary);
  const detached = Session.create(session.id, prefix, session.header, session.inheritedEventCount);
  const header = detached.requestHeader();
  if (header === void 0) return null;
  const result = captureModelInput({
    ...header.config,
    messages: detached.deriveMessages(),
    toolHistory: detached.toolHistory(),
    ...header.tools === void 0 ? {} : { tools: header.tools },
    sessionId: session.id
  });
  return { ...result, source: "reconstructed", boundarySeq: events[boundary].seq };
}
var ModelInputStore = class {
  constructor(directory) {
    this.directory = directory;
  }
  directory;
  memory = /* @__PURE__ */ new Map();
  writes = /* @__PURE__ */ new Map();
  path(sessionId) {
    return join(this.directory, `${createHash("sha256").update(sessionId).digest("hex")}.json`);
  }
  save(snapshot) {
    this.memory.set(snapshot.sessionId, structuredClone(snapshot));
    const task = (this.writes.get(snapshot.sessionId) ?? Promise.resolve()).catch(() => {
    }).then(async () => {
      await mkdir(this.directory, { recursive: true });
      const path = this.path(snapshot.sessionId);
      const temporary = `${path}.tmp`;
      await writeFile(temporary, JSON.stringify(snapshot), "utf8");
      await rename(temporary, path);
    });
    this.writes.set(snapshot.sessionId, task);
    return task;
  }
  async load(sessionId) {
    const cached = this.memory.get(sessionId);
    if (cached !== void 0) return structuredClone(cached);
    try {
      const value = JSON.parse(await readFile(this.path(sessionId), "utf8"));
      if (value.version !== 1 || value.sessionId !== sessionId || !Array.isArray(value.request?.messages)) {
        throw new Error("\u5DF2\u4FDD\u5B58\u7684\u5B8C\u6574\u8F93\u5165\u5FEB\u7167\u683C\u5F0F\u65E0\u6548\u3002");
      }
      this.memory.set(sessionId, value);
      return structuredClone(value);
    } catch (error) {
      if (error.code === "ENOENT") return null;
      throw error;
    }
  }
};

// src/resource.ts
import { createHash as createHash2 } from "node:crypto";
import { homedir } from "node:os";
import { readFile as readFile2, writeFile as writeFile2 } from "node:fs/promises";
import { dirname, isAbsolute, join as join2, resolve } from "node:path";
var CapturedResourceNotFoundError = class extends Error {
};
var CapturedResourceConflictError = class extends Error {
};
function sha1(content) {
  return createHash2("sha1").update(content).digest("hex");
}
function ancestorDirectories(cwd) {
  const directories = [];
  let current = resolve(cwd);
  for (; ; ) {
    directories.push(current);
    const parent = dirname(current);
    if (parent === current) return directories;
    current = parent;
  }
}
function fixedPath(displayPath) {
  if (isAbsolute(displayPath)) return resolve(displayPath);
  if (displayPath.startsWith("$DSH_HOME/")) {
    const dshHome = process.env["DSH_HOME"];
    return dshHome === void 0 ? void 0 : join2(dshHome, displayPath.slice("$DSH_HOME/".length));
  }
  if (displayPath.startsWith("~/.dsh/")) {
    return join2(homedir(), ".dsh", displayPath.slice("~/.dsh/".length));
  }
  return void 0;
}
async function readable(path) {
  try {
    const content = await readFile2(path, "utf8");
    return { path, content, digest: sha1(content) };
  } catch {
    return void 0;
  }
}
function isReadableFile(file) {
  return file !== void 0;
}
async function resolveResource(cwd, resource) {
  const fixed = fixedPath(resource.path);
  if (fixed !== void 0) {
    const file = await readable(fixed);
    if (file !== void 0) return file;
    throw new CapturedResourceNotFoundError(`\u4E0A\u4E0B\u6587\u6587\u4EF6\u4E0D\u5B58\u5728\u6216\u4E0D\u53EF\u8BFB\uFF1A${resource.path}`);
  }
  const candidates = ancestorDirectories(cwd).map((directory) => resolve(directory, resource.path));
  const readableCandidates = (await Promise.all(candidates.map(readable))).filter(isReadableFile);
  const matching = resource.digest === void 0 ? [] : readableCandidates.filter((file) => file.digest === resource.digest);
  if (matching.length === 1) return matching[0];
  if (matching.length > 1) {
    throw new CapturedResourceConflictError(`\u4E0A\u4E0B\u6587\u6587\u4EF6\u8DEF\u5F84\u4E0D\u552F\u4E00\uFF1A${resource.path}`);
  }
  if (readableCandidates.length === 1) return readableCandidates[0];
  if (readableCandidates.length > 1) {
    throw new CapturedResourceConflictError(`\u4E0A\u4E0B\u6587\u6587\u4EF6\u5DF2\u53D8\u5316\u4E14\u8DEF\u5F84\u4E0D\u552F\u4E00\uFF1A${resource.path}`);
  }
  throw new CapturedResourceNotFoundError(`\u65E0\u6CD5\u4ECE\u4F1A\u8BDD\u5DE5\u4F5C\u76EE\u5F55\u89E3\u6790\u4E0A\u4E0B\u6587\u6587\u4EF6\uFF1A${resource.path}`);
}
async function loadCapturedResource(cwd, resource) {
  const file = await resolveResource(cwd, resource);
  return { path: resource.path, content: file.content, digest: file.digest };
}
async function saveCapturedResource(cwd, resource, content, expectedDigest) {
  const current = await resolveResource(cwd, resource);
  if (current.digest !== expectedDigest) {
    throw new CapturedResourceConflictError(`\u4E0A\u4E0B\u6587\u6587\u4EF6\u5DF2\u5728\u7F16\u8F91\u671F\u95F4\u53D8\u5316\uFF1A${resource.path}`);
  }
  await writeFile2(current.path, content, "utf8");
  return { path: resource.path, content, digest: sha1(content) };
}

// src/index.ts
var PROMPT_STUDIO_SETTINGS_NAMESPACE = PROMPT_STUDIO_NAMESPACE;
var name = "client-ui-prompt-studio";
var Config = studioConfigSchema;
var inject = ["settings", "systemPrompt", "llm", "sessions", "agents"];
var SYSTEM_SECTION_PREFIX = "prompt-studio:supplement-section:";
function markerName(target) {
  return `${PROMPT_STUDIO_OVERRIDE_MARKER_PREFIX}${target}`;
}
function systemSectionName(id) {
  return `${SYSTEM_SECTION_PREFIX}${id}`;
}
function cloneComponent(component) {
  return { ...component };
}
var RuntimeBindings = class {
  ownedSectionNames = /* @__PURE__ */ new Set();
  overridesByMarker = /* @__PURE__ */ new Map();
  systemBySection = /* @__PURE__ */ new Map();
  supplements = /* @__PURE__ */ new Map();
  /** Activate one component and return its composed inverse. */
  activate(ctx, component) {
    if (component.kind === "native") throw new TypeError(`native prompt component "${component.id}" cannot be activated from settings`);
    if (isNativeOverride(component)) {
      const snapshot2 = { ...component, origin: component.origin };
      const marker = markerName(snapshot2.origin);
      return ctx.effect(function* () {
        this.ownedSectionNames.add(marker);
        this.overridesByMarker.set(marker, snapshot2);
        if (snapshot2.enabled && snapshot2.role === "system") {
          this.systemBySection.set(marker, snapshot2);
        } else if (snapshot2.enabled) {
          this.supplements.set(snapshot2.id, snapshot2);
        }
        yield () => {
          this.supplements.delete(snapshot2.id);
          this.systemBySection.delete(marker);
          this.overridesByMarker.delete(marker);
          this.ownedSectionNames.delete(marker);
        };
        yield ctx.systemPrompt.section({
          name: marker,
          order: snapshot2.order,
          text: snapshot2.enabled && snapshot2.role === "system" ? renderSupplementBoundary(snapshot2.id, snapshot2.template) : ""
        });
      }.bind(this), `prompt-studio: override ${snapshot2.origin}`);
    }
    if (!component.enabled) return ctx.effect(() => () => void 0, `prompt-studio: disabled ${component.id}`);
    const snapshot = cloneComponent(component);
    if (snapshot.role === "system") {
      const sectionName = systemSectionName(snapshot.id);
      return ctx.effect(function* () {
        this.ownedSectionNames.add(sectionName);
        this.systemBySection.set(sectionName, snapshot);
        yield () => {
          this.systemBySection.delete(sectionName);
          this.ownedSectionNames.delete(sectionName);
        };
        yield ctx.systemPrompt.section({
          name: sectionName,
          order: snapshot.order,
          text: renderSupplementBoundary(snapshot.id, snapshot.template)
        });
      }.bind(this), `prompt-studio: system supplement ${component.id}`);
    }
    return ctx.effect(function* () {
      this.supplements.set(snapshot.id, snapshot);
      yield () => {
        this.supplements.delete(snapshot.id);
      };
    }.bind(this), `prompt-studio: supplement ${component.id}`);
  }
};
var ComponentPipeline = class {
  constructor(ctx, bindings) {
    this.ctx = ctx;
    this.bindings = bindings;
  }
  ctx;
  bindings;
  recover = () => void 0;
  replace(components) {
    validatePromptComponents(components);
    this.recover();
    const snapshots = components.map(cloneComponent);
    this.recover = this.ctx.effect(function* () {
      for (const component of snapshots) yield this.bindings.activate(this.ctx, component);
    }.bind(this), "prompt-studio: configured component set");
  }
};
function applyOverrides(assembly, overridesByMarker) {
  const matchedOverrideIds = /* @__PURE__ */ new Set();
  if (overridesByMarker.size === 0) return matchedOverrideIds;
  const presentNames = new Set(assembly.sections.map((section) => section.name));
  const matchedMarkers = /* @__PURE__ */ new Set();
  const replacedTargets = /* @__PURE__ */ new Set();
  for (const [marker, override] of overridesByMarker) {
    if (!presentNames.has(marker) || !presentNames.has(override.origin)) continue;
    matchedMarkers.add(marker);
    replacedTargets.add(override.origin);
    matchedOverrideIds.add(override.id);
  }
  const sectionsByName = new Map(assembly.sections.map((section) => [section.name, section]));
  assembly.sections = assembly.sections.flatMap((section) => {
    if (overridesByMarker.has(section.name)) return [];
    if (!replacedTargets.has(section.name)) return [section];
    const marker = markerName(section.name);
    const override = overridesByMarker.get(marker);
    return override.enabled && override.role === "system" ? [sectionsByName.get(marker)] : [];
  });
  return matchedOverrideIds;
}
function runtimeNative(sections, ownedSectionNames) {
  return sections.filter((section) => !ownedSectionNames.has(section.name)).map((section, order) => ({
    id: section.name,
    kind: "native",
    role: "system",
    order,
    enabled: true,
    template: section.text
  }));
}
function effectiveAssembly(sections, systemBySection) {
  return sections.map((section, order) => {
    const supplement = systemBySection.get(section.name);
    if (supplement !== void 0) {
      const snapshot = { ...supplement, template: section.text };
      delete snapshot.position;
      return snapshot;
    }
    return {
      id: section.name,
      kind: "native",
      role: "system",
      order,
      enabled: true,
      template: section.text
    };
  });
}
var RuntimeCatalogStore = class {
  tools = /* @__PURE__ */ new Map();
  assemblyTimes = /* @__PURE__ */ new Map();
  revision = 0;
  native = [];
  assembled = [];
  requests = /* @__PURE__ */ new Map();
  latestSessionId;
  prompts = /* @__PURE__ */ new Map();
  commitTools(sessionId, tools) {
    this.tools.set(sessionId, JSON.parse(JSON.stringify(tools ?? [])));
    this.assemblyTimes.set(sessionId, (/* @__PURE__ */ new Date()).toISOString());
  }
  currentInput(sessionId) {
    return {
      system: renderSystemPreview(this.snapshot(sessionId).assembled),
      tools: structuredClone(this.tools.get(sessionId ?? "") ?? []),
      assembledAt: this.assemblyTimes.get(sessionId ?? "") ?? (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  commit(native, assembled, sessionId, variables = {}) {
    const nextNative = native.map(cloneComponent);
    const nextAssembled = assembled.map(cloneComponent);
    if (sessionId !== void 0) this.prompts.set(sessionId, { native: nextNative, assembled: nextAssembled, variables: { ...variables } });
    if (JSON.stringify(nextNative) === JSON.stringify(this.native) && JSON.stringify(nextAssembled) === JSON.stringify(this.assembled)) return;
    this.native = nextNative;
    this.assembled = nextAssembled;
    this.revision += 1;
  }
  commitRequest(sessionId, messages) {
    const next = {
      captured: captureInjectedMessages(messages),
      layout: requestLayout(messages)
    };
    const previous = this.requests.get(sessionId);
    this.latestSessionId = sessionId;
    if (previous !== void 0 && JSON.stringify(previous) === JSON.stringify(next)) return;
    this.requests.set(sessionId, structuredClone(next));
    this.revision += 1;
  }
  snapshot(requestedSessionId) {
    const sessionId = requestedSessionId ?? this.latestSessionId;
    const request = sessionId === void 0 ? void 0 : this.requests.get(sessionId);
    const prompt = sessionId === void 0 ? void 0 : this.prompts.get(sessionId);
    return {
      revision: this.revision,
      variables: { ...prompt?.variables },
      native: (prompt?.native ?? this.native).map(cloneComponent),
      assembled: (prompt?.assembled ?? this.assembled).map(cloneComponent),
      ...sessionId === void 0 ? {} : { sessionId },
      captured: request === void 0 ? [] : structuredClone(request.captured),
      layout: request === void 0 ? { messageCount: 0, userAnchor: null } : { ...request.layout }
    };
  }
  capturedResource(sessionId, componentId, resourceId) {
    const component = this.requests.get(sessionId)?.captured.find((item) => item.id === componentId);
    const resource = component?.resources.find((item) => item.id === resourceId);
    return resource === void 0 ? void 0 : { ...resource };
  }
};
function latestUserInput(agent) {
  const events = agent.session.snapshotEvents();
  for (let index = events.length - 1; index >= 0; index -= 1) {
    const event = events[index];
    if (event?.type !== "user/message") continue;
    return event.data.content.filter((block) => block.type === "text").map((block) => block.text).join("\n");
  }
  return void 0;
}
function injectionSeedTurn(components) {
  const userText = components.filter((component) => component.role === "user").map((component) => renderSupplementBoundary(component.id, component.template)).join("\n\n");
  const assistantText = components.filter((component) => component.role === "assistant").map((component) => renderSupplementBoundary(component.id, component.template)).join("\n\n");
  if (userText.length === 0 && assistantText.length === 0) return void 0;
  return { userText, assistantText };
}
function appendInjectionTurn(session, components) {
  const seed = injectionSeedTurn(components);
  if (seed === void 0) return;
  const { userText, assistantText } = seed;
  const turn = 0;
  session.append("turn/start", { turn });
  session.append("step/start", { turn, step: 1 });
  if (userText.length > 0) {
    session.append("user/message", {
      id: crypto.randomUUID(),
      role: "user",
      content: [{ type: "text", text: userText }],
      source: { kind: "user" }
    }, { surfaceOp: "append" });
  }
  if (assistantText.length > 0) {
    session.append("assistant/message", {
      turn,
      step: 1,
      message: {
        id: crypto.randomUUID(),
        role: "assistant",
        content: [{ type: "text", text: assistantText }],
        // Plugin provenance kept for tracing; the wire accepts non-model
        // sources at runtime (verified), the cast satisfies the model-source
        // type contract of AssistantMessage.
        source: { kind: "plugin", plugin: PROMPT_STUDIO_MESSAGE_SOURCE }
      }
    }, { surfaceOp: "append" });
  }
  session.append("step/end", { turn, step: 1 });
  session.append("turn/end", { turn, reason: { kind: "completed" } });
}
function rewriteRequest(catalog, options, next) {
  if (options.sessionId === void 0 || options.purpose !== void 0) return next();
  catalog.commitRequest(String(options.sessionId), options.messages);
  return next();
}
function respondJson(response, status, value, head = false) {
  const body = JSON.stringify(value);
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  response.end(head ? void 0 : body);
}
function requestJson(request) {
  return new Promise((resolve2, reject) => {
    const chunks = [];
    request.on("data", (chunk) => {
      chunks.push(chunk);
    });
    request.on("end", () => {
      try {
        resolve2(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch (error) {
        reject(error);
      }
    });
    request.on("error", reject);
  });
}
function requestUrl(request) {
  return new URL(request.url ?? "/", "http://prompt-studio.local");
}
function requiredString(value, name2) {
  if (typeof value !== "string" || value.length === 0) throw new TypeError(`${name2} \u5FC5\u987B\u662F\u975E\u7A7A\u5B57\u7B26\u4E32\u3002`);
  return value;
}
function requiredText(value, name2) {
  if (typeof value !== "string") throw new TypeError(`${name2} \u5FC5\u987B\u662F\u5B57\u7B26\u4E32\u3002`);
  return value;
}
function resourceSelectionFromUrl(request) {
  const params = requestUrl(request).searchParams;
  return {
    sessionId: requiredString(params.get("sessionId"), "sessionId"),
    componentId: requiredString(params.get("componentId"), "componentId"),
    resourceId: requiredString(params.get("resourceId"), "resourceId")
  };
}
function resourceUpdate(value) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new TypeError("\u8BF7\u6C42\u4F53\u5FC5\u987B\u662F JSON \u5BF9\u8C61\u3002");
  }
  const record = value;
  return {
    sessionId: requiredString(record["sessionId"], "sessionId"),
    componentId: requiredString(record["componentId"], "componentId"),
    resourceId: requiredString(record["resourceId"], "resourceId"),
    content: requiredText(record["content"], "content"),
    expectedDigest: requiredString(record["expectedDigest"], "expectedDigest")
  };
}
function selectedResource(ctx, catalog, selection) {
  const session = ctx.sessions.get(selection.sessionId);
  if (session === void 0) {
    throw new CapturedResourceNotFoundError(`\u4F1A\u8BDD\u4E0D\u5B58\u5728\uFF1A${selection.sessionId}`);
  }
  const resource = catalog.capturedResource(
    selection.sessionId,
    selection.componentId,
    selection.resourceId
  );
  if (resource === void 0 || !resource.editable) {
    throw new CapturedResourceNotFoundError("\u6355\u83B7\u9879\u6CA1\u6709\u53EF\u7F16\u8F91\u7684\u6587\u4EF6\u8D44\u6E90\u3002");
  }
  return { cwd: session.header.cwd ?? ".", resource };
}
function resourceErrorStatus(error) {
  if (error instanceof TypeError) return 400;
  if (error instanceof CapturedResourceNotFoundError) return 404;
  if (error instanceof CapturedResourceConflictError) return 409;
  return 500;
}
function settingsSnapshot(ctx) {
  const descriptor = ctx.settings.describe().find((row) => row.ns === PROMPT_STUDIO_SETTINGS_NAMESPACE);
  if (descriptor === void 0) throw new Error("prompt-studio settings namespace is not registered");
  const value = descriptor.value;
  return {
    writable: ctx.settings.writable,
    revision: descriptor.revision,
    value: { components: value.components.map(cloneComponent) }
  };
}
function settingsUpdate(value) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new TypeError("\u8BF7\u6C42\u4F53\u5FC5\u987B\u662F JSON \u5BF9\u8C61\u3002");
  }
  const record = value;
  if (!Number.isSafeInteger(record["expectedRevision"]) || record["expectedRevision"] < 0) {
    throw new TypeError("expectedRevision \u5FC5\u987B\u662F\u975E\u8D1F\u5B89\u5168\u6574\u6570\u3002");
  }
  if (!Array.isArray(record["components"])) throw new TypeError("components \u5FC5\u987B\u662F\u6570\u7EC4\u3002");
  const components = structuredClone(record["components"]);
  validatePromptComponents(components);
  return { components, expectedRevision: record["expectedRevision"] };
}
function installRoutes(ctx, catalog) {
  ctx.inject(["webServer"], (routeCtx) => {
    routeCtx.effect(() => routeCtx.webServer.register({
      kind: "exact",
      path: PROMPT_STUDIO_STATE_PATH,
      handler: async (request, response) => {
        if (request.method !== "GET" && request.method !== "HEAD") {
          response.writeHead(405);
          response.end();
          return;
        }
        const sessionId = requestUrl(request).searchParams.get("sessionId") ?? void 0;
        const agent = sessionId === void 0 ? void 0 : routeCtx.agents.get(sessionId);
        try {
          if (agent !== void 0) await routeCtx.systemPrompt.assemble({ scope: agent, agent });
          respondJson(response, 200, catalog.snapshot(sessionId), request.method === "HEAD");
        } catch (error) {
          respondJson(response, 500, { error: String(error) });
        }
      }
    }), "prompt-studio: runtime catalog route");
    routeCtx.effect(() => routeCtx.webServer.register({
      kind: "exact",
      path: PROMPT_STUDIO_SETTINGS_PATH,
      handler: async (request, response) => {
        try {
          if (request.method === "GET" || request.method === "HEAD") {
            respondJson(response, 200, settingsSnapshot(routeCtx), request.method === "HEAD");
            return;
          }
          if (request.method === "POST") {
            const update = settingsUpdate(await requestJson(request));
            const current = routeCtx.settings.describe().find((row) => row.ns === PROMPT_STUDIO_SETTINGS_NAMESPACE)?.value;
            await routeCtx.settings.replace(
              PROMPT_STUDIO_SETTINGS_NAMESPACE,
              { ...current, components: update.components },
              update.expectedRevision
            );
            respondJson(response, 200, settingsSnapshot(routeCtx));
            return;
          }
          response.writeHead(405);
          response.end();
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          respondJson(response, error instanceof TypeError ? 400 : 409, { error: message });
        }
      }
    }), "prompt-studio: settings route");
    routeCtx.effect(() => routeCtx.webServer.register({
      kind: "exact",
      path: PROMPT_STUDIO_RESOURCE_PATH,
      handler: async (request, response) => {
        try {
          if (request.method === "GET" || request.method === "HEAD") {
            const selected = selectedResource(routeCtx, catalog, resourceSelectionFromUrl(request));
            const snapshot = await loadCapturedResource(selected.cwd, selected.resource);
            respondJson(response, 200, snapshot, request.method === "HEAD");
            return;
          }
          if (request.method === "POST") {
            const update = resourceUpdate(await requestJson(request));
            const selected = selectedResource(routeCtx, catalog, update);
            const snapshot = await saveCapturedResource(
              selected.cwd,
              selected.resource,
              update.content,
              update.expectedDigest
            );
            respondJson(response, 200, snapshot);
            return;
          }
          response.writeHead(405);
          response.end();
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          respondJson(response, resourceErrorStatus(error), { error: message });
        }
      }
    }), "prompt-studio: captured resource route");
  });
}
function installInputRoute(ctx, catalog, inputs) {
  ctx.inject(["connection"], (routeCtx) => {
    routeCtx.effect(() => routeCtx.connection.fetch.register({
      path: PROMPT_STUDIO_INPUT_PATH,
      methods: ["GET"],
      requestBody: "buffered",
      fetch: async (request) => {
        const sessionId = new URL(request.url).searchParams.get("sessionId") ?? catalog.snapshot().sessionId;
        const result = { current: catalog.currentInput(sessionId), latest: null };
        try {
          const agent = sessionId === void 0 ? void 0 : routeCtx.agents.get(sessionId);
          if (agent !== void 0) await routeCtx.systemPrompt.assemble({ scope: agent, agent });
          result.current = catalog.currentInput(sessionId);
          if (sessionId !== void 0) {
            result.latest = await inputs.load(sessionId);
            const session = routeCtx.sessions.get(sessionId);
            if (result.latest === null && session !== void 0) result.latest = reconstructModelInput(session);
            if (result.latest !== null) catalog.commitRequest(sessionId, result.latest.request.messages);
          }
        } catch (error) {
          result.error = error instanceof Error ? error.message : String(error);
        }
        return new Response(JSON.stringify(result), { headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
      }
    }), "prompt-studio: authenticated complete model input");
  });
}
async function apply(ctx, config) {
  ctx.effect(() => ctx.settings.configure({ auto: false }));
  const bindings = new RuntimeBindings();
  const pipeline = new ComponentPipeline(ctx, bindings);
  const catalog = new RuntimeCatalogStore();
  const dshHome = process.env["DSH_HOME"]?.trim() || join3(homedir2(), ".dsh");
  const inputs = new ModelInputStore(join3(dshHome, "prompt-studio", "requests"));
  ctx.systemPrompt.variable("user_input", (context) => context.agent === void 0 ? void 0 : latestUserInput(context.agent));
  const userName = typeof config.userName === "string" ? config.userName.trim() : "";
  if (userName !== "") ctx.systemPrompt.variable("user", () => userName);
  ctx.on("system-prompt/assemble", async (assembly, context, next) => {
    const native = runtimeNative(assembly.sections, bindings.ownedSectionNames);
    applyOverrides(assembly, bindings.overridesByMarker);
    const resolved = await next();
    renderStudioSections(resolved, bindings.ownedSectionNames);
    catalog.commitTools(context.agent?.session.id ?? "", resolved.tools);
    const renderedSections = resolved.sections.map((section) => ({
      ...section,
      text: context.agent === void 0 ? section.text : renderPrompt({ ...resolved, sections: [section] })
    }));
    catalog.commit(native, effectiveAssembly(renderedSections, bindings.systemBySection), context.agent?.session.id, resolved.variables);
    return resolved;
  }, { prepend: true });
  let refreshRequested = false;
  let refreshTask;
  const requestRefresh = () => {
    refreshRequested = true;
    if (refreshTask !== void 0) return;
    refreshTask = (async () => {
      while (refreshRequested) {
        refreshRequested = false;
        await ctx.systemPrompt.assemble();
      }
    })().catch((error) => {
      ctx.logger.warn("prompt-studio: runtime prompt discovery failed");
      ctx.logger.warn(error);
    }).finally(() => {
      refreshTask = void 0;
      if (refreshRequested) requestRefresh();
    });
  };
  ctx.on("system-prompt/change", requestRefresh);
  ctx.on("llm/stream", (options, next) => {
    if (options.sessionId === void 0 || options.purpose !== void 0) return next();
    const snapshot = captureModelInput(options);
    return (async function* () {
      try {
        await inputs.save(snapshot);
      } catch {
        ctx.logger.warn("prompt-studio: complete input could not be persisted; retained in memory");
      }
      yield* rewriteRequest(catalog, options, next);
    })();
  });
  ctx.on("session/created", (session) => {
    try {
      appendInjectionTurn(session, [...bindings.supplements.values()]);
    } catch (error) {
      ctx.logger.warn("prompt-studio: injection seed turn failed");
      ctx.logger.warn(error);
    }
  }, { prepend: true });
  installRoutes(ctx, catalog);
  installInputRoute(ctx, catalog, inputs);
  const initialComponents = config.components.get();
  validatePromptComponents(initialComponents);
  pipeline.replace(initialComponents);
  ctx.on("settings/document-updated", (namespace) => {
    if (namespace !== PROMPT_STUDIO_SETTINGS_NAMESPACE) return;
    const next = settingsSnapshot(ctx).value;
    pipeline.replace(next.components);
  });
  await ctx.systemPrompt.assemble();
}
export {
  Config,
  DEFAULT_SUPPLEMENT_ORDER,
  PROMPT_STUDIO_NAMESPACE,
  PROMPT_STUDIO_RESOURCE_PATH,
  PROMPT_STUDIO_SETTINGS_NAMESPACE,
  PROMPT_STUDIO_SETTINGS_PATH,
  PROMPT_STUDIO_STATE_PATH,
  PROMPT_STUDIO_VIEW_ORDER,
  apply,
  buildDraftSystemComponents,
  inject,
  isNativeOverride,
  name,
  nextOverrideId,
  nextSupplementId,
  renderSupplementBoundary,
  renderSystemPreview,
  studioConfigSchema,
  validatePromptComponents
};
