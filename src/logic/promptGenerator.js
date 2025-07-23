// src/logic/promptGenerator.js

// Detail absurd, cinematic, dan bilingual untuk tiap scene
// Detail absurd, cinematic, dan bilingual untuk tiap scene
const defaultSceneDetails = [
  // ... (isi array scene details-mu, TIDAK diubah)
];

function formatOpeningNarrative({
  judulFilm,
  karakterUtama,
  hewanPendamping,
  makhlukAneh,
  visualStyle,
  visualDescription,
  backsound,
  lighting,
  sfx,
}) {
  return [
    `Pagi yang hangat di gang sempit pinggiran kota divisualisasikan dalam animasi gaya ${visualStyle} — ${visualDescription.toLowerCase()}.`,
    `${karakterUtama} keluar rumah dengan ekspresi khasnya yang linglung, diikuti ${hewanPendamping} yang bergoyang, dan ${makhlukAneh}, bergerak sendiri dengan gestur konyol.`,
    `Saat sepeda itu menabrak pelan kerucut lalu lintas yang bersinar, semburan kilau muncul, lalu judul film “${judulFilm || "Judul Film Absurd"}” melompat keluar dalam huruf kartun oranye neon, teal, dan kuning — melayang di udara dengan animasi kenyal seperti jelly.`,
    `Cahaya matahari pagi keemasan menyinari adegan dengan efek magis, diiringi suara “Tiiiin!”, dengkuran sepeda, dan gemericik air.`,
    `Tanpa dialog, hanya ekspresi lucu dan timing komedik.`,
    `(Tanpa horor, tanpa kekerasan, tanpa gaya realis, tanpa warna kusam, tanpa adegan menakutkan.)`
  ].join('\n');
}

// PATCH Tambahkan dua fungsi kecil di bawah ini:

function formatDialogUtama(aksi, dialog) {
  let aksiStr = aksi ? aksi.replace(/[:.]$/, "") : "";
  let dialogStr = dialog ? `sambil berkata: "${dialog.replace(/["“”]/g, '').trim()}"` : "";
  // Jika ada aksi & dialog, gabungkan. Kalau cuma aksi saja, tampilkan aksi.
  if (aksiStr && dialogStr) {
    return `${aksiStr} ${dialogStr}`;
  } else if (aksiStr) {
    return aksiStr;
  } else if (dialogStr) {
    return dialogStr;
  }
  return "";
}

function formatDialogLain(label, dialog) {
  if (!dialog) return "";
  return `${label} berkata: "${dialog.replace(/["“”]/g, '').trim()}"`;
}

// PATCH: Modular scene 1 paragraf, bilingual, backsound/sfx prioritas custom modular
function formatSceneModular(customObj, lang = 'indo', options = {}) {
  const {
    visualStyle,
    visualDescription,
    visualDescriptionEng,
    karakterUtama,
    hewanPendamping,
    makhlukAneh,
    sfx,        // fallback global/template utama
    sfxEng      // fallback global eng
  } = options;
  if (!customObj) return "";

  // Ambil field backsound/sfx modular — fallback urutannya: modular → global → default scene
  let backsound = customObj.backsound?.trim() || sfx || "";
  let backsoundEng = customObj.backsoundEng?.trim() || sfxEng || backsound;

  // Compose dialog, aksi, backsound
  let aksi = customObj.aksi?.trim().replace(/[:.]$/, "") || "";
  let aksiEng = customObj.aksiEng?.trim().replace(/[:.]$/, "") || "";

  // Dialog Karakter
  let dialogUtama = customObj.dialogKarakter?.trim();
  let dialogPendamping = customObj.dialogHewan?.trim();
  let dialogMakhluk = customObj.dialogMakhluk?.trim();

  // English dialog
  let dialogUtamaEng = customObj.dialogKarakterEng?.trim();
  let dialogPendampingEng = customObj.dialogHewanEng?.trim();
  let dialogMakhlukEng = customObj.dialogMakhlukEng?.trim();

  if (lang === "indo") {
    return [
      // Narasi sinematik
      `${karakterUtama}, ${hewanPendamping}, dan ${makhlukAneh} terlibat dalam adegan absurd berlatar ${visualStyle?.toLowerCase()} (${visualDescription?.toLowerCase()}).`,
      aksi ? `${aksi}${dialogUtama ? ` sambil berkata: "${dialogUtama.replace(/["“”]/g, '').trim()}"` : ""}.` : "",
      dialogPendamping ? `Karakter pendamping berkata: "${dialogPendamping.replace(/["“”]/g, '').trim()}"` : "",
      dialogMakhluk ? `Makhluk aneh berkata: "${dialogMakhluk.replace(/["“”]/g, '').trim()}"` : "",
      backsound ? `Efek suara/backsound: ${backsound}.` : "",
      "Negative prompt: tanpa nuansa horor gelap, tanpa kekerasan, tanpa gaya realis, tanpa warna kusam, tanpa adegan menakutkan."
    ].filter(Boolean).join(" ");
  } else {
    // English ver
    return [
      `${karakterUtama}, ${hewanPendamping}, and ${makhlukAneh} are involved in an absurd scene with ${visualStyle?.toLowerCase()} style (${visualDescriptionEng?.toLowerCase()}).`,
      aksiEng ? `${aksiEng}${dialogUtamaEng ? ` while saying: "${dialogUtamaEng.replace(/["“”]/g, '').trim()}"` : ""}.` : "",
      dialogPendampingEng ? `Sidekick says: "${dialogPendampingEng.replace(/["“”]/g, '').trim()}"` : "",
      dialogMakhlukEng ? `Creature says: "${dialogMakhlukEng.replace(/["“”]/g, '').trim()}"` : "",
      backsoundEng ? `SFX/Backsound: ${backsoundEng}.` : "",
      "Negative prompt: no horror, no violence, no realistic style, no dull color, no scary scenes."
    ].filter(Boolean).join(" ");
  }
}

// PATCH: createScene (untuk fallback default)
function createScene(judul, twistIndo, twistEng, details = {}, globalSfx = "", globalSfxEng = "") {
  // Fallback sfx jika details.sfx kosong
  const sceneSfx = details.sfx ? details.sfx : globalSfx;
  const sceneSfxEng = details.sfxEng ? details.sfxEng : globalSfxEng;

  const indoScene = [
    `${safeKarakterUtama} dan ${safeHewanPendamping} terlibat dalam adegan penuh gaya visual ${safeVisualStyle.toLowerCase()} (${visualDescription.toLowerCase()}).`,
    sceneSfx ? `Efek suara: ${sceneSfx}.` : "",
    details.dialog ? `Dialog: ${details.dialog.replace(/\n/g, ' ')}` : "",
    details.camera ? `Kamera: ${details.camera}.` : "",
    twistIndo ? `Twist: ${twistIndo}.` : (details.twist ? `Twist: ${details.twist}.` : "")
  ].filter(Boolean).join(' ');

  const engScene = [
    `${safeKarakterUtama} and ${safeHewanPendamping} are involved in a scene with a ${safeVisualStyle.toLowerCase()} style (${visualDescriptionEng.toLowerCase()}).`,
    sceneSfxEng ? `SFX: ${sceneSfxEng}.` : "",
    details.dialogEng ? `Dialog: ${details.dialogEng.replace(/\n/g, ' ')}` : "",
    details.cameraEng ? `Camera: ${details.cameraEng}.` : "",
    twistEng ? `Twist: ${twistEng}.` : (details.twistEng ? `Twist: ${details.twistEng}.` : "")
  ].filter(Boolean).join(' ');

  return {
    id: judul,
    indo: indoScene,
    english: engScene,
  };
}

// PATCH: Format khusus closing (bilingual, gaya cinematic & fun)
function formatClosingNarrative({
  karakterUtama,
  hewanPendamping,
  makhlukAneh,
  visualStyle,
  visualDescription,
  sfx,
  closingTwist
}) {
  return [
    `Semua terasa hening, ${karakterUtama} menatap ${hewanPendamping} dan ${makhlukAneh} dengan ekspresi heran dan bahagia.`,
    `Latar visual ${visualStyle} (${visualDescription.toLowerCase()}), karakter tertawa bersama.`,
    `Efek suara penutup: ${sfx || "musik lembut, suara angin pagi, tawa bersama"}.`,
    `Tiba-tiba layar perlahan memudar — dan ternyata semua hanyalah mimpi absurd di pagi hari.`,
    closingTwist ? `Twist: ${closingTwist}` : "",
    `Negative prompt: tanpa nuansa horor gelap, tanpa kekerasan, tanpa gaya realis, tanpa warna kusam, tanpa adegan menakutkan.`,
  ].filter(Boolean).join('\n');
}

function formatClosingNarrativeEng({
  karakterUtama,
  hewanPendamping,
  makhlukAneh,
  visualStyle,
  visualDescriptionEng,
  sfx,
  closingTwistEng
}) {
  return [
    `Everything turns silent, ${karakterUtama} looks at ${hewanPendamping} and ${makhlukAneh} with a surprised yet happy expression.`,
    `Visual background: ${visualStyle} (${visualDescriptionEng.toLowerCase()}), all characters laugh together.`,
    `Ending SFX: ${sfx || "soft music, morning breeze, laughter together"}.`,
    `Suddenly, the screen slowly fades — and it turns out to be just an absurd morning dream.`,
    closingTwistEng ? `Twist: ${closingTwistEng}` : "",
    `Negative prompt: no horror, no violence, no realistic style, no dull color, no scary scenes.`,
  ].filter(Boolean).join('\n');
}

export function generateModularPrompt(data) {
  const {
    visualStyle,
    karakterUtama,
    hewanPendamping,
    makhlukAneh,
    ceritaManual,
    judulFilm,
    sfx,
    customScenes = {},
  } = data;

  const defaultValues = {
    visualStyle: "Gaya visual absurd (misal: DreamWorks)",
    karakterUtama: "Karakter utama misterius",
    hewanPendamping: "Hewan pendamping super random",
    makhlukAneh: "Makhluk aneh dari dimensi lain",
  };

  const safeVisualStyle = visualStyle?.trim() ? visualStyle : defaultValues.visualStyle;
  const safeKarakterUtama = karakterUtama?.trim() ? karakterUtama : defaultValues.karakterUtama;
  const safeHewanPendamping = hewanPendamping?.trim() ? hewanPendamping : defaultValues.hewanPendamping;
  const safeMakhlukAneh = makhlukAneh?.trim() ? makhlukAneh : defaultValues.makhlukAneh;

  const useManual = ceritaManual && ceritaManual.trim() !== "";

  // Deskripsi visual (untuk bilingual)
  let visualDescription = "";
  let visualDescriptionEng = "";

  switch (safeVisualStyle) {
    case "DreamWorks":
      visualDescription = "Dengan gaya animasi penuh warna, ekspresif dan lucu khas DreamWorks.";
      visualDescriptionEng = "With vibrant animation, expressive and humorous in classic DreamWorks style.";
      break;
    case "Studio Ghibli":
      visualDescription = "Mengandung elemen magis, suasana alam tenang, dan filosofi dalam khas Studio Ghibli.";
      visualDescriptionEng = "Filled with magical elements, calm nature vibes, and deep philosophy like Studio Ghibli.";
      break;
    case "Laika (Stop Motion)":
      visualDescription = "Dengan nuansa gelap, aneh, dan elemen horor lucu seperti film Laika.";
      visualDescriptionEng = "With eerie, odd, and funny-horror tone like Laika’s stop-motion films.";
      break;
    case "Cartoon Network":
      visualDescription = "Penuh aksi konyol, warna mencolok, dan humor absurd seperti kartun Cartoon Network.";
      visualDescriptionEng = "Full of wacky action, vibrant colors, and absurd humor like Cartoon Network cartoons.";
      break;
    case "Retro Anime":
      visualDescription = "Dengan sentuhan anime 80-an, visual grainy dan narasi puitis klasik.";
      visualDescriptionEng = "With 80s anime touch, grainy visuals, and classic poetic narration.";
      break;
    case "Absurd Surreal 2D":
      visualDescription = "Dipenuhi metafora visual tak masuk akal dan kejutan surealis yang menggelitik.";
      visualDescriptionEng = "Filled with illogical visual metaphors and tickling surreal surprises.";
      break;
    default:
      visualDescription = "Dengan gaya visual unik dan khas.";
      visualDescriptionEng = "With a unique and distinctive visual style.";
  }

  // Handle semua manual (custom modular)
  if (useManual) {
    return {
      opening: { indo: ceritaManual, english: ceritaManual },
      scene1: { indo: ceritaManual, english: ceritaManual },
      scene2: { indo: ceritaManual, english: ceritaManual },
      scene3: { indo: ceritaManual, english: ceritaManual },
      scene4: { indo: ceritaManual, english: ceritaManual },
      scene5: { indo: ceritaManual, english: ceritaManual },
      scene6: { indo: ceritaManual, english: ceritaManual },
      closing: { indo: ceritaManual, english: ceritaManual },
    };
  }

  // Helper for scene patch
  function joinIfFilled(label, text, suffix = " berkata:") {
  if (!text || !text.trim()) return "";
  return `${label}${suffix} "${text.replace(/["“”]/g, '').trim()}"`;
}
function joinIfFilledEN(label, text, suffix = " says:") {
  if (!text || !text.trim()) return "";
  return `${label}${suffix} "${text.replace(/["“”]/g, '').trim()}"`;
}

// PATCH: Format modular scene untuk output 1 paragraf natural
function formatSceneAbsurdModular(customObj, lang = 'indo', options = {}) {
  const {
    visualStyle,
    visualDescription,
    visualDescriptionEng,
    karakterUtama,
    hewanPendamping,
    makhlukAneh,
    sfx,        // fallback global/template utama
    sfxEng      // fallback global eng
  } = options;
  if (!customObj) return "";

  // Compose aksi modular
  const aksiUtama = customObj.aksiKarakter?.trim();
  const aksiHewan = customObj.aksiHewan?.trim();
  const aksiMakhluk = customObj.aksiMakhluk?.trim();

  // Compose dialog modular
  const dialogUtama = customObj.dialogKarakter?.trim();
  const dialogHewan = customObj.dialogHewan?.trim();
  const dialogMakhluk = customObj.dialogMakhluk?.trim();

  // Compose English modular
  const aksiUtamaEng = customObj.aksiKarakterEng?.trim();
  const aksiHewanEng = customObj.aksiHewanEng?.trim();
  const aksiMakhlukEng = customObj.aksiMakhlukEng?.trim();

  const dialogUtamaEng = customObj.dialogKarakterEng?.trim();
  const dialogHewanEng = customObj.dialogHewanEng?.trim();
  const dialogMakhlukEng = customObj.dialogMakhlukEng?.trim();

  // SFX modular
  let sfxModular = customObj.sfx?.trim();
  let sfxModularEng = customObj.sfxEng?.trim();

  // --- OUTPUT INDO ---
  if (lang === "indo") {
    // Gabungkan semua aksi, lalu dialog, tetap urut aksi → dialog, biar natural
    let narasi = [
      // Opening scene
      `${karakterUtama}, ${hewanPendamping}, dan ${makhlukAneh} terlibat dalam adegan absurd berlatar ${visualStyle?.toLowerCase()} (${visualDescription?.toLowerCase()}).`,
      // Aksi tiap karakter
      aksiUtama ? joinIfFilled("Karakter utama", aksiUtama, " melakukan aksi:") : "",
      aksiHewan ? joinIfFilled("Karakter pendamping", aksiHewan, " melakukan aksi:") : "",
      aksiMakhluk ? joinIfFilled("Makhluk aneh", aksiMakhluk, " melakukan aksi:") : "",
      // Dialog tiap karakter
      dialogUtama ? joinIfFilled("Karakter utama", dialogUtama) : "",
      dialogHewan ? joinIfFilled("Karakter pendamping", dialogHewan) : "",
      dialogMakhluk ? joinIfFilled("Makhluk aneh", dialogMakhluk) : "",
      // SFX/Backsound
      (sfxModular || sfx) ? `Efek suara/backsound: ${sfxModular || sfx}.` : "",
      // Negative prompt
      "Negative prompt: tanpa nuansa horor gelap, tanpa kekerasan, tanpa gaya realis, tanpa warna kusam, tanpa adegan menakutkan."
    ].filter(Boolean).join(" ");
    return narasi;
  } else {
    // --- OUTPUT ENGLISH ---
    let narasi = [
      `${karakterUtama}, ${hewanPendamping}, and ${makhlukAneh} are involved in an absurd scene with ${visualStyle?.toLowerCase()} style (${visualDescriptionEng?.toLowerCase()}).`,
      aksiUtamaEng ? joinIfFilledEN("Main character", aksiUtamaEng, " does:") : "",
      aksiHewanEng ? joinIfFilledEN("Sidekick", aksiHewanEng, " does:") : "",
      aksiMakhlukEng ? joinIfFilledEN("Creature", aksiMakhlukEng, " does:") : "",
      dialogUtamaEng ? joinIfFilledEN("Main character", dialogUtamaEng) : "",
      dialogHewanEng ? joinIfFilledEN("Sidekick", dialogHewanEng) : "",
      dialogMakhlukEng ? joinIfFilledEN("Creature", dialogMakhlukEng) : "",
      (sfxModularEng || sfxEng) ? `SFX/Backsound: ${sfxModularEng || sfxEng}.` : "",
      "Negative prompt: no horror, no violence, no realistic style, no dull color, no scary scenes."
    ].filter(Boolean).join(" ");
    return narasi;
  }
}

// PATCH: helper untuk format dialog & aksi per karakter modular (biar mudah reuse)
function customScene(sceneKey, fallback, fallbackEng, fallbackDetail) {
  if (customScenes && customScenes[sceneKey]) {
    // PATCH: Prioritas field modular!
    return {
      indo: formatSceneAbsurdModular(
        customScenes[sceneKey],
        'indo',
        {
          visualStyle: safeVisualStyle,
          visualDescription,
          visualDescriptionEng,
          karakterUtama: safeKarakterUtama,
          hewanPendamping: safeHewanPendamping,
          makhlukAneh: safeMakhlukAneh,
          sfx: sfx || (fallbackDetail && fallbackDetail.sfx),
          sfxEng: sfx || (fallbackDetail && fallbackDetail.sfxEng),
        }
      ),
      english: formatSceneAbsurdModular(
        customScenes[sceneKey],
        'english',
        {
          visualStyle: safeVisualStyle,
          visualDescription,
          visualDescriptionEng,
          karakterUtama: safeKarakterUtama,
          hewanPendamping: safeHewanPendamping,
          makhlukAneh: safeMakhlukAneh,
          sfxEng: sfx || (fallbackDetail && fallbackDetail.sfxEng),
        }
      ),
    };
  }
  // fallback ke template absurd
  return createScene(sceneKey, fallback, fallbackEng, fallbackDetail);
}

  // Sisa logic scene default
  function createScene(judul, twistIndo, twistEng, details = {}, globalSfx = "", globalSfxEng = "") {
  // Fallback sfx jika details.sfx kosong
  const sceneSfx = details.sfx ? details.sfx : globalSfx;
  const sceneSfxEng = details.sfxEng ? details.sfxEng : globalSfxEng;

  const indoScene = [
    `${safeKarakterUtama} dan ${safeHewanPendamping} terlibat dalam adegan penuh gaya visual ${safeVisualStyle.toLowerCase()} (${visualDescription.toLowerCase()}).`,
    sceneSfx ? `Efek suara: ${sceneSfx}.` : "",
    details.dialog ? `Dialog: ${details.dialog.replace(/\n/g, ' ')}` : "",
    details.camera ? `Kamera: ${details.camera}.` : "",
    twistIndo ? `Twist: ${twistIndo}.` : (details.twist ? `Twist: ${details.twist}.` : "")
  ].filter(Boolean).join(' ');

  const engScene = [
    `${safeKarakterUtama} and ${safeHewanPendamping} are involved in a scene with a ${safeVisualStyle.toLowerCase()} style (${visualDescriptionEng.toLowerCase()}).`,
    sceneSfxEng ? `SFX: ${sceneSfxEng}.` : "",
    details.dialogEng ? `Dialog: ${details.dialogEng.replace(/\n/g, ' ')}` : "",
    details.cameraEng ? `Camera: ${details.cameraEng}.` : "",
    twistEng ? `Twist: ${twistEng}.` : (details.twistEng ? `Twist: ${details.twistEng}.` : "")
  ].filter(Boolean).join(' ');

  return {
    id: judul,
    indo: indoScene,
    english: engScene,
  };
}

  return {
    opening: {
      indo: formatOpeningNarrative({
        judulFilm: judulFilm?.trim() || "Judul Film Absurd",
        karakterUtama: safeKarakterUtama,
        hewanPendamping: safeHewanPendamping,
        makhlukAneh: safeMakhlukAneh,
        visualStyle: safeVisualStyle,
        visualDescription,
        backsound: sfx,
      }),
      english: formatOpeningNarrative({
        judulFilm: judulFilm?.trim() || "Absurd Movie Title",
        karakterUtama: safeKarakterUtama,
        hewanPendamping: safeHewanPendamping,
        makhlukAneh: safeMakhlukAneh,
        visualStyle: safeVisualStyle,
        visualDescription: visualDescriptionEng,
        backsound: sfx,
      }),
    },
    scene1: customScene(
      "scene1",
      "Hewan tiba-tiba bicara dengan logat Sunda.",
      "The animal suddenly speaks in Sundanese accent.",
      defaultSceneDetails[1]
    ),
    scene2: customScene(
      "scene2",
      "Makhluk aneh mendadak jadi influencer.",
      "The strange creature suddenly becomes an influencer.",
      defaultSceneDetails[2]
    ),
    scene3: customScene(
      "scene3",
      "Semua benda jadi hidup sementara.",
      "All objects come alive temporarily.",
      defaultSceneDetails[3]
    ),
    scene4: customScene(
      "scene4",
      "Tiba-tiba hujan spaghetti.",
      "Suddenly, spaghetti starts raining.",
      defaultSceneDetails[4]
    ),
    scene5: customScene(
      "scene5",
      "Karakter terjebak dalam meme viral.",
      "The character gets stuck in a viral meme.",
      defaultSceneDetails[5]
    ),
    scene6: customScene(
      "scene6",
      "Semua karakter nyanyi lagu dangdut.",
      "All characters sing a dangdut song.",
      defaultSceneDetails[6]
    ),
    closing: {
  indo: formatClosingNarrative({
    karakterUtama: safeKarakterUtama,
    hewanPendamping: safeHewanPendamping,
    makhlukAneh: safeMakhlukAneh,
    visualStyle: safeVisualStyle,
    visualDescription,
    sfx,
    closingTwist: "Ending ternyata cuma mimpi si makhluk.",
  }),
  english: formatClosingNarrativeEng({
    karakterUtama: safeKarakterUtama,
    hewanPendamping: safeHewanPendamping,
    makhlukAneh: safeMakhlukAneh,
    visualStyle: safeVisualStyle,
    visualDescriptionEng,
    sfx,
    closingTwistEng: "The ending turns out to be the creature's dream.",
  }),
},
  };
}
