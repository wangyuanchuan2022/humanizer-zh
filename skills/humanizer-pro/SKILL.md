---
name: humanizer-pro
description: |-
  专业文档去 AI 味子技能（中英通用）：发版说明/changelog/公告、PR 与 issue 回复、代码评审意见、事故复盘/RCA、工单与工单报告、技术文章/博客/教程、长篇新闻（特稿/调查/数据报道/采访）。目标不是骗过检测器，而是文本承载信息、有立场、读起来像署名者本人。触发词：发版说明、release notes、PR 回复、复盘、postmortem、RCA、工单、技术文章、博客、新闻报道、去AI味。属 humanizer 主路由的子技能，可独立使用。v7.0.0。
---

# humanizer-pro — 专业文档档

本包是专业文档场景的**完整作战手册**。核心立场：专业文体里常规结构完全没问题——要清的是结构内部的填充物（slop）；文本要承载信息、有立场、像署名者本人写的。

## 加载序（动笔前读完）

1. `references/professional-pass.md` — 共享层：先读场地（venue 先行，采样 2-3 份场合近期真人样本对齐语域）+ 10 项检查表（聊天残留/密度/相关性/立场/具体性/格式痕迹/结论残留/模板化/节奏均一/流畅性）+ 领域加权 + 报告格式 + 白名单
2. `references/domains/<领域>.md`（按文档类型读对应一件）— 发版说明 release-notes / PR·issue 回复 dev-replies / 事故复盘 postmortems / 工单 tickets / 技术文章 tech-articles / 长篇报道 journalism
3. `references/style-pass.md` — 风格层收尾：§1 七伪迹、§2-3 词汇句法扫描、§4 删除/回退测试、§5 句长节奏、§7 白名单（跳过小说 slop 表；无连排行文的短回复节奏检查报 none）
4. 长篇（文章/复盘/报道）加 `references/discourse-pass.md` §1-3：提纲测试 + QUD 检查（干净的段落首句连读=机器形）

## 工作流（write/refactor 通用）

1. 先读场地：采样场合近期真人产物（仓库过往发版说明/维护者回复/团队上次复盘），没有场合语料时用领域文件的人类基线。
2. 诊断：10 项检查一次一项跑（合并跑会失明——本分类学上实测），slop 累积计数，聚簇才动手；短答复（PR/工单）优先事实性/具体性/模板化，长文优先相关性/密度/立场。
3. 长文加 outline + QUD 检查；修 deepest first。
4. 自检：refactor 跑 style-pass §4 删除/回退测试；对照领域文件与白名单复核。
5. 报告/交付按 professional-pass 报告格式（Loaded/Failed/Deferred/Protected/Passed/Verdict 行）。

## 本包铁律

- 版本号、数字、file:line、命令、逐字报错文本必须真实在场——缺信息问用户或留显式 TODO，绝不补。
- 立场：该判断的地方承诺判断（没有裁定的评审/没有推荐的对比/不认错的事故复盘=实测 slop 维度）；每条真正脆弱的主张 hedge 一次，不是每句。
- 篇幅与利害成正比（两个方向都算）：删过头丢了必要警示同样不及格。
- 中文专业文档：词汇句法扫描配 `humanizer-zh-write` 包的 zh-hans.md（skill 加载后按其路径读取）。

## 接缝

- 虚构叙事/文学性散文 → `humanizer-fiction`。
- 中文校准（简体）→ `humanizer-zh-write` 包 zh-hans.md；繁体台湾 → `humanizer-zh-hant`。
- 个人经历随笔（不含报道事实）→ `humanizer-fiction`（narrative 路由）。

## 伴生脚本与抽签

- **write/recreate 动笔前先抽签**：运行 `node references/draw-sheet.mjs --seed <N> --genre en-tech`（或 en-essay/中文文体按目标；批内多篇加 `--index <I>`）出签照做；**draw sheet 随稿落盘**。无 shell 环境按 `references/draw-sheet.md`（契约文档：字段/参数带/错字纪律/模具黑名单）表格自抽并显式留痕。review/refactor 不强制抽签。
