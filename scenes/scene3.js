/* SAHNE 3 — KESİŞEN, DİK (19–30 s)
   e turns around O: the lines meet at one point. At 90° they are perpendicular. */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const A = LI.Ang, KD = LI.KD;
  function camera(t, env) { return LI.Camera.breathe(LI.Camera.track([[19, KD.cam(env, { zoom: 1 })], [30, KD.cam(env, { zoom: 1.04 })]], t), t, 0.4); }
  function render(ctx, lt, env, t) {
    const { O } = LI.Film.base(ctx, env, t, camera(t, env));
    // a soft ring pulses on the crossing point
    const r = seg(t, 21.3, 22.4);
    if (r > 0 && r < 1) LI.Ink.ring(ctx, O[0], O[1], 20 + 40 * r, { w: 4, alpha: 1 - r, seed: 9 });
    LI.Film.word(ctx, env, 'kesişen', t, 21.8, 25.2);
    const sq = seg(t, 26.8, 27.3) * (1 - seg(t, 29.8, 30.4));
    if (sq > 0) A.square(ctx, O, 0, 46, { p: sq, alpha: sq });
    LI.Film.word(ctx, env, 'dik', t, 27.2, 30.0);
  }
  LI.registerScene({ id: 3, start: 19, end: 30, name: 'Intersecting & perpendicular', nameTr: 'Kesişen ve dik', concept: 'Meet at one point · at 90°', conceptTr: 'Bir noktada kesişir · 90° ile', camera, render });
})(window.LI = window.LI || {});
