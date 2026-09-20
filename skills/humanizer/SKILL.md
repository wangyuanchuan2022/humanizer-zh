---
name: humanizer
description: |-
  Rewrite AI-sounding text (Chinese or English) so it reads naturally without changing what it says. 中文场景触发词：去AI味、人味、AI腔、像人写的、改得自然。Use for any text the user asks to humanize, de-AI, or make sound more human — in fiction, essays, chat, or professional documents. v7.0.0: router skill — identifies text type and language, then loads the matching sub-skill (humanizer-zh-chat / humanizer-zh-write / humanizer-fiction / humanizer-pro / humanizer-zh-hant) which carries the complete de-AI playbook for that genre. Built on sepia's measured three-layer model. v7 adds scripted randomness (draw-sheet), structure bands 1-5, non-goal detail quotas, and EN-branch reinforcement (model-fingerprints E-layer, distribution bands, genre params) — driven by the 2026-09 six-genre three-arm blind evaluation (450 texts, 13 reviewer seats).
---

# humanizer — 去 AI 味写作·主路由（v7.0.0）

主路由只做**判定与分发**：识别文本类型与语言 → 用 skill 工具加载对应子技能 → 子技能内含该场景的完整做法。本文件不含具体规则。

**底本**：v2-v4.6 基于 [blader/humanizer](https://github.com/blader/humanizer)（Wikipedia "Signs of AI writing" 35 条）+ 中文场景扩展；v5.0-v6.0 按 [Nanako0129/sepia](https://github.com/Nanako0129/sepia)（MIT, v0.11.0）的实测证据骨架重构；**v7.0.0 按本项目六文体三臂盲评（450 篇×13 席）的实测结论把确定性清单改造为带随机性的生成协议（抽签表/结构五档/非全指向配额）并补强英文支线**。

## 〇、三层模型（为什么表层改写不够）

AI 味分三层，**修复顺序 deepest first**。StoryScope（61,608 篇）实测：仅凭**叙事架构层**特征检测 AI 文本 macro-F1 达 93.2%；只改表层措辞检出率仅 95.5%→93.9%。各子技能内的分层执行顺序：叙事/结构层 → 篇章层 → 措辞层。

## 一、核心原则

1. **不改变原意**：保留全部事实信息（名称、数字、日期、引文、结论）；语言形式层的人味元素按所选子技能的正向策略执行。
2. **不编造事实**：缺信息写简单些而不是补内容；事实缺失先用 web search 查证，查到保守补入，查不到删或简化，绝不凭记忆编造。自信的错误事实本身是顶级 AI 痕迹。
3. **匹配原文语气与作者声音**：先从用户样本或场合近期真实文本提取习惯，朝**那个**画像改，不删除作者真实使用的口头禅。
4. **改结构不改信息**：可合并/拆分段落、调句序、删冗余，信息量不损失。

0b 代写（无原文）：「原文」替换为「任务要点清单」——清单之外的事实不得编造；材料逐条过核验并留档；把「保护资产清单」（人→动作→场景具体链）与所选结构变化写进标注表留档。

## 二、四操作

| 操作 | 契约 |
|---|---|
| **write** | 动笔**前**读子技能的领域/档位文件（架构与语域决策不能事后补救）；**先抽签**——按子技能 SKILL「伴生脚本与抽签」节执行（draw-sheet 脚本出签照做，**签表随稿落盘**，含 seed 与实际取值；无 shell 环境按契约文档表格自抽并显式留痕）；按子技能的生成流程执行 |
| **review** | 仅诊断不改：产出带引文证据的缺陷清单即止；**不强制抽签**（诊断对象是既有文本） |
| **refactor** | 两阶段：先全量诊断，再逐项修，最深层优先；删除优于新增（实测 74/18/8）；新增词跑删除测试、替换处跑回退测试；修复不算增长 |
| **recreate** | 提取事实/主张/意图为裸清单→核实无编造→**先抽签**（同 write）→按领域规则重写 |

**交付格式**：write 与 recreate 为初稿 + 残留 AI 模式清单 + 终稿三段交付；refactor 缺省两段（终稿 + 残留清单），结构调整幅度大时按三段；turing-test 场景自然度优先；红队自评 AI 概率超 40% 修订一次再交付。

## 三、校准三原则（统治一切规则的规则）

1. **瞄准人类分布带，不反转 AI 分布**——全规则叠加会形成新的「人味过载」指纹；
2. **选择制不叠加**——小说每篇 3-5 种人类倾向手法；专业文档只修 checklist 实际命中的；
3. **留余地**——普通句子、平实段落是人性。

## 四、硬护栏

1. **绝不编造具体细节**；缺信息问用户或留显式 TODO。
2. **删除优于新增**；允许的新增仅限真实具体性、断裂句修复、等量回补；段落不得比原来长。
3. **尊重作者声音与场合语料**：动笔前采样场合近期真实文本，匹配其语域与格式习惯。
4. **引文/引用材料承重**：引文内文字永不改动；其中缺陷照报不修。
5. **无人值守模式**：需用户决策的缺陷记 `Deferred:` 行保持原样；沉默与跳过是两个事实。
6. **先查白名单再定罪**：干净语法、正式语气、常规模板不是 AI 证据；单个命中不是判决——slop 是累积的，聚簇才动手。
7. **核验债显式化**：未当场查证的材料按方向性陈述写，不写成精确归因。

## 五、路由表（判定后用 skill 工具加载对应子技能）

判定依据优先级：用户明示场景 > 文本形态特征（长度、标点密度、平台词汇、格式）。判定不出时问用户一句「这段文字要用在什么场合」；无法询问时按下表默认档并在交付说明注明存疑。

| 场景 | 子技能 |
|---|---|
| 中文·口语（熟人闲聊 / 社区发言 / 半正式交流，S1-S3） | `humanizer-zh-chat`（默认 S3 最保守档） |
| 中文·书面（议论文/时评 / 说明文 / 正式应用文，W1-W3） | `humanizer-zh-write`（判不出 W 档默认 W1） |
| 中文·个人文书诊断（申请书/自述的升华弧/认识弧/语域漂移专项） | `humanizer-zh-write`（其 Group F 指针节） |
| 中文·繁体台湾场合（含繁体规范/数字/标点） | `humanizer-zh-hant` |
| 小说 / 虚构故事 / 文学性叙事散文（英文为主；中文小说=本行+加载 `humanizer-zh-write` 读其 zh-hans.md 作语言校准） | `humanizer-fiction` |
| 专业文档：发版说明 / PR·issue 回复 / 事故复盘 / 工单 / 技术文章 / 长篇报道（中英） | `humanizer-pro` |
| 英文·其他散文 | `humanizer-pro`（其 style-pass 全文适用） |

- 子技能加载后，**以子技能文件为完整作战手册**执行；本文件的原则与护栏持续生效。
- **快速清单模式**（外部审稿流程引用时）：不需全流程，直接按语言加载 `humanizer-zh-write` 的 zh-hans.md（中文）或 `humanizer-fiction`/`humanizer-pro` 的 style-pass.md §2-3（英文）对照清单逐段核查，报告命中项+引文即可。
- 版本史见各发行仓库 CHANGELOG；v4.x 摘要：v3.2 逻辑调和 / v4.1 查证通道 / v4.2 引用核验 / v4.3 篇章指纹 / v4.4 骨架指纹 / v4.5 升华指纹 / v4.6 认识弧与语域漂移。
