<!-- v5.0 编译自 sepia references/rubric.md（MIT）+ humanizer v4.6 资产（Group F 中国程式文书指纹指针节）。
     相对 sepia 原版报告模板的两处 v5 适配：Voice fit 行省略（v5 无 voices 机制）；报告结构新增 Group F 行。
     Group F 为指针节：不复制细则，判定细则以 written-base.md / register-W3.md 对应条目为准。 -->

# 诊断量表（diagnosis rubric）——30 项核心特征

下列 30 项叙事特征来自 StoryScope 公开发布的特征分类与语料汇总（AI 核与人类核对照表 14–15；30 项均值与差距见表 16）。StoryScope 的「仅核心 30 特征」XGBoost 留出分类器达到 84.8% macro-F1（AUPRC .828）；本手工量表是启发式分诊（heuristic triage），不是那个分类器，也不是作者身份检测器。钉定的研究见 [StoryScope arXiv v6](https://arxiv.org/abs/2604.03136v6)。

Human 与 AI 两列只作语料校准参考，不是单篇文本的达标线。观测到的信号不是作者身份概率。本量表不主张任何经过验证的聚合检测器或修订阈值；未来任何聚合层面的主张都需要一次单独的、留档的评估。

## 协议（Protocol）

1. **一次只读一组**，分六遍分别过（Group A-F 各一遍）。绝不在一次通读中评完整张量表：模型自评文本时会塌缩到一两个显著维度上，对其余维度失明（在 slop 分类法上实测——各测试提示条件下 span precision 仅 0.13–0.16）。
2. 每个观测到的信号都必须引出支撑它的短原文。无引文，即无信号。
3. 把数值、序数与类别观测记录在语料参考值旁边；不得把它们换算成作者身份概率或合并分数。
4. 文本没有给某特征提供评估场合时，该特征标 **n/a**；过度修正（over-correction）单独记录。

## 阅读规则（Reading rules）

| 情形 | 规则 |
|---|---|
| 数值行（量表/序数） | 记录文本的观测分值，并与 Human、AI 语料参考值作定性比较。不套数值切线。 |
| 百分比行（类别/二元） | 记录 AI 列选项是否出现并引出其上下文。语料百分比是校准背景，不是单篇概率或比例切线；人类倾向选项的缺席本身不构成发现。 |
| Group D | 每个人类正向标记单独记录并附引文证据。不得把各标记合并成组分。 |
| 不适用（n/a） | 文本中没有评估场合的特征（无危局→无危局前铺垫 pre-threat investment；无反转→无语境重构 recontextualization）标 **n/a**，不强迫判定。引用显性度（reference explicitness）只有在文本完全没有互文示意时才 n/a——无名借用引文或可辨识的无出处转述*就是*场合（记作 implicit 隐含）。短文本产生多个 n/a 属预期，不是文本缺陷。 |
| 过度修正（over-correction） | 数值分落在远离 AI 方向的另一极端（如不连续性 5/5、主题显性度 1/5）→ 标记为**过度修正提示（over-correction advisory）**。作为「人味过矫」失效模式单独报告；不得重新解读为 AI 倾向信号。 |

## Group A — 主题过度决定（thematic over-determination，AI 偏高）

| 特征 | 判定方法（How to judge） | Human 参考 | AI 参考 |
|---|---|---|---|
| 主题显性度（Thematic explicitness） | 1 = 主题保持隐含；5 = 用论题式陈述告诉读者如何理解事件 | ~3.3 | 3.9 |
| 道德/哲学权重（Moral/philosophical weighting） | 伦理辩论与主题阐述在多大程度上压过故事乐趣；查叙述者评论与高潮演讲 | ~3.3 | 3.7 |
| 主题统一性（Thematic unity） | 5 = 每个场景、每条支线、每个意象都强化同一个主题核心 | ~4.4 | 4.7 |
| 叙述者主题评论（Narrator thematic commentary） | 叙述声音是否概括事件意味着什么（「人就是这样」式）？ | ~52% 出现 | 77% |
| 对话作哲学辩论（Dialogue as philosophical debate） | 关键对话是在辩论观念，还是在推进欲望/冲突？ | ~34% 中占主导 | 59% |
| 引用显性度（Reference explicitness） | 无名模糊用典作为主导互文模式（人类倾向状态是「有名 + 隐含」的均衡混合，37% vs 16%） | 仅隐含 ~50% | 72% |

## Group B — 感官与具身表演性（sensory & embodied performativity，AI 偏高）

| 特征 | 判定方法（How to judge） | Human 参考 | AI 参考 |
|---|---|---|---|
| 主导情绪模式（Dominant emotion mode） | 给强情绪场景分类：显式标签 / 具身感觉 / 行为 / 模糊；具身主导标记为 AI 倾向信号 | 具身主导 ~38% | 81% |
| 场景作心理镜像（Setting as psychological mirror） | 天气/风景/建筑是否持续外化内心状态？ | ~3.6 | 4.1 |
| 环境强调（Environmental emphasis） | 风景与生态超出背景板地位 | ~2.8 | 3.2 |
| 嗅觉意象（Olfactory imagery） | 嗅觉是否在常规调用的感官之列——按篇幅判断显著性（短篇一次突出出现即算；长篇看复现使用） | ~57% | 82% |
| 感官密度（Sensory density） | 多感官描写所占文本比例；5 = 浓密、拖慢节奏 | ~3.7 | 3.9 |
| 内心深入度（Depth of interior access） | 1 = 仅外部；5 = 意识流 | ~3.7 | 3.9 |

## Group C — 结构流水线化（structural streamlining，AI 偏高/过整齐）

| 特征 | 判定方法（How to judge） | Human 参考 | AI 参考 |
|---|---|---|---|
| 因果链连续性（Causal-chain continuity） | 5 = 从引发事件到结尾，每个事件都紧连成一条线 | ~3.9 | 4.2 |
| 支线情节（Subplots）*（建议性信号 advisory signal）* | 完全没有支线；这在人类文本中太常见（57%），脱离上下文无法解读 | 无支线 ~57% | 79% |
| 结局能动性（Resolution agency） | 转折点由主角选择触发，还是由偶然/他人触发 | 选择 ~46% | 69% |
| 结局模式（Resolution mode） | 外部行动 / 内部接受 / 部分 / 开放 / 灾难性；内部接受标记为 AI 倾向信号 | 内部接受 ~27% | 47% |
| 主角引入（Protagonist introduction） | 首次实质出场的手法——五选一：外部描写 / 行动中 / 对话中 / 内心活动 / 他人转述。外部描写标记为 AI 倾向信号；其余四种本身不是信号（对话中是最强人类标记） | 外部描写 ~30% | 52% |
| 开场空间落地（Opening spatial grounding） | 首场景对局部 + 全局位置的确立完整度（1–4） | ~2.1 | 2.3 |
| 空间颗粒度（Spatial granularity） | 地名、房间、路线的密度（1–4） | ~2.3 | 2.5 |
| 危局前铺垫（Pre-threat investment） | 危局（jeopardy）出现之前的内心戏/背景铺垫 | ~2.8 | 3.0 |

## Group D — 人类正向标记（human-positive markers）

| 标记 | 判定方法（How to judge） | Human | AI |
|---|---|---|---|
| 具名互文（Named intertextuality） | 明确点名任何真实文本/作者/作品 | ~47% 出现 | 24% |
| 打破第四面墙（Fourth-wall gesture） | 任何地方的眨眼、旁白或对读者的承认 | ~67% 出现 | 39% |
| 直接称呼读者（Direct reader address） | 任何「你」/「亲爱的读者」时刻 | ~28% 出现 | 7% |

## Group E — 时间复杂度与多样性（temporal complexity & diversity，AI 偏低/过整齐）

| 特征 | 判定方法（How to judge） | Human 参考 | AI 参考 |
|---|---|---|---|
| 时序不连续性（Chronological discontinuity） | 时间跳跃的频率/锐度 | ~2.4 | 2.1 |
| 非时序强度（Anachrony intensity） | 场景级闪回/闪前作为结构手段 | ~2.6 | 2.3 |
| 非线性框架用于揭示（Nonlinear framing for disclosure） | 时间装置用于布置揭示（revelation） | ~2.0 | 1.7 |
| 惊奇后语境重构（Recontextualization after surprise） | 一次揭示给多少前文重新着色 | ~3.3 | 3.0 |
| 场景多样性（Location variety）*（sepia 启发式建议 advisory）* | 可选编辑检查：3000 字以上从未离开单一地点的故事打旗，除非设定本身要求禁闭 | 实测序数均值 1.34 | 1.08 |
| 对话占比（Dialogue proportion） | 引语占文本比例（1 = 无，3 = 均衡，5 = 主导） | ~3.0 | 2.7 |
| 对主角的道德极性（Moral polarity toward protagonist） | 叙事的最终立场；明确褒扬或明确谴责的立场标记为 AI 倾向信号 | 模棱两可 ~59% | 明确 62% |

## Group F — 中国程式文书指纹（指针节，humanizer v4.6 资产）

> **本组仅 W3/叙事类个人文书场景判定；细则以指针文件为准，逐条需引文证据。**

本组编译自 humanizer v4.6 的骨架层/升华层指纹体系（入党申请书案 2026-09-18 两轮实测确立），是指针节：这里只给判定要点与出处，量化配额、降格方向与修订口径以指针文件原文为准，判定时逐条引用文中原句作证据。

| # | 指纹 | 判定要点 | 细则指针 |
|---|---|---|---|
| F1 | 价值升华对照表齐装 | 把各经历/叙事段的段尾认识句（含无对仗外形的段尾小总结）逐条抄出，排成「经历→认识」对照表；逐段齐装（每段经历都对应一条提炼）即命中 | written-base.md W0.9 |
| F2 | 认识弧含变体 | 把各段认识句的句式骨架抄出：「过去的认识→触发→现在的道理」三拍弧；双重否定克制（「并不是没有X」）与拆字升华（「X的背后是Y」）变体同罪；多数段落含「过去→现在」对照骨架即命中 | written-base.md W0.10 |
| F3 | 对表升华 | 把自己的行为与官方宗旨/口号/精神主动对表的收束句（「宗旨里写着X，我做的就是X」「正是X精神的生动体现」）即命中 | written-base.md W0.9④ |
| F4 | 语域漂移 | 逐段标注认识句/抒情句的密度与文学度；中段显著高于首尾（「文书—散文—文书」三段变腔）即命中 | written-base.md W0.12 |
| F5 | 安全弧 | 自评/申请/辩护类文体「卸责→举证→短板→弥补」链条成段即命中——短板可以认，弥补办法不得自动跟上 | written-base.md W0.8 |
| F6 | 自荐/留接口式收尾 | 终稿收尾句落入收尾黑名单（「如果…我可以…」「欢迎…」「期待…」式总结+留接口+表示可继续服务）即命中 | register-W3.md 收尾黑名单 |

## 报告格式（Report format）

以引用短句方式取证，不按段号引用。报告保持描述性：它记录供编辑复审的候选信号，不是作者身份概率，也不是聚合行动分。

（v5 相对 sepia 原模板：Voice fit 行省略——v5 无 voices 机制；Group F 行为本版新增。其余各行逐一保留。）

```text
HUMANIZER 诊断 — <标题>
范围：启发式分诊；仅语料参考；无作者身份概率或经验证的聚合检测器
模型：author=<值> executor=<值>   （值：unknown | <家族> version=unknown | <家族> <发行版>；发行版是精确标签，如 Fable 5.1 或 GPT-5.6——「GPT-5」单独出现只是家族，要写「GPT version=unknown」）
叙事层：author=<prior | none> executor=<prior | none>
散文层：author=<operative | prior | none> executor=<operative | prior | none>   （operative = 该发行版自己的表生效、该家族其他表为 prior）
Group A: <行标题> — <引文证据>；…；n/a <行标题> …   （每个观测信号按量表行标题逐字命名）
Group B: 观测信号 … （…）
Group C: 观测信号 …；n/a … （…）
Group D: 标记观测 … （具名互文出现——「…」）
Group E: 观测信号 … （…）
Group F: 指纹观测 — <引文证据>；n/a …   （仅 W3/叙事类个人文书场景判定；逐条引文证据，细则指针见 Group F 表）
提示（Advisories）：过度修正 …；支线情节 …；单一场景 …
引文证据：<每个已报告信号的短句>
暂缓（Deferred）：<行标题 — 引文证据 — 需人工 | none>   （仅无人值守运行记录；否则省略）
保护（Protected）：<行标题 — 引文证据 | none>   （仅当事先声明过保护范围时保留；引原词，不带数字）
计划：<有序修复项，最深层优先，每项挂一条引文>
```
