<!-- v5.0 编译自 sepia v0.11.0 references/domains/postmortems.md（MIT）+ humanizer v4.6 条目安置 -->
# 领域 — 事故复盘（postmortem）

覆盖事故报告、故障回溯（outage retrospective）、RCA 文档。与 `professional-pass.md` 配合运行（文章型加权：相关性、密度、立场），外加 `discourse-pass.md` 的大纲测试（outline test）。

## 人类基线

对人无指责（blameless），对机制绝不留情。真实的文档有绝对时间戳、确切的失效机制（那条查询、那行配置、那个竞态窗口）、诚实的死胡同（「我们在错误假设上花了 40 分钟」）、以及有人真正认领的行动项。团队的事故模板是个好容器——破绽是模板内部的填充物。

## 本领域的 AI 特征

| 特征 | 修法 |
|---|---|
| 无主语迷雾（agentless fog）："mistakes were made"、"the change was deployed"，全程找不到动作执行者 | 无指责 ≠ 无主语。点名系统与角色：「部署管线在校验运行前晋升了配置」 |
| 泛泛教训："we will improve monitoring and communication" | 行动项是带负责人和日期的改动：「给队列深度 > 10k 加告警（owner: infra，due 09-15）」 |
| 每个模板小节都为凑齐而填到差不多长 | 小节的篇幅要自己挣；「做得好的地方」凑不出货就一行实话或删除 |
| 自夸副词："the team swiftly identified…" | 时间戳自带速度判断，让它们说 |
| 和稀泥的根因（hedged root cause）："a combination of factors may have contributed" | 承诺你相信的因果链，把真正未知的部分标为未知 |
| 关于可靠性文化的道德说教式结论 | 到行动项为止 |
| 圆整、无来源的数字 | 真实时长、真实爆炸半径、真实用户/请求数——来自本次事故的实际数据，绝不为了显得完整而估算 |

## 规则

1. **带绝对时间与时区的时间线**，包括走错的路——在错误假设上花掉的 40 分钟是最有 instructive 的部分；模型系统性地省略「失败中的失败」。
2. 代码/配置级的失效机制：确切的查询、旗标、限额或竞态。如果你（执笔人）不知道，那是该拿去问团队的问题，不是用散文糊过去的空白。
3. 诚实地陈述反事实：什么本可以拦住它，以及为什么它当时不存在。不写「系统按设计工作」式的挽尊（face-saving）。
4. 贡献因素写成因果链，不是子弹云——每个因素说清它促成了什么。
5. 影响先用数字（时长、失败请求数、受影响用户、已知则含金额），叙事在后。
6. 立场检查（professional-pass check 4）：任何地方都不承认错误判断的 postmortem，等于还没写完。
