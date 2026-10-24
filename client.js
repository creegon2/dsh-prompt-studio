window.__ModuleLoader__.load({id:'dsh-prompt-studio',factory:(require)=>{
var module={exports:{}};var exports=module.exports;
const styleKey='dsh-prompt-studio';document.querySelector('style[data-plugin-css="'+styleKey+'"]')?.remove();const style=document.createElement('style');style.dataset.pluginCss=styleKey;style.textContent="/* src/client/PromptStudioView.module.css */\n.PromptStudioView_surface {\n  height: 100%;\n  min-height: 0;\n  display: flex;\n  flex-direction: column;\n  color: var(--dsw-alias-label-primary);\n  background: var(--dsw-alias-bg-layer-1);\n}\n.PromptStudioView_pageTabs {\n  display: flex;\n  flex: none;\n  gap: 6px;\n  padding: 10px 24px;\n  border-bottom: 1px solid var(--dsw-alias-border-l2);\n}\n.PromptStudioView_pageBody {\n  flex: 1;\n  min-height: 0;\n}\n.PromptStudioView_pageBody[hidden] {\n  display: none;\n}\n.PromptStudioView_inputRoot {\n  box-sizing: border-box;\n  height: 100%;\n  overflow: auto;\n  padding: 24px;\n}\n.PromptStudioView_inputPanel {\n  max-width: 1480px;\n  margin: auto;\n}\n.PromptStudioView_inputToolbar {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 14px;\n  margin-bottom: 12px;\n}\n.PromptStudioView_inputToolbar label {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.PromptStudioView_inputMeta {\n  font-size: 12px;\n  color: var(--dsw-alias-label-tertiary);\n  overflow-wrap: anywhere;\n}\n.PromptStudioView_inputNotice {\n  margin: 8px 0;\n  font-size: 13px;\n  line-height: 1.7;\n}\n.PromptStudioView_inputCategories {\n  display: flex;\n  gap: 4px;\n  flex-wrap: wrap;\n  margin: 20px 0 12px;\n  border-bottom: 1px solid var(--dsw-alias-border-l2);\n  padding-bottom: 10px;\n}\n.PromptStudioView_categoryButton,\n.PromptStudioView_categoryActive {\n  border: 0;\n  padding: 7px 12px;\n  border-radius: 7px;\n  font: inherit;\n  font-size: 13px;\n  cursor: pointer;\n  color: var(--dsw-alias-label-secondary);\n  background: transparent;\n}\n.PromptStudioView_categoryActive {\n  color: var(--dsw-alias-label-primary);\n  background: var(--dsw-alias-interactive-bg-hover);\n  box-shadow: inset 0 -2px var(--dsw-alias-label-primary);\n}\n.PromptStudioView_categoryButton:focus-visible,\n.PromptStudioView_categoryActive:focus-visible,\n.PromptStudioView_inputEntry summary:focus-visible {\n  outline: 2px solid var(--dsw-alias-border-l3);\n  outline-offset: 2px;\n}\n.PromptStudioView_inputEntry {\n  border: 1px solid var(--dsw-alias-border-l2);\n  border-radius: 8px;\n  margin-bottom: 10px;\n  padding: 12px 14px;\n}\n.PromptStudioView_inputEntry > summary {\n  cursor: pointer;\n  font-size: 13px;\n  line-height: 24px;\n  overflow-wrap: anywhere;\n}\n.PromptStudioView_inputEntry > summary > span,\n.PromptStudioView_inputEntry > summary > strong {\n  margin-right: 12px;\n}\n.PromptStudioView_entryNumber {\n  display: inline-block;\n  min-width: 24px;\n  font: 12px Consolas, monospace;\n  color: var(--dsw-alias-label-tertiary);\n}\n.PromptStudioView_inputText {\n  margin: 10px 0;\n  padding: 12px;\n  border-radius: 6px;\n  background: var(--dsw-alias-bg-layer-2);\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n  font:\n    12px/1.65 Consolas,\n    \"Microsoft YaHei\",\n    monospace;\n  tab-size: 2;\n}\n.PromptStudioView_blockLabel {\n  display: block;\n  margin-top: 10px;\n  font-size: 11px;\n  color: var(--dsw-alias-label-tertiary);\n}\n@media (max-width: 700px) {\n  .PromptStudioView_inputRoot {\n    padding: 14px;\n  }\n  .PromptStudioView_inputRoot .PromptStudioView_pageHeader {\n    flex-direction: column;\n    gap: 12px;\n  }\n  .PromptStudioView_pageTabs {\n    padding: 8px 14px;\n  }\n}\n.PromptStudioView_root {\n  box-sizing: border-box;\n  width: 100%;\n  height: 100%;\n  min-height: 0;\n  overflow: auto;\n  padding: 24px;\n  color: var(--dsw-alias-label-primary);\n  background: var(--dsw-alias-bg-layer-1);\n}\n.PromptStudioView_pageHeader {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 20px;\n  max-width: 1480px;\n  margin: 0 auto 16px;\n}\n.PromptStudioView_title,\n.PromptStudioView_subtitle,\n.PromptStudioView_intro,\n.PromptStudioView_caption,\n.PromptStudioView_notice,\n.PromptStudioView_error,\n.PromptStudioView_empty,\n.PromptStudioView_excerpt,\n.PromptStudioView_emptyText,\n.PromptStudioView_origin,\n.PromptStudioView_builtinText {\n  margin: 0;\n}\n.PromptStudioView_title {\n  font-size: 22px;\n  line-height: 30px;\n  font-weight: 600;\n}\n.PromptStudioView_intro {\n  max-width: 760px;\n  margin-top: 4px;\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 14px;\n  line-height: 22px;\n}\n.PromptStudioView_headerActions {\n  display: flex;\n  flex: none;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  gap: 8px;\n}\n.PromptStudioView_primaryButton,\n.PromptStudioView_secondaryButton,\n.PromptStudioView_textButton,\n.PromptStudioView_dangerButton {\n  box-sizing: border-box;\n  border: 0;\n  font: inherit;\n  cursor: pointer;\n}\n.PromptStudioView_primaryButton,\n.PromptStudioView_secondaryButton {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  height: 36px;\n  padding: 0 14px;\n  border-radius: 18px;\n  font-size: 14px;\n  line-height: 22px;\n}\n.PromptStudioView_primaryButton {\n  color: var(--dsw-alias-label-primary-foreground);\n  background: var(--dsw-alias-button-primary-fill);\n}\n.PromptStudioView_primaryButton:hover:not(:disabled) {\n  background: var(--dsw-alias-button-primary-hover);\n}\n.PromptStudioView_secondaryButton {\n  border: 1px solid var(--dsw-alias-border-l2);\n  color: var(--dsw-alias-label-primary);\n  background: transparent;\n}\n.PromptStudioView_secondaryButton:hover:not(:disabled),\n.PromptStudioView_textButton:hover:not(:disabled) {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n.PromptStudioView_primaryButton:disabled,\n.PromptStudioView_secondaryButton:disabled,\n.PromptStudioView_textButton:disabled,\n.PromptStudioView_dangerButton:disabled {\n  cursor: default;\n  opacity: 0.4;\n}\n.PromptStudioView_primaryButton:focus-visible,\n.PromptStudioView_secondaryButton:focus-visible,\n.PromptStudioView_textButton:focus-visible,\n.PromptStudioView_dangerButton:focus-visible,\n.PromptStudioView_input:focus-visible,\n.PromptStudioView_orderInput:focus-visible,\n.PromptStudioView_select:focus-visible,\n.PromptStudioView_textarea:focus-visible,\n.PromptStudioView_builtinsSummary:focus-visible {\n  outline: none;\n  box-shadow: 0 0 0 2px var(--dsw-alias-border-l3);\n}\n.PromptStudioView_notice,\n.PromptStudioView_error {\n  max-width: 1480px;\n  margin: 0 auto 10px;\n  font-size: 12px;\n  line-height: 18px;\n}\n.PromptStudioView_notice {\n  color: var(--dsw-alias-state-warn-label);\n}\n.PromptStudioView_error {\n  color: var(--dsw-alias-state-error-primary);\n}\n.PromptStudioView_status {\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 12px;\n  width: 100%;\n  height: 100%;\n  padding: 24px;\n  color: var(--dsw-alias-label-secondary);\n  background: var(--dsw-alias-bg-layer-1);\n}\n.PromptStudioView_status .PromptStudioView_error {\n  margin: 0;\n}\n.PromptStudioView_columns {\n  display: grid;\n  grid-template-columns: minmax(440px, 1fr) minmax(400px, 1fr);\n  gap: 18px;\n  align-items: start;\n  max-width: 1480px;\n  margin: 0 auto;\n}\n.PromptStudioView_editorColumn,\n.PromptStudioView_previewColumn {\n  box-sizing: border-box;\n  min-width: 0;\n  border: 1px solid var(--dsw-alias-border-l2);\n  border-radius: 14px;\n  padding: 16px;\n}\n.PromptStudioView_previewColumn {\n  position: sticky;\n  top: 0;\n}\n.PromptStudioView_sectionHeading {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 12px;\n  margin-bottom: 14px;\n}\n.PromptStudioView_subtitle {\n  font-size: 16px;\n  line-height: 24px;\n  font-weight: 500;\n}\n.PromptStudioView_caption,\n.PromptStudioView_origin,\n.PromptStudioView_emptyText {\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 12px;\n  line-height: 18px;\n}\n.PromptStudioView_count,\n.PromptStudioView_orderBadge,\n.PromptStudioView_stateBadge,\n.PromptStudioView_kindBadge,\n.PromptStudioView_positionBadge,\n.PromptStudioView_roleBadge {\n  flex: none;\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 12px;\n  line-height: 18px;\n}\n.PromptStudioView_empty {\n  padding: 18px;\n  border-radius: 10px;\n  color: var(--dsw-alias-label-tertiary);\n  background: var(--dsw-alias-bg-module-platform);\n  font-size: 14px;\n  line-height: 22px;\n}\n.PromptStudioView_componentList,\n.PromptStudioView_userList,\n.PromptStudioView_builtinList {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n.PromptStudioView_componentCard,\n.PromptStudioView_userCard,\n.PromptStudioView_builtinCard {\n  box-sizing: border-box;\n  border: 1px solid var(--dsw-alias-border-l2);\n  border-radius: 10px;\n  padding: 12px;\n}\n.PromptStudioView_rowHeader {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  min-width: 0;\n}\n.PromptStudioView_enabledControl {\n  display: inline-flex;\n  flex: none;\n  align-items: center;\n  gap: 5px;\n  color: var(--dsw-alias-label-secondary);\n  font-size: 12px;\n  line-height: 18px;\n}\n.PromptStudioView_enabledControl input {\n  accent-color: var(--dsw-alias-brand-primary);\n}\n.PromptStudioView_sectionName {\n  min-width: 0;\n  overflow: hidden;\n  color: var(--dsw-alias-label-primary);\n  font-size: 14px;\n  line-height: 22px;\n  font-weight: 500;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.PromptStudioView_orderBadge {\n  margin-left: auto;\n}\n.PromptStudioView_kindBadge,\n.PromptStudioView_positionBadge,\n.PromptStudioView_roleBadge,\n.PromptStudioView_stateBadge {\n  padding: 1px 6px;\n  border-radius: 9px;\n  background: var(--dsw-alias-bg-module-platform);\n}\n.PromptStudioView_kindBadge {\n  color: var(--dsw-alias-label-secondary);\n}\n.PromptStudioView_textButton,\n.PromptStudioView_dangerButton {\n  flex: none;\n  height: 28px;\n  padding: 0 9px;\n  border-radius: 14px;\n  color: var(--dsw-alias-label-secondary);\n  background: transparent;\n  font-size: 12px;\n  line-height: 18px;\n}\n.PromptStudioView_dangerButton {\n  color: var(--dsw-alias-state-error-primary);\n}\n.PromptStudioView_dangerButton:hover:not(:disabled) {\n  background: var(--dsw-alias-interactive-bg-hover-danger);\n}\n.PromptStudioView_componentEditor,\n.PromptStudioView_sectionEditor {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 120px minmax(150px, 0.6fr);\n  gap: 10px;\n  margin-top: 12px;\n  padding: 12px;\n  border-radius: 10px;\n  background: var(--dsw-alias-bg-module-platform);\n}\n.PromptStudioView_field {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n.PromptStudioView_templateField,\n.PromptStudioView_textField {\n  grid-column: 1 / -1;\n}\n.PromptStudioView_builtinTextField {\n  grid-column: 1 / -1;\n}\n.PromptStudioView_fieldLabel {\n  color: var(--dsw-alias-label-secondary);\n  font-size: 12px;\n  line-height: 18px;\n  font-weight: 500;\n}\n.PromptStudioView_input,\n.PromptStudioView_orderInput,\n.PromptStudioView_select,\n.PromptStudioView_textarea {\n  box-sizing: border-box;\n  width: 100%;\n  border: 1px solid var(--dsw-alias-border-l2);\n  border-radius: 8px;\n  color: var(--dsw-alias-label-primary);\n  background: var(--dsw-alias-bg-layer-1);\n  font: inherit;\n  font-size: 13px;\n}\n.PromptStudioView_input,\n.PromptStudioView_orderInput,\n.PromptStudioView_select {\n  height: 32px;\n  padding: 0 9px;\n}\n.PromptStudioView_textarea {\n  min-height: 150px;\n  padding: 9px;\n  resize: vertical;\n  line-height: 20px;\n}\n.PromptStudioView_input:disabled,\n.PromptStudioView_orderInput:disabled,\n.PromptStudioView_select:disabled,\n.PromptStudioView_textarea:disabled {\n  cursor: default;\n  opacity: 0.6;\n}\n.PromptStudioView_excerpt,\n.PromptStudioView_builtinText {\n  margin-top: 9px;\n  color: var(--dsw-alias-label-secondary);\n  font-size: 12px;\n  line-height: 18px;\n  white-space: pre-wrap;\n}\n.PromptStudioView_excerpt {\n  display: -webkit-box;\n  overflow: hidden;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 3;\n}\n.PromptStudioView_capturedText,\n.PromptStudioView_sourceDetails pre {\n  margin: 9px 0 0;\n  color: var(--dsw-alias-label-secondary);\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    Consolas,\n    monospace;\n  font-size: 12px;\n  line-height: 19px;\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n}\n.PromptStudioView_sourceDetails {\n  margin-top: 9px;\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 12px;\n  line-height: 18px;\n}\n.PromptStudioView_sourceDetails summary {\n  width: fit-content;\n  cursor: pointer;\n}\n.PromptStudioView_resourceActions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin-top: 10px;\n}\n.PromptStudioView_readonlyResource,\n.PromptStudioView_readonlyNotice {\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 12px;\n  line-height: 18px;\n}\n.PromptStudioView_readonlyResource {\n  padding: 5px 9px;\n}\n.PromptStudioView_readonlyNotice {\n  margin: 8px 0 0;\n}\n.PromptStudioView_resourceEditor {\n  margin-top: 10px;\n  padding: 12px;\n  border-radius: 10px;\n  background: var(--dsw-alias-bg-module-platform);\n}\n.PromptStudioView_resourceEditorHeader,\n.PromptStudioView_resourceEditorFooter {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n}\n.PromptStudioView_resourceEditorHeader {\n  margin-bottom: 8px;\n  color: var(--dsw-alias-label-primary);\n  font-size: 13px;\n}\n.PromptStudioView_resourceEditorFooter {\n  align-items: flex-start;\n  margin-top: 8px;\n}\n.PromptStudioView_emptyText {\n  margin-top: 9px;\n}\n.PromptStudioView_builtins {\n  margin-top: 14px;\n  padding-top: 14px;\n  border-top: 1px solid var(--dsw-alias-border-l2);\n}\n.PromptStudioView_builtinsSummary {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  width: fit-content;\n  border-radius: 6px;\n  color: var(--dsw-alias-label-secondary);\n  cursor: pointer;\n  font-size: 14px;\n  line-height: 22px;\n  font-weight: 500;\n}\n.PromptStudioView_builtinsSummary .PromptStudioView_count {\n  margin-left: 4px;\n}\n.PromptStudioView_builtinList {\n  margin-top: 10px;\n}\n.PromptStudioView_builtinCard {\n  background: var(--dsw-alias-bg-module-platform);\n}\n.PromptStudioView_origin {\n  margin-top: 5px;\n}\n.PromptStudioView_assemblyOrder {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  max-height: 190px;\n  overflow: auto;\n  margin-bottom: 12px;\n  padding: 8px;\n  border-radius: 10px;\n  background: var(--dsw-alias-bg-module-platform);\n}\n.PromptStudioView_assemblyOrder,\n.PromptStudioView_preview {\n  --dsh-scrollbar-thumb: var(--dsw-alias-scrollbar-bg-l2);\n  --dsh-scrollbar-thumb-hover: var(--dsw-alias-scrollbar-hover-l2);\n}\n.PromptStudioView_assemblyRow {\n  display: grid;\n  grid-template-columns: 24px minmax(0, 1fr) auto;\n  gap: 7px;\n  align-items: center;\n  min-height: 24px;\n  color: var(--dsw-alias-label-secondary);\n  font-size: 12px;\n  line-height: 18px;\n}\n.PromptStudioView_assemblyIndex,\n.PromptStudioView_assemblyOrderValue {\n  color: var(--dsw-alias-label-tertiary);\n}\n.PromptStudioView_preview {\n  box-sizing: border-box;\n  width: 100%;\n  max-height: calc(100vh - 380px);\n  min-height: 320px;\n  overflow: auto;\n  margin: 0;\n  padding: 14px;\n  border: 1px solid var(--dsw-alias-border-l2);\n  border-radius: 10px;\n  color: var(--dsw-alias-label-primary);\n  background: var(--dsw-alias-bg-module-platform);\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    Consolas,\n    monospace;\n  font-size: 12px;\n  line-height: 19px;\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n}\n@media (max-width: 1000px) {\n  .PromptStudioView_columns {\n    grid-template-columns: 1fr;\n  }\n  .PromptStudioView_previewColumn {\n    position: static;\n  }\n  .PromptStudioView_preview {\n    max-height: 520px;\n  }\n}\n@media (max-width: 680px) {\n  .PromptStudioView_root {\n    padding: 16px;\n  }\n  .PromptStudioView_pageHeader {\n    flex-direction: column;\n  }\n  .PromptStudioView_headerActions {\n    width: 100%;\n  }\n  .PromptStudioView_primaryButton,\n  .PromptStudioView_secondaryButton {\n    flex: 1;\n  }\n  .PromptStudioView_rowHeader {\n    flex-wrap: wrap;\n  }\n  .PromptStudioView_sectionName {\n    flex-basis: 100%;\n    order: -1;\n  }\n  .PromptStudioView_orderBadge {\n    margin-left: 0;\n  }\n  .PromptStudioView_componentEditor,\n  .PromptStudioView_sectionEditor {\n    grid-template-columns: 1fr;\n  }\n  .PromptStudioView_templateField,\n  .PromptStudioView_textField {\n    grid-column: auto;\n  }\n  .PromptStudioView_builtinTextField {\n    grid-column: auto;\n  }\n}\n.PromptStudioView_previewSystem {\n  margin: 0;\n  padding: 0;\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n}\n.PromptStudioView_previewSupplement {\n  margin: 8px 0 0;\n  padding: 8px 10px;\n  border: 1px solid var(--dsw-alias-border-l2);\n  border-left: 3px solid var(--dsw-alias-brand-primary);\n  border-radius: 6px;\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n.PromptStudioView_previewCaptured {\n  margin: 8px 0 0;\n  padding: 8px 10px;\n  border: 1px solid var(--dsw-alias-border-l2);\n  border-left: 3px solid var(--dsw-alias-state-warn-label);\n  border-radius: 6px;\n  background: var(--dsw-alias-bg-module-platform);\n}\n.PromptStudioView_previewSupplementTag {\n  display: inline-block;\n  margin-bottom: 4px;\n  padding: 0 6px;\n  border-radius: 4px;\n  font-size: 11px;\n  line-height: 18px;\n  color: var(--dsw-alias-label-secondary);\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n.PromptStudioView_previewSupplementText {\n  margin: 0;\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n}\n";document.head.appendChild(style);
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.ts
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);
var import_react3 = require("react");

// src/shared.ts
var PROMPT_STUDIO_NAMESPACE = "prompt-studio";
var PROMPT_STUDIO_STATE_PATH = "/prompt-studio/state";
var PROMPT_STUDIO_SETTINGS_PATH = "/prompt-studio/settings";
var PROMPT_STUDIO_RESOURCE_PATH = "/prompt-studio/resource";
var PROMPT_STUDIO_INPUT_PATH = "/api/prompt-studio/input";
var PROMPT_STUDIO_VIEW_ORDER = 20;
var DEFAULT_SUPPLEMENT_ORDER = 100;
var PROMPT_STUDIO_OVERRIDE_MARKER_PREFIX = "prompt-studio:override-marker:";
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

// src/client/store.ts
var import_dsh_client_store = require("@deepseek-ai/dsh-client-store");
function messageOf(error) {
  return error instanceof Error ? error.message : String(error);
}
function objectRow(value, label, index) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new TypeError(`prompt-studio ${label} row ${String(index + 1)} is not an object`);
  }
  return value;
}
var KINDS2 = /* @__PURE__ */ new Set(["native", "supplement"]);
var POSITIONS2 = /* @__PURE__ */ new Set(["after_system", "anchored", "tail"]);
var ROLES2 = /* @__PURE__ */ new Set(["system", "user", "assistant"]);
function decodeComponents(value, label, allowNative) {
  if (!Array.isArray(value)) throw new TypeError(`prompt-studio ${label} is not an array`);
  const components = value.map((entry, index) => {
    const candidate = objectRow(entry, label, index);
    const kind = candidate["kind"];
    const position = candidate["position"];
    const role = candidate["role"];
    if (typeof candidate["id"] !== "string" || typeof kind !== "string" || !KINDS2.has(kind) || typeof role !== "string" || !ROLES2.has(role) || (role === "system" ? position !== void 0 && position !== "after_system" : typeof position !== "string" || !POSITIONS2.has(position)) || typeof candidate["order"] !== "number" || typeof candidate["enabled"] !== "boolean" || typeof candidate["template"] !== "string" || candidate["origin"] !== void 0 && typeof candidate["origin"] !== "string" || candidate["blockType"] !== void 0 && candidate["blockType"] !== "text" && candidate["blockType"] !== "reasoning") {
      throw new TypeError(`prompt-studio ${label} row ${String(index + 1)} has an invalid shape`);
    }
    const component = {
      id: candidate["id"],
      kind,
      role,
      order: candidate["order"],
      enabled: candidate["enabled"],
      template: candidate["template"],
      ...candidate["origin"] === void 0 ? {} : { origin: candidate["origin"] },
      ...candidate["blockType"] === void 0 ? {} : { blockType: candidate["blockType"] }
    };
    if (component.role !== "system") component.position = position;
    return component;
  });
  validatePromptComponents(components, allowNative);
  return components;
}
function decodeConfig(value) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new TypeError("prompt-studio settings value is not an object");
  }
  const candidate = value;
  return { components: decodeComponents(candidate.components, "components", false) };
}
function decodeCapturedResources(value, row) {
  if (!Array.isArray(value)) throw new TypeError(`prompt-studio captured row ${String(row + 1)} resources is not an array`);
  return value.map((entry, index) => {
    const candidate = objectRow(entry, "captured resource", index);
    const action = candidate["action"];
    if (typeof candidate["id"] !== "string" || typeof candidate["path"] !== "string" || action !== "set" && action !== "replace" && action !== "remove" || candidate["digest"] !== void 0 && typeof candidate["digest"] !== "string" || typeof candidate["editable"] !== "boolean") {
      throw new TypeError(`prompt-studio captured row ${String(row + 1)} resource ${String(index + 1)} has an invalid shape`);
    }
    return {
      id: candidate["id"],
      path: candidate["path"],
      action,
      ...candidate["digest"] === void 0 ? {} : { digest: candidate["digest"] },
      editable: candidate["editable"]
    };
  });
}
function decodeCaptured(value) {
  if (!Array.isArray(value)) throw new TypeError("prompt-studio captured catalog is not an array");
  return value.map((entry, index) => {
    const candidate = objectRow(entry, "captured catalog", index);
    const source = candidate["source"];
    const role = candidate["role"];
    if (typeof candidate["id"] !== "string" || candidate["kind"] !== "captured" || typeof role !== "string" || role.length === 0 || typeof candidate["order"] !== "number" || !Number.isSafeInteger(candidate["order"]) || candidate["enabled"] !== true || typeof candidate["template"] !== "string" || typeof candidate["messageId"] !== "string" || typeof candidate["sourceKind"] !== "string" || typeof candidate["producer"] !== "string" || candidate["form"] !== void 0 && typeof candidate["form"] !== "string" || candidate["summary"] !== void 0 && typeof candidate["summary"] !== "string" || typeof source !== "object" || source === null || Array.isArray(source)) {
      throw new TypeError(`prompt-studio captured catalog row ${String(index + 1)} has an invalid shape`);
    }
    return {
      id: candidate["id"],
      kind: "captured",
      role,
      order: candidate["order"],
      enabled: true,
      template: candidate["template"],
      messageId: candidate["messageId"],
      sourceKind: candidate["sourceKind"],
      producer: candidate["producer"],
      ...candidate["form"] === void 0 ? {} : { form: candidate["form"] },
      ...candidate["summary"] === void 0 ? {} : { summary: candidate["summary"] },
      source: structuredClone(source),
      resources: decodeCapturedResources(candidate["resources"], index)
    };
  });
}
function decodeCatalog(value) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new TypeError("prompt-studio runtime catalog is not an object");
  }
  const candidate = value;
  if (typeof candidate.revision !== "number" || !Number.isSafeInteger(candidate.revision)) {
    throw new TypeError("prompt-studio runtime catalog has an invalid revision");
  }
  if (candidate.sessionId !== void 0 && typeof candidate.sessionId !== "string") {
    throw new TypeError("prompt-studio runtime catalog has an invalid session id");
  }
  const layout = objectRow(candidate.layout, "request layout", 0);
  if (!Number.isSafeInteger(layout["messageCount"]) || layout["messageCount"] < 0) {
    throw new TypeError("prompt-studio runtime catalog has an invalid message count");
  }
  if (layout["userAnchor"] !== null && (!Number.isSafeInteger(layout["userAnchor"]) || layout["userAnchor"] < 0)) {
    throw new TypeError("prompt-studio runtime catalog has an invalid user anchor");
  }
  return {
    revision: candidate.revision,
    variables: candidate.variables ?? {},
    native: decodeComponents(candidate.native, "native catalog", true),
    assembled: decodeComponents(candidate.assembled, "assembled catalog", true),
    ...candidate.sessionId === void 0 ? {} : { sessionId: candidate.sessionId },
    captured: decodeCaptured(candidate.captured),
    layout: {
      messageCount: layout["messageCount"],
      userAnchor: layout["userAnchor"]
    }
  };
}
function decodeSettings(value) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new TypeError("prompt-studio settings snapshot is not an object");
  }
  const candidate = value;
  if (typeof candidate["writable"] !== "boolean") {
    throw new TypeError("prompt-studio settings writable flag is invalid");
  }
  if (typeof candidate["revision"] !== "number" || !Number.isSafeInteger(candidate["revision"])) {
    throw new TypeError("prompt-studio settings revision is invalid");
  }
  return {
    writable: candidate["writable"],
    revision: candidate["revision"],
    value: decodeConfig(candidate["value"])
  };
}
function decodeResource(value) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new TypeError("prompt-studio captured resource is not an object");
  }
  const candidate = value;
  if (typeof candidate["path"] !== "string" || typeof candidate["content"] !== "string" || typeof candidate["digest"] !== "string") {
    throw new TypeError("prompt-studio captured resource has an invalid shape");
  }
  return {
    path: candidate["path"],
    content: candidate["content"],
    digest: candidate["digest"]
  };
}
async function responseValue(response) {
  const value = await response.json();
  if (response.ok) return value;
  const message = typeof value === "object" && value !== null && !Array.isArray(value) ? value["error"] : void 0;
  throw new Error(typeof message === "string" ? message : `\u8BF7\u6C42\u5931\u8D25\uFF1AHTTP ${String(response.status)}`);
}
async function loadSettings() {
  const response = await fetch(PROMPT_STUDIO_SETTINGS_PATH, {
    method: "GET",
    headers: { accept: "application/json" },
    cache: "no-store"
  });
  return decodeSettings(await responseValue(response));
}
async function loadCatalog(sessionId) {
  const path = sessionId === void 0 ? PROMPT_STUDIO_STATE_PATH : `${PROMPT_STUDIO_STATE_PATH}?sessionId=${encodeURIComponent(sessionId)}`;
  const response = await fetch(path, {
    method: "GET",
    headers: { accept: "application/json" },
    cache: "no-store"
  });
  return decodeCatalog(await responseValue(response));
}
async function loadInput(sessionId) {
  const query = sessionId === void 0 ? "" : `?sessionId=${encodeURIComponent(sessionId)}`;
  const response = await fetch(`${PROMPT_STUDIO_INPUT_PATH}${query}`, { cache: "no-store", headers: { accept: "application/json" } });
  const value = await responseValue(response);
  if (typeof value.current?.system !== "string" || !Array.isArray(value.current.tools) || value.latest !== null && !Array.isArray(value.latest?.request.messages)) {
    throw new Error("\u5B8C\u6574\u6A21\u578B\u8F93\u5165\u683C\u5F0F\u65E0\u6548\u3002");
  }
  return value;
}
var PromptStudioStore = class {
  constructor(sessionId) {
    this.sessionId = sessionId;
  }
  sessionId;
  /** Observable remote namespace state consumed by every mounted Prompt Studio view. */
  store = (0, import_dsh_client_store.createSnapshotStore)({
    status: "idle",
    error: null,
    writable: false,
    revision: 0,
    components: [],
    native: [],
    assembled: [],
    captured: [],
    capturedSessionId: null,
    messageCount: 0,
    userAnchor: null,
    catalogRevision: 0,
    variables: {},
    input: null
  });
  generation = 0;
  /** Refetch the namespace descriptor and runtime registry; newest request wins. */
  async load() {
    const generation = ++this.generation;
    this.store.update((state) => {
      state.status = "loading";
      state.error = null;
    });
    try {
      const [settings, input] = await Promise.all([
        loadSettings(),
        loadInput(this.sessionId)
      ]);
      const catalog = await loadCatalog(this.sessionId);
      if (generation !== this.generation) return;
      this.accept(settings, catalog, input);
    } catch (error) {
      if (generation !== this.generation) return;
      this.store.update((state) => {
        state.status = "error";
        state.error = messageOf(error);
      });
    }
  }
  /** Persist one unified component draft with stale-editor protection. */
  async save(components, expectedRevision) {
    validatePromptComponents(components);
    const generation = ++this.generation;
    const response = await fetch(PROMPT_STUDIO_SETTINGS_PATH, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        components: components.map((component) => ({ ...component })),
        expectedRevision
      })
    });
    const settings = decodeSettings(await responseValue(response));
    const catalog = await loadCatalog(this.sessionId);
    const input = await loadInput(this.sessionId);
    if (generation !== this.generation) return;
    this.accept(settings, catalog, input);
  }
  /** Load one raw file selected by a captured instructions-form context. */
  async loadResource(componentId, resourceId) {
    const sessionId = this.requireCapturedSession();
    const query = new URLSearchParams({ sessionId, componentId, resourceId });
    const response = await fetch(`${PROMPT_STUDIO_RESOURCE_PATH}?${query.toString()}`, {
      method: "GET",
      headers: { accept: "application/json" },
      cache: "no-store"
    });
    return decodeResource(await responseValue(response));
  }
  /** Write one captured source file; its producer remains responsible for next-step reconciliation. */
  async saveResource(componentId, resourceId, content, expectedDigest) {
    const sessionId = this.requireCapturedSession();
    const response = await fetch(PROMPT_STUDIO_RESOURCE_PATH, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({ sessionId, componentId, resourceId, content, expectedDigest })
    });
    return decodeResource(await responseValue(response));
  }
  requireCapturedSession() {
    const sessionId = this.store.getSnapshot().capturedSessionId;
    if (sessionId === null) throw new Error("\u5F53\u524D\u6CA1\u6709\u5DF2\u6355\u83B7\u8BF7\u6C42\u6240\u5C5E\u7684\u4F1A\u8BDD\u3002");
    return sessionId;
  }
  accept(settings, catalog, input) {
    this.store.update((state) => {
      state.status = "ready";
      state.error = null;
      state.writable = settings.writable;
      state.revision = settings.revision;
      state.components = settings.value.components;
      state.native = catalog.native;
      state.assembled = catalog.assembled;
      state.captured = catalog.captured;
      state.capturedSessionId = catalog.sessionId ?? null;
      state.messageCount = catalog.layout.messageCount;
      state.userAnchor = catalog.layout.userAnchor;
      state.catalogRevision = catalog.revision;
      state.variables = catalog.variables ?? {};
      state.input = input;
    });
  }
};
function refreshIfLoaded(controller) {
  if (controller.store.getSnapshot().status === "idle") return;
  void controller.load();
}

// src/client/PromptStudioView.tsx
var import_react2 = require("react");

// src/client/PromptStudioView.module.css
var PromptStudioView_default = {
  surface: "PromptStudioView_surface",
  pageTabs: "PromptStudioView_pageTabs",
  pageBody: "PromptStudioView_pageBody",
  inputRoot: "PromptStudioView_inputRoot",
  inputPanel: "PromptStudioView_inputPanel",
  inputToolbar: "PromptStudioView_inputToolbar",
  inputMeta: "PromptStudioView_inputMeta",
  inputNotice: "PromptStudioView_inputNotice",
  inputCategories: "PromptStudioView_inputCategories",
  categoryButton: "PromptStudioView_categoryButton",
  categoryActive: "PromptStudioView_categoryActive",
  inputEntry: "PromptStudioView_inputEntry",
  entryNumber: "PromptStudioView_entryNumber",
  inputText: "PromptStudioView_inputText",
  blockLabel: "PromptStudioView_blockLabel",
  pageHeader: "PromptStudioView_pageHeader",
  root: "PromptStudioView_root",
  title: "PromptStudioView_title",
  subtitle: "PromptStudioView_subtitle",
  intro: "PromptStudioView_intro",
  caption: "PromptStudioView_caption",
  notice: "PromptStudioView_notice",
  error: "PromptStudioView_error",
  empty: "PromptStudioView_empty",
  excerpt: "PromptStudioView_excerpt",
  emptyText: "PromptStudioView_emptyText",
  origin: "PromptStudioView_origin",
  builtinText: "PromptStudioView_builtinText",
  headerActions: "PromptStudioView_headerActions",
  primaryButton: "PromptStudioView_primaryButton",
  secondaryButton: "PromptStudioView_secondaryButton",
  textButton: "PromptStudioView_textButton",
  dangerButton: "PromptStudioView_dangerButton",
  input: "PromptStudioView_input",
  orderInput: "PromptStudioView_orderInput",
  select: "PromptStudioView_select",
  textarea: "PromptStudioView_textarea",
  builtinsSummary: "PromptStudioView_builtinsSummary",
  status: "PromptStudioView_status",
  columns: "PromptStudioView_columns",
  editorColumn: "PromptStudioView_editorColumn",
  previewColumn: "PromptStudioView_previewColumn",
  sectionHeading: "PromptStudioView_sectionHeading",
  count: "PromptStudioView_count",
  orderBadge: "PromptStudioView_orderBadge",
  stateBadge: "PromptStudioView_stateBadge",
  kindBadge: "PromptStudioView_kindBadge",
  positionBadge: "PromptStudioView_positionBadge",
  roleBadge: "PromptStudioView_roleBadge",
  componentList: "PromptStudioView_componentList",
  userList: "PromptStudioView_userList",
  builtinList: "PromptStudioView_builtinList",
  componentCard: "PromptStudioView_componentCard",
  userCard: "PromptStudioView_userCard",
  builtinCard: "PromptStudioView_builtinCard",
  rowHeader: "PromptStudioView_rowHeader",
  enabledControl: "PromptStudioView_enabledControl",
  sectionName: "PromptStudioView_sectionName",
  componentEditor: "PromptStudioView_componentEditor",
  sectionEditor: "PromptStudioView_sectionEditor",
  field: "PromptStudioView_field",
  templateField: "PromptStudioView_templateField",
  textField: "PromptStudioView_textField",
  builtinTextField: "PromptStudioView_builtinTextField",
  fieldLabel: "PromptStudioView_fieldLabel",
  capturedText: "PromptStudioView_capturedText",
  sourceDetails: "PromptStudioView_sourceDetails",
  resourceActions: "PromptStudioView_resourceActions",
  readonlyResource: "PromptStudioView_readonlyResource",
  readonlyNotice: "PromptStudioView_readonlyNotice",
  resourceEditor: "PromptStudioView_resourceEditor",
  resourceEditorHeader: "PromptStudioView_resourceEditorHeader",
  resourceEditorFooter: "PromptStudioView_resourceEditorFooter",
  builtins: "PromptStudioView_builtins",
  assemblyOrder: "PromptStudioView_assemblyOrder",
  preview: "PromptStudioView_preview",
  assemblyRow: "PromptStudioView_assemblyRow",
  assemblyIndex: "PromptStudioView_assemblyIndex",
  assemblyOrderValue: "PromptStudioView_assemblyOrderValue",
  previewSystem: "PromptStudioView_previewSystem",
  previewSupplement: "PromptStudioView_previewSupplement",
  previewCaptured: "PromptStudioView_previewCaptured",
  previewSupplementTag: "PromptStudioView_previewSupplementTag",
  previewSupplementText: "PromptStudioView_previewSupplementText"
};

// src/client/ModelInputView.tsx
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
function sourceOf(message) {
  const source = message["source"];
  return String(source?.["kind"] ?? message["role"] ?? "unknown");
}
function isContext(message) {
  return !["user", "model", "tool", "system-prompt"].includes(sourceOf(message));
}
function MessageBody({ message }) {
  const content = message["content"];
  if (!Array.isArray(content)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { className: PromptStudioView_default["inputText"], children: JSON.stringify(content, null, 2) ?? "\uFF08\u672A\u8BBE\u7F6E content\uFF09" });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: content.map((block, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: PromptStudioView_default["blockLabel"], children: String(block["type"] ?? "block") }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { className: PromptStudioView_default["inputText"], children: typeof block["text"] === "string" ? block["text"] : JSON.stringify(block, null, 2) })
  ] }, index)) });
}
function ModelInputView({ input, refresh }) {
  const [mode, setMode] = (0, import_react.useState)("latest");
  const [category, setCategory] = (0, import_react.useState)("messages");
  const [expanded, setExpanded] = (0, import_react.useState)(false);
  const [feedback, setFeedback] = (0, import_react.useState)("");
  if (input === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: PromptStudioView_default["notice"], children: "\u6B63\u5728\u8F7D\u5165\u5B8C\u6574\u6A21\u578B\u8F93\u5165\u2026" });
  const latest = input.latest;
  const current = mode === "current" || latest === null;
  const request = current ? {
    system: input.current.system,
    tools: input.current.tools,
    messages: []
  } : latest.request;
  const messages = request.messages;
  const tools = request.tools ?? [];
  const json = JSON.stringify(request, null, 2);
  const selected = messages.map((message, index) => ({ message, index })).filter(({ message }) => category === "messages" || (category === "system" ? message["role"] === "system" : isContext(message)));
  const systemCount = messages.filter((message) => message["role"] === "system").length + (typeof request["system"] === "string" ? 1 : 0);
  const contextCount = messages.filter(isContext).length;
  const categories = [
    ["messages", `\u5168\u90E8\u6D88\u606F \xB7 ${messages.length}`],
    ["system", `System \xB7 ${systemCount}`],
    ["tools", `\u5DE5\u5177\u5B9A\u4E49 \xB7 ${tools.length}`],
    ["context", `\u6CE8\u5165\u4E0A\u4E0B\u6587 \xB7 ${contextCount}`],
    ["json", "\u5B8C\u6574 JSON"]
  ];
  const exportInput = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify({
      source: current ? "current-preview" : latest.source,
      recordedAt: current ? input.current.assembledAt : latest.recordedAt,
      request
    }, null, 2)], { type: "application/json" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `dsh-model-input-${current ? "preview" : latest.sessionId}.json`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1e3);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: PromptStudioView_default["inputRoot"], children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: PromptStudioView_default["pageHeader"], children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: PromptStudioView_default["title"], children: "\u5B8C\u6574\u6A21\u578B\u8F93\u5165" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: PromptStudioView_default["intro"], children: "\u6309\u771F\u5B9E\u987A\u5E8F\u67E5\u770B\u6D88\u606F\u3001\u5B8C\u6574\u5DE5\u5177\u8BF4\u660E\u548C\u53C2\u6570\u3002\u8FD9\u91CC\u53EA\u8BFB\uFF1B\u4FEE\u6539 system \u8BF7\u5207\u5230\u201CSystem \u7F16\u8F91\u5668\u201D\u3002" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: PromptStudioView_default["headerActions"], children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: PromptStudioView_default["secondaryButton"], onClick: refresh, children: "\u5237\u65B0\u8F93\u5165" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: PromptStudioView_default["secondaryButton"], onClick: () => {
          void navigator.clipboard.writeText(json).then(() => setFeedback("\u5DF2\u590D\u5236\u5B8C\u6574 JSON")).catch(() => setFeedback("\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u4F7F\u7528\u5BFC\u51FA JSON"));
        }, children: "\u590D\u5236\u5B8C\u6574 JSON" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: PromptStudioView_default["secondaryButton"], onClick: exportInput, children: "\u5BFC\u51FA JSON" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: PromptStudioView_default["inputPanel"], children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: PromptStudioView_default["inputToolbar"], children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
          "\u67E5\u770B\u6765\u6E90 ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { className: PromptStudioView_default["select"], value: current ? "current" : "latest", onChange: (event) => {
            setMode(event.target.value);
            setFeedback("");
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", { value: "latest", disabled: latest === null, children: [
              "\u6700\u8FD1\u4E00\u6B21\u8BF7\u6C42",
              latest?.source === "reconstructed" ? "\uFF08\u65E5\u5FD7\u91CD\u5EFA\uFF09" : "\uFF08\u76F4\u63A5\u6355\u83B7\uFF09"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "current", children: "\u5F53\u524D\u914D\u7F6E\uFF08\u9884\u89C8\uFF09" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: PromptStudioView_default["inputMeta"], children: [
          json.length.toLocaleString(),
          " \u5B57\u7B26 \xB7 ",
          tools.length,
          " \u4E2A\u5DE5\u5177 \xB7 ",
          messages.length,
          " \u6761\u6D88\u606F"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: PromptStudioView_default["textButton"], onClick: () => setExpanded((value) => !value), children: expanded ? "\u6536\u8D77\u5168\u90E8" : "\u5C55\u5F00\u5168\u90E8" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: PromptStudioView_default["inputNotice"], children: current ? "\u5F53\u524D\u914D\u7F6E\u9884\u89C8\uFF1A\u5C55\u793A\u73B0\u5728\u7EC4\u88C5\u7684 system \u548C\u5DE5\u5177\u3002\u52A8\u6001\u4E0A\u4E0B\u6587\u3001\u5386\u53F2\u6D88\u606F\u4EE5\u771F\u5B9E\u8BF7\u6C42\u4E3A\u51C6\uFF0C\u4E0D\u5728\u8FD9\u91CC\u5192\u5145\u201C\u5B8C\u6574\u8BF7\u6C42\u201D\u3002" : latest.source === "captured" ? "\u76F4\u63A5\u6355\u83B7\uFF1A\u63D2\u4EF6\u5728 llm/stream \u5904\u89C2\u6D4B\u7684\u5B8C\u6574\u903B\u8F91\u53C2\u6570\u3002\u8868\u793A\u5DF2\u53D1\u8D77\u8C03\u7528\uFF0C\u4E0D\u4EE3\u8868\u4E0A\u6E38\u5DF2\u6210\u529F\u8FD4\u56DE\u3002" : `\u65E5\u5FD7\u91CD\u5EFA\uFF1A\u4F7F\u7528 dsh \u5B98\u65B9 Session \u6298\u53E0\u5668\u6062\u590D\u6700\u540E\u4E00\u6B21\u6A21\u578B\u56DE\u590D\u4E4B\u524D\u7684\u8F93\u5165\uFF08\u4E8B\u4EF6 #${latest.boundarySeq}\uFF09\u3002\u4E0D\u662F\u5F53\u65F6\u9010\u5B57\u6293\u5305\uFF0C\u8C03\u7528\u5C42\u989D\u5916\u5904\u7406\u53EF\u80FD\u672A\u8BB0\u5F55\u3002` }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: PromptStudioView_default["inputMeta"], children: [
        current ? "\u9884\u89C8\u65F6\u95F4" : latest.source === "captured" ? "\u6355\u83B7\u65F6\u95F4" : "\u91CD\u5EFA\u65F6\u95F4",
        "\uFF1A",
        current ? input.current.assembledAt : latest.recordedAt,
        current ? "" : ` \xB7 ${latest.sessionId}`,
        " \xB7 \u4E0D\u5305\u542B HTTP \u9274\u6743\u4FE1\u606F\uFF1B\u540E\u7EED\u63D2\u4EF6\u53CA\u4E0A\u6E38\u9002\u914D\u5668\u4ECD\u53EF\u80FD\u8F6C\u6362\u683C\u5F0F\u3002",
        latest === null ? " \u672C\u4F1A\u8BDD\u8FD8\u6CA1\u6709\u53EF\u6062\u590D\u7684\u6A21\u578B\u8BF7\u6C42\u3002" : ""
      ] }),
      input.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: PromptStudioView_default["error"], children: input.error }) : null,
      feedback ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { role: "status", children: feedback }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", { className: PromptStudioView_default["inputCategories"], "aria-label": "\u8F93\u5165\u7C7B\u522B", children: categories.map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: category === id ? PromptStudioView_default["categoryActive"] : PromptStudioView_default["categoryButton"], "aria-pressed": category === id, onClick: () => setCategory(id), children: label }, id)) }),
      category === "json" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { "aria-label": "\u5B8C\u6574\u8BF7\u6C42 JSON", className: PromptStudioView_default["inputText"], children: json }) : category === "tools" ? tools.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "\u6CA1\u6709\u5DE5\u5177\u5B9A\u4E49\u3002" }) : tools.map((tool, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { className: PromptStudioView_default["inputEntry"], open: expanded || index === 0, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: PromptStudioView_default["entryNumber"], children: index + 1 }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: String(tool["name"] ?? tool["function"]?.["name"] ?? "tool") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: PromptStudioView_default["inputMeta"], children: [
            "\u5B8C\u6574\u8BF4\u660E + \u53C2\u6570 schema \xB7 ",
            JSON.stringify(tool).length.toLocaleString(),
            " \u5B57\u7B26"
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { className: PromptStudioView_default["inputText"], children: JSON.stringify(tool, null, 2) })
      ] }, `${index}-${expanded}`)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        (category === "system" || category === "messages") && typeof request["system"] === "string" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { className: PromptStudioView_default["inputEntry"], open: true, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "system\uFF08\u72EC\u7ACB\u5B57\u6BB5\uFF09" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { className: PromptStudioView_default["inputText"], children: request["system"] })
        ] }) : null,
        selected.map(({ message, index }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { className: PromptStudioView_default["inputEntry"], open: expanded || index === 0, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: PromptStudioView_default["entryNumber"], children: index + 1 }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: String(message["role"]) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: sourceOf(message) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: PromptStudioView_default["inputMeta"], children: [
              JSON.stringify(message).length.toLocaleString(),
              " \u5B57\u7B26"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageBody, { message }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { className: PromptStudioView_default["sourceDetails"], children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "\u6B64\u6D88\u606F\u7684\u5B8C\u6574 JSON\uFF08\u542B\u6765\u6E90\u3001\u975E\u6587\u672C\u5757\u548C\u5176\u4ED6\u5B57\u6BB5\uFF09" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { className: PromptStudioView_default["inputText"], children: JSON.stringify(message, null, 2) })
          ] })
        ] }, `${index}-${expanded}`)),
        selected.length === 0 && category !== "system" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: current ? "\u5F53\u524D\u9884\u89C8\u4E0D\u542B\u4F1A\u8BDD\u6D88\u606F\uFF0C\u8BF7\u9009\u62E9\u6700\u8FD1\u4E00\u6B21\u8BF7\u6C42\u3002" : "\u6B64\u7C7B\u522B\u6CA1\u6709\u6D88\u606F\u3002" }) : null
      ] })
    ] })
  ] });
}

// src/client/PromptStudioView.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var POSITION_ORDER = {
  after_system: 0,
  anchored: 1,
  tail: 2
};
var KIND_LABEL = {
  native: "\u539F\u751F",
  supplement: "\u8865\u5145"
};
var POSITION_LABEL = {
  after_system: "\u7CFB\u7EDF\u540E",
  anchored: "\u6700\u540E\u7528\u6237\u8F93\u5165\u540E",
  tail: "\u8BF7\u6C42\u5C3E\u90E8"
};
var ROLE_LABEL = {
  system: "system",
  user: "user",
  assistant: "assistant"
};
function copyComponents(components) {
  return components.map((component) => ({ ...component }));
}
function messageOf2(error) {
  return error instanceof Error ? error.message : String(error);
}
function rowPlacement(row) {
  if (row.type === "captured") return 1;
  if (row.component.role === "system") return 0;
  return 2 + POSITION_ORDER[row.component.position ?? "tail"];
}
function compareRows(left, right) {
  const leftPlacement = rowPlacement(left);
  const rightPlacement = rowPlacement(right);
  return leftPlacement - rightPlacement || left.component.order - right.component.order;
}
function previewText(systemText, supplements, captured, userAnchor) {
  const blocks = [];
  if (systemText.length > 0) blocks.push({ kind: "system", text: systemText });
  const appendSupplements = (position) => {
    for (const component of supplements.filter((item) => item.position === position)) {
      blocks.push({ kind: "supplement", id: component.id, text: component.template });
    }
  };
  const appendCaptured = (items) => {
    for (const component of items) {
      blocks.push({
        kind: "captured",
        id: component.id,
        text: component.template,
        label: `${component.producer}${component.form === void 0 ? "" : ` \xB7 ${component.form}`} \xB7 \u6D88\u606F ${String(component.order + 1)}`
      });
    }
  };
  appendSupplements("after_system");
  const orderedCaptured = [...captured].sort((left, right) => left.order - right.order);
  if (userAnchor === null) {
    appendCaptured(orderedCaptured);
  } else {
    appendCaptured(orderedCaptured.filter((component) => component.order <= userAnchor));
    appendSupplements("anchored");
    appendCaptured(orderedCaptured.filter((component) => component.order > userAnchor));
  }
  appendSupplements("tail");
  return blocks;
}
function CapturedComponentCard({
  component,
  controller
}) {
  const [expanded, setExpanded] = (0, import_react2.useState)(false);
  const [loadingResource, setLoadingResource] = (0, import_react2.useState)(null);
  const [draft, setDraft] = (0, import_react2.useState)(null);
  const editResource = (resource) => {
    if (!resource.editable || loadingResource !== null) return;
    setLoadingResource(resource.id);
    setDraft(null);
    void controller.loadResource(component.id, resource.id).then((snapshot) => {
      setDraft({
        resource,
        content: snapshot.content,
        digest: snapshot.digest,
        saving: false,
        saved: false,
        error: null
      });
    }).catch((error) => {
      setDraft({ resource, content: "", digest: "", saving: false, saved: false, error: messageOf2(error) });
    }).finally(() => {
      setLoadingResource(null);
    });
  };
  const saveResource = () => {
    if (draft === null || draft.saving || draft.digest.length === 0) return;
    setDraft((current) => current === null ? null : { ...current, saving: true, saved: false, error: null });
    void controller.saveResource(component.id, draft.resource.id, draft.content, draft.digest).then((snapshot) => {
      setDraft((current) => current === null ? null : {
        ...current,
        content: snapshot.content,
        digest: snapshot.digest,
        saving: false,
        saved: true,
        error: null
      });
    }).catch((error) => {
      setDraft((current) => current === null ? null : { ...current, saving: false, saved: false, error: messageOf2(error) });
    });
  };
  const sourceLabel = `${component.producer} \xB7 kind=${component.sourceKind}${component.form === void 0 ? "" : ` \xB7 form=${component.form}`}`;
  const editable = component.resources.filter((resource) => resource.editable);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { className: PromptStudioView_default["componentCard"], "aria-label": `\u6355\u83B7\u4E0A\u4E0B\u6587 ${component.id}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: PromptStudioView_default["rowHeader"], children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: PromptStudioView_default["stateBadge"], children: "\u81EA\u52A8\u6355\u83B7" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: PromptStudioView_default["kindBadge"], children: "\u4E0A\u4E0B\u6587" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: PromptStudioView_default["sectionName"], children: sourceLabel }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: PromptStudioView_default["roleBadge"], children: component.role }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: PromptStudioView_default["orderBadge"], children: [
        "\u6D88\u606F\u4F4D\u7F6E ",
        String(component.order + 1)
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: PromptStudioView_default["textButton"], onClick: () => {
        setExpanded((value) => !value);
      }, children: expanded ? "\u6536\u8D77" : "\u67E5\u770B" })
    ] }),
    component.summary === void 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: PromptStudioView_default["origin"], children: component.summary }),
    expanded ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("pre", { className: PromptStudioView_default["capturedText"], children: component.template }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("details", { className: PromptStudioView_default["sourceDetails"], children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("summary", { children: "\u6765\u6E90\u5143\u6570\u636E" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("pre", { children: JSON.stringify(component.source, null, 2) })
      ] })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: PromptStudioView_default["excerpt"], children: component.template || "\uFF08\u7A7A\u5185\u5BB9\uFF09" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: PromptStudioView_default["resourceActions"], children: component.resources.map((resource) => resource.editable ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "button",
      {
        type: "button",
        className: PromptStudioView_default["textButton"],
        disabled: loadingResource !== null,
        onClick: () => {
          editResource(resource);
        },
        children: loadingResource === resource.id ? "\u6B63\u5728\u8BFB\u53D6\u2026" : `\u7F16\u8F91\u6587\u4EF6\uFF1A${resource.path}`
      },
      resource.id
    ) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: PromptStudioView_default["readonlyResource"], children: [
      resource.path,
      "\uFF08",
      resource.action === "remove" ? "\u5DF2\u79FB\u9664" : "\u53EA\u8BFB",
      "\uFF09"
    ] }, resource.id)) }),
    editable.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: PromptStudioView_default["readonlyNotice"], children: "\u53EA\u8BFB\u6355\u83B7\uFF1A\u6765\u6E90\u6CA1\u6709\u63D0\u4F9B\u53EF\u89E3\u6790\u7684\u6587\u4EF6\u53D8\u66F4\u3002" }) : null,
    draft === null ? null : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: PromptStudioView_default["resourceEditor"], "aria-label": `\u7F16\u8F91\u4E0A\u4E0B\u6587\u6587\u4EF6 ${draft.resource.path}`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: PromptStudioView_default["resourceEditorHeader"], children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: draft.resource.path }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: PromptStudioView_default["textButton"], onClick: () => {
          setDraft(null);
        }, children: "\u5173\u95ED" })
      ] }),
      draft.error === null ? null : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: PromptStudioView_default["error"], children: draft.error }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "textarea",
        {
          className: PromptStudioView_default["textarea"],
          value: draft.content,
          disabled: draft.digest.length === 0 || draft.saving,
          rows: 12,
          onChange: (event) => {
            setDraft((current) => current === null ? null : { ...current, content: event.target.value, saved: false });
          }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: PromptStudioView_default["resourceEditorFooter"], children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: PromptStudioView_default["caption"], children: draft.saved ? "\u5DF2\u5199\u56DE\uFF1B\u4E0B\u4E00\u8F6E\u8BF7\u6C42\u4ECD\u7531\u539F\u4E0A\u4E0B\u6587\u751F\u4EA7\u8005\u6309\u5176\u72B6\u6001\u673A\u534F\u8C03\u3002" : "\u4FDD\u5B58\u53EA\u4FEE\u6539\u6765\u6E90\u6587\u4EF6\uFF0C\u4E0D\u6539\u5199\u5DF2\u8FDB\u5165\u4F1A\u8BDD\u7684\u4E0A\u4E0B\u6587\u4E8B\u4EF6\u3002" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "button",
          {
            type: "button",
            className: PromptStudioView_default["primaryButton"],
            disabled: draft.digest.length === 0 || draft.saving,
            onClick: saveResource,
            children: draft.saving ? "\u6B63\u5728\u5199\u56DE\u2026" : "\u5199\u56DE\u6587\u4EF6"
          }
        )
      ] })
    ] })
  ] });
}
function PromptStudioView({ controller, useSnapshot, useSession }) {
  const requestVersion = useSession((snapshot) => `${snapshot.openState}:${snapshot.running ? "running" : "idle"}`);
  (0, import_react2.useEffect)(() => {
    void controller.load();
  }, [controller, requestVersion]);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(PromptStudioSurface, { controller, useSnapshot });
}
function PromptStudioSettingsSection({
  controller,
  useSnapshot
}) {
  (0, import_react2.useEffect)(() => {
    void controller.load();
  }, [controller]);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(PromptStudioSurface, { controller, useSnapshot });
}
function PromptStudioSurface({ controller, useSnapshot }) {
  const remote = useSnapshot((state) => state);
  const [page, setPage] = (0, import_react2.useState)("input");
  if (remote.status === "idle" || remote.status === "loading" && remote.native.length === 0) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: PromptStudioView_default["status"], children: "\u6B63\u5728\u8F7D\u5165 Prompt Studio\u2026" });
  }
  if (remote.status === "error") {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: PromptStudioView_default["status"], children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: PromptStudioView_default["error"], children: remote.error }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: PromptStudioView_default["secondaryButton"], onClick: () => {
        void controller.load();
      }, children: "\u91CD\u8BD5" })
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: PromptStudioView_default["surface"], children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("nav", { className: PromptStudioView_default["pageTabs"], "aria-label": "Prompt Studio \u9875\u9762", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: page === "input" ? PromptStudioView_default["categoryActive"] : PromptStudioView_default["categoryButton"], "aria-pressed": page === "input", onClick: () => setPage("input"), children: "\u5B8C\u6574\u6A21\u578B\u8F93\u5165" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: page === "editor" ? PromptStudioView_default["categoryActive"] : PromptStudioView_default["categoryButton"], "aria-pressed": page === "editor", onClick: () => setPage("editor"), children: "System \u7F16\u8F91\u5668" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: PromptStudioView_default["pageBody"], hidden: page !== "input", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ModelInputView, { input: remote.input, refresh: () => {
      void controller.load();
    } }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: PromptStudioView_default["pageBody"], hidden: page !== "editor", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(PromptStudioEditor, { controller, remote }) })
  ] });
}
function PromptStudioEditor({
  controller,
  remote
}) {
  const [draft, setDraft] = (0, import_react2.useState)(() => copyComponents(remote.components));
  const [dirty, setDirty] = (0, import_react2.useState)(false);
  const [editingIndex, setEditingIndex] = (0, import_react2.useState)(null);
  const [saving, setSaving] = (0, import_react2.useState)(false);
  const [saveError, setSaveError] = (0, import_react2.useState)(null);
  const lastRequestSystem = remote.captured.find((component) => component.role === "system" && component.sourceKind === "system-prompt");
  const capturedContext = (0, import_react2.useMemo)(() => remote.captured.filter((component) => component !== lastRequestSystem), [remote.captured, lastRequestSystem]);
  (0, import_react2.useEffect)(() => {
    setDraft(copyComponents(remote.components));
    setDirty(false);
    setSaving(false);
    setSaveError(null);
    setEditingIndex((index) => index !== null && index < remote.components.length ? index : null);
  }, [remote.catalogRevision, remote.components, remote.revision]);
  const rows = (0, import_react2.useMemo)(() => [
    ...remote.native.map((component) => ({ type: "native", component })),
    ...capturedContext.map((component) => ({ type: "captured", component })),
    ...draft.map((component, configuredIndex) => ({ type: "configured", component, configuredIndex }))
  ].sort(compareRows), [draft, capturedContext, remote.native]);
  const draftSystem = (0, import_react2.useMemo)(
    () => dirty ? buildDraftSystemComponents(remote.native, draft) : copyComponents(remote.assembled),
    [dirty, draft, remote.assembled, remote.native]
  );
  const requestSupplements = (0, import_react2.useMemo)(() => {
    const nativeIds = new Set(remote.native.map((component) => component.id));
    return draft.filter((component) => component.enabled && component.role !== "system" && (!isNativeOverride(component) || nativeIds.has(component.origin)));
  }, [draft, remote.native]);
  const orderedRequestSupplements = (0, import_react2.useMemo)(() => requestSupplements.map((component, declaration) => ({ component, declaration })).sort((left, right) => POSITION_ORDER[left.component.position ?? "tail"] - POSITION_ORDER[right.component.position ?? "tail"] || left.component.order - right.component.order || left.declaration - right.declaration).map((entry) => entry.component), [requestSupplements]);
  const systemContent = (0, import_react2.useMemo)(() => renderSystemPreview(draftSystem, dirty ? remote.variables : void 0), [draftSystem, dirty, remote.variables]);
  const preview = (0, import_react2.useMemo)(
    () => previewText(systemContent, orderedRequestSupplements, capturedContext, remote.userAnchor),
    [orderedRequestSupplements, capturedContext, remote.userAnchor, systemContent]
  );
  const changeComponent = (index, patch) => {
    setDraft((current) => current.map((component, position) => position === index ? { ...component, ...patch } : component));
    setDirty(true);
    setSaveError(null);
  };
  const changeOrigin = (index, origin) => {
    setDraft((current) => current.map((component, position) => {
      if (position !== index) return component;
      const next = { ...component };
      if (origin.length === 0) delete next.origin;
      else next.origin = origin;
      return next;
    }));
    setDirty(true);
    setSaveError(null);
  };
  const changeRole = (index, role) => {
    setDraft((current) => current.map((component, position) => {
      if (position !== index) return component;
      const next = { ...component, role };
      if (role === "system") delete next.position;
      else next.position ??= "after_system";
      if (role !== "assistant") delete next.blockType;
      return next;
    }));
    setDirty(true);
    setSaveError(null);
  };
  const addSupplement = () => {
    setDraft((current) => {
      const next = [...current, {
        id: nextSupplementId(current),
        kind: "supplement",
        position: "tail",
        role: "user",
        order: DEFAULT_SUPPLEMENT_ORDER,
        enabled: true,
        template: ""
      }];
      setEditingIndex(next.length - 1);
      return next;
    });
    setDirty(true);
    setSaveError(null);
  };
  const addOverride = (native) => {
    const existing = draft.findIndex((component) => isNativeOverride(component) && component.origin === native.id);
    if (existing >= 0) {
      setEditingIndex(existing);
      return;
    }
    setDraft((current) => {
      const next = [...current, {
        id: nextOverrideId(current, native.id),
        kind: "supplement",
        role: "system",
        order: native.order,
        enabled: true,
        template: native.template,
        origin: native.id
      }];
      setEditingIndex(next.length - 1);
      return next;
    });
    setDirty(true);
    setSaveError(null);
  };
  const removeComponent = (index) => {
    setDraft((current) => current.filter((_component, position) => position !== index));
    setEditingIndex((current) => {
      if (current === null || current === index) return null;
      return current > index ? current - 1 : current;
    });
    setDirty(true);
    setSaveError(null);
  };
  const save = () => {
    if (!dirty || saving || !remote.writable) return;
    setSaving(true);
    setSaveError(null);
    void controller.save(draft, remote.revision).catch((error) => {
      setSaveError(messageOf2(error));
    }).finally(() => {
      setSaving(false);
    });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: PromptStudioView_default["root"], children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: PromptStudioView_default["pageHeader"], children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h1", { className: PromptStudioView_default["title"], children: "Prompt Studio" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: PromptStudioView_default["intro"], children: "\u53F3\u4FA7\u9884\u89C8\u5F53\u524D System \u8349\u7A3F\uFF0C\u5386\u53F2\u6CE8\u5165\u4E0A\u4E0B\u6587\u4EC5\u4F9B\u53C2\u8003\uFF1B\u771F\u5B9E\u8F93\u5165\u8BF7\u770B\u201C\u5B8C\u6574\u6A21\u578B\u8F93\u5165\u201D\u3002\u5DE6\u4FA7\u521B\u5EFA\u9010\u6BB5\u8986\u76D6\uFF0C\u672A\u4FEE\u6539\u6BB5\u843D\u4FDD\u6301\u539F\u6837\u3002\u4FDD\u5B58\u5F71\u54CD web \u914D\u7F6E\u4E0B\u7684\u4F1A\u8BDD\u3002" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: PromptStudioView_default["headerActions"], children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: PromptStudioView_default["secondaryButton"], disabled: dirty || saving, onClick: () => {
          void controller.load();
        }, children: "\u5237\u65B0\u5168\u6587" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: PromptStudioView_default["secondaryButton"], disabled: !remote.writable, onClick: addSupplement, children: "\u65B0\u589E\u8865\u5145" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "button",
          {
            type: "button",
            className: PromptStudioView_default["primaryButton"],
            disabled: !dirty || saving || !remote.writable,
            onClick: save,
            children: saving ? "\u6B63\u5728\u4FDD\u5B58\u2026" : "\u4FDD\u5B58\u66F4\u6539"
          }
        )
      ] })
    ] }),
    !remote.writable ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: PromptStudioView_default["notice"], children: "\u5F53\u524D\u8BBE\u7F6E\u63D0\u4F9B\u65B9\u4E3A\u53EA\u8BFB\u3002" }) : null,
    remote.status === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: PromptStudioView_default["notice"], children: "\u6B63\u5728\u5237\u65B0\u8FD0\u884C\u65F6\u7EC4\u4EF6\u2026" }) : null,
    saveError !== null ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: PromptStudioView_default["error"], children: saveError }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: PromptStudioView_default["columns"], children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: PromptStudioView_default["editorColumn"], "aria-label": "\u7EDF\u4E00\u63D0\u793A\u8BCD\u7EC4\u4EF6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: PromptStudioView_default["sectionHeading"], children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { className: PromptStudioView_default["subtitle"], children: "\u7EC4\u4EF6" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: PromptStudioView_default["count"], children: String(rows.length) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("ol", { className: PromptStudioView_default["componentList"], children: rows.map((row) => {
          if (row.type === "captured") {
            return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(CapturedComponentCard, { component: row.component, controller }, row.component.id);
          }
          const { component } = row;
          const configuredIndex = row.type === "configured" ? row.configuredIndex : -1;
          const isNative = row.type === "native";
          const editing = !isNative && editingIndex === configuredIndex;
          const override = isNativeOverride(component);
          const overrideExists = isNative && draft.some((item) => isNativeOverride(item) && item.origin === component.id);
          return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("li", { className: PromptStudioView_default["componentCard"], children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: PromptStudioView_default["rowHeader"], children: [
              isNative ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: PromptStudioView_default["stateBadge"], children: "\u8FD0\u884C\u65F6" }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { className: PromptStudioView_default["enabledControl"], children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "input",
                  {
                    type: "checkbox",
                    checked: component.enabled,
                    disabled: !remote.writable,
                    onChange: (event) => {
                      changeComponent(configuredIndex, { enabled: event.target.checked });
                    }
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: component.enabled ? "\u542F\u7528" : override ? "\u5173\u95ED\u539F\u751F" : "\u505C\u7528" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: PromptStudioView_default["kindBadge"], children: KIND_LABEL[component.kind] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: PromptStudioView_default["sectionName"], children: component.id }),
              component.position === void 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: PromptStudioView_default["positionBadge"], children: POSITION_LABEL[component.position] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: PromptStudioView_default["roleBadge"], children: component.role }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: PromptStudioView_default["orderBadge"], children: [
                component.role === "system" ? "\u5C42\u7EA7" : "\u95F4\u9699\u5185\u987A\u5E8F",
                " ",
                String(component.order)
              ] }),
              isNative ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "button",
                {
                  type: "button",
                  className: PromptStudioView_default["textButton"],
                  disabled: !remote.writable,
                  onClick: () => {
                    addOverride(component);
                  },
                  children: overrideExists ? "\u7F16\u8F91\u8986\u76D6" : "\u521B\u5EFA\u8986\u76D6"
                }
              ) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "button",
                  {
                    type: "button",
                    className: PromptStudioView_default["textButton"],
                    onClick: () => {
                      setEditingIndex(editing ? null : configuredIndex);
                    },
                    children: editing ? "\u6536\u8D77" : "\u7F16\u8F91"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "button",
                  {
                    type: "button",
                    className: PromptStudioView_default["dangerButton"],
                    disabled: !remote.writable,
                    onClick: () => {
                      removeComponent(configuredIndex);
                    },
                    children: override ? "\u6062\u590D\u539F\u751F" : "\u5220\u9664"
                  }
                )
              ] })
            ] }),
            component.origin !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: PromptStudioView_default["origin"], children: [
              "\u8986\u76D6\u76EE\u6807\uFF1A",
              component.origin
            ] }) : null,
            editing ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: PromptStudioView_default["componentEditor"], children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { className: PromptStudioView_default["field"], children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: PromptStudioView_default["fieldLabel"], children: "\u6807\u8BC6" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "input",
                  {
                    className: PromptStudioView_default["input"],
                    value: component.id,
                    disabled: !remote.writable,
                    onChange: (event) => {
                      changeComponent(configuredIndex, { id: event.target.value });
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { className: PromptStudioView_default["field"], children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: PromptStudioView_default["fieldLabel"], children: component.role === "system" ? "\u7CFB\u7EDF\u5C42\u7EA7" : "\u95F4\u9699\u5185\u987A\u5E8F" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "input",
                  {
                    className: PromptStudioView_default["orderInput"],
                    type: "number",
                    value: component.order,
                    disabled: !remote.writable,
                    onChange: (event) => {
                      changeComponent(configuredIndex, { order: Number(event.target.value) });
                    }
                  }
                )
              ] }),
              component.role === "system" ? null : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { className: PromptStudioView_default["field"], children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: PromptStudioView_default["fieldLabel"], children: "\u6D88\u606F\u95F4\u9699" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "select",
                  {
                    className: PromptStudioView_default["select"],
                    value: component.position,
                    disabled: !remote.writable,
                    onChange: (event) => {
                      changeComponent(configuredIndex, { position: event.target.value });
                    },
                    children: Object.entries(POSITION_LABEL).map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value, children: label }, value))
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { className: PromptStudioView_default["field"], children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: PromptStudioView_default["fieldLabel"], children: "\u89D2\u8272" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "select",
                  {
                    className: PromptStudioView_default["select"],
                    value: component.role,
                    disabled: !remote.writable,
                    onChange: (event) => {
                      changeRole(configuredIndex, event.target.value);
                    },
                    children: Object.entries(ROLE_LABEL).map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value, children: label }, value))
                  }
                )
              ] }),
              component.role === "assistant" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { className: PromptStudioView_default["field"], children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: PromptStudioView_default["fieldLabel"], children: "\u5757\u7C7B\u578B" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                  "select",
                  {
                    className: PromptStudioView_default["select"],
                    value: component.blockType ?? "text",
                    disabled: !remote.writable,
                    onChange: (event) => {
                      changeComponent(configuredIndex, { blockType: event.target.value });
                    },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "text", children: "\u6587\u672C" }),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "reasoning", children: "\u601D\u8003" })
                    ]
                  }
                )
              ] }) : null,
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { className: PromptStudioView_default["field"], children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: PromptStudioView_default["fieldLabel"], children: "\u8986\u76D6\u76EE\u6807" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                  "select",
                  {
                    className: PromptStudioView_default["select"],
                    value: component.origin ?? "",
                    disabled: !remote.writable,
                    onChange: (event) => {
                      changeOrigin(configuredIndex, event.target.value);
                    },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "", children: "\u4E0D\u8986\u76D6\u539F\u751F" }),
                      remote.native.map((item) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: item.id, children: item.id }, item.id))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { className: `${PromptStudioView_default["field"]} ${PromptStudioView_default["templateField"]}`, children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: PromptStudioView_default["fieldLabel"], children: "\u6A21\u677F" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "textarea",
                  {
                    className: PromptStudioView_default["textarea"],
                    value: component.template,
                    disabled: !remote.writable,
                    rows: 8,
                    onChange: (event) => {
                      changeComponent(configuredIndex, { template: event.target.value });
                    }
                  }
                )
              ] })
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: PromptStudioView_default["excerpt"], children: component.template || "\uFF08\u7A7A\u6A21\u677F\uFF09" })
          ] }, `${component.kind}:${component.id}:${String(configuredIndex)}`);
        }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: PromptStudioView_default["previewColumn"], "aria-label": "System \u8349\u7A3F\u4E0E\u5386\u53F2\u4E0A\u4E0B\u6587\u53C2\u8003", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: PromptStudioView_default["sectionHeading"], children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { className: PromptStudioView_default["subtitle"], children: "System \u8349\u7A3F\u4E0E\u4E0A\u4E0B\u6587\u53C2\u8003" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: PromptStudioView_default["count"], children: String(preview.length) })
        ] }),
        lastRequestSystem === void 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("details", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("summary", { children: "\u6700\u8FD1\u4E00\u6B21\u771F\u5B9E\u8BF7\u6C42\u7684 system prompt\uFF08\u5386\u53F2\u5FEB\u7167\uFF09" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("pre", { className: PromptStudioView_default["previewSystem"], children: lastRequestSystem.template })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: PromptStudioView_default["assemblyOrder"], children: preview.map((block, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: PromptStudioView_default["assemblyRow"], children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: PromptStudioView_default["assemblyIndex"], children: String(index + 1) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: block.kind === "system" ? "system" : block.kind === "captured" ? "\u81EA\u52A8\u6355\u83B7" : "\u8865\u5145" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: PromptStudioView_default["assemblyOrderValue"], children: block.label ?? (block.kind === "system" ? `${String(draftSystem.length)} \u4E2A section \u5408\u5E76` : "") })
        ] }, `layout:${block.kind}:${block.id ?? "system"}:${String(index)}`)) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: PromptStudioView_default["preview"], children: preview.map((block, index) => block.kind === "system" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("pre", { className: PromptStudioView_default["previewSystem"], children: block.text }, `system:${index}`) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: block.kind === "captured" ? PromptStudioView_default["previewCaptured"] : PromptStudioView_default["previewSupplement"], children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: PromptStudioView_default["previewSupplementTag"], children: block.kind === "captured" ? block.label : "\u8865\u5145" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("pre", { className: PromptStudioView_default["previewSupplementText"], children: block.text })
        ] }, `${block.kind}:${block.id}:${index}`)) })
      ] })
    ] })
  ] });
}

// src/client/index.ts
var inject = ["slots", "conversation", "connection", "remote"];
function bindSnapshotSelector(store) {
  return function useSnapshot(select) {
    return select((0, import_react3.useSyncExternalStore)(store.subscribe, store.getSnapshot, store.getSnapshot));
  };
}
function apply(ctx) {
  const faces = /* @__PURE__ */ new Map();
  const faceFor = (sessionId) => {
    const key = sessionId === void 0 ? "" : String(sessionId);
    let face = faces.get(key);
    if (face !== void 0) return face;
    const controller = new PromptStudioStore(key.length === 0 ? void 0 : key);
    face = { controller, useSnapshot: bindSnapshotSelector(controller.store) };
    faces.set(key, face);
    return face;
  };
  ctx.effect(() => {
    const refresh = () => {
      for (const { controller } of faces.values()) refreshIfLoaded(controller);
    };
    const disposers = [
      ctx.remote.$on("settings/document-updated", (namespace) => {
        if (namespace === PROMPT_STUDIO_NAMESPACE) refresh();
      }),
      ctx.on("connection/reset", refresh)
    ];
    return () => {
      for (const dispose of disposers) dispose();
    };
  }, "ui-prompt-studio: pushed invalidations");
  ctx.slots.inject("conversation.view", () => ctx.slots.register({
    name: "conversation.view",
    id: "prompt-studio",
    order: PROMPT_STUDIO_VIEW_ORDER,
    label: "Prompt Studio",
    inject: (sessionId) => faceFor(sessionId)
  }, PromptStudioView));
  ctx.slots.inject("settings.section", () => ctx.slots.register({
    name: "settings.section",
    id: "prompt-studio",
    order: PROMPT_STUDIO_VIEW_ORDER,
    label: "Prompt Studio",
    inject: () => faceFor()
  }, PromptStudioSettingsSection));
}

return module.exports;
}});
