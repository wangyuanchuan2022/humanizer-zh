<!-- v5.0 编译自 sepia v0.11.0 references/professional-pass.md（MIT）+ humanizer v4.6 条目安置 -->
# Professional pass — 非虚构文体共享层

适用于所有非虚构领域（release notes、PR/issue 回复、postmortem、工单、技术文章、长篇报道，以及其他一切非虚构叙事文体）。证据基础：AI 腔分类学（slop taxonomy，Shaib et al., **S**）、专家级 AI 检测器研究（Russell et al., **R**）、体裁对齐发现（Reinhart et al., **P**）、Wikipedia/humanizer 已文档化特征语料（**W**）。稳定来源身份存于仓库研究台账（research ledger）；本文件内的单字母别名（S/R/P/W）为文件内局部别名。除非所引来源明确实测过某项干预，否则各处方（prescription）均为 Sepia 设计推断（design inference）——设计推断 vs 实测的区分全程保留。

> 专业文体里的目标不是「骗过检测器」——而是文本承载信息、有立场、读起来像署名者本人写的。常规结构在这里完全没问题；要清的是结构内部的填充物（slop）。

## 先读场地（venue 先行）

动笔或改稿之前，先从同一场地（venue）抽样 2–3 份近期人类写就的样本——仓库过去的 release notes、维护者最近的回复、团队上一次的 postmortem——对齐其语域（register）、长度规范与格式习惯。Reinhart et al. 报告：指令微调模型偏爱信息密集、名词堆叠的风格，难以匹配体裁对齐的变体（P）。定义目标声音的是场地语料，不是本技能。没有场地语料时，适用领域文件（domains/*.md）的人类基线。

## 检查表（10 项）

逐项单独跑（合并一次跑会失明——正是在本分类学上实测的结论）。AI 味是**累积的**：命中一处说明不了什么；聚集成簇才意味着重写。

| # | 检查 | 要猎什么 |
|---|---|---|
| 1 | 聊天机器人残留（chatbot residue） | "Great question"、"Thanks for raising this!"、"I hope this helps"、"Certainly!"、"You're absolutely right"、主动提供进一步帮助、道歉式开场、"Let's dive in"。删——同事说话不像客服台。中文例（安置自 humanizer v4.6 §20-22）：对话残留「希望这对你有帮助！」「当然可以！」「你说得非常对！」「需要我继续吗」「以下是…」「让我为你…」全部删除，直接给内容；知识截止免责与猜测「截至我所掌握的信息」「由于公开资料有限」「据推测很可能」「据悉」——说明来源里没有什么，或删句，不把猜测当事实；过度讨好「这是个好问题！」「非常好的观点！」删掉恭维直接回应。 |
| 2 | 密度（density） | 能否用一半篇幅说同一件事？任何语境下都成立的泛泛之谈（"in today's fast-paced world"、"it's important to note"）零信息——删。篇幅必须与利害成正比，两个方向都算：删过头丢了必要的警示或下一步，同样不及格。中文例（v4.6 §2/§28）：堆砌头衔——罗列媒体报道、粉丝数、奖项证明人物/事物重要，却不给任何具体内容，只保留有实际信息量的引用；预告下文（「让我们深入探讨」「接下来我们来看」「废话不多说」）删掉预告直接讲。 |
| 3 | 相关性（relevance） | 每一段是否服务于**读者的任务**——他们来这一页要找到的东西？读者已具备的背景、把问题复述一遍、范围巡礼（scope tour）都是填充物。中文例（v4.6 §34/§35）：回应没人提出的反对意见（「我并不是说…」「这不是关于…」而正文别处并无此话题）——删；驳斥虚假选项（「一种诱人的方案是…但」后文再也不提）——删，直接讲真实约束。 |
| 4 | 立场（stance） | 需要判断的地方就承诺一个判断。主观性缺席是实测过的 AI 腔维度（S）：没有裁定的评审、没有推荐的对比、不认错误的事故复盘。每条真正脆弱的主张限定（hedge）一次，不是每句都限定。中文例（v4.6 §34/§35）：删掉没人问的预防性辩护与永不兑现的假选项，把立场落成真实的裁定或推荐。 |
| 5 | 具体性（specificity） | 版本号、数字、file:line、命令、逐字的报错文本、人名——要在场且**真实**。绝不拿编造的细节凑数；自信陈述的错误事实本身就是顶级破绽（R）。信息缺失 → 去问，或留显式 TODO。中文例（v4.6 §5/§2）：模糊信源——「业内人士表示」「有专家认为」「观察人士指出」「据多方消息」「不少网友纷纷吐槽」（无具体来源），有真实来源就写来源，没有就删掉该主张，绝不编造来源；纯背书式头衔罗列给不出具体内容，与信源模糊同判。 |
| 6 | 格式特征（formatting tells） | 散文能胜任处用「粗体小标题+列表」；emoji 当装饰；Title Case 标题；每节等长；处处恰好三条的列表；首句复述标题；分形摘要（fractal summary：每一层都「预告→正文→复述」）（W）。这些的缺席不构成人类证据：模型对哪种格式过用或欠用随其版本变化（见 `model-fingerprints.md` 的 prose layers）。中文例（v4.6 §15/§16/§17/§18/§29）：无理由的加粗全部还原为普通文字；`- **性能：** 性能得到提升` 式「粗体标签+冒号」列表，无信息增量时改写成连贯段落；标题每词首字母大写改普通句子大小写；🚀💡✅ 等装饰性 emoji 删掉；标题后复述标题的句子删掉。 |
| 7 | 结论残留（conclusion residue） | "In conclusion/summary" 式小节、复述已说内容、泛泛未来展望（"we will continue to improve…"）。内容到哪结束就到哪结束。中文例（v4.6 §6/§25/§28）：套路式「挑战与展望」结尾（尽管面临…挑战、展望未来、未来可期、在…的道路上继续前行）删掉空泛展望，以最后一个具体事实结尾；空洞正能量结尾（「让我们拭目以待」「相信在…的带领下」、"The future looks bright"）删掉，以最后一个具体事实收尾；预告下文同属结构残留。 |
| 8 | 模板化（templatedness） | 同一句子框架循环使用（"X, a Y at Z, said that…" 连出三次）；每个条目措辞完全相同。变着写，或改表格。 |
| 9 | 节奏均一（sameness of rhythm） | 段落长度与句长全程均匀。人类专业文字不均匀——要紧处深，不要紧处一行。句节奏用 `style-pass.md` §5 的检查测量。 |
| 10 | 流畅但不可说（fluency） | 语法正确但没人会这么说（"the earthen area that formerly held the puddle"）。出声读；如果没人会在邮件里这么说或这么写，用口语形状的句法重写。 |

跑完检查表后，接 `style-pass.md` §2–3 的词汇/句法扫描与 §5 的句长节奏检查；refactor 操作再跑 §4 的收尾段检查（ban 表对专业文体同样适用；虚构腔表不适用；无连排正文的文本节奏检查报 `none`）。

## 领域加权

哪些检查占主导取决于文档形态（实测：S）：

| 文档形态 | 优先加权 |
|---|---|
| 文章型（article-like：postmortem、技术文章、公告） | 相关性、密度、立场/语气、连贯性 |
| 短答复（PR/issue 回复、评审评论、工单） | 事实性、具体性、模板化——短篇幅下密度与语气的权重降低 |

加权只决定注意的顺序与深度，不构成豁免：一条淹没在填充物里的短回复，照样过不了密度关。

长篇（文章、postmortem）另跑 `discourse-pass.md` §1–3 的大纲测试（outline test）与 QUD 检查：逐段抽出首句；干净的摘要式大纲与「简报→论证→后果→反思」的问答序列都是机器形状。

## 报告格式（review 操作；refactor 阶段 1 编辑前打印同一份报告）

模板保留英文原文（sepia 功能性输出格式，字段与取值照原样输出）：

```text
SEPIA REVIEW — <document type, venue>
Loaded: <files used>
Model: author=<value> executor=<value>   (value: unknown | <family> version=unknown | <family> <release>; a release is an exact tag like Fable 5.1 or GPT-5.6 — "GPT-5" alone is a family, write "GPT version=unknown")
Prose layer: author=<operative | prior | none> executor=<operative | prior | none>   (operative = the release's own table is operative and the family's other tables are priors)
Venue corpus: <artifacts sampled, or "none — using domain baseline">
Style scan: <style-pass §2–3 and §5 rhythm hits with quoted evidence, or none>
Failed: <#n check-name — quoted evidence>   (one line per failed check)
Deferred: <#n check-name — quoted evidence — needs human | none>   (unattended runs only; omitted otherwise)
Protected: <#n check-name — quoted evidence | none>   (only when ranges were declared, omitted otherwise; the passage is identified by its quoted words, never by a number the model derives — the caller already holds its own ranges)
Passed: <check numbers only>
Verdict: <clean / isolated hits / cluster> → <ship / refactor / recreate>
```

## 白名单——惯例不等于 AI 味

| 不要标记 | 原因 |
|---|---|
| Changelog 分类、issue/PR 模板、RFC 章节、runbook 格式 | 惯例使然的程式容器；社区预期如此 |
| 正式场地里的正式语域 | 语域匹配胜过强行随意 |
| 真正可枚举事项的列表 | 表格与列表对可枚举事实是正确形态 |
| 简短、不加修饰的回复 | 简洁是开发场地的人类默认，不是破绽 |
| 作者自己经过核实的习惯 | 朝着 TA 的声音编辑，而不是某个泛化的「人类」 |

误报警示（v4.6 误报警示整节安置）：语法完美、风格统一不是 AI 证据；单独一个连接词（此外/然而）不是问题，堆叠才是；单个破折号、单个 emoji 不构成证据，多个模式叠加才是；引文、标题、专有名词、被讨论的短语本身不改写；有用的免责声明、范围说明、真实的更正与问答要保留；保留体现人味的细节——具体罕见的细节、矛盾复杂的情绪、有年代感的梗、长短交替的句子节奏、真诚的旁白与自我修正。
