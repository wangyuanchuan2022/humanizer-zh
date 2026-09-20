<!-- v5.0 编译自 sepia v0.11.0 references/model-fingerprints.md（MIT）-->
<!-- 全量保真编译：双层结构（叙事层=StoryScope 实测；散文层=vendor 提示词文档，未实测）、Claude/GPT/Gemini/DeepSeek/Kimi 五家族 + 人类指纹正向表；vendor 引文块保留英文原文（sepia 已与源页核对匹配）。表头适用范围注记保留：叙事层仅小说向（fiction only）；散文层 vendor 表适用于所有路线的 style-pass 步。 -->

# 各模型指纹（per-model fingerprints）

两层、两类证据、分表保存：

- **叙事层（实测，measured）。** 每个前沿模型在**各自独有的特征**上偏离*其他 AI*（StoryScope §5、表 17；仅凭叙事特征即达 68.4% 的六路归因 macro-F1）。钉定的研究见 [StoryScope arXiv v6](https://arxiv.org/abs/2604.03136v6)。测于具体版本（Sonnet 4.6、GPT-5.4、Gemini 3 Flash、DeepSeek V3.2、Kimi K2.5，2026）。**仅小说向（fiction only）。**
- **散文层（vendor 指引，未实测）。** 模型自家 vendor 说其当前版本在句子层面做什么，取自 vendor 的提示词文档，并标注该页具名的确切版本。所有路线都只在 style-pass 步加载——绝不在叙事（narrative）与篇章（discourse）pass 之前——且由 vendor 面向用户可见的说明性输出所写：小说路线上它作用于操作产出的非叙事文本（给用户的报告、摘要），只有当某表自身的适用范围注记说明时才触及叙述，否则叙述由 narrative-pass.md §5 与叙事层管辖。

稳定来源身份见仓库研究台账；本文件内的单字母别名是文件局部的：S = StoryScope，V = vendor 指引，**E = 本项目 eval 实测（E-2026-EVAL 分区，v7 起）**——E 级与 S/V 分层，其规模与条件在分区内注明，不得跨层混读。除某来源明确测试过该干预外，更正均为 sepia 推断（E 区的更正为本项目实测推论）。

**哪些行适用由 humanizer SKILL.md「模型指纹」条中的模型身份规则（model-identity rule，Routing）决定，不由本文件决定。**简述：每个角色（author、executor）各自解析；当某角色的模型已产出或正产出故事时，其家族的叙事层被选为先验（prior），散文层则在所有路线上生效——一个表在其版本标签匹配时是**施行（operative）**，否则是先验；因此拥有匹配表的角色以那一张为施行表、该家族其余表为先验。本文件没有任何内容从散文推断模型——靠阅读归因不是产出那个 68.4% 的分类器。

## Claude

### 叙事层（S；Sonnet 4.6）——最具辨识度的 AI，26 个指纹特征

| 缺省 | 更正 |
|---|---|
| 所有来源中最平的事件升级；全程统一的叙事声音 | 建立真实升级：让赌注与强度*跳变*、不均匀。允许声音在压力点上紧绷、加速或变粗粝 |
| 对文学传统虔敬/承续（62% 的故事 vs 39–56%） | 允许打破或戏仿一个惯例，而非致敬 |
| 偏好尾声与预叙式结尾；安静结尾胜于「雪崩」结尾 | 缺省禁尾声；在运动中收束。允许一个雪崩式结尾 |
| 完全回避梦境段落 | 故事需要时梦境可用（不强加——缺席只在聚合层面是 tell） |
| 场景氛围漂向诡异/闹鬼 | 变化氛围语域 |

### 散文层（V；Claude Fable 5.1 与 Claude Mythos 5.1，`ANTHROPIC-FABLE-5-1-PROMPTING`）

| vendor 声明的缺省 | 处置 |
|---|---|
| 做作行文（mannered prose）：有直白说法可用处用隐喻与辞藻 | 下面的引块，按 humanizer SKILL.md「模型指纹」条的模型身份规则作施行或先验：对版本为 Claude Fable 5.1 或 Claude Mythos 5.1 的角色施行（该页两者具名），其他或未知 Claude 版本为先验。作为 author 层：在给定文本中猎取顶替可用直白说法的隐喻。作为 executor 层：把引块应用到你写的东西上 |
| 比 Fable 5 更密：句子更长、分段更少 | 拆连跑句（style-pass.md §1 第 2 行）；在话题转折处分段 |
| 比早期 Claude 更少加粗、更少标题与列表 | 稀疏格式不是人类作者的证据。不要为补偿而加反格式规则 |

vendor 原话，逐字（2026-09-02 与源页比对，匹配）：

```text
Mannered prose substitutes metaphor and flourish for direct statement. Instead of "a parameter worth varying," the mannered writer produces "a dial worth turning." Instead of "this point still matters," they write "this point earns its keep." The phrases exist to display the writer, not to convey the idea, and readers can tell. That is why mannered prose irritates: it makes the reader work harder so the writer can perform. It is also imprecise. Metaphors drag in connotations the writer did not choose and cannot control. The fix is to say what you mean. When a literal phrase is available, use it.
```

适用范围注记：本引块是本节唯一触及小说路线叙述的指令，且只在从属于 narrative-pass.md §5 的前提下——§5 的情绪模式带与其「一到两个具象峰值」规则决定隐喻留驻何处，引块作用于那些峰值之外的叙述。它不是隐喻禁令，§5 的任何图形都不是隐喻预算。

### 散文层（V；Claude Fable 5 与 Claude Mythos 5，`ANTHROPIC-FABLE-5-PROMPTING`）

| vendor 声明的缺省 | 处置 |
|---|---|
| 未加引导时越过任务展开：「surveying options it won't pursue, explaining root causes at length, producing heavily-structured PR descriptions, or writing comments that narrate what the next line does」 | 下面的简洁指令，按 humanizer SKILL.md「模型指纹」条的模型身份规则作施行或先验：版本为 Claude Fable 5 或 Claude Mythos 5 的角色施行，其他 Claude 版本为先验。作为 author 层：猎取选项盘点、根因论文与结构压过内容的文本（professional-pass.md checks 2、3、6）。作为 executor 层：按本文件头部的路线范围，把指令应用到非叙事文本 |
| 长程 agentic 会话中：「dense arrow-chain shorthand, deep implementation detail, references to thinking the user never saw, or overly technical phrasing」 | 猎取箭头链、连字符堆叠复合词与读者从未见定义的标签；展开成句（style-pass.md §6 朗读测试） |

vendor 的简洁指令，逐字（2026-09-03 与源页比对，匹配）：

```text
Lead with the outcome. Your first sentence after finishing should answer "what happened" or "what did you find": the thing the user would ask for if they said "just give me the TLDR." Supporting detail and reasoning come after. Being readable and being concise are different things, and readability matters more.

The way to keep output short is to be selective about what you include (drop details that don't change what the reader would do next), not to compress the writing into fragments, abbreviations, arrow chains like A → B → fails, or jargon.
```

### 散文层（V；Claude Opus 5，`ANTHROPIC-OPUS-5-PROMPTING`）

| vendor 声明的缺省 | 处置 |
|---|---|
| 「Default user-facing responses run longer than prior Opus models'」；effort 改变思考量，不改变可见长度 | 按角色的施行或先验强度跑密度（professional-pass.md check 2）。下面的简洁指令，按 humanizer SKILL.md「模型指纹」条的模型身份规则作施行或先验：版本为 Claude Opus 5 的角色施行，其他 Claude 版本为先验；作为 executor 层，按本文件头部的路线范围把它应用到非叙事文本 |
| 书面文件「are often longer than on prior models」：填充节、冗余摘要、样板 | 猎取分形摘要（fractal-summary）形态与为完整性而存在的节（professional-pass.md checks 6、7）。vendor 指令："Match the length of written documents to what the task needs: cover the substance, but do not pad with filler sections, redundant summaries, or boilerplate." |
| 「Narrates readily during agentic work」：宣告即将做什么；比先前模型更常叙述对早先陈述的更正 | 在产出文本中，删去意图宣告与对读者无意义的更正 |

vendor 的简洁指令，逐字（2026-09-03 与源页比对，匹配）：

```text
Keep responses focused, brief, and concise. Keep disclaimers and caveats short, and spend most of the response on the main answer. When asked to explain something, give a high-level summary unless an in-depth explanation is specifically requested.
```

### 散文层（V；Claude Opus 4.8，`ANTHROPIC-OPUS-4-8-PROMPTING`）

| vendor 声明的缺省 | 处置 |
|---|---|
| 「A direct, opinionated style with minimal validation-forward phrasing and sparing emoji use」 | 无验证开场白与 emoji 是该版本的缺省，不是人类证据。立场（check 4）通常在场；改看密度与具体性 |
| 回复长度「calibrated to how complex it judges the task to be」 | 长度缺省随任务变化；跨任务长度均一才是 tell，不是变化 |

2026-09-03 查过、无散文层声明：Claude Sonnet 5 页只说「prose style on long-form writing may shift」；Claude Opus 4.7、Opus 4.6 与 Sonnet 4.6 无模型专属提示词页。这些版本没有施行行；按 humanizer SKILL.md「模型指纹」条的规则，上面的 Claude 散文表对它们作先验。

## GPT

### 叙事层（S；GPT-5.4）——八卦与长镜头

| 缺省 | 更正 |
|---|---|
| 八卦/流言作情节机制（64% vs 44–55%） | 让信息经观察、文件或意外移动——不要靠全镇议论 |
| 远景回溯叙述者（「years later, she would…」） | 贴近事件叙述；丢掉数十年后的框架 |
| 比任何其他 AI 都更多颠覆读者预期（41%） | 不要再加反转；把你已有的那个挣出来 |
| 和解习惯性留作部分/含糊 | 把一段关系彻底解决——任一方向 |
| 群像式社会网络（人类级密度但公式化） | 把群像修剪到故事用到的角色 |

### 散文层（V；GPT-5.6，`OPENAI-GPT-5-6-PROMPTING`）

| vendor 声明的缺省 | 处置 |
|---|---|
| 缺省比 GPT-5.5 更简洁；简洁指令可能让答案过短 | 密度两个方向都可能失败。非叙事文本中，丢掉必要告诫或下一步的短答案是缺陷（professional-pass.md check 2） |
| vendor 推荐的削减项具名预期残留：introductions、repetition、generic reassurance、optional background、generic praise、sign-offs | 已被 professional-pass.md checks 1、2、7 猎取；在非叙事文本上按角色施行或先验强度跑 |
| 编辑任务漂移：vendor 的保真片段警告「adding new claims, sections, or a more promotional tone」 | vendor 暗示、未声明为缺陷。执行 humanizer SKILL.md 护栏「删优于增（Deletion beats addition）」的语域漂移条款 |

### 散文层（V；GPT-6 Astra，`OPENAI-GPT-6-ASTRA-PROMPTING`）

| vendor 声明的缺省 | 处置 |
|---|---|
| 「Tends to use lists, tables and Markdown to make responses scannable」 | 重格式是该版本缺省。在非叙事文本上按角色施行或先验强度跑 professional-pass.md check 6；修法是 vendor 自己的：每段发展一个想法的段落，仅当条目平行或顺序时才用列表 |
| 「May use recurring phrases across sessions」；vendor 的 slop 提示词（下）具名该集合 | 其中两个词已在共享表中（delve、foster：style-pass.md §3 Performance verbs），一个框架也在（「it's not X, it's Y」：style-pass.md §2）；照常按施行或先验强度计数。其余作为该版本的版本习惯留在此表、在非叙事文本中被猎取，按 humanizer SKILL.md「模型指纹」条的模型身份规则施行或先验：自问自答（「Question? Answer.」）；读者未要求的对照，任何形态（「X, not Y」「X—not Y」「This isn't about X. It's about Y.」），比 §2 框架更宽；收尾摘要标签（「Bottom Line:」「In short:」「The simplest mental model is:」）；连字符复合描述词与生造复合标签（「exact-head checks」），与 Fable 5 表送去做 style-pass.md §6 朗读测试的是同一形态；未经要求的负面界定——加一句说不会做什么、什么保持不变、或结果将如何归类，而没人问（回应请求的「won't fix」就是答案，见 `domains/dev-replies.md`，保留）；以及 leverage、importantly、it's worth noting、genuinely。sepia 推断：没有任何测量支持这些是模型无关的 tell，所以它们不进入共享表 |

vendor 的 slop 指令，逐字（2026-09-08 与源页比对，匹配）：

```text
Avoid using slop words or phrases like "Bottom Line:" in conclusions, "delve," "foster," "leverage," "it's worth noting," "importantly," "Question? Answer." or "This isn't about X. It's about Y.", "genuinely" or hyphenated compound descriptions and adjectives. Do not use concluding summary statements such as "In short:..", "The simplest mental model is:...".

State the intended action directly. Avoid adding what you won't do, what will remain unchanged, or how you'll separate or categorize results. Do not use contrastive framing such as "X, not Y" or "X—not Y" that introduces an unprompted alternative that the user didn't ask about. Avoid invented compound labels like "exact-head checks" and "editorial-row layouts", vague qualifiers, and canned transitions; use plain verbs and prepositions to state the actual relationship directly.
```

## Gemini

### 叙事层（S；Gemini 3 Flash）——整洁的悲观主义者

| 缺省 | 更正 |
|---|---|
| 最整洁的结尾 + 延长的收束（denouement） | 砍掉最后一场；让账目悬而未决 |
| 88% 的故事阴郁/压抑场景 | 变化——即使事件不温暖，也让部分场景中立或温暖 |
| 闪回成反射；对梦境序列过度索引 | 让非顺序（anachrony）有目的（布置揭示），不是装饰 |
| 主角社交圈总是扩张 | 允许收缩或静止的轨迹 |
| 直接引语支配对话 | 混入间接与概述式引语 |

### 散文层（V；Gemini 3 系列，`GOOGLE-GEMINI-3-DEV-GUIDE`）

vendor 把声明范围定为系列（Gemini 3 Flash 至 Gemini 3.8 Flash），任何 Gemini 3.x 版本都匹配此表。

| vendor 声明的缺省 | 处置 |
|---|---|
| 「By default, Gemini 3 is less verbose and prefers providing direct, efficient answers」；会话式或「chatty」人格只在明确提示时出现 | 简短朴素是该系列缺省，所以简短在这里不是人类证据。非叙事文本中向另一方向查密度（professional-pass.md check 2）：为效率丢掉必要告诫与下一步 |

## DeepSeek

### 叙事层（S；DeepSeek V3.2）——前置加载者（the front-loader）

| 缺省 | 更正 |
|---|---|
| 关键上下文在故事推进之前交付 | 扣留；让背景在运动中途泄漏（见 narrative-pass.md §4） |
| 可见的、在场的叙述者 | 后退；让场景无主持地跑 |
| 情绪几乎只经行为线索传达 | 混入直白命名与偶尔的内心视角 |
| 背景均匀交错、节拍器式 | 不规则地聚簇 |
| 嵌套叙事场景（故事中的故事） | 至多一个，若有 |

散文层：无。2026-09-03 查过、无关于模型自身写作的声明：DeepSeek API 文档（完全没有提示词指南）与 DeepSeek-V3.2 模型卡（仅采样参数）。

## Kimi

### 叙事层（S；Kimi K2.5）——通用中心（the generic center）

指纹最少（3 个）——它坐在 AI 叙事空间的质心，这*正是*它的 tell：毫无独特选择。更正：它以反射式在动作中开场（in medias res）、用进行中的动作做人物介绍（变化入场方式），且从不显式标注角色特质（允许标注）。总体上，按全强度应用共享 pass，并让稀疏动作（rarity move）起作用。

散文层：无。2026-09-03 查过、无关于模型自身写作的声明：Kimi 平台的「Best Practices for Prompts」（通用提示工程建议，未具名版本）与 Kimi-K2.5 模型卡（其缺省系统提示词已在 2026-01-29 变更日志中移除）。

## 本项目实测层（E-2026-EVAL）——v7 新增

> **证据等级口径**：本区条目来自 humanizer 项目 2026-09 六文体三臂盲评实测（450 篇语料、13 评审席次），证据代号 **E**（= 本项目 eval 实测），与 S（StoryScope）/V（vendor 指引）分层——**E 级证据的规模与条件注明在各条目内，不得与 S/V 混读**；E 级条目只在本项目语料上验证过，跨语料是外推。
>
> **表外家族降级口径（C1.3）**：家族无表时按 humanizer SKILL.md 模型身份规则「loads nothing, reports none」执行——技能对表外家族的泛化上限=共享 pass + 本区跨家族共性条目（实测：表外生成器走共享 pass 后中文文体 HZ 臂仍达 72-100%，英文文体 0-24%，说明**共享 pass 对英文表外家族不够用**，需本区条目补位）。

### GLM 家族（E；glm-5.3-flash，本项目 HZ/RAW 臂生成模型）

实测条件：六文体 × 25 篇/文体（HZ 臂加载本技能生成；RAW 臂裸生成），13 席盲评 + 语料层复核。**无 vendor 提示词文档可引——本区全部为本项目实测，E 级。**

| 指纹（实测） | 数字 | 更正/防护 |
|---|---|---|
| 跨篇句式模具复用（英文技术文最重） | `wearing a X costume` 类构造 HZ 3 篇/真人 0；评审点名 12 处 `the caveat/verdict… owes one`、4 处 `If I compress X into Y` | style-pass 跨篇模具黑名单 + used_before 台账（draw sheet） |
| 每段格言化 + 结尾 capstone 反转（英文） | 评审点名约 48/74 篇「每段末尾格言化」 | 警句跨段配额 + 平段配额（draw sheet quotas） |
| 元话语-让步丛（英文随笔） | 生成臂 48-72% 篇目含 `I want to be clear/honest` 类（真人 12-33%；三种定义宽度实测） | 元叙事黑名单（style-pass 英文侧） |
| 修辞通胀：自造比喻/格言密度 | 评审实测 AI 组 5-10 个/篇 vs 真人 0-2 | 造词与巧喻配额（style-pass v7） |
| 系统化同音错字（中文口语，配合固定词表时） | 六例同簇（评审语料层交叉检出） | 错字抽签纪律（draw-sheet D.7）：类型随机+处数可 0+禁固定词表 |
| 句长/段长方差收敛 | 句长 SD 15.07 vs 真人 23.89；段长 SD 35.07 vs 63.72 | 参数带抽签（D.3）+ 长度方差附则（D.6） |
| 中文侧相对稳健 | 中文三文体 HZ 臂 72-100%（宽席 100%） | 维持中文支线现行做法；失分点（认识弧/金句收尾/三层闭环）已由 W0.9-W0.12/W0.13-14 覆盖 |

### DeepSeek 家族——散文层补位（E；deepseek 家族散文形态，本项目评审模型侧证）

> 实测说明：deepseek 家族在本项目只作为**评审席**出现（非生成模型），以下条目是**评审视角的散文层侧证**（评审用什么抓 AI，即该形态在生成侧的暴露面），E 级、单语料。

| 指纹（评审定罪面） | 数字 | 对生成侧的启示 |
|---|---|---|
| 元叙事提示语（英文） | "this is the part of the story where…" / "Let me do the honesty part first" 被逐篇点名 | 元叙事黑名单对生成侧生效（style-pass） |
| 结构闭环/三层齐装（中文议论文） | 「三层闭环」「设问过渡」被点名为中文侧三篇定罪指纹 | 结构五档（draw sheet D.6）+ 平段配额 |
| 妙喻装置贯穿（中文） | 「妙喻装置」跨篇复用被点名 | 巧喻 ≤1/篇 进抽签 |

## 人类指纹——正向目标

人类作者在所有模型上都偏离的特征，可直接当配方用：

| 人类标记 | 配方 |
|---|---|
| 主角在对话中被介绍（uniqueness 21.4——研究中最强的单一标记） | 首次出场：角色在说话，无注释 |
| 单一焦点视角贯穿 | 深度胜过视角跳跃（head-hopping） |
| 叙述者从不称呼读者、偶尔才称呼 | 插语无系统 |
| 揭示后置的节奏 | 最重的东西落在后面 |
| 跨类型文学野心 | 让类型作品也想成为别的东西 |
