---
name: humanizer-fiction
description: |-
  小说/虚构故事/文学性叙事散文的去 AI 味子技能（英文为主，中文通用）：修复叙事架构层指纹（主题直给/因果单线/结局收束/时间线性/情绪呈现/角色网络），基于 StoryScope 实测（架构层单独 93.2% 检出率）。触发词：小说、故事、fiction、novel、narrative、叙事、文学性散文、personal essay、去AI味。属 humanizer 主路由的子技能，可独立使用。
---

# humanizer-fiction — 小说/叙事档

本包是小说与叙事场景的**完整作战手册**，基于 sepia 的实测证据：表层措辞改写几乎无效（检出率仅降 1.6pp），真正的指纹在叙事架构层——所以本包先修架构、再修篇章、最后才是措辞。

## 加载序（动笔前读完）

1. `references/narrative-pass.md` — Pass 1 叙事架构：架构图模板（architecture sheet，动笔前填写）+ 7 决策组（主题/情节/结局/时间/情绪/角色网络/外部世界，每组带 Human vs AI 量化参考）+ 罕见手法（rarity move，每篇恰好一个）
2. `references/discourse-pass.md` — Pass 2 篇章推进：QUD 检查 + 提纲测试 + 中段卡点 + 页面结构位置 + 开头 + 命名
3. `references/style-pass.md` — Pass 3 措辞风格：职业编辑七伪迹 / 句法模板 / 词汇 ban list / 回加清单与删除·回退测试（§4 末段）/ 句长节奏（§5）/ 朗读测 / 误报白名单（§7）；编辑偏斜 74/18/8
4. `references/model-fingerprints.md` — 分模型指纹（可选进阶）：已知起草或执行模型时，按模型身份规则加载对应家族指纹层（叙事层实测表仅小说向）
5. `references/rubric.md` — 30 项诊断量表（Group A-E + 分组读协议 + 报告格式）：review 操作与 refactor 阶段 1 用

## 工作流

**Workflow A — 写新小说（write）**：(1) 定题材/类型/篇幅，类型定校准目标；(2) 填架构图模板；(3) 选 3-5 个偏人类手法 + 恰好一个罕见手法；(4) 提纲跑 discourse 的 outline/QUD 检查 + narrative 的 echo test；(5) 起草；(6) 用 rubric 分组自诊（一次一组）；(7) 风格层最后过。

**Workflow B — 改旧小说（refactor/recreate）**：(1) 先完整诊断（rubric → discourse → style），零改动；(2) 分诊——架构缺陷要场景级手术，先告知深度（无人值守记 `Deferred:` 行）；(3) 最深优先修；(4) 复验：重跑改动过的 rubric 组、朗读关键段、新增转折跑 echo test。

**中文文本附加**：语言校准加载 `humanizer-zh-write` 包的 zh-hans.md（skill 工具加载该包后按其目录读取），叙事架构与篇章层语言无关照常执行。

## 硬性纪律（本包特有强调）

- 只执行 3-5 个偏人类手法/篇——全用上=新指纹；架构图模板是决策记录，不是逐条执行清单。
- 数值行只做定性对照，禁止换算成作者身份概率或合并分数；无引文不算信号；n/a 显式标注；过度修正独立标注。
- 真实互文引用（作品/作者/地名/品牌）必须真实正确，缺材料问用户。
- 引文、对话、诗引承重不改；其中 ban 词不算命中（白名单）。

## 接缝

- 中文小说的语言校准 → `humanizer-zh-write` 包的 zh-hans.md。
- 诚实的非虚构报道叙事（有信源）→ 改用 `humanizer-pro` 的 journalism 领域。
- 中文个人文书（申请书/自述）的升华专项 → `humanizer-zh-write` 包的 zh-rubric-f.md。
