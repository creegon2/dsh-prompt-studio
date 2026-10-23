# dsh-prompt-studio

Prompt Studio 的 DeepSeek Harness 插件分发形态。插件在对话页注册 **Prompt Studio** 标签页，以同一组件列表展示运行时原生提示词和用户补充，并提供编辑、原生覆盖与完整请求预览。

> **这是 [Moeblack/dsh-prompt-studio](https://github.com/Moeblack/dsh-prompt-studio) 的分叉（0.5.0）**，在原版 0.4.0 上：
>
> - 适配 dsh 0.2.x（在 0.2.1-rc.2 上实测）：设置改走插件 Config、会话事件改用 `snapshotEvents()`、前端注入改为 `@deepseek-ai/dsh-client-ui-settings`。
> - 新增 **完整模型输入** 视图：按真实顺序查看一次请求的全部消息、system、全部工具定义（完整说明和参数 schema）、注入上下文和整份 JSON，可复制、导出。
> - Studio 段落里写了没注册的 `{{变量}}`（比如酒馆卡片常见的 `{{user}}`）时原样保留，不再让整份提示词组装报错；可选设置 `userName` 让 `{{user}}` 和 `<user>` 替换成指定称呼。
> - 构建不再需要 dsh 源码树，`@deepseek-ai/*` 由运行中的 dsh 提供（peerDependencies）。
>
> 改动明细见 [CHANGELOG.md](CHANGELOG.md)。安装：`dsh plugin --profile web add github:creegon2/dsh-prompt-studio`，然后重启 `dsh web`。
>
> *A fork of Moeblack/dsh-prompt-studio 0.4.0 for dsh 0.2.x: adds a complete model-input inspector (ordered messages, system, full tool schemas, injected context, JSON export), keeps unregistered `{{placeholders}}` in Studio sections literal instead of failing prompt assembly, adds an optional `userName` for `{{user}}` / `<user>`, and builds without a dsh source checkout.*

## 完整模型输入

Prompt Studio 标签页默认打开 **完整模型输入**：

- **全部消息**：本次请求实际交给模型的消息，按顺序列出，每条可展开；**System**：组装好的 system；**工具定义**：每个工具完整的 description 和嵌套参数 schema；**注入上下文**：各插件注入的非对话消息；**完整 JSON**：整份请求。可以复制、导出 JSON，不截断。
- 数据来源：插件在 `llm/stream` 入口复制这次调用的逻辑参数（消息、system、工具、模型等），**不修改请求，不采集 API key 和 HTTP 鉴权头**。这是插件看到的逻辑输入，不等于适配器最终发出的 HTTP 报文；请求失败（比如 key 无效）也照样能抓到。
- 每个会话只保留最近一次请求，存在本机 `$DSH_HOME/prompt-studio/requests/`（默认 `~/.dsh/prompt-studio/requests/`），重启后还能看。**里面是完整的对话内容，分享截图或 JSON 前注意隐私。**
- 装插件之前的旧会话没有捕获记录，会用 dsh 自己的会话折叠逻辑从日志重建最后一次请求，并在界面上标注「日志重建」。
- 读完整输入的接口 `/api/prompt-studio/input` 走 dsh 已登录的浏览器 API，未登录返回 401。
- **当前配置（预览）** 只展示当下组装出的 system 和工具，不冒充包含动态上下文的真实请求；**System 编辑器** 就是原版的按段覆盖、补充编辑。

## 组件模型

每个编排项使用同一结构：

```ts
interface PromptComponent {
  id: string
  kind: 'native' | 'supplement'
  role: 'system' | 'user' | 'assistant'
  position?: 'after_system' | 'anchored' | 'tail'
  order: number
  enabled: boolean
  template: string
  origin?: string
}
```

这些字段分别描述不同维度，不以 `kind` 代替角色或用途：

- `kind` 只区分来源：`native` 是 Host 在运行时发现的只读组件；`supplement` 是用户可编排并持久化的补充组件。
- `role` 决定内容归宿：
  - `system` 一律注册为有序 system section，最终与原生 sections 合并到全局唯一的 `system` 字段；此时不得设置 `position`；
  - `user`、`assistant` 进入消息序列，必须设置 `position`。
- `position` 只描述 user/assistant 消息所处的间隙：
  - `after_system`：全局 system 字段之后、第一条原生会话消息之前；
  - `anchored`：最后一条真实用户消息之后，找不到锚点时跳过；
  - `tail`：原生消息序列末尾。

> `anchored` 与 `tail` 的区别：简单对话中最后一条消息往往就是用户输入，两者重叠；但存在工具调用流（user → tool_call → tool_result → assistant）时完全不同——`anchored` 插在用户输入之后、工具调用流之前，`tail` 插在整个序列最末尾（工具结果与助手回复之后）。需要紧贴用户问题补充指令用 `anchored`，需要模型读完完整上下文再看到的内容用 `tail`。
- `order` 有两种与归宿对应的含义：
  - system 组件的 `order` 是 system section 的全局混排层级，和原生 sections 一起升序排列；约定 `-100` 是身份区、`0` 是 persona、`100–199` 是工具区，其他负值也在 persona 之前；
  - user/assistant 组件的 `order` 只在同一个 `position` 间隙内排序，不参与跨间隙比较。
- `origin` 只用于覆盖。补充组件未设置 `origin` 时是普通注入；设置为某个原生组件 id 时，同一个补充组件即覆盖该原生组件，不存在单独的覆盖 kind。

同一消息间隙的补充组件按 `(order, 声明顺序)` 排列。system sections 由 Host 依 `order` 与原生 sections 全局混排。

## 内容合并

所有 system sections 最终渲染为同一个 `system` 字符串，补充内容以纯文本直接并入，不加任何包装标记。

user/assistant 补充先进入选定间隙。若补充组与间隙左侧或右侧的相邻原生消息 `role` 相同，补充内容会按先后关系合并进该原生消息的 `content`；若角色不同，则在该间隙创建新消息。相邻且同角色的补充也合并为一条消息。

## 原生覆盖

覆盖仍使用有序 marker section 和 `system-prompt/assemble` waterfall，不依赖静态原生目录：

1. `origin` 指向当前组装中存在的原生组件时，waterfall 移除原始组件。
2. 覆盖组件启用时，其替换文本按自身 `role` 归宿：system 覆盖保留 marker 的全局 `order` 并进入唯一 system 字段；user/assistant 覆盖按 `position` 进入消息间隙。
3. 覆盖组件设为 `enabled=false` 时只移除原始组件，相当于关闭该原生组件。
4. `origin` 在本次组装中不存在时，不会凭空生成替换内容。

## 运行时组装

配置集合由 `ComponentPipeline` 激活。每次设置变更先调用旧组合效果的 disposer，再把新集合施加为一个 Cordis 生成器效果；marker、覆盖映射与补充消息映射分别返回原子逆，组合逆由 `ctx.effect()` 按结构生成。

原生目录在运行时动态发现。插件监听 `system-prompt/change` 并重新执行真实 `systemPrompt.assemble()`；waterfall 在覆盖前捕获原生 name、text 与组装次序，在覆盖后捕获实际 system 槽序列。浏览器通过同源 `GET /prompt-studio/state` 读取该单值快照。

system 补充直接通过 `systemPrompt.section()` 参与真实组装，不进入消息计划。user/assistant 补充在会话创建时折叠为一条种子回合（turn 0），经 `session/created` 接缝写入会话日志：用户侧内容合并为一条带普通 `user` 来源的消息，助手侧内容合并为一条带插件来源的消息，位于智能体第一个真实回合之前。消息补充因此成为会话历史的一部分，随会话重建与继续保留。

## 自动捕获注入上下文

请求发出前，插件扫描完整消息序列，自动识别所有「非对话」消息——即生产者注入的上下文（`MessageSource.kind` 既不是 `user`/`model`/`tool`，也不是本插件自己的消息）——并纳入 Prompt Studio 视野，无需预知注入者是谁。任何插件将来注入的新上下文都会自动出现，不需要为它单独加桥。

捕获按消息来源分类（`form`：instructions / catalog / snapshot / notice / relay / recall）。workspace-context 注入的指令（AGENTS.md 基线及其动态增量）会进一步展开为资源条目：每个文件显示路径、动作（set/replace/remove）与内容摘要，`remove` 之外的资源可打开编辑。编辑通过资源读写接口写回文件系统，写回带版本冲突检测——文件在捕获后被修改时会拒绝覆盖并返回冲突，避免与 workspace-context 自身的状态协调（版本缓存、reconcile、字节预算）打架。

捕获是请求级快照：仅当会话发生过模型请求时，面板中才出现捕获条目。

## 模板变量

system 组件模板支持 `{{user_input}}` 引用，即当前会话最后一条真实用户输入。该值在每次组装时从 `AssembleContext.agent` 读取，不是保存时快照。

Studio 自己的段落（覆盖段和补充段）里，已注册的变量（`{{model}}`、`{{provider}}`、`{{user_input}}` 等）照常替换；**没注册的 `{{名字}}` 原样保留**，不会像 dsh 原生段落那样让整份提示词组装报错（原生段落仍走 dsh 的严格检查）。预览和真实请求用同一套规则。

可选设置 `userName`：设了之后，Studio 段落里的 `{{user}}` 和酒馆（SillyTavern）式的 `<user>`（不分大小写）都替换成这个称呼；留空（默认）则两者都原样保留。改后重启 dsh 生效：

```yaml
# profile 的 cordis.patch.yml
- id: prompt-studio
  config:
    userName: 主人
```

## 设置

设置持久化在 profile 的 `cordis.patch.yml` 里插件自己那一条（编辑器保存时写入），只存用户补充组件和可选的 `userName`：

```yaml
- id: prompt-studio
  config:
    components:
    - id: supplement:identity
      kind: supplement
      role: system
      order: -200
      enabled: true
      template: 你是一个严谨的工程助手。
    - id: supplement:message
      kind: supplement
      role: user
      position: tail
      order: 100
      enabled: true
      template: 请先复述当前目标。
```

运行时原生组件不写入设置。

## 使用

1. 打开任意对话，选择 **Prompt Studio** 标签页。
2. 选择 **新增补充**，分别编辑标识、角色、顺序、可选覆盖目标与模板；只有 user/assistant 角色显示消息间隙选择器。
3. 如需覆盖原生组件，也可在对应原生行选择 **创建覆盖**；生成的仍是 `kind=supplement` 组件，只是带有 `origin`。
4. 在 **完整预览** 中检查合并后的完整 system 内容及各消息间隙的补充内容。模型内容预览不插入 `[位置 · role · id]` 一类展示标签，补充内容以纯文本直接注入。
5. 选择 **保存更改**。设置保存后立即撤销旧组合并施加新组合。

## 安装与启用

Prompt Studio 以**组合包（bundle）**分发：`package.json` 的 `dsh.bundle.patch` 指向 `cordis.patch.yml`，`dsh.client` 声明浏览器端注入面。仓库里已带构建好的 `index.mjs` 和 `client.js`，直接安装进一个 profile：

```sh
dsh plugin --profile web add github:creegon2/dsh-prompt-studio
dsh --profile web --dump-config   # 应能看到 "# == dsh-prompt-studio" 层
dsh web                           # 或 dsh --profile web
```

本地改过代码的话，构建后用路径安装：`dsh plugin --profile web add /path/to/dsh-prompt-studio`。

`dsh plugin --profile <name> add <path>` 会把包链接进 profile 并把包名追加进 `dsh.profile.bundles`。已安装的 bundle 通过 `dsh plugin --profile <name> remove dsh-prompt-studio` 移除。命令行与已经运行的 Web 进程不共享内存，因此替换插件产物后需重启 `dsh web` 并刷新浏览器。

## 构建

```sh
npm install --legacy-peer-deps   # 只装 esbuild；@deepseek-ai/* 由运行中的 dsh 提供，不用装
npm run build
```

`scripts/build.mjs` 用 esbuild 生成服务端 ESM 和浏览器端 bundle，写入插件根目录：

- `index.mjs`
- `client.js`

`@deepseek-ai/*` 一律保留为包名导入（`peerDependencies`），由加载插件的 dsh 提供，产物里不含任何本机路径。原版依赖 dsh 源码树的类型检查和 vitest 测试仍在 `scripts/test.mjs`（`DSH_ROOT=/path/to/dsh npm test`）。

## 文件

| 文件 | 作用 |
|---|---|
| `package.json` | 包名（唯一权威 id）、`dsh.bundle.patch` 与 `dsh.client` 声明 |
| `cordis.patch.yml` | 组合层：把包名插入 profile 的 patch 列表 |
| `src/index.ts` | 效果管线、动态目录、原生覆盖与种子回合注入 |
| `src/shared.ts` | 二分组件模型、校验、覆盖判定与预览函数 |
| `src/config.ts` | settings schema：`components` 和可选的 `userName` |
| `src/input.ts` | 完整模型输入：在 `llm/stream` 捕获、本机持久化、旧会话日志重建 |
| `src/client/` | 统一列表编辑器、完整模型输入视图、运行时目录读取与设置保存 |
| `scripts/build.mjs` | esbuild 双端构建 |

## 已知前提

- 设置走插件自己的 Config（命名空间 `prompt-studio`），编辑器保存时只替换 `components`，其他设置项保留。
- `/prompt-studio/*` HTTP 端点注册在 `webServer` 服务上，仅在 Web 组合下可用；无 Web 时插件仍可正常加载，只是不提供 HTTP 端点与浏览器标签页。
