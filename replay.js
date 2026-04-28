// ═══════════════════════════════════════════════════════════════
//  BRIDGE SIMULATOR V6 — REPLAY SYSTEM
//  Stores the final bridge snapshot (nodes + beams) per level
//  in localStorage so players can reload their best build.
//  No server needed — 100% local.
// ═══════════════════════════════════════════════════════════════

const REPLAY_KEY = 'bridgeReplays';

// ── LOAD all replays ────────────────────────────────────────────
function rpLoad() {
  try {
    const raw = localStorage.getItem(REPLAY_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch(e) { return {}; }
}

// ── SAVE all replays ────────────────────────────────────────────
function rpSave(data) {
  try { localStorage.setItem(REPLAY_KEY, JSON.stringify(data)); }
  catch(e) { console.warn('Replay save failed:', e); }
}

// ── SAVE SNAPSHOT for a level ───────────────────────────────────
// Stores a normalised (0–1 relative) copy of nodes + beams so
// the snapshot is resolution-independent and can be restored on
// any screen size.
//
// Parameters:
//   levelIdx  — 0-based level index
//   nodes     — live nodes array from game.js
//   beams     — live beams array from game.js
//   canvasW   — canvas.width at save time
//   canvasH   — canvas.height at save time
//   cost      — total cost (spent())
//   stars     — star rating (1-3)
//   mode      — 'classic' | 'ranked'
function rpSaveSnapshot(levelIdx, nodes, beams, canvasW, canvasH, cost, stars, mode) {
  const data = rpLoad();

  // Normalise node positions to 0–1
  const normNodes = nodes.map(n => ({
    id   : n.id,
    x    : n.x / canvasW,
    y    : n.y / canvasH,
    fixed: n.fixed
  }));

  // Store beams with their normalised restLen (pixels / canvasW keeps aspect ratio)
  const normBeams = beams.map(b => ({
    id     : b.id,
    naid   : b.naid,
    nbid   : b.nbid,
    mat    : b.mat,
    restLen: b.restLen / canvasW   // normalised length
  }));

  data[levelIdx] = {
    nodes  : normNodes,
    beams  : normBeams,
    cost   : cost,
    stars  : stars,
    mode   : mode,
    date   : new Date().toISOString().split('T')[0],
    canvasW: canvasW,    // stored for reference only
    canvasH: canvasH
  };

  rpSave(data);
}

// ── LOAD SNAPSHOT for a level ───────────────────────────────────
// Returns null if no snapshot exists for that level.
// Otherwise returns { nodes, beams, cost, stars, mode, date }
// with positions scaled back to the current canvas size.
//
// Parameters:
//   levelIdx — 0-based level index
//   canvasW  — current canvas.width (used to scale positions back)
//   canvasH  — current canvas.height
function rpLoadSnapshot(levelIdx, canvasW, canvasH) {
  const data = rpLoad();
  const snap = data[levelIdx];
  if (!snap) return null;

  // Re-scale positions to current canvas
  const nodes = snap.nodes.map(n => ({
    id   : n.id,
    x    : n.x * canvasW,
    y    : n.y * canvasH,
    px   : n.x * canvasW,
    py   : n.y * canvasH,
    bx   : n.x * canvasW,
    by   : n.y * canvasH,
    fixed: n.fixed
  }));

  // Build index map: id → array index
  const idxMap = {};
  nodes.forEach((n, i) => { idxMap[n.id] = i; });

  // Re-scale beam restLen and rebuild a, b indices
  const beams = snap.beams
    .filter(b => idxMap[b.naid] !== undefined && idxMap[b.nbid] !== undefined)
    .map(b => ({
      id     : b.id,
      a      : idxMap[b.naid],
      b      : idxMap[b.nbid],
      naid   : b.naid,
      nbid   : b.nbid,
      mat    : b.mat,
      restLen: b.restLen * canvasW,
      stress : 0,
      broken : false,
      fatigue: 0
    }));

  return {
    nodes,
    beams,
    cost : snap.cost,
    stars: snap.stars,
    mode : snap.mode,
    date : snap.date
  };
}

// ── HAS SNAPSHOT ────────────────────────────────────────────────
function rpHasSnapshot(levelIdx) {
  return !!rpLoad()[levelIdx];
}

// ── GET SNAPSHOT META (no node/beam data — lightweight) ─────────
function rpGetMeta(levelIdx) {
  const snap = rpLoad()[levelIdx];
  if (!snap) return null;
  return { cost: snap.cost, stars: snap.stars, mode: snap.mode, date: snap.date };
}

// ── DELETE SNAPSHOT ─────────────────────────────────────────────
function rpDeleteSnapshot(levelIdx) {
  const data = rpLoad();
  delete data[levelIdx];
  rpSave(data);
}

// ── CLEAR ALL REPLAYS ───────────────────────────────────────────
function rpClearAll() { localStorage.removeItem(REPLAY_KEY); }

// ── EXPORT SUMMARY TEXT ─────────────────────────────────────────
function rpExportText() {
  const data  = rpLoad();
  const NAMES = [
    'Tutorial Gap','River Crossing','Double Span','Deep Chasm',
    'Asymmetric','Tight Budget','Mid-River Rock','Triple Chasm',
    'Steep Canyon','Grand Finale'
  ];
  let out = '=== BRIDGE SIMULATOR V6 — SAVED REPLAYS ===\n';
  out += `Exported: ${new Date().toLocaleString()}\n\n`;
  for (let i = 0; i < 10; i++) {
    const s = data[i];
    if (!s) continue;
    const stars = '★'.repeat(s.stars) + '☆'.repeat(3 - s.stars);
    out += `Level ${i+1}: ${NAMES[i]}\n`;
    out += `  ${stars}  $${s.cost}  [${s.mode}]  ${s.date}\n`;
    out += `  Beams: ${s.beams.length}   Nodes: ${s.nodes.length}\n\n`;
  }
  return out;
}
