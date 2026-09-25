/* SAHNE 4 — DÖRT AÇI (30–46 s)
   Two crossing lines make four angles. Guess which are equal, then measure. */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const KD = LI.KD;
  function camera(t, env) { return LI.Camera.breathe(LI.Camera.track([[30, KD.cam(env, { zoom: 1.04 })], [32, KD.cam(env, { zoom: 1.1, x: env.V ? 20 : 20, y: env.V ? -60 : -10 })], [46, KD.cam(env, { zoom: 1.1, x: env.V ? 20 : 20, y: env.V ? -60 : -10 })]], t), t, 0.4); }
  function render(ctx, lt, env, t) {
    LI.Film.base(ctx, env, t, camera(t, env));
    const show = [0, 1, 2, 3].map((i) => seg(t, 31.8 + 0.6 * i, 32.5 + 0.6 * i));
    const num = [0, 1, 2, 3].map((i) => seg(t, 32.2 + 0.6 * i, 32.6 + 0.6 * i) * (1 - seg(t, 39.8, 40.2)));
    const deg = [0, 1, 2, 3].map((i) => seg(t, 40.2 + 0.6 * i, 40.6 + 0.6 * i));
    // while guessing, the angles take turns to glow
    let hi = [1, 1, 1, 1];
    if (t > 36 && t < 39.6) { const k = Math.floor((t - 36) / 0.45) % 4; hi = hi.map((_, i) => (i === k ? 1 : 0.35)); }
    LI.Film.angles(ctx, env, t, { show, num, deg, hi });
  }
  LI.registerScene({ id: 4, start: 30, end: 46, name: 'Four angles', nameTr: 'Dört açı', concept: 'Guess, then measure', conceptTr: 'Önce tahmin, sonra ölçüm', camera, render });
})(window.LI = window.LI || {});
