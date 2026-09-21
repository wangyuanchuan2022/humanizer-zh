#!/usr/bin/env node
// humanizer v7.1 抽签表生成器（draw sheet）——REPORT 附录 D 契约的执行载体
// v7.1 增量（四判据 → 四轴，带源=v7.1-plan/bands-v2-annotation.md，2026-09-21 32 篇语义标注实测）：
//   ① 配额 0 加权文体分化（non_goal：essay P(0)=0.42 / doc P(0)=0.90 / s2 P(0)=0.83；EN=zh 全局临时值）
//   ② 噪声位置参数 noise_position（非目标细节偏前 .58/.25/.17、坏痕偏后 .17/.33/.50——互补结构，均匀撒是指纹）
//   ③ 金句位置参数 power_position（end/middle/start 按文体实测权重——人臂 end 仅 52%，非 100%）
//   ④ 物件链长 chain_length（1/2/3 = .57/.27/.16——孤儿细节是常态）
//   ⑤ 无意义坏痕族 meaningless_badness（P(在场) doc .75 / s2 .50 / essay .25；形态池=实测五形态）
//   ⑥ 手法池 7→12（+background_aside/stray_fact/object_orphan/number_idle/dialogue_quote）
//   ⑦ 批模式：--batch g1,g2,... 输出 JSONL，六条批级约束在生成器内强制（违反整体重抽，确定性保持）
// 用法:
//   单篇: node draw-sheet.mjs --seed 20260921 --genre zh-essay [--index 3]
//   批量: node draw-sheet.mjs --seed 20260921 --batch zh-essay,zh-doc,zh-s2,zh-essay,zh-s2
//   （同 seed + 同 genre 构成 ⇒ 输出逐字节一致；批量模式的 attempt 重抽不影响该性质）
// 输出：单行 JSON（D.2 十二字段：seed/genre/structure_band/moves/quotas/noise_position/power_position/chain_length/ending_mode/length_target/used_before/notes）
// 依赖：仅 node: 内置模块（D6 零新依赖门线）
import { createHash } from 'node:crypto';

const args = process.argv.slice(2);
const get = (k) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : undefined; };
const seed = parseInt(get('seed') || '0', 10);
const genreArg = get('genre') || '';
const batchArg = get('batch') || '';
const index = parseInt(get('index') || '1', 10);
const GENRES = ['zh-essay', 'zh-doc', 'zh-s2', 'en-essay', 'en-tech', 'en-fiction'];

const usage = () => console.error(`usage: node draw-sheet.mjs --seed N --genre <${GENRES.join('|')}> [--index N]\n       node draw-sheet.mjs --seed N --batch <g1,g2,...>  (>=2 genres from same pool, JSONL out)`);
let batchGenres = null;
if (batchArg) {
  batchGenres = batchArg.split(',').map((s) => s.trim()).filter(Boolean);
  if (!seed || batchGenres.length < 2 || batchGenres.some((g) => !GENRES.includes(g))) { usage(); process.exit(2); }
} else if (!seed || !GENRES.includes(genreArg)) { usage(); process.exit(2); }

// 种子化确定性伪随机（LCG）：种子派生自 seed+genre+index+attempt 的 SHA256 前 8 字节；attempt 供批模式整体重抽
const makeRnd = (key) => {
  const h = createHash('sha256').update(key).digest('hex');
  let state = parseInt(h.slice(0, 8), 16) >>> 0;
  return () => { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return state / 4294967296; };
};
const weighted = (rnd, w) => { const es = Object.entries(w); let r = rnd(); for (const [k, p] of es) { if ((r -= p) < 0) return k; } return es[es.length - 1][0]; };

// ── 常量（带源标注；EN 三文体 = zh 全局临时值，待 EN 标注批校准，schema 决策 2026-09-21）──
const BAND_CAP = { 'zh-doc': 4, 'zh-s2': 3 }; // 应用文≤4、口语体≤3（其余 ≤5）
const MOVE_POOL = [
  'announced_doubt',        // 主动交代不确定性（记忆模糊：数字是估的/记不清哪年）
  'anticlimactic_close',    // 反高潮/拒绝升华收尾
  'non_goal_detail',        // 无用私人细节（不服务主题）
  'self_deprecation',       // 自曝短板/愧疚
  'life_runoff',            // 生活流水与杂质（消费明细/路人引语/物件收尾）
  'plain_colloquial_close', // 平实口语收束
  'texture_local',          // 地域与实物纹理
  'background_aside',       // 背景铺垫不承重（删后论证不损；Phase A：essay non_goal 主形态）
  'stray_fact',             // 无关冷知识/边角事实，说了不回收（Phase A：zh-s2-004 体脂率型）
  'object_orphan',          // 提及即弃的具体物件（Phase A：链长 1 占 57%）
  'number_idle',            // 例行数字自然在场不承重（人数/批次/金额）
  'dialogue_quote',         // 直接引语（当事人原话直录；eval-v5 判 HUMAN 高频依据）
];
const MOVES_MIN = 3, MOVES_MAX = 5;

// 非指向细节：0 加权文体分化（P(0) 实测；非零时带内均匀。doc 为用户拍板低概率保留）
const NON_GOAL = {
  'zh-essay': { p0: 0.42, band: [1, 3] },
  'zh-doc': { p0: 0.90, band: [1, 1] },
  'zh-s2': { p0: 0.83, band: [1, 2] },
  en: { p0: 0.72, band: [1, 2] },
};
// 无意义坏痕在场概率（实测；EN=zh 全局临时值）
const BADNESS_P = { 'zh-essay': 0.25, 'zh-doc': 0.75, 'zh-s2': 0.50, en: 0.47 };
// 坏痕形态池（Phase A 实测 18 处；预设四形态零实证不收录）
const BADNESS_FORMS = ['冗余重述', '语法杂糅', '词语粘连重复', '事实性自相矛盾', '成语误用'];
// 噪声位置（篇内三分；实测 n=12/n=18，两类噪声互补：非目标偏前、坏痕偏后）
const ZONE_NON_GOAL = { front: 0.58, mid: 0.25, back: 0.17 };
const ZONE_BADNESS = { front: 0.17, mid: 0.33, back: 0.50 };
// 金句段内位置（实测 n=36/18/36；EN=zh 全局 n=90 临时值）
const POWER_POS = {
  'zh-essay': { end: 0.58, middle: 0.28, start: 0.14 },
  'zh-doc': { end: 0.56, middle: 0.39, start: 0.06 },
  'zh-s2': { end: 0.44, middle: 0.44, start: 0.12 },
  en: { end: 0.52, middle: 0.37, start: 0.11 },
};
// 物件链长（实测 n=67）
const CHAIN_W = { 1: 0.57, 2: 0.27, 3: 0.16 };

// 配额带（率类；来源 bands-from-human-corpus.md D.3，v7 不变项）
const QUOTA_BANDS = {
  aphorism_total: [0, 2],
  plain_paragraph: [1, 3],
  first_person_per_1k: [0, 25],
  digits_per_1k: [2, 20],
  hard_typos: [0, 3],
  typo_types: null,
  non_goal_details: null,               // v7.1：0 加权单独抽（NON_GOAL）
  half_used_sources: [1, 2],            // 未重测维持 v7（v7.2 补测候选）
  coinage: [0, 2],
  extended_metaphor: [0, 1],
};
const EN_QUOTA_OVERRIDES = {
  'en-essay': { first_person_per_1k: [16, 113], digits_per_1k: [2, 23] },
  'en-tech': { first_person_per_1k: [3, 74], digits_per_1k: [3, 54] },
  'en-fiction': { first_person_per_1k: [0, 113], digits_per_1k: [2, 20] },
};
const ZH_QUOTA_OVERRIDES = {
  'zh-essay': { first_person_per_1k: [0, 25], digits_per_1k: [3, 20] },
  'zh-doc': { first_person_per_1k: [4, 35], digits_per_1k: [2, 30] },
  'zh-s2': { first_person_per_1k: [8, 53], digits_per_1k: [4, 85] },
};
const ENDING_POOLS = {
  'zh-doc': ['close', 'half_close'],
  'zh-s2': ['half_close', 'open', 'object_stop'],
};
const LENGTH_BANDS = {
  'zh-essay': [697, 1258], 'zh-doc': [229, 1421], 'zh-s2': [342, 1648],
  'en-essay': [453, 1524], 'en-tech': [551, 929], 'en-fiction': [267, 1332],
};

// ── 单篇生成 ──
function genSheet(genre, idx, attempt) {
  const rnd = makeRnd(`${seed}|${genre}|${idx}|v71a${attempt}`);
  const int = (lo, hi) => lo + Math.floor(rnd() * (hi - lo + 1));
  const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
  const isEn = genre.startsWith('en');

  const cap = BAND_CAP[genre] || 5;
  const structure_band = int(1, cap);

  const nMoves = int(MOVES_MIN, MOVES_MAX);
  const moves = [];
  const pool = [...MOVE_POOL];
  while (moves.length < nMoves && pool.length) moves.push(pool.splice(Math.floor(rnd() * pool.length), 1)[0]);

  const ng = isEn ? NON_GOAL.en : NON_GOAL[genre];
  const non_goal = rnd() < ng.p0 ? 0 : int(ng.band[0], ng.band[1]);
  const badP = isEn ? BADNESS_P.en : BADNESS_P[genre];
  const badPresent = rnd() < badP;
  const meaningless_badness = badPresent
    ? { present: true, count: int(1, 2), form: pick(BADNESS_FORMS), para_zone: weighted(rnd, ZONE_BADNESS) }
    : { present: false, count: 0, form: null, para_zone: null };

  const bands = { ...QUOTA_BANDS, ...(isEn ? EN_QUOTA_OVERRIDES[genre] : ZH_QUOTA_OVERRIDES[genre]) };
  const quotas = {};
  for (const [k, v] of Object.entries(bands)) {
    if (v === null) continue;
    quotas[k] = int(v[0], v[1]);
  }
  quotas.non_goal_details = non_goal;
  quotas.meaningless_badness = meaningless_badness;
  const typo_types = ['homophone', 'shape_similar', 'missing_char', 'word_order', 'punctuation'];
  quotas.typo_types = [pick(typo_types)];
  if (rnd() < 0.4) { const second = pick(typo_types.filter(t => t !== quotas.typo_types[0])); if (second) quotas.typo_types.push(second); }

  // v7.1 新三字段：位置与链长（noise_position 的 zone 在配额为 0 时仍落值，标注「不适用」语义由 notes 说明）
  const noise_position = {
    non_goal_zone: non_goal > 0 ? weighted(rnd, ZONE_NON_GOAL) : null,
    badness_zone: badPresent ? meaningless_badness.para_zone : null,
    cluster_when_two: non_goal >= 2 ? rnd() < 0.5 : null,
  };
  const pw = isEn ? POWER_POS.en : POWER_POS[genre];
  const power_position = { coinage_pos: quotas.coinage > 0 ? weighted(rnd, pw) : null, aphorism_pos: quotas.aphorism_total > 0 ? weighted(rnd, pw) : null };
  const chain_length = parseInt(weighted(rnd, CHAIN_W), 10);

  const ending_mode = pick(ENDING_POOLS[genre] || ['close', 'half_close', 'open', 'object_stop']);
  const [lmin, lmax] = LENGTH_BANDS[genre] || [400, 1200];
  const length_target = int(lmin, lmax);

  const bandDesc = { 1: '不做结构设计：线性流水、无呼应、无收束', 2: '仅一处结构动作', 3: '中枢档（非默认）：一处呼应+半收尾', 4: '两处结构动作', 5: '完整设计：可有回环与延迟揭示' }[structure_band];
  const notes = `档 ${structure_band}（上限 ${cap}）：${bandDesc}；${moves.length} 个手法；非指向 ${non_goal}（P(0)=${ng.p0}）；坏痕${badPresent ? `${meaningless_badness.count} 处「${meaningless_badness.form}」@${meaningless_badness.para_zone}` : '不在场'}；链长 ${chain_length}；金句位${power_position.coinage_pos || power_position.aphorism_pos || '—'}；错字 ${quotas.hard_typos}；带源 bands-v2-annotation（D.3）`;

  const used_before = []; // 同批已用句式模具台账（G7：持久化属后续；F11 外部输入通道延后）
  return { seed, genre, structure_band, moves, quotas, noise_position, power_position, chain_length, ending_mode, length_target, used_before, notes };
}

// ── 批级六约束（D.10；违反 → 整批换 attempt 重抽）──
function batchViolations(sheets) {
  const v = [];
  const N = sheets.length;
  // 1. moves 两两交集 ≤2
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    const inter = sheets[i].moves.filter((m) => sheets[j].moves.includes(m));
    if (inter.length > 2) v.push(`moves交集 ${i + 1}↔${j + 1}=${inter.length}`);
  }
  // 2. 四轴在场率 ≤ floor(3N/5)（≥1）
  const axisCap = Math.max(1, Math.floor(N * 3 / 5));
  const axes = {
    '轴:坏痕在场': sheets.filter((s) => s.quotas.meaningless_badness.present),
    '轴:金句非end位': sheets.filter((s) => (s.quotas.coinage > 0 && s.power_position.coinage_pos !== 'end') || (s.quotas.aphorism_total > 0 && s.power_position.aphorism_pos !== 'end')),
    '轴:链长3': sheets.filter((s) => s.chain_length === 3),
    '轴:噪声聚集': sheets.filter((s) => s.quotas.non_goal_details >= 2 && s.noise_position.cluster_when_two),
  };
  for (const [name, arr] of Object.entries(axes)) if (arr.length > axisCap) v.push(`${name} ${arr.length}/${N} > ${axisCap}`);
  // 3. essay 批级保证：nEssay≥3 时 ≥ceil(nEssay*2/5) 篇 non_goal>0
  const essays = sheets.filter((s) => s.genre === 'zh-essay');
  if (essays.length >= 3) {
    const need = Math.ceil(essays.length * 2 / 5);
    const have = essays.filter((s) => s.quotas.non_goal_details > 0).length;
    if (have < need) v.push(`essay非指向 ${have}/${essays.length} < ${need}`);
  }
  // 4. 布局分布：≥2 篇有效时 zone 不得全同
  const ngz = sheets.filter((s) => s.noise_position.non_goal_zone);
  if (ngz.length >= 2 && new Set(ngz.map((s) => s.noise_position.non_goal_zone)).size === 1) v.push('non_goal_zone 全同');
  const bdz = sheets.filter((s) => s.noise_position.badness_zone);
  if (bdz.length >= 2 && new Set(bdz.map((s) => s.noise_position.badness_zone)).size === 1) v.push('badness_zone 全同');
  // 5. 坏痕形态批内不复用
  const forms = sheets.filter((s) => s.quotas.meaningless_badness.present).map((s) => s.quotas.meaningless_badness.form);
  if (new Set(forms).size !== forms.length) v.push('坏痕形态复用');
  // 6. 防过矫单篇：单篇 ≥3 轴活跃 → 重抽
  sheets.forEach((s, i) => {
    let active = 0;
    if (s.quotas.meaningless_badness.present) active++;
    if ((s.quotas.coinage > 0 && s.power_position.coinage_pos !== 'end') || (s.quotas.aphorism_total > 0 && s.power_position.aphorism_pos !== 'end')) active++;
    if (s.chain_length === 3) active++;
    if (s.quotas.non_goal_details >= 2 && s.noise_position.cluster_when_two) active++;
    if (active >= 3) v.push(`防过矫：第 ${i + 1} 篇 ${active} 轴齐装`);
  });
  return v;
}

if (batchGenres) {
  const MAX_ATTEMPTS = 50;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const sheets = batchGenres.map((g, i) => genSheet(g, i + 1, attempt));
    const v = batchViolations(sheets);
    if (!v.length) { for (const s of sheets) console.log(JSON.stringify(s)); console.error(`batch OK (attempt ${attempt}, ${sheets.length} sheets)`); process.exit(0); }
    if (attempt === MAX_ATTEMPTS - 1) { console.error('BATCH FAIL after ' + MAX_ATTEMPTS + ' attempts:\n' + v.join('\n')); process.exit(2); }
  }
} else {
  console.log(JSON.stringify(genSheet(genreArg, index, 0)));
}
