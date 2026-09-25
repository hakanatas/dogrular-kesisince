/* SAHNE 5 — TERS AÇILAR (46–62 s)
   The angles facing each other are equal — even when the line turns. */
(function (LI) {
  'use strict';
  const { seg, hump } = LI.E;
  const KD = LI.KD;
  const cam0 = (env) => KD.cam(env, { zoom: 1.1, x: 20, y: env.V ? -60 : -10 });
  function camera(t, env) { return LI.Camera.breathe(cam0(env), t, 0.4); }
  function render(ctx, lt, env, t) {
    LI.Film.base(ctx, env, t, camera(t, env));
    const A13 = [1, 0.2, 1, 0.2], A24 = [0.2, 1, 0.2, 1];
    let hi = [1, 1, 1, 1];
    const mix = (a, b, k) => a.map((v, i) => v + (b[i] - v) * k);
    if (t < 50.8) hi = mix([1, 1, 1, 1], A13, seg(t, 46.2, 46.8));
    else if (t < 57) hi = mix(A13, [1, 1, 1, 1], seg(t, 50.8, 51.3));
    else if (t < 59.4) hi = mix([1, 1, 1, 1], A13, seg(t, 57.0, 57.5));
    else hi = mix(mix(A13, A24, seg(t, 59.4, 59.9)), [1, 1, 1, 1], seg(t, 61.4, 62));
    // a gentle "same!" pulse on the highlighted pair
    const pulse = 1 + 0.15 * (hump(t, 47.2, 48.2) + hump(t, 57.6, 58.6) + hump(t, 60.0, 61.0));
    const Q = LI.Film.angles(ctx, env, t, { show: [1, 1, 1, 1], deg: [1, 1, 1, 1], hi });
    // an amber "=" between the highlighted pair's numbers, below the figure
    const L = KD.L(env), O = L.O;
    const eqA = Math.max(seg(t, 47.4, 48) * (1 - seg(t, 50.4, 50.8)), seg(t, 57.6, 58.2) * (1 - seg(t, 61.4, 61.9)));
    if (eqA > 0) {
      const pair = t > 59.6 ? [1, 3] : [0, 2];
      const s = `${Math.round(Q[pair[0]].v)}° = ${Math.round(Q[pair[1]].v)}°`;
      LI.Ang.text(ctx, s, O[0], O[1] - L.rl - 150, { size: 70 * pulse, color: LI.Ang.amber, alpha: eqA, halo: true });
    }
  }
  LI.registerScene({ id: 5, start: 46, end: 62, name: 'Vertical angles', nameTr: 'Ters açılar', concept: 'Opposite angles are equal', conceptTr: 'Karşı karşıya olanlar eştir', camera, render });
})(window.LI = window.LI || {});
