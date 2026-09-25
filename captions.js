/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 5. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 3.4, end: 7.6, tr: 'İki doğru çizelim: d ve e', en: 'Let’s draw two lines: d and e',
      note: 'Nokta iki doğru çiziyor. Birinin adı d, diğerinin adı e. Doğrular iki yönde de sonsuza kadar uzar.' },
    { scene: 2, start: 8.4, end: 13.0, tr: 'Hiç kesişmiyorlar: paralel doğrular', en: 'They never meet: parallel lines',
      note: 'Aralarındaki uzaklık her yerde aynı. Ne kadar uzatsak da kesişmezler. Bunlara paralel doğrular denir.' },
    { scene: 2, start: 15.6, end: 19.2, tr: 'Üst üste geldiler: çakışık doğrular', en: 'One lies on the other: coincident lines',
      note: 'e doğrusu d’nin tam üstüne geldi. Bütün noktaları ortak oldu: çakışık doğrular.' },
    { scene: 3, start: 21.6, end: 25.4, tr: 'Bir noktada kesişiyorlar: kesişen doğrular', en: 'They meet at one point: intersecting lines',
      note: 'e doğrusu dönünce d ile tek bir noktada buluştu. Bu noktaya kesişim noktası denir.' },
    { scene: 3, start: 26.8, end: 30.0, tr: 'Dik kesişiyorlar: dik doğrular', en: 'They meet at a right angle: perpendicular lines',
      note: 'Kesişen doğrular arasında 90 derecelik açı varsa bunlara dik doğrular denir.' },
    { scene: 4, start: 31.8, end: 35.4, tr: 'Kesişince 4 açı oluştu', en: 'Crossing lines make 4 angles',
      note: 'İki doğru kesişince kesişim noktasının çevresinde dört açı oluşur. Onları 1, 2, 3, 4 diye numaralayalım.' },
    { scene: 4, start: 35.8, end: 39.6, tr: 'Tahmin et: hangileri eş?', en: 'Guess: which ones are equal?',
      note: 'Ölçmeden önce tahmin edelim: bu açılardan hangilerinin ölçüsü eşit olabilir?' },
    { scene: 4, start: 40.2, end: 45.6, tr: 'Ölçelim: iki dar, iki geniş açı', en: 'Let’s measure: two acute, two obtuse',
      note: 'Açıölçerle ölçtük: 50, 130, 50 ve 130 derece. İki dar açı ve iki geniş açı var.' },
    { scene: 5, start: 46.4, end: 50.6, tr: 'Karşı karşıya olanlar: ters açılar', en: 'Facing each other: vertical angles',
      note: 'Kesişim noktasının iki yanında karşı karşıya duran açılara ters açılar denir. 1 ile 3, 2 ile 4 ters açılardır.' },
    { scene: 5, start: 51.0, end: 56.6, tr: 'Doğru dönse de eşit kalıyorlar', en: 'Turn the line: they stay equal',
      note: 'e doğrusunu çevirelim. Açılar değişiyor ama ters açılar hep birbirine eşit kalıyor.' },
    { scene: 5, start: 57.0, end: 61.6, tr: 'Ters açılar eştir', en: 'Vertical angles are equal',
      note: 'Buradan şu önermeyi çıkarıyoruz: ters açıların ölçüleri eşittir.' },
    { scene: 6, start: 62.4, end: 66.4, tr: 'Yan yana, bir kolu ortak: komşu açılar', en: 'Side by side, one shared arm: adjacent angles',
      note: '1 ve 2 numaralı açılar yan yana duruyor ve bir kolları ortak. Bunlara komşu açılar denir.' },
    { scene: 6, start: 67.0, end: 71.2, tr: 'Toplamları 180°: bütünler açılar', en: 'They add up to 180°: supplementary angles',
      note: '50 ile 130’u toplarsak 180 eder. Birlikte bir doğru açı oluştururlar. Ölçüleri toplamı 180 derece olan açılara bütünler açılar denir.' },
    { scene: 6, start: 73.4, end: 77.8, tr: 'Toplamları 90°: tümler açılar', en: 'They add up to 90°: complementary angles',
      note: 'Dik açının içine bir ışın çizdik: 30 ve 60 derece. Toplamları 90 derece olan açılara tümler açılar denir.' },
    { scene: 7, start: 80.6, end: 88.0, tr: 'Ters açılar eş, komşu açılar 180°', en: 'Vertical angles are equal, adjacent ones add up to 180°',
      note: 'Unutma: iki doğru kesişince ters açılar eşittir, yan yana duran komşu açıların toplamı 180 derecedir.' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
