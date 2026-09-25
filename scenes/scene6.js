/* SAHNE 6 — KOMŞU AÇILAR: BÜTÜNLER VE TÜMLER (62–78 s)
   Side-by-side angles sharing an arm. On a straight line they add up to 180°.
   Split a right angle with a ray: the two parts add up to 90°. */
(function (LI) {
  'use strict';
  const { seg } = LI.E;
  const A = LI.Ang, KD = LI.KD, Ink = LI.Ink;
  const cam0 = (env) => KD.cam(env, { zoom: 1.1, x: 20, y: env.V ? -60 : -10 });
  function camera(t, env) { return LI.Camera.breathe(cam0(env), t, 0.4); }
  function render(ctx, lt, env, t) {
    const { O, th, L } = LI.Film.base(ctx, env, t, camera(t, env));
    const d1 = seg(t, 62.2, 62.8);
    const tum = seg(t, 72.9, 73.3) * (1 - seg(t, 77.9, 78.5)); // the "tümler" part hides angle 1
    const hi = [1, 1, 1 - 0.8 * d1, 1 - 0.8 * d1];
    const show = [1 - tum, 1, 1, 1];
    const deg = [1 - tum, 1, 1, 1];
    LI.Film.angles(ctx, env, t, { show, deg, hi });
    // the shared arm glows
    const sh = seg(t, 62.8, 63.6) * (1 - seg(t, 66.2, 66.8));
    if (sh > 0) Ink.path(ctx, [O, A.at(O, th, L.half * 0.8)], { w: 10, p: sh, color: LI.AMBER_RGB, alpha: 0.85 * (1 - seg(t, 66.2, 66.8)), seed: 70, taper: [0.05, 0.3] });
    // together they make a straight angle: 180°
    const semi = seg(t, 66.8, 67.8), sa = 1 - seg(t, 71.0, 71.5);
    if (semi > 0 && sa > 0) {
      A.arc(ctx, O, L.r + 30, 0, 180, { p: semi, alpha: sa, w: 7, seed: 71 });
      const Q = LI.Film.quad(th);
      A.text(ctx, `${Math.round(Q[0].v)}° + ${Math.round(Q[1].v)}° = 180°`, O[0], O[1] - L.rl - 150, { size: 66, color: A.amber, halo: true, p: seg(t, 67.4, 68.4), alpha: sa });
    }
    // tümler: a ray splits the right angle into 30° + 60°
    if (tum > 0) {
      const ra = 30;
      A.arm(ctx, O, ra, L.half * 0.8, { p: seg(t, 72.9, 73.7), seed: 72, alpha: tum });
      const k = seg(t, 73.6, 74.2) * tum;
      if (k > 0) {
        A.wedge(ctx, O, L.r, 0, ra, 0.2 * k); A.wedge(ctx, O, L.r + 26, ra, 90, 0.2 * k);
        A.arc(ctx, O, L.r, 2, ra - 2, { p: k, w: 6, seed: 73 }); A.arc(ctx, O, L.r + 26, ra + 2, 88, { p: k, w: 6, seed: 74 });
        A.deg(ctx, 30, ...A.at(O, 15, L.rl + 30), { size: 56, halo: true, alpha: seg(t, 74.0, 74.4) * tum });
        A.deg(ctx, 60, ...A.at(O, 60, L.rl), { size: 56, halo: true, alpha: seg(t, 74.2, 74.6) * tum });
        A.text(ctx, '30° + 60° = 90°', O[0], O[1] - L.rl - 150, { size: 66, color: A.amber, halo: true, p: seg(t, 74.6, 75.6), alpha: tum });
      }
    }
  }
  LI.registerScene({ id: 6, start: 62, end: 78, name: 'Adjacent angles', nameTr: 'Komşu açılar', concept: 'Sum 180°: supplementary · 90°: complementary', conceptTr: 'Toplam 180°: bütünler · 90°: tümler', camera, render });
})(window.LI = window.LI || {});
