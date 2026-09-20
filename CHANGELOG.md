# Changelog

## v6.0 (2026-09-20) — 文体×语言子技能化

sepia 专精故事写作，而本技能族覆盖多种文体与中英双语——不同文体、不同语言的去 AI 味做法各不相同，v6.0 将单一技能拆成**六个自足子技能**，按需加载对应场景的完整做法：

- **humanizer**（主路由，瘦身）：只做判定与分发（三层模型速览 + 四操作契约 + 硬护栏 + 校准三原则 + 路由表），不再承载具体规则
- **humanizer-zh-chat**（中文口语 S1-S3）：colloquial-base + S 档细则 + zh-hans + 口语分流自检
- **humanizer-zh-write**（中文书面 W1-W3）：written-base + W 档细则 + zh-hans + 九测自检 + 人民日报句库 + Group F 指针节（自 fiction rubric 迁入）+ 篇章层
- **humanizer-fiction**（小说/叙事，英中）：narrative-pass + rubric 30 项 + style-pass + discourse-pass + 模型指纹
- **humanizer-pro**（专业文档六领域，中英）：professional-pass + domains/ + style-pass + discourse-pass
- **humanizer-zh-hant**（繁体台湾）：zh-hant 自足包

工程：共用件（zh-hans/style-pass/discourse-pass/selfcheck）开发侧**单源管理**（src/），构建脚本分发复制到各包并哈希校验（防双源漂移）；Group F 从 fiction 量表迁至 zh 包，fiction 报告按加载条件引用；v5.0.1 修复批次的全部修正继承。

## v5.0 (2026-09-19) — sepia 三层架构重构

按 [Nanako0129/sepia](https://github.com/Nanako0129/sepia)（MIT）的实测证据骨架完全重构，v2-v4 的全部中文场景资产保留。

### 新增

- **三层模型**：叙事架构（`narrative-pass.md`，7 决策组 + 架构图模板 + rarity move）→ 篇章推进（`discourse-pass.md`，QUD 检查 / outline test / 中段卡点）→ 措辞风格（`style-pass.md`，七伪迹 / 句法模板 / 词汇表 / 回加清单 / 句长节奏 / 白名单），修复按 deepest first
- **四操作契约**：write / review（仅诊断）/ refactor（两阶段 + 删除测试 + 回退测试 + 74/18/8 编辑偏斜）/ recreate
- **30 项诊断量表**（`rubric.md`）：A-E 五组分次读协议 + Group F 中国程式文书指纹（指针节）
- **专业文档路线**（`professional-pass.md` + `domains/` 六领域）：发版说明、PR/issue 回复、事故复盘、工单、技术文章、长篇报道
- **简繁双轨中文校准**：`zh-hans.md`（简体大陆，新增）+ `zh-hant.md`（繁体台湾场合，全量保真改编自 sepia `languages/zh.md`）
- **模型指纹**（`model-fingerprints.md`）：叙事层（StoryScope 实测）+ 散文层（厂商文档），按模型家族与版本加载
- **反模板九测自检**（`selfcheck.md`，自 v4.6 迁移）：段首句/警句/引用源/删测/段末收束/骨架/排比/价值升华/认识弧与语域漂移 + 分流表 + 红队交付格式
- CHANGELOG.md

### 保留（v2-v4 资产）

- 六档语境路由与正向策略（S1-S3 口语 / W1-W3 书面）
- 中国程式文书指纹（written-base W0.6-W0.12：二元对照配额、篇章级不完整、段落骨架、价值升华、认识弧、结构变化、语域一致）
- 人民日报句库（renmin-examples.md，17 篇 23 模式）
- 0b 代写流程（任务点标注表 + 材料核验 + web search 查证通道 + 核验债三级）
- 硬护栏：不编造细节、删除优于新增、尊重作者声音、引文承重、白名单先行

### 变更

- SKILL.md 重写为路由层（三层模型 + 双维路由 + 四操作 + 校准三原则 + 硬护栏 + 分组诊断协议），原 35 条底线规则逐条安置进新文件（AI 高频词/中文信号短语→zh-hans.md，英文词汇→style-pass.md §3，格式类→professional-pass.md check 6，聊天残留→professional-pass.md check 1，等）
- agent 预设 persona 段更新（四操作路由 + 简繁判定 + 场景档措辞）

## v3.x / v4.x（2026-09-11 ~ 2026-09-18）

语境分派（S0-S3/W0-W3）、0b 代写流程、事实查证通道、引用核验、篇章级/骨架层指纹修复、价值升华与认识弧配额、语域漂移检测——规则本体仍在库内（references/written-base.md、colloquial-base.md、register-*.md、selfcheck.md）。

## v2 (2026-09-11)

初版：blader/humanizer 35 条规则中文化 + 语境分派 + 人民日报句库。
