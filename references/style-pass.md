<!-- v5.0 编译自 sepia v0.11.0 references/style-pass.md（MIT）+ humanizer v4.6 通用条目安置 -->

# Pass 3 — 措辞风格层（style pass）

最后跑这一遍（Pass 3），在结构修完之后。证据：LAMP/CHI 2025（L）、Reinhart et al. PNAS 2025（P）、Russell et al. ACL 2025（R）、Shaib et al. slop 分类学（S）、小说/RP 社区 ban list（F）、Desaire et al. 2023（D）、Gude et al. 2026（G）、Muñoz-Ortiz et al. 2024（M）、朱君輝 et al. CCL 2023 中文研究（Z）、Freeburg 2026（E）。稳定的出处身份存于 sepia 仓库研究台账（research ledger）；本文件中的单字母别名仅在本文件内有效。凡出处未实测检验过该干预的处方，均为 sepia 的设计推断（design inference）。编辑操作配比偏**替换 74% / 删除 18% / 插入 8%**（L）——拿不准就删。文本只允许因一个理由变长：具体的实指信息（concrete specificity）；修复不是增长（repair is not growth，见 §4 末段）。本文为 humanizer v5.0 的措辞风格层细则，与 narrative-pass.md / discourse-pass.md 同属 pass 链；硬护栏（如「不得编造具体细节」）由 SKILL.md 统一承载，此处不重复。

## 1 七伪迹（seven artifacts）

按职业写作者实际动手修的频率排序——这个顺序就是优先级：

| # | 伪迹（artifact） | 修法 |
|---|---|---|
| 1 | 用词不当/语域错位（awkward word choice，28%） | 换掉误用或语域不搭的词。"seem to + 动词" → 动词本身，除非不确定是真的。理清指代不清的代词与过多的被动。 |
| 2 | 句子结构差（poor sentence structure，20%） | 把连跑句拆成两句。一个缠在一起的想法 = 两句平实的话。 |
| 3 | 冗余铺陈（redundant exposition，18%） | 删掉场景已经暗示了的内容。「[主句]，[尾随分词短语复述主句]」→ 逗号后全删（"cast long shadows over the desolate landscape" → "cast a long shadow"）。 |
| 4 | 陈词滥调（cliché，17%） | 换成新鲜的、贴着具体场景的语言——**绝不换成一个更平淡的转述**（这是有记录的机器失败模式）。拿不出新鲜的说法，就删掉这一句。 |
| 5 | 缺乏具体性（lack of specificity） | 做加法的修法（§4 末段）：真实的人名、物件、数字、来自生活细节的动作。缺材料就问用户——补更泛泛的描写只会更糟。 |
| 6 | 紫色散文（purple prose） | 做减法。用一个长抽象名词句传达一种情绪 → 短而具体的句子（"She cried. She cried for unfairness. She cried without relief."）。 |
| 7 | 时态不一致（tense inconsistency） | 钉死时态；在段落内部追猎漂移。 |

**v4.6 安置条目（按 SPEC 映射表融入本节）**：

- **空洞的伴随状语分析（v4.6 §3 → #1）**：信号词——凸显了、彰显了、体现了、展现了、强调了、确保了、反映了…的深厚底蕴、为…注入了新活力。用一个伴随短语让简单事实显得「有深度」。修法：删掉分析腔，保留事实。
- **回避简单系动词（v4.6 §8 → #1）**：serves as / stands as / represents → 用 "is"；中文「作为…而存在」「堪称」→ 直接用「是」。
- **同义词轮换与重复句首（v4.6 §11 → #1/#2）**：同一对象换着叫（主人公→主角→这位人物→他）；连续多句用相同主语开头。修法：统一称呼；合并句子或换主语。
- **被动语态与缺失主语（v4.6 §13 → #1）**：需要说清动作执行者时用主动语态、补出主语。口语档省略主语的授权按 colloquial-base.md S0.8，调和声明在 SKILL.md 调和规则——本条不是「主语必须完整」。
- **填充短语·英文侧（v4.6 §23 → #1）**：in order to → to；due to the fact that → because；at this point in time → now；has the ability to → can；it is important to note that →（删）。中文侧（为了能够→为了、对…进行+动词→直接用动词等）归 zh-hans.md 双音节凑词节。
- **强行金句与破碎短句连发（v4.6 §31 → #6 做减法）**：恢复正常句长与具体陈述；自检分流见 selfcheck.md 测②。

## 2 句法模板（syntax templates to hunt）

这些词法/句法形态在 LLM 散文里的出现频率是人类散文的 2–5 倍，且被职业编辑大量修掉（L、P）：

| 模板 | 例 | 修法 |
|---|---|---|
| a/the [抽象名词] of [名词]（and [名词]） | a mix of pride and fear · a sense of wonder · a pang of nostalgia · the weight of expectation | 说出那个具体的东西，或砍掉包装名词 |
| the [形容词] [名词] of [所有格] | the intricate tapestry of its · the unspoken plea in her | 从头重写 |
| 尾随/前置分词从句（trailing/leading participial clause） | "…, evading Show's heavy blows" · "Stuffing his mouth, Joe ran" | 拆成带限定动词（finite verb）的独立短句（LLM 用频：人类的至多 5 倍） |
| 名词化（nominalization） | realization、determination、transformation 作句子主语 | 还原成动词（人类速率的 2 倍） |
| 成对抽象名词 "X and Y" | desperation and resolve · curiosity and caution | 留一个 |
| not only X but also Y · it's not X, it's Y | （中文形态：「不是X而是Y」「不仅仅是X更是Y」） | 说你真正要说的那一件 |
| 强行三段式（rule of three） | 三个并列的形容词/从句/意象，无处不在（中文例：「创新、协同与突破」「看得见、摸得着、感受得到」） | 用二或四；打破节奏 |

**v4.6 安置条目（按 SPEC 映射表融入本节）**：

- **"不是X而是Y" 句式滥用（v4.6 §9 → 上表第 6 行）**：用否定-递进句式制造伪深度。修法：直接陈述 Y；同理删掉句尾截断式否定（「…，不用猜」）。单次使用的豁免见 zh-hans.md 白名单。
- **强行三段式排比（v4.6 §10 → 上表 rule of three 行）**：意义需要几个就写几个。篇章级「提出问题—分类—转折—给标准—收束」全链条齐装的检查在 discourse-pass.md §3。
- **连字符词对滥用（v4.6 §26，英文）**：仅保留语法必需的连字符（如 well-known 保留；临时拼贴的连字符词对拆开重写）。
- **套话式格言（v4.6 §32）**：「X是Y的Z」「X是一面镜子」「…的语言/货币」式格言模板 → 还原为具体主张。

## 3 词汇 ban list（vocabulary）

合并 ban list（R Table 12 + P excess-vocab + L signature phrases + F fiction slop）。单次命中不是判决——**slop 是累积判定的**（S）：数命中数，聚簇了才重写。这类清单也会过时，目前已在一个语料里测过：在 207,111 篇天文学论文上，一张固定的 72 词标记清单在 AI 辅助文本里的聚合超额，从 2023 年的背景 3.5 倍降到 2026 年的 1.5 倍，delve 在 2024 年中之后退潮，而 underscore 与 notable 持续上升（Saad & Ting 2026，ledger `SAAD-TING-2026`；仅 astro-ph，混合模型估计，无标注的人机对照语料）。这是「一张特定清单在单一语料里的聚合信号」的性质，不构成本表中任何单词的豁免；本表的词也不是从检测器输出里加进来的。

| 类 | 词/短语 |
|---|---|
| 抽象宏伟名词（abstract-grandeur nouns） | tapestry, testament, symphony, kaleidoscope, landscape, realm, journey, beacon, camaraderie, solace, resilience, nuance, myriad, interplay† |
| 表演性动词（performance verbs） | delve, underscore, foster, harness, navigate, resonate, elevate, embrace, transcend, unravel, ignite, grapple, weave/weaving, showcase†, garner†, leverage†, highlight†（动词） |
| 膨胀形容词（inflation adjectives） | intricate, vibrant, palpable, profound, pivotal, crucial, seamless, robust, transformative, multifaceted, fleeting, bustling, key†（形容词） |
| 小说 slop（F） | ozone, petrichor, shimmering, thrums, gossamer, "barely above a whisper", "eyes gleam/glint/alight", "despite herself", "breath catches", "heart skips", "shivers down the spine", "voice like [material]" |
| 签名短语（L） | unspoken, the weight of, hung in the air, the air was thick, in the pit of her/my stomach, a constant reminder of |
| 公式短语（R） | paving the way, it's important to note, in a world of/where, a testament to, cautionary tale, "amidst" |
| 过滤词（filter words，F） | felt, seemed, realized, noticed, knew, watched as——删掉过滤器，直接把事情本身写出来 |

† = humanizer v4.6 §7b 英文高频词表并入项。v4.6 §7b 全表（delve, landscape（抽象）, tapestry, testament, underscore, pivotal, crucial, vibrant, showcase, foster, garner, leverage, robust, seamless, intricate, interplay, key（形容词）, highlight（动词））已整体并入上表对应类目，无删减；修法通则：换成普通词或删除，讨论这些词本身的引文不改。

**伪装深刻·英文侧（v4.6 §27 → 本节）**：the real question is / at its core / ultimately → 直接说观点（中文侧「真正的问题是」「本质上」「归根结底」归 zh-hans.md）。

## 4 回加清单——被欠用的人类语域（what to add back）

指令微调模型系统性压制以下元素（P：用量仅为人类速率的 13–80%）。恢复它们——**恢复到文体与作者声音允许的程度**——是撒一点，不是倒进去：

| 回加 | 例 |
|---|---|
| 缩写（contractions） | don't, it's, wouldn't |
| 话语标记与填充词（discourse particles and fillers） | well, anyway, just, really, actually |
| 平实因果连接词 | because（GPT-4o 的用量仅为人类的 20%）、so |
| 限定语与强调语（hedges and emphatics） | almost, sort of, for sure, obviously |
| 否定（negation） | "no answer was good enough"——合成文本的否定用量是人类的一半 |
| 代动词 do（pro-verb do） | "and she did" |
| 平实引语标记（speech tags） | *says/said* 反复用是人类；轮换 *notes, observes, remarks, muses* 是机器的优雅 |
| 第一/第二人称、直接问句 | 视角（POV）允许处 |
| 粗话或直白语言 | 语域真的需要处 |

**回加不是灌水（restoring is not padding）。** 机器编辑人类文本会留下自己的痕迹，而且不是它改掉的那些词：相对人类原稿，机器编辑后的文本词汇密度（实词占比）骤降（d = −3.10）、熵下降、词汇多样性几乎没动——与生成足迹（两者同升）恰好相反（Shan et al. 2026，ledger `SHAN-EDIT-2026`；测于英语，向其他语言外推是 sepia 推断）。直白地读：编辑者的指纹就是它往内容周围灌的填充物。所以 refactor 收尾前跑两个测试。对加的每个词/短语跑**删除测试（deletion test）**：划掉它；句子仍然成立、意思不变，它就是填充物——删。对每个替换跑**回退测试（reversion test）**：换回原词；如果原措辞本来就好、还更省字，保留原词。修复类编辑两个测试都不该过、且必须留下：破碎句子需要的冠词和介词、拆句需要的主语、替换名词化的动词、让不合语法的句子合语法的语序调整；修复不是增长。上表条目是有意回加的，两个测试的精神都不违背，允许的唯一条件是：同一处编辑必须在同段某处删掉过填充物，且该段结束时长不得超过开头。生成与编辑留下不同痕迹、检查方式不同：§2–3 与 §5 猎的是生成痕迹；本段守的是编辑痕迹。

## 5 文体对齐与句长节奏（genre alignment and sentence rhythm）

Reinhart et al. 报告：指令微调模型偏爱信息密度高、名词味重的风格，难以匹配文体对齐的变化（P）。动笔前先声明目标语域（literary / pulp / YA / essayistic），朝**它**修——一篇去 AI 味的惊悚小说和一篇去 AI 味的文学小说不该修成同一种声音。句长方差、缩略率、词汇平实度是文体参数，不是普适常数。

**关于句长，实测有什么。** 在四个测过它的研究里——横跨两代模型与两种语言——LLM 输出的文本内句长*离散度*都小于人类写作：段内标准差与相邻句长差都在人类段落里更高（D，未印数值）；1–15 token 的句子占人类新闻句子的 32–33%，2025 指令微调模型只有 1–4%（G）；41 token 及以上的句子占人类句子的 12.0%，2023 基座模型只有 5.5%（M）；中文回答的每答句长 SD 为 9.248 对 6.729 词（Z）。另有三个英文研究只在文本*之间*（每篇均值的离散度）发现同向结果，方向一致但不构成文本内检查的证据，不计入此处。*均值*不是信号：相对 2023 基座模型，人类句子长约长 10–20%，而 2025 对齐模型写的句子比人类长 15–30%（G，论文原文表述）；在一个中文语料上，方向随计数单位翻转（Z）。没有任何英文研究给出人类对 LLM 的文本内 SD 数字，上面的中文数字也来自单一语料与一个 2023 模型——所以不存在可引用的数字阈值，这里也不设。一项读者侧研究同向：在 124,615 份 ICLR 评审（2018–2025）中，人类评审的分数随论文文本内句长 SD 逐年上升（标准化 β：2018–2020 池化 +0.045、2023–2025 池化 +0.052），而一个冻结的 LLM 评分器对同样的论文没有这种关联（−0.020、−0.001）；同期同一批人类评审不再奖励跨领域词汇复杂度（+0.142 升至 −0.015），冻结评分器则停在 +0.080 到 +0.082（ledger `ZHENG-2026`；仅学术评审，且人类句长效应的量级跨年未变）。这是专家读者的偏好，不是检测器特征，也不给下面的检查增加任何阈值。

**检查（sepia 推断）。** 找相邻句长度相近的连排——三句或以上连排；「三」和「长度相近」是阅读约定，不是实测界限。这是 D 的相邻句长差特征的文本内形态，任何语言、任何计数单位都可用，只要单位全程一致。这种连排是*候选*信号，只有与其他命中并存才计数（slop 是累积的，§3）。不要按「某长度阈值上下的句子数」给段落打分：上面的尾部分布率是语料级、文体级数字，在新闻导语上以 token 计（G、M）、在科学段落上以词计（D）——一个没有超短句也没有超长句的段落是普通人类散文，从这些数字推导不出任何逐段阈值。检查需要至少段落长度的连续行文，这正是 D 测量的单位：一行回复、bullet 列表、表格、commit 式 release note 没有节奏可测，扫描报 `none`。中文的同一检查与中文口径数字见 zh-hant.md（繁台校准）与 zh-hans.md（简体）。

**修法。** 用挪词打破连排，绝不靠加词（即本文件头的 74/18/8 配比）：拆一个长句、并两个短句、或删一个从句。往哪边破，由文本决定——长句连排想要一个短句，短句连排想要一个长句。不要把所有句子都改短：清一色短句的段落是同一缺陷从另一面看，读起来像仿作（pastiche）。一条实测先验可以参考方向：当被检文本的产出模型——review 与 refactor 诊断阶段的作者、write 场景的 executor——是 G 测过的四个 2025 对齐发行版之一（Qwen 2.5、LLaMA 3.3、Mistral v0.3、GPT-4o，新闻导语语料）时，消失的是短句；对其他所有家族（包括 Claude 与 Gemini）不存在句长研究，executor 在处理人类或旧模型文本时也不引入该先验。

## 6 朗读测（read-aloud test）

语法正确但念不出口是一个独立的 slop 维度（S："the earthen area that formerly held the puddle was now dry"）。把对话与你改写过的每个句子出声读一遍（心里读亦可）：如果没有任何母语者会这么说、也不会这么写信，就用口语形状的句法重写。

## 7 误报白名单（false-positive whitelist）

这些**不要**标记、也不要「修」——过度纠偏本身就是指纹：

| 不是 AI 证据 | 为什么 |
|---|---|
| 语法正确、标点干净 | 很多人类本来就写得干净；故意注入不完美是可被识别的花招 |
| 单个破折号、分号或 "delve" | 一次命中什么也不说明；只有聚簇才计数 |
| 正式文体里的中性或正式语气 | 语域匹配胜过强装随意 |
| 引文对话或世界内文档里的 ban word | 引用材料保留它自己的质地 |
| 作者本人已验证的习惯 | 如果用户的写作样本用破折号或 "moreover"，那些保留 |
| 适度的普通句子 | 松弛是人；不要把每一行都磨出「特色」 |
| 标点密度或逗号/句号计数 | 实测方向互相矛盾：某中文问答语料上标点密度为人类 0.135 对 ChatGPT 0.136（Z），而标点占 token 比为 16.0% 对 13.4%（Guo et al. 2023，同一语料）；英文新闻里人类份额 11.88%，四个基座模型为 10.77–12.14%，其中一家高于人类（M）。英文与中文都不存在按标点类型（逗号/句号/分号）的人机对照计数。Pangram 在其 2025 workshop 论文中描述的英文管线（12B 参数分类器）打分前把输入小写化并做 unidecode 归一，这会把字形变体坍缩到 ASCII（em dash 变成两个连字符、弯引号变直引号）而非抹掉它们；其 2026 架构不同且预处理未描述。这削弱了「字形选择是这类检测器读得到的东西」这一前提，但没排除；本行白名单依据的是上面互相矛盾的实测，不是这个 |
| em dash 频率作为模型无关的 tell | 按 2025–26 各发行版每千词实测：10.62（GPT-4.1）、9.09（Claude Opus 4.6）、1.43（GPT-5.4）、0.00（Llama 3.x），人类均值 3.23（八篇散文，E）。这是发行版属性——上面的聚簇规则与 model-fingerprints.md 的发行版 scoped 散文层适用——绝不做一刀切规则 |
| 段落数量或段落平均长度 | 方向跨语料矛盾：how-to 文本里 LLM 段落更长（82.01 对 68.83 词），生成论文里更短（39.82 对 51.12），中文回答里段落更多（3.681 对 1.442）。只有文本内段落长度的*均匀性*才是信号（discourse-pass.md §3） |

**v4.6 误报警示并入（融入本节口径）**：

| 不是 AI 证据（v4.6） | 为什么 |
|---|---|
| 语法完美、风格统一不是 AI 证据 | 与上表第 1 行同口径：完美 ≠ 机器 |
| 单独一个连接词（此外/然而）不是问题，堆叠才是 | 聚簇规则：单次命中不是判决 |
| 单个破折号、单个 emoji 不构成证据 | 多个模式叠加才是 |
| 引文、标题、专有名词、被讨论的短语本身不改写 | 讨论这些词/短语本身的文本不在改写范围 |
| 有用的免责声明、范围说明、真实的更正与问答要保留 | 它们承担信息功能，删了丢内容 |
| 保留体现人味儿的细节 | 具体罕见的细节、矛盾复杂的情绪、有年代感的梗、长短交替的句子节奏、真诚的旁白与自我修正 |

> 随意化（informality）不是伪装。在 Russell et al. 测过的人性化条件下，专家读者仍检出其他机器模式线索；只加口语腔并没有消除它们。该结论不等于「每个随意的模型输出都可检出」。
