/* SAHNE 7 — KAPANIŞ (78–92 s)  One sentence to remember; Nokta celebrates. */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const A = LI.Ang, KD = LI.KD;
  const cam0 = (env) => KD.cam(env, { zoom: 1.1, x: 20, y: env.V ? -60 : -10 });
  function camera(t, env) { return LI.Camera.breathe(LI.Camera.track([[78, cam0(env)], [81, KD.cam(env, { zoom: 0.98 })], [92, KD.cam(env, { zoom: 0.95 })]], t), t, 0.4); }
  function render(ctx, lt, env, t) {
    LI.Film.base(ctx, env, t, camera(t, env));
    LI.Film.angles(ctx, env, t, { show: [1, 1, 1, 1], deg: [1, 1, 1, 1], hi: [1, 1, 1, 1] });
    // amber arcs bursting like fireworks around Nokta
    const k = seg(t, 83.0, 85.0);
    if (k > 0 && t < 90.5) {
      const n = LI.Film.nokta(t, env), C = [n.x, n.y - 170];
      [30, 60, 90, 120, 150].forEach((d, i) => {
        const r = 150 + 30 * Math.sin(t * 2 + i);
        A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 89.6, 90.5)), w: 6, seed: 80 + i });
      });
    }
  }
  LI.registerScene({ id: 7, start: 78, end: 92, name: 'Remember', nameTr: 'Aklında kalsın', concept: 'Opposite equal · adjacent 180°', conceptTr: 'Ters açılar eş · komşular 180°', camera, render });
})(window.LI = window.LI || {});
