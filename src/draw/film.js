/* ─────────────────────────────────────────────────────────────
   The film's continuous state as pure functions of time.
   Two lines: d (fixed, horizontal, through O) and e (moves: first
   parallel above d, then slides onto d, then turns around O).
   Scenes (scenes/*.js) call LI.Film.base() and then add their extras.
   ───────────────────────────────────────────────────────────── */
(function (LI) {
  'use strict';
  const { seg, clamp, lerp, track, outBack, outCubic, hump } = LI.E;
  const A = LI.Ang, KD = LI.KD, Ink = LI.Ink;
  const D2R = Math.PI / 180;

  /** direction of line e in degrees (0 = lies along d) */
  function phi(t) {
    return track([
      [0, 0], [19.4, 0], [21.4, 50], [25.4, 50], [26.8, 90], [30.0, 90], [31.4, 50],
      [51.0, 50], [52.4, 35], [53.4, 35], [54.8, 70], [55.8, 70], [56.8, 50],
      [71.4, 50], [72.8, 90], [78.4, 90], [79.8, 50], [92, 50],
    ], t);
  }
  /** how far above d the line e sits (parallel → coincident) */
  function off(t, env) { const g = KD.L(env).gap; return track([[0, g], [13.6, g], [15.4, 0], [92, 0]], t); }

  /** e's centre point */
  const eC = (t, env) => { const O = KD.L(env).O; return [O[0], O[1] - off(t, env)]; };

  /** the four angles around O for a given direction th (0<th<180) */
  function quad(th) {
    return [
      { a0: 0, a1: th, v: th },
      { a0: th, a1: 180, v: 180 - th },
      { a0: 180, a1: 180 + th, v: th },
      { a0: 180 + th, a1: 360, v: 180 - th },
    ];
  }

  /** an arrow head at P pointing in direction deg */
  function head(ctx, P, deg, o = {}) {
    const L = 24, s = 0.5, a = -deg * D2R;
    const b1 = [P[0] - Math.cos(a - s) * L, P[1] - Math.sin(a - s) * L], b2 = [P[0] - Math.cos(a + s) * L, P[1] - Math.sin(a + s) * L];
    Ink.path(ctx, [b1, P, b2], { w: 6, seed: o.seed ?? 5, taper: [0.2, 0.2], alpha: o.alpha ?? 1 });
  }
  /** a full line (doğru) through C at angle deg: arrows at both ends, drawn on with p */
  function line(ctx, C, deg, half, o = {}) {
    const P0 = A.at(C, deg + 180, half), P1 = A.at(C, deg, half);
    const p = o.p ?? 1;
    if (p <= 0) return;
    Ink.path(ctx, [P0, P1], { w: o.w ?? 8, p, seed: o.seed ?? 1, taper: [0.08, 0.08], wob: 0.2, dry: 0.4, bleed: 0.5, alpha: o.alpha ?? 1 });
    if (p >= 1) { head(ctx, P0, deg + 180, { seed: (o.seed ?? 1) + 2, alpha: o.alpha }); head(ctx, P1, deg, { seed: (o.seed ?? 1) + 3, alpha: o.alpha }); }
  }

  /**
   * Draw the four angles at O.
   * o.show[i]  presence 0..1 (arc draw-on + wedge)   o.hi[i]  highlight 0..1 (dims others)
   * o.deg[i]   degree label alpha                    o.num[i] index numeral alpha
   */
  function angles(ctx, env, t, o = {}) {
    const L = KD.L(env), O = L.O, th = phi(t);
    const Q = quad(th);
    Q.forEach((q, i) => {
      const s = o.show?.[i] ?? 0; if (s <= 0) return;
      const h = o.hi?.[i] ?? 1, dim = 0.25 + 0.75 * h;
      const rr = L.r + (i % 2 ? 24 : 0); // pairs of opposite angles share a radius
      A.wedge(ctx, O, rr, q.a0, q.a1, (0.06 + 0.16 * h) * s);
      if (Math.abs(q.v - 90) < 0.6) A.square(ctx, O, q.a0, 42, { p: s, alpha: dim });
      else A.arc(ctx, O, rr, q.a0 + 3, q.a1 - 3, { p: s, alpha: dim, w: 6, seed: 20 + i });
      const mid = (q.a0 + q.a1) / 2, P = A.at(O, mid, L.rl);
      const da = (o.deg?.[i] ?? 0) * dim;
      if (da > 0) A.deg(ctx, q.v, P[0], P[1], { size: 62, halo: true, alpha: da });
      const na = (o.num?.[i] ?? 0);
      if (na > 0) A.text(ctx, String(i + 1), P[0], P[1], { size: 58, alpha: na, p: clamp(na * 1.5) });
    });
    return Q;
  }

  /** Nokta, as a function of time */
  function nokta(t, env) {
    const L = KD.L(env), O = L.O;
    const p = { x: L.nx, y: L.gy, s: L.s, mouth: 0.4, brow: 0.1 };
    // birth: a drop lands, the body gathers, legs and arms sprout, eyes open
    const g = outCubic(seg(t, 1.3, 2.3));
    p.born = { body: lerp(0.3, 1, g), legs: outCubic(seg(t, 2.0, 2.6)), arms: outCubic(seg(t, 2.3, 2.8)), tuft: outBack(seg(t, 2.5, 2.9)) };
    if (t < 3.0) { p.sq = lerp(0.4, 1, clamp(LI.E.spring(seg(t, 1.3, 3.0) * 2, 8, 3.4), 0, 1.3)); p.drop = 1 - g; p.wobble = 1 - seg(t, 1.3, 2.8); }
    p.eyeOpen = outCubic(seg(t, 2.8, 3.1));
    // default gaze: a point on line e
    KD.look(p, A.at(eC(t, env), phi(t), L.half * 0.45));
    // drawing the two lines with a brush
    if (t > 2.9 && t < 6.4) { p.hold = 'brush'; p.brushAng = -0.8 + 0.3 * Math.sin(t * 9); p.hands = { R: [1.35, -0.2 + 0.15 * Math.sin(t * 9)] }; }
    // points at e while it moves
    const pointing = (a, b) => { if (t > a && t < b) { p.point = 'R'; p.hands = { L: [-1.2, 0.55], R: [1.5, -0.35] }; } };
    pointing(13.4, 15.6); pointing(19.2, 21.6); pointing(25.2, 27.0); pointing(50.8, 56.9); pointing(71.2, 74.2);
    // surprised: the two lines became one
    if (t > 15.4 && t < 17.2) { p.mouthOpen = 0.6; p.eyeScale = 1.1; p.sq = 1.05; }
    // puzzled: which angles are equal?
    const puz = seg(t, 35.8, 36.2) * (1 - seg(t, 39.2, 39.5));
    if (puz > 0) { p.hands = { L: [-1.2, 0.55], R: [0.75, -1.05 + 0.08 * Math.sin(t * 14)] }; p.brow = -0.6 * puz; p.mouth = -0.1; KD.look(p, O); p.lookY -= 0.3; }
    // happy after each discovery
    const joy = (a, b) => { if (t > a && t < b) { p.squint = 1; p.mouth = 1; p.sq = 1 + 0.1 * hump(t, a, a + 0.6); p.y -= 26 * hump(t, a, a + 0.6); p.hands = { L: [-1.3, -0.35], R: [1.3, -0.35] }; } };
    joy(44.2, 45.8); joy(59.0, 60.6); joy(69.8, 71.2); joy(76.2, 77.8);
    // finale: jumps for joy, then waves goodbye
    if (t > 82.4) {
      const j = (t - 82.4) % 1.4;
      p.squint = 1; p.mouth = 1;
      p.sq = 1 + 0.1 * Math.sin(Math.PI * clamp(j / 0.6)); p.y -= 40 * Math.sin(Math.PI * clamp(j / 0.6));
      p.hands = { L: [-1.35, -0.6 - 0.2 * Math.sin(t * 6)], R: [1.35, -0.6 + 0.2 * Math.sin(t * 6)] };
      p.lookX = 0.3; p.lookY = 0; p.turn = 0.15;
      if (t > 88.2) { p.squint = 0; p.lookX = 0; p.lookY = 0.2; p.turn = 0; p.y = L.gy; p.sq = 1; p.hands = { L: [-1.2, 0.55], R: [1.2, -1.0 + 0.25 * Math.sin(t * 10)] }; }
    }
    p.blink = Math.max(hump(t, 5.8, 5.95), hump(t, 11.2, 11.35), hump(t, 24.0, 24.15), hump(t, 33.0, 33.15), hump(t, 48.0, 48.15), hump(t, 65.0, 65.15), hump(t, 80.5, 80.65));
    return p;
  }

  /** common render: ground, lines d and e, the crossing point, Nokta */
  function base(ctx, env, t, cam, o = {}) {
    const L = KD.L(env), O = L.O;
    LI.Ambient.specks(ctx, env, cam, t, { alpha: 0.22, n: 18, depth: 0.4, seed: 21 });
    LI.Camera.apply(ctx, env, cam);
    KD.ground(ctx, env, nokta(t, env).x, L.gy);
    const th = phi(t), C = eC(t, env);
    // ── line d (drawn first) and line e
    line(ctx, O, 0, L.half, { p: seg(t, 3.3, 4.5), seed: 11 });
    line(ctx, C, th, lerp(L.half, L.halfE, seg(t, 19.4, 21.0)), { p: seg(t, 5.0, 6.2), seed: 12 });
    // names of the lines
    const na = seg(t, 6.4, 7.0) * (1 - seg(t, 30.0, 30.6));
    if (na > 0) {
      const F = 'italic 52px "LI Brush", cursive';
      const Pd = A.at(A.at(O, 180, 40 - L.half), -90, 48);
      const Pe = A.at(A.at(C, th, lerp(L.half, L.halfE, seg(t, 19.4, 21.0)) - 40), th + 90, 48);
      A.text(ctx, 'd', Pd[0], Pd[1], { size: 52, alpha: na, font: F });
      A.text(ctx, 'e', Pe[0], Pe[1], { size: 52, alpha: na, font: F });
    }
    // ── the crossing point
    const k = outBack(seg(t, 21.0, 21.4));
    if (k > 0) Ink.dot(ctx, O[0], O[1], 11 * k, { seed: 3, bleed: 0.6 });
    // ── Nokta
    LI.Nokta.draw(ctx, LI.Nokta.follow((tt) => nokta(tt, env), t), t);
    // the ink drop and splash at birth
    if (t < 1.35 && t > 0.3) { const f = seg(t, 0.3, 1.3); Ink.dot(ctx, L.nx, lerp(-700, L.gy - 14, f * f), 15, { seed: 2, bleed: 0 }); }
    if (t > 1.3) Ink.drops(ctx, L.nx, L.gy - 4, t - 1.3, { n: 9, seed: 5, ground: L.gy + 4, scale: 0.8, alpha: 1 - seg(t, 4, 8) * 0.6 });
    return { O, th, L, C };
  }

  /** a word written under the figure (paralel, çakışık, kesişen, dik) */
  function word(ctx, env, s, t, a, b) {
    const L = KD.L(env);
    A.text(ctx, s, L.O[0] + (env.V ? 150 : 190), L.O[1] + 96, { size: 56, p: seg(t, a, a + 0.8), alpha: 1 - seg(t, b - 0.4, b) });
  }

  LI.Film = { phi, off, eC, quad, line, angles, nokta, base, word };
})(window.LI = window.LI || {});
