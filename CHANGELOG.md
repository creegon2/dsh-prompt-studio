# Changelog

## 0.5.1

- 修复：会话中途工具列表有变化时（MCP 连上、插件启停等），dsh 0.2.x 会在请求里插一条 `developer` 角色的消息（source `tool-registry`，内容是 `tool-addition` / `tool-removal`）。Prompt Studio 把它当作注入上下文捕获，但前端只认 system / user / assistant 三种角色，整个面板报 `prompt-studio captured catalog row N has an invalid shape`。捕获行是只读的，现在接受任何角色；消息缺 `source` 时也不再抛错。
- Fix: dsh 0.2.x adds a `developer` message (`tool-registry` source) when the tool set changes mid-session; the captured-context decoder rejected that role and the whole panel failed with `captured catalog row N has an invalid shape`. Read-only captured rows now accept any role.

## 0.5.0 (fork of Moeblack/dsh-prompt-studio 0.4.0)

### dsh 0.2.x 适配 / dsh 0.2.x compatibility

- 设置改为插件 Config（`components` 为 volatile），通过 `settings/document-updated` 监听变更；保存时只替换 `components`，保留其他设置项。
- 读取会话事件改用 `Session.snapshotEvents()`。
- 前端注入面 `@deepseek-ai/dsh-client-runtime` 换成 `@deepseek-ai/dsh-client-ui-settings`。
- 预览按会话分别保存（`?sessionId=`），用当前会话的 scope 组装，其他会话不会覆盖显示；用 dsh 官方 `renderPrompt` 渲染 `{{model}}` 等变量。
- 覆盖段在原生段落原来的位置替换，不再整体挪到前面；未修改的段落保持不变。

### 完整模型输入 / Complete model input

- 新的默认视图：全部消息（按顺序）、System、工具定义（完整 description 和参数 schema）、注入上下文、完整 JSON；可复制、导出。
- 在 `llm/stream` 入口复制调用的逻辑参数（不修改请求，不采集 API key 和鉴权头）；每个会话保留最近一次，存到 `$DSH_HOME/prompt-studio/requests/`，重启后可读。
- 没有捕获记录的旧会话，用 dsh 的 `Session.create` / `deriveMessages` / `requestHeader` / `toolHistory` 从日志重建最后一次请求，界面标注「日志重建」。
- 读取接口 `/api/prompt-studio/input` 复用 dsh 已登录的浏览器 API。

### 模板变量 / Template variables

- Studio 段落里没注册的 `{{名字}}` 原样保留并标为不插值，不再让整份提示词组装抛出 `unknown prompt variable`；原生段落仍走 dsh 的严格检查。预览和请求共用同一套规则，顺带修掉 `{{constructor}}` 这类名字在预览里读到对象原型属性的问题。
- 新增可选设置 `userName`：非空时注册 `{{user}}`，并把 Studio 段落里的 `<user>`（不分大小写）当作它的别名一起替换；默认留空，两者原样保留。

### 构建 / Build

- `scripts/build.mjs` 改用 esbuild，不再需要 dsh 源码树；`@deepseek-ai/*` 保留为包名导入，声明为 `peerDependencies`，由加载插件的 dsh 提供。
- 不再附带过期的 `client.js.map`。
