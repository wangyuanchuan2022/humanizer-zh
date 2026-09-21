---
name: humanizer-zh-write
description: |-
  中文书面去 AI 味子技能（W1 议论文时评 / W2 说明性文章 / W3 正式应用文）：把议论文、科普解读、申请书、自述、思想汇报、总结报告等中文书面文本改写得更像真人手笔，或按该文体代写；含中国程式文书专项指纹（价值升华对照表、认识弧、对表升华、语域漂移、安全弧、自荐式收尾）与人民日报句式参考。触发词：议论文、时评、作文、申请书、思想汇报、自述、总结、报告、文书、人民日报体、去AI味。属 humanizer 主路由的子技能，可独立使用。v7.1.0。
---

# humanizer-zh-write — 中文书面档（W1/W2/W3）

本包是中文书面场景的**完整作战手册**：书面语的人味来自风格结构而非刻意错字——篇章配额、骨架参差、升华克制、语域一致。

## 加载序（动笔前读完，缺一不可）

1. `references/written-base.md` — W0 共同原则 12 条（不整齐配额/核验债/二元对照/篇章不完整/段落骨架/价值升华/认识弧/结构变化/语域一致）+ 书面验收清单
2. `references/register-W1.md` / `register-W2.md` / `register-W3.md`（按判定档位读对应一件）— 档位细则（W1 识别特征与配额表 / W2 平稳句法 / W3 格式克制+经历段收束纪律+句式级修正）
3. `references/zh-hans.md` — 简体中文校准（AI 高频词与信号短语/句法模板/句长节奏/引用纪律/白名单）
4. `references/discourse-pass.md` — 篇章层（QUD 段落问题序列检查/提纲测试/中段卡点/页面结构位置；本包用 §1-3）
5. `references/selfcheck.md` — 反模板九测自检 + 交付格式与红队自评
6. 需要人民日报原句参考时（W1）读 `references/renmin-examples.md`（17 篇 23 模式，按需加载）
7. W3/叙事类个人文书的升华专项诊断读 `references/zh-rubric-f.md`（Group F 六指纹指针节）

档位判定：W1 政论·考场竞赛议论文 / W2 科普·解读·综述 / W3 申请书·总结·报告。判不出默认 W1 并注明。

## 工作流（write/refactor 通用）

1. 按加载序读文件后，通读按三层诊断：篇章层（discourse §1-3：QUD/提纲测试/中段）→ 骨架层（selfcheck 测⑥⑧⑨ + written-base W0.8-W0.12）→ 措辞层（zh-hans §1-3）。
2. 0b 代写：任务点标注表（合并/错位/加重/轻放/弃）→ 大纲期对模板链做一次结构变化（W0.11 四选一）→ 保护资产清单与所选变化留档 → 材料清单逐条过核验并留档。
3. 修复最深层优先；结构可大动（倒叙开场/模板段合并/经历压缩嵌叙/结尾回引），句子定点降格（「经历→我当时怎么想」），素材链条原样保护，政治程式与格式规范不动。
4. 自检：跑 selfcheck 反模板清单测（书面全跑①-⑦；⑧⑨限叙事/申请/自述类）+ written-base 验收清单逐项对照 + 红队自评。
5. 交付按 SKILL.md 交付格式（write/recreate 三段、refactor 缺省两段）。

## 接缝

- 议论文需要更多人民日报原句 → renmin-examples.md（本包内，按需读）。
- 文本含口语对话段 → 该段按 `humanizer-zh-chat` 处理。
- 繁体台湾场合 → 改用 `humanizer-zh-hant`。
- 小说/虚构叙事 → 改用 `humanizer-fiction`。

## 伴生脚本与抽签

- **write/recreate 动笔前先抽签**：运行 `node references/draw-sheet.mjs --seed <N> --genre zh-essay|zh-doc`（按目标文体；批内多篇加 `--index <I>`）出签照做；**draw sheet 随稿落盘**。无 shell 环境按 `references/draw-sheet.md`（契约文档：字段/参数带/错字纪律/模具黑名单）表格自抽并显式留痕。review/refactor 不强制抽签。
