#!/usr/bin/env node
// humanizer v7 抽签表生成器（draw sheet）——REPORT 附录 D 契约的执行载体
// 用法: node draw-sheet.mjs --seed 20260920 --genre en-tech [--index 3]
//   --seed   必填：随机种子（同 seed + 同 genre + 同 index ⇒ 输出逐字节一致）
//   --genre  必填：zh-essay | zh-doc | zh-s2 | en-essay | en-tech | en-fiction
//   --index  可选：批内篇目序号（默认 1）
// 输出：单行 JSON（D.2 九字段：seed/genre/structure_band/moves/quotas/ending_mode/length_target/used_before/notes）
// 依赖：仅 node: 内置模块（D6 零新依赖门线）
import { createHash } from 'node:crypto';

const args = process.argv.slice(2);
const get = (k) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : undefined; };
const seed = parseInt(get('seed') || '0', 10);
const genre = get('genre') || '';
const index = parseInt(get('index') || '1', 10);
const GENRES = ['zh-essay', 'zh-doc', 'zh-s2', 'en-essay', 'en-tech', 'en-fiction'];
if (!seed || !GENRES.includes(genre)) {
  console.error('usage: node draw-sheet.mjs --seed N --genre <' + GENRES.join('|') + '> [--index N]');
  process.exit(2);
}

// 种子化确定性伪随机（LCG）：种子派生自 seed+genre+index 的 SHA256 前 8 字节，保证跨 genre/index 分流且可复现
const h = createHash('sha256').update(`${seed}|${genre}|${index}`).digest('hex');
let state = parseInt(h.slice(0, 8), 16) >>> 0;
const rnd = () => { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return state / 4294967296; };
const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
const int = (lo, hi) => lo + Math.floor(rnd() * (hi - lo + 1));

// 结构档位池与体裁上限（迭代 3 落地五档正文前的骨架版：1-5 档 + 上限约束已生效）
const BAND_CAP = { 'zh-doc': 4, 'zh-s2': 3 }; // 应用文≤4、口语体≤3（其余 ≤5）
const cap = BAND_CAP[genre] || 5;
const structure_band = int(1, cap);

// 手法池（有效手法双清单 · 至少前四类 + 记忆模糊；迭代 2 扩全）
const MOVE_POOL = [
  'announced_doubt',        // 主动交代不确定性（记忆模糊：数字是估的/记不清哪年）
  'anticlimactic_close',    // 反高潮/拒绝升华收尾
  'non_goal_detail',        // 无用私人细节（不服务主题）
  'self_deprecation',       // 自曝短板/愧疚
  'life_runoff',            // 生活流水与杂质（消费明细/路人引语/物件收尾）
  'plain_colloquial_close', // 平实口语收束
  'texture_local',          // 地域与实物纹理
];
const MOVES_MIN = 3, MOVES_MAX = 5;
const nMoves = int(MOVES_MIN, MOVES_MAX);
const moves = [];
const pool = [...MOVE_POOL];
while (moves.length < nMoves && pool.length) moves.push(pool.splice(Math.floor(rnd() * pool.length), 1)[0]);

// 配额带（来源：bands-from-human-corpus.md 真人臂 HUMAN 统计，2026-09-20；与 draw-sheet.md D.3 同源）
// coinage/extended_metaphor：造词与巧喻配额（style-pass v7 节——巧喻装置 ≤1 且进抽签，有时 0 个）
const QUOTA_BANDS = {
  aphorism_total: [0, 2],
  plain_paragraph: [1, 3],
  first_person_per_1k: [0, 25],   // 中文带；英文文体见下方 EN 覆盖
  digits_per_1k: [2, 20],
  hard_typos: [0, 3],
  typo_types: null,               // 占位：下面单独抽
  non_goal_details: [1, 3],
  half_used_sources: [1, 2],
  coinage: [0, 2],                // 自造复合词/新造语（禁令上限 2，带内抽实际取值，可为 0）
  extended_metaphor: [0, 1],      // 巧喻装置（贯穿性比喻，≤1，可为 0）
};
const EN_QUOTA_OVERRIDES = { // 英文文体：第一人称密度真人带显著更高（I/we/my 高频）
  'en-essay': { first_person_per_1k: [16, 113], digits_per_1k: [2, 23] },
  'en-tech': { first_person_per_1k: [3, 74], digits_per_1k: [3, 54] },
  'en-fiction': { first_person_per_1k: [0, 113], digits_per_1k: [2, 20] },
};
const ZH_QUOTA_OVERRIDES = {
  'zh-essay': { first_person_per_1k: [0, 25], digits_per_1k: [3, 20] },
  'zh-doc': { first_person_per_1k: [4, 35], digits_per_1k: [2, 30] },
  'zh-s2': { first_person_per_1k: [8, 53], digits_per_1k: [4, 85] },
};
const bands = { ...QUOTA_BANDS, ...(genre.startsWith('en') ? EN_QUOTA_OVERRIDES[genre] : ZH_QUOTA_OVERRIDES[genre]) };
const quotas = {};
for (const [k, v] of Object.entries(bands)) {
  if (v === null) continue; // typo_types 单独抽
  quotas[k] = int(v[0], v[1]);
}
const typo_types = ['homophone', 'shape_similar', 'missing_char', 'word_order', 'punctuation'];
quotas.typo_types = [pick(typo_types)];
if (rnd() < 0.4) { const second = pick(typo_types.filter(t => t !== quotas.typo_types[0])); if (second) quotas.typo_types.push(second); }

// ending_mode 体裁白名单（draw-sheet.md D.2 契约「按体裁白名单抽」的实现）：
// zh-doc（应用文）程式收束是文体刚性——排除 open；zh-s2（口语档）「真人聊完就完」（colloquial-base S0.3）——排除 close；
// 其余文体四形态全池。
const ENDING_POOLS = {
  'zh-doc': ['close', 'half_close'],
  'zh-s2': ['half_close', 'open', 'object_stop'],
};
const ending_mode = pick(ENDING_POOLS[genre] || ['close', 'half_close', 'open', 'object_stop']);

// 长度目标：从该文体真人长度分布带抽（来源同 D.3；含离群的全带）
const LENGTH_BANDS = {
  'zh-essay': [697, 1258], 'zh-doc': [229, 1421], 'zh-s2': [342, 1648],
  'en-essay': [453, 1524], 'en-tech': [551, 929], 'en-fiction': [267, 1332],
};
const [lmin, lmax] = LENGTH_BANDS[genre] || [400, 1200];
const length_target = int(lmin, lmax);

const used_before = []; // 同批已用句式模具黑名单（会话内台账，G7：持久化属后续）

const bandDesc = { 1: '不做结构设计：线性流水、无呼应、无收束', 2: '仅一处结构动作', 3: '中枢档（非默认）：一处呼应+半收尾', 4: '两处结构动作', 5: '完整设计：可有回环与延迟揭示' }[structure_band];
const notes = `档 ${structure_band}（上限 ${cap}）：${bandDesc}；本轮 ${moves.length} 个手法；错字 ${quotas.hard_typos} 处（类型 ${quotas.typo_types.join('+')}，可为 0）；带源 bands-from-human-corpus（D.3）`;

const sheet = { seed, genre, structure_band, moves, quotas, ending_mode, length_target, used_before, notes };
console.log(JSON.stringify(sheet));
