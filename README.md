# humanizer-zh · 去 AI 味写作技能（中文增强版）

> A context-aware "de-AI" writing skill for Chinese & English. **v5.0 rebuilds the skill on [Nanako0129/sepia](https://github.com/Nanako0129/sepia)'s measured three-layer evidence model**, keeping all Chinese-specific assets from v2-v4: context registers (S1-S3 casual / W1-W3 formal), programmatic-document fingerprints mined from real applications, a People's Daily sentence reference, and a ghost-writing workflow. Based on [blader/humanizer](https://github.com/blader/humanizer) (MIT).

一个"去 AI 味"（humanize）写作技能：把带 AI 腔的文本改写得更自然、更像人写的，或从零写出人味，不改变原意、不编造事实。

v5.0 按 [sepia](https://github.com/Nanako0129/sepia)（MIT）的实测证据骨架完全重构。sepia 的核心发现（StoryScope，61,608 篇故事）：**仅凭叙事架构层特征检测 AI 文本可达 93.2%，而人类编辑改写表层措辞后检出率仅从 95.5% 降到 93.9%**——只改字词几乎无效，真正的指纹在架构层。

## 核心架构

### 三层模型（修复顺序 deepest first）

| 层 | 内容 | 文件 |
|---|---|---|
| 第 1 层 叙事架构 | 主题直给、因果单线、结局收束模式、时间线性、情绪呈现模式、角色网络密度 | `references/narrative-pass.md` |
| 第 2 层 篇章推进 | 段落问题序列模板（QUD）、中段塌陷、页面结构位置、开头与命名 | `references/discourse-pass.md` |
| 第 3 层 措辞风格 | 七伪迹、句法模板、AI 高频词、句长节奏、语域恢复 | `references/style-pass.md` + 语言校准 |

### 校准三原则（统治一切规则的规则）

1. **瞄准人类分布带，不反转 AI 分布**——把每条规则都用上会形成新的「人味过载」指纹；
2. **选择制不叠加**——小说每篇只选 3-5 种人类倾向手法；专业文档只修 checklist 实际命中的；
3. **留余地**——普通句子、平实段落是人性，不要把每处都打磨出特色。

### 四操作

| 操作 | 用途 |
|---|---|
| **write** | 撰写新内容（含 0b 代写流程：任务点标注表 + 材料核验清单） |
| **review** | 仅诊断不改稿，产出带引文证据的缺陷清单 |
| **refactor** | 最小原地修改：先全量诊断再逐项修，最深优先，删除优于新增（实测 74/18/8） |
| **recreate** | 整篇重写：提取事实清单后按领域规则重建 |

### 中文增强（v2-v4 资产全保留）

- **六档语境路由**：S1 熟人闲聊 / S2 社区公开发言 / S3 半正式交流 / W1 议论文时评 / W2 说明文 / W3 正式应用文，各档配正向人味策略与配额（自然错字、平台称呼与梗、空括号、联想序；书面档的反模板九测与篇章配额）
- **简繁双轨中文校准**：`references/zh-hans.md`（简体大陆：AI 高频词、双音节凑词、引用纪律、白名单）+ `references/zh-hant.md`（繁体台湾场合：教育部标点规范、HC3 与台湾新闻语料量化基准，全量保真自 sepia）
- **中国程式文书指纹**（`references/written-base.md` W0.6-W0.12）：价值升华对照表、认识弧（含双重否定/拆字变体）、对表升华、语域漂移、安全弧、自荐式收尾——来自真实文书三轮迭代实测
- **人民日报句库**（`references/renmin-examples.md`）：17 篇真实文章 + 23 条句式模式，每条附出处

### 专业文档路线

发版说明 / PR 与 issue 回复 / 事故复盘 / 工单 / 技术文章 / 长篇报道各有领域细则（`references/domains/`），共用十项检查清单与「先读场地」纪律。

## 文件结构

```
├── SKILL.md                        # 路由层：三层模型 + 双维路由 + 四操作契约 + 硬护栏
├── references/
│   ├── narrative-pass.md           # Pass 1 叙事架构（7 决策组 + 架构图模板 + rarity move）
│   ├── discourse-pass.md           # Pass 2 篇章推进（QUD / outline test / 中段卡点）
│   ├── style-pass.md               # Pass 3 措辞风格（七伪迹 / 词汇表 / 回加清单 / 白名单）
│   ├── rubric.md                   # 30 项诊断量表 + Group F 中国程式文书指纹
│   ├── professional-pass.md        # 非虚构文体共享层（10 项检查）
│   ├── domains/                    # 六领域细则（release-notes / dev-replies / postmortems
│   │                               #   / tickets / tech-articles / journalism）
│   ├── zh-hans.md                  # 简体中文校准
│   ├── zh-hant.md                  # 繁体中文（台湾场合）校准
│   ├── model-fingerprints.md       # 分模型指纹（叙事层实测 + 散文层厂商文档）
│   ├── selfcheck.md                # 反模板九测自检 + 交付格式
│   ├── colloquial-base.md / register-S1-S3.md    # 口语三档
│   ├── written-base.md / register-W1-W3.md       # 书面三档（含 W0 篇章配额）
│   └── renmin-examples.md          # 人民日报原句库
├── presets/humanizer/              # [可选] DSH Agent 预设配置
│   ├── agent.cordis.yml            #   persona + 工具挂载（含 web 搜索）
│   └── preset.yml                  #   预设元数据
└── CHANGELOG.md
```

## 安装

### 通用技能系统（Claude Code / DeepSeek Harness 等）

把 `SKILL.md` 与 `references/` 拷入你的技能目录，如：

```
~/.claude/skills/humanizer/SKILL.md
~/.claude/skills/humanizer/references/
```

（DSH 用户为 `~/.dsh/skills/humanizer/`；技能加载后按 SKILL.md 路由表按需读取 references。）

### DSH Agent 预设（可选）

把 `presets/humanizer/` 整个目录拷到 `~/.dsh/.agent-presets/humanizer/`，即可获得一个挂载了 web 搜索、内置此技能的"去 AI 味改写"专用智能体。spawn 时传 `agentPreset: humanizer` 使用。

## 使用示例

- 「把这段话改得像真人发的朋友圈」（→ S1 档）
- 「这篇回复要去 AI 味，发在知乎评论区」（→ S2 档）
- 「帮我把这篇作文初稿改得更像人民日报议论文」（→ W1 档）
- 「这段文字是 AI 写的吧？帮我改自然点，要用在我的实验报告里」（→ W3 档）
- 「只诊断这份复盘报告有哪些 AI 痕迹，先别改」（→ review 操作）

## 来源与致谢

- **[sepia](https://github.com/Nanako0129/sepia)**（MIT, v0.11.0）：v5.0 的三层模型、四操作契约、诊断量表、专业文档路线、模型指纹与繁体中文校准改编自 sepia，其规则背后的研究台账见该仓库 `research/`（StoryScope、LAMP、Reinhart et al. PNAS 2025、Russell et al. ACL 2025 等）
- 底线规则体系改编自 [blader/humanizer](https://github.com/blader/humanizer)（MIT License），基于 Wikipedia [Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)
- 口语策略证据来自公开网络社区讨论与语言学研究文献（SKILL.md 内附来源）
- 书面句式摘录自人民日报/人民网公开文章，**版权归原作者及报社所有**，此处仅为写作学习与研究目的的少量例句摘录，每条均附原文链接

## License

MIT（见 [LICENSE](LICENSE)）。人民日报例句摘录不适用本许可证，其权利归原权利人。
