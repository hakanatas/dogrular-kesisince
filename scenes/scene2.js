/* SAHNE 2 — PARALEL, ÇAKIŞIK (8–19 s)
   e sits above d and never meets it (same distance everywhere): parallel.
   Then e slides down onto d: coincident lines. */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const A = LI.Ang, KD = LI.KD;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) {
    const { O, L } = LI.Film.base(ctx, env, t, camera(t, env));
    // equal-distance markers between the parallel lines
    const fade = 1 - seg(t, 12.8, 13.5);
    [-1, 0, 1].forEach((k, i) => {
      const p = seg(t, 8.8 + i * 0.35, 9.5 + i * 0.35);
      if (p <= 0 || fade <= 0) return;
      const x = O[0] + k * L.half * 0.55, y0 = O[1] - 10, y1 = O[1] - L.gap + 10;
      LI.Ink.path(ctx, [[x, y0], [x, y1]], { w: 5, p, color: LI.AMBER_RGB, alpha: fade, taper: [0.1, 0.1], seed: 30 + i });
      if (p >= 1) [y0, y1].forEach((y, j) => LI.Ink.path(ctx, [[x - 14, y], [x + 14, y]], { w: 4, color: LI.AMBER_RGB, alpha: fade, seed: 34 + i * 2 + j }));
    });
    LI.Film.word(ctx, env, 'paralel', t, 9.4, 13.4);
    LI.Film.word(ctx, env, 'çakışık', t, 15.6, 19.2);
  }
  LI.registerScene({ id: 2, start: 8, end: 19, name: 'Parallel & coincident', nameTr: 'Paralel ve çakışık', concept: 'Never meet · lie on top', conceptTr: 'Hiç kesişmez · üst üste', camera, render });
})(window.LI = window.LI || {});
