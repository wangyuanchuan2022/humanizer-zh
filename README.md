# humanizer-zh · 去 AI 味写作技能（中文增强版）

> A context-aware "de-AI" writing skill for Chinese & English text, based on [blader/humanizer](https://github.com/blader/humanizer) (MIT) with major Chinese-specific enhancements: context dispatch (casual chat vs. formal writing), positive colloquial strategies mined from real online comments, and formal-essay sentence patterns extracted from 17 People's Daily articles.

一个"去 AI 味"（humanize）改写技能：把带 AI 腔的文本改写得更自然、更像人写的，不改变原意、不丢失信息。

在 [blader/humanizer](https://github.com/blader/humanizer) 的 35 条规则（源自 Wikipedia "Signs of AI writing"）基础上做了大幅中文增强，核心是**语境分派 + 分类正向策略**：不再只"删 AI 腔"，而是按目标场景"写出人味"。

## 特性

### 1. 底线层：35 条 AI 痕迹检测规则
内容类（夸大意义、营销腔、模糊信源）、语言类（AI 高频词、伪深度句式）、格式类（破折号滥用、过度加粗、表情装饰）、聊天机器人残留、填充与含糊——沿用并中文化 blader/humanizer 体系。

### 2. 语境分派（改写前置）
改写前先判定目标场景，判不出就问一句：

| 档位 | 子类 | 典型场景 |
|---|---|---|
| 口语 | S1 熟人闲聊 | 朋友私聊、群聊 |
| 口语 | S2 社区公开发言 | 贴吧/知乎/B站/微博/豆瓣评论回复 |
| 口语 | S3 半正式交流 | 向老师/上级汇报、工单、求助帖 |
| 书面 | W1 议论文/时评 | 政论、考场/竞赛议论文 |
| 书面 | W2 说明性文章 | 科普、解读、综述 |
| 书面 | W3 正式应用文 | 申请书、总结、报告 |

底线禁令与口语策略冲突时按语境调和（如 emoji 禁令在书面语境生效，在口语语境转为配额制人味元素）。

### 3. 口语化正向策略（S1-S3）
来自真实网友评论调研（豆瓣"在再警队"、NGA 括号讨论、linux.do"佬友"称呼等 19 个社区帖 + 10 篇学术文献佐证）：

- 自然错别字配额：只错高频混淆对（在/再、的/地/得），全篇 1-2 处
- 表情/颜文字/空括号「（）」低频策略性使用，位置随意
- 平台匹配的称呼与梗（家人们/uu们/佬友/老哥……），跨平台乱用最容易被识破
- 十条"假人味"反面清单（每句必加 emoji、总结句收尾、节奏均匀等 LLM 指纹）

### 4. 书面写作正向策略（W1-W3）
句式提取自 **17 篇真实人民日报文章**（人民论坛、人民时评、钟声、宣言、任仲平等 9 个栏目），并经真人议论文样本校准：

- W1 议论文十步流程：核心意象贯穿 → 开篇四型 → 段首小标题 → 古今双证 → 句式引擎（设问推进/"不仅A更B"/对举收段）→ 金句铸造 → 引用纪律 → 辩证让步段 → 收束三件套 → 关键词活用
- 23 条模式每条附人民日报原句与出处（见 [`references/renmin-examples.md`](references/renmin-examples.md)，智能体可按需自主加载）
- 真人笔迹原则：书面人味来自风格结构而非刻意错字，但保留千字 2-4 处自然瑕疵——通篇无瑕反而是 AI 嫌疑

## 文件结构

```
├── SKILL.md                        # 技能主文件（底线规则 + 语境分派 + 分类策略 + 改写流程）
├── references/
│   └── renmin-examples.md          # 人民日报原句库（17 篇 + 23 条模式，附来源链接）
├── presets/humanizer/              # [可选] DSH Agent 预设配置
│   ├── agent.cordis.yml            #   persona + 工具挂载（含 web 搜索）
│   └── preset.yml                  #   预设元数据
└── README.md
```

## 安装

### 通用技能系统（Claude Code / DeepSeek Harness 等）

把 `SKILL.md` 与 `references/` 拷入你的技能目录，如：

```
~/.claude/skills/humanizer/SKILL.md
~/.claude/skills/humanizer/references/renmin-examples.md
```

（DSH 用户为 `~/.dsh/skills/humanizer/`；技能加载后按 SKILL.md 内指引按需读取 references。）

### DSH Agent 预设（可选）

把 `presets/humanizer/` 整个目录拷到 `~/.dsh/.agent-presets/humanizer/`，即可获得一个挂载了 web 搜索、内置此技能的"去 AI 味改写"专用智能体。spawn 时传 `agentPreset: humanizer` 使用。

## 使用示例

- 「把这段话改得像真人发的朋友圈」（→ S1 档）
- 「这篇回复要去 AI 味，发在知乎评论区」（→ S2 档）
- 「帮我把这篇作文初稿改得更像人民日报议论文」（→ W1 档）
- 「这段文字是 AI 写的吧？帮我改自然点，要用在我的实验报告里」（→ W3 档）

## 来源与致谢

- 底线规则体系改编自 [blader/humanizer](https://github.com/blader/humanizer)（MIT License），基于 Wikipedia [Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)
- 口语策略证据来自公开网络社区讨论与语言学研究文献（SKILL.md 内附来源）
- 书面句式摘录自人民日报/人民网公开文章，**版权归原作者及报社所有**，此处仅为写作学习与研究目的的少量例句摘录，每条均附原文链接

## License

MIT（见 [LICENSE](LICENSE)）。人民日报例句摘录不适用本许可证，其权利归原权利人。
