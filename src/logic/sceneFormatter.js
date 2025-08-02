// sceneFormatter.js
import { defaultValues } from "../data/defaultValues";

const defaultFallbackScenes = {
  scene1: "Suparman nyasar ke pasar hologram, bertemu ibu-ibu dari masa depan.",
  scene2: "Joni menyamar jadi kurir online demi mencuri galon warga.",
  scene3: "Mark berubah jadi kipas angin saat listrik padam total.",
  scene4: "Semua karakter tertukar suara—Suparman bersuara ayam.",
  scene5: "Joni jadi influencer dadakan jual NFT genteng.",
  scene6: "Mark menggelar konser dangdut hologram di tengah gang."
};

export function formatSceneAbsurdModular(customObj, lang = 'indo', options = {}) {
  const {
    visualStyle,
    visualDescription,
    visualDescriptionEng,
    karakterUtama,
    hewanPendamping,
    makhlukAneh,
    sfx,
    sfxEng,
  } = options;

  if (!customObj) return "";

  const promptVisual = customObj.promptVisual?.trim();
  const aksiKarakter = customObj.aksiKarakter?.trim() || customObj.aksi?.trim() || "";
  const aksiKarakterEng = customObj.aksiKarakterEng?.trim() || "";

  const dialogUtama = customObj.dialogKarakter?.trim();
  const dialogHewan = customObj.dialogHewan?.trim();
  const dialogMakhluk = customObj.dialogMakhluk?.trim();

  const dialogUtamaEng = customObj.dialogKarakterEng?.trim();
  const dialogHewanEng = customObj.dialogHewanEng?.trim();
  const dialogMakhlukEng = customObj.dialogMakhlukEng?.trim();

  const sfxModular = customObj.sfx?.trim();
  const sfxModularEng = customObj.sfxEng?.trim();

  const makhlukLine = makhlukAneh?.trim() && makhlukAneh !== defaultValues.makhlukAneh ? makhlukAneh : null;

  if (lang === "indo") {
    const aksiFinal = aksiKarakter
      .replace(karakterUtama?.split(',')[0], karakterUtama)
      .replace(hewanPendamping?.split(',')[0], hewanPendamping)
      .replace(makhlukLine?.split(',')[0], makhlukLine || "");

    const dialogList = [
      dialogUtama ? `${karakterUtama?.split(',')[0]} berkata: "${dialogUtama}"` : null,
      dialogHewan ? `${hewanPendamping?.split(',')[0]} menjawab: "${dialogHewan}"` : null,
      dialogMakhluk && makhlukLine ? `${makhlukLine?.split(',')[0]} menjawab: "${dialogMakhluk}"` : null,
    ].filter(Boolean).join(" ");

    const backsound = (sfxModular || sfx)
      ? `Backsound atau efek suara yang terdengar: ${sfxModular || sfx}.`
      : null;

    return [
      `Gaya visual dengan animasi penuh warna, ekspresif dan lucu khas DreamWorks. ${promptVisual || ""}`,
      aksiFinal,
      dialogList,
      backsound,
      "Negative prompt: tanpa kesalahan dialog, tanpa dialog yang tertukar atau salah ucap,tanpa nuansa horor gelap, tanpa kekerasan, tanpa gaya realis, tanpa warna kusam, tanpa adegan menakutkan.",
    ].filter(Boolean).join(" ");
  }

  if (lang === "eng") {
    const aksiFinalEng = aksiKarakterEng
      .replace(karakterUtama?.split(',')[0], karakterUtama)
      .replace(hewanPendamping?.split(',')[0], hewanPendamping)
      .replace(makhlukLine?.split(',')[0], makhlukLine || "");

    const dialogListEng = [
      dialogUtamaEng ? `${karakterUtama?.split(',')[0]} says: "${dialogUtamaEng}"` : null,
      dialogHewanEng ? `${hewanPendamping?.split(',')[0]} replies: "${dialogHewanEng}"` : null,
      dialogMakhlukEng && makhlukLine ? `${makhlukLine?.split(',')[0]} replies: "${dialogMakhlukEng}"` : null,
    ].filter(Boolean).join(" ");

    const backsoundEng = (sfxModularEng || sfxEng)
      ? `Backsound or sound effects: ${sfxModularEng || sfxEng}.`
      : null;

    return [
      `Visual style in colorful, expressive, and comically absurd DreamWorks-style animation. ${visualDescriptionEng || promptVisual || ""}`,
      aksiFinalEng,
      dialogListEng,
      backsoundEng,
      "Negative prompt: no dialogue errors, no mixed-up or swapped dialogue, no horror tones, no violence, no realism, no dull colors, no frightening scenes.",
    ].filter(Boolean).join(" ");
  }

  return "";
}


export function sceneModular(sceneKey, customScenes, options) {
  const customObj = customScenes[sceneKey];
  const fallbackText = defaultFallbackScenes[sceneKey];

  const fallback = `Gaya visual dengan animasi penuh warna, ekspresif dan lucu khas DreamWorks. ${fallbackText}.`;

  return {
    indo: customObj
      ? formatSceneAbsurdModular(customObj, 'indo', options)
      : fallback,
    english: customObj
      ? formatSceneAbsurdModular(customObj, 'eng', options)
      : "[This scene is auto-generated in English fallback mode.]",
  };
}

