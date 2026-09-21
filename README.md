# humanizer-zh · 去 AI 味写作技能族（中文增强版）

> A family of context-aware "de-AI" writing skills for Chinese & English, split by **genre × language** into six installable sub-skills. **v7 adds scripted randomness**: a seeded draw-sheet (`draw-sheet.mjs`) that randomizes structure bands (1-5), move selection and per-quota values inside human-corpus bands, plus non-goal detail quotas and an English-branch reinforcement layer (measured E-tier fingerprints, distribution bands, genre parameters) — all derived from a six-genre three-arm blind evaluation (450 texts, 13 reviewer seats). **v7.1 extends randomization from quantity to position / presence / form**: noise placement zones (non-goal details skew early, blemishes skew late — complementary structure), aphorism in-paragraph position (human end-rate is only 52%), object chain length (orphan details 57%), and a measured meaningless-badness family — driven by a trained-reader four-criteria blind test and a 32-piece human-corpus semantic annotation. Built on [Nanako0129/sepia](https://github.com/Nanako0129/sepia)'s measured three-layer model (narrative architecture → discourse flow → surface style; architecture-only detection reaches 93.2% while surface rewrites drop detection merely 95.5%→93.9%), keeping all Chinese-specific assets from v2-v4: context registers, programmatic-document fingerprints, a People's Daily sentence reference, and a ghost-writing workflow. Lineage also includes [blader/humanizer](https://github.com/blader/humanizer) (MIT).

一套"去 AI 味"（humanize）写作技能族：把带 AI 腔的文本改写得更自然、更像人写的，或从零写出人味，不改变原意、不编造事实。**不同文体、不同语言的去 AI 味做法各不相同**——v6.0 起把它们拆成六个自足的子技能，按需加载对应场景的完整作战手册；**v7.0 把确定性规则改造为带随机性的生成协议**（抽签表 / 结构五档 / 非全指向配额）并补强英文支线；**v7.1 把随机化从数量层扩展到位置/有无/形态三层**（噪声位置带 / 金句段内位 / 物件链长 / 无意义坏痕族，带值全部来自 32 篇人臂语义标注实测）。

## 技能族一览

| 技能 | 场景 | 内容 |
|---|---|---|
| **humanizer** | 主路由（入口） | 三层模型 + 四操作契约（write/review/refactor/recreate）+ 硬护栏 + 校准三原则 + 路由表；判定文本类型与语言后分发到子技能 |
| **humanizer-zh-chat** | 中文口语（S1 熟人闲聊 / S2 社区发言 / S3 半正式交流） | 口语正向策略（错字配额/瑕疵事件化/联想序/平台称呼与梗）、语域天花板、简体校准 |
| **humanizer-zh-write** | 中文书面（W1 议论文 / W2 说明文 / W3 申请书·总结等应用文） | 篇章配额（W0.1-W0.12）、反模板九测、中国程式文书指纹（价值升华/认识弧/对表升华/语域漂移/安全弧/自荐收尾）、人民日报句库、引用纪律 |
| **humanizer-fiction** | 小说 / 虚构故事 / 文学性叙事散文（英文为主，中文通用） | 叙事架构 7 决策组（StoryScope 实测）、篇章推进（QUD/提纲测试）、30 项诊断量表、措辞风格层、分模型指纹 |
| **humanizer-pro** | 专业文档：发版说明 / PR·issue 回复 / 事故复盘 / 工单 / 技术文章 / 长篇报道（中英） | 十项检查、六领域细则、"先读场地"纪律、风格层 |
| **humanizer-zh-hant** | 繁體中文（台灣場合） | 教育部標點規範、數字原則、台灣新聞語料量化基準、台灣詞彙守衛（簡體文本勿用本包） |

## v7 随机化协议（各子技能包内 `references/draw-sheet.md` + `draw-sheet.mjs`）

- **动笔前出签**：`node references/draw-sheet.mjs --seed <N> --genre <G>`（种子化可复现十二字段 JSON；批内多篇用 `--batch g1,g2,...`，六条批级约束在生成器内强制），照签执行、签表随稿落盘；无 shell 环境按契约表格自抽并留痕。review/refactor 不强制抽签。
- **三条机制（v7.0）**：① 脚本化随机性（手法选择 3-5 项、各配额带内抽样、错字类型与处数随机——禁固定同音词表、禁全批同值）；② 结构程度随机参考带（档 1-5 + 三禁令 + 体裁上限 + 低档豁免）；③ 细节与文献的非全指向性（非指向 / 半用 / 未消化三档配额，文献不必全部指向主旨）。
- **四轴（v7.1，带值=32 篇人臂语义标注实测）**：① 噪声位置（非目标细节偏前、坏痕偏后——互补结构，均匀铺洒本身是指纹）；② 金句段内位（人臂 end 仅 52%，end 位不得连续两段）；③ 物件链长（孤儿细节 57%）；④ 无意义坏痕族（不迷人的无功能坏，P(在场) doc 75%/s2 50%/essay 25%，实测五形态池）；非指向配额 0 加权文体分化（essay P(0)=0.42 / doc P(0)=0.90 / s2 P(0)=0.83），手法池 7→12。
- **跨篇纪律**：同批多篇维护「已用句式模具」台账（实测已暴露模具列入黑名单）；批量 ≥3 篇跑批级自检九项（v7 四项 + v7.1 五项：moves 交集 / 四轴在场率防过矫 / essay 批级 / 发力位占比 / 位置参数实现抽查）。

## 共同设计（主路由内）

- **三层模型**：叙事架构层 > 篇章推进层 > 措辞风格层，修复顺序 deepest first（StoryScope：仅架构层特征即可 93.2% 检出 AI，表层改写几乎无效）。
- **四操作**：write（含 0b 代写流程）/ review（仅诊断）/ refactor（两阶段 + 删除测试 + 回退测试 + 74/18/8 编辑偏斜）/ recreate。
- **校准三原则**：瞄准人类分布带不反转；选择制不叠加（小说每篇 3-5 手法）；留余地。
- **硬护栏**：不编造细节、删除优于新增、尊重作者声音、引文承重、白名单先行、核验债显式化。

## 安装

把用到的技能目录拷入你的技能目录（每个子技能独立安装，互不依赖；主路由建议一起装）：

```
~/.claude/skills/humanizer/SKILL.md
~/.claude/skills/humanizer-zh-write/SKILL.md
~/.claude/skills/humanizer-zh-write/references/
...
```

（DSH 用户为 `~/.dsh/skills/`。子技能可独立触发——例如直接点名「用 humanizer-zh-write 改这篇申请书」；也可以只装主路由，由它分发。）

### DSH Agent 预设（可选）

把 `presets/humanizer/` 拷到 `~/.dsh/.agent-presets/humanizer/`，获得内置本技能族、挂载 web 搜索的"去 AI 味"专用智能体。

## 使用示例

- 「把这段话改得像真人发的朋友圈」（→ humanizer-zh-chat / S1）
- 「帮我把这篇作文初稿改得更像人民日报议论文」（→ humanizer-zh-write / W1）
- 「这是我写的入党申请书，帮我改得不像 AI」（→ humanizer-zh-write / W3 + Group F 指纹）
- 「write a short story about a lighthouse keeper, make it read human」（→ humanizer-fiction）
- 「这篇 release note 太 AI 了，重写一下」（→ humanizer-pro）
- 「只诊断这份复盘报告有哪些 AI 痕迹，先别改」（→ review 操作）

## 来源与致谢

- **[sepia](https://github.com/Nanako0129/sepia)**（MIT, v0.11.0）：三层模型、四操作契约、叙事架构 pass、30 项诊断量表、专业文档路线、模型指纹与繁体台湾校准改编自 sepia，其规则背后的研究台账见该仓库 `research/`
- **[blader/humanizer](https://github.com/blader/humanizer)**（MIT）：底线规则体系基于 Wikipedia [Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)
- 口语策略证据来自公开网络社区讨论与语言学研究文献
- 书面句式摘录自人民日报/人民网公开文章，**版权归原作者及报社所有**，此处仅为写作学习与研究目的的少量例句摘录，每条均附原文链接

## License

MIT（见 [LICENSE](LICENSE)）。人民日报例句摘录不适用本许可证，其权利归原权利人。
