<!-- v5.0 编译自 sepia v0.11.0 references/domains/release-notes.md（MIT）+ humanizer v4.6 条目安置 -->
# 领域 — Release Notes 与发布公告

覆盖 changelog、GitHub Releases、版本公告、短篇发布贴。与 `professional-pass.md` 配合运行；长于 changelog 的文本加跑 `style-pass.md`。

## 人类基线

简短、事实、用户影响优先。读者在决定**要不要升级、什么会坏**——一切都为这个决定服务。常规结构（Keep a Changelog 分类：Added / Changed / Fixed / Removed / Security；或仓库自己的习惯）是预期形态，不是破绽。

## 本领域的 AI 特征

| 特征 | 修法 |
|---|---|
| 营销膨胀："We're thrilled/excited to announce"、"powerful new features"、"seamless experience"、"supercharge your workflow" | 陈述改了什么。特性本身就是新闻；热情不是 |
| 无机制的收益主张："improved performance"、"enhanced stability" | 给出数字或改动本身："cold start 1.8s → 0.4s"、"fixed a race in the retry queue (#412)" |
| 每条变更都叙述成一句长故事 | 一条变更一行，动词开头，不带形容词 |
| emoji 标题与满篇感叹号 | 对齐仓库既有 notes；缺省一个都不用 |
| 开头一段讲历程、结尾一段讲前路 | 两段都删。版本、日期、变更，完 |
| 不论重要性对每个条目对称行文 | 按用户影响排序；breaking changes 在前，一词修复在后 |
| 中文示例行（安置自 humanizer v4.6 §1/§3/§4/§18）：「我们非常激动地宣布…」「标志着…的重要里程碑」「开启了…新篇章」「性能得到大幅提升、稳定性显著增强」「为开发者注入新活力」「🚀 全新极致体验」等营销腔、夸大意义与伴随状语句式 | 还原为平实描述：只说改了什么、数字是多少；「提升了/彰显了/注入了新活力」类伴随状语删除；装饰 emoji 删掉 |

## 规则

1. **Breaking changes 在前**，附确切的迁移步骤（命令、配置键、改名后的旗标）。
2. 每条主张带它的工件（artifact）：issue/PR 号、commit 区间、精确版本串、带条件的真实基准数字。没有工件 → 没有主张。
3. 平实地给人记功（"thanks @name for #398"）——不写感谢段落。
4. 篇幅跟着发布走：patch 发布就是三行，不要为显得有料而灌水。
5. 仓库历史里有幽默与个性才可以用；绝不往没有的仓库里新鲜注入。
6. **只写当前行为，不描述旧版本**（安置自 v4.6 §30）：条目描述新版本的行为，不为显得完整而复述旧版本如何工作；旧行为只作为 breaking change 迁移步骤的必要对照出现。
