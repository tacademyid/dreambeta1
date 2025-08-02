// src/logic/openingClosingFormatter.js

export function formatOpeningNarrative({
  judulFilm,
  karakterUtama,
  hewanPendamping,
  makhlukAneh,
  visualStyle,
  visualDescription,
  backsound,
}) {
  return `Dalam visual style ${visualStyle.toLowerCase()}, ${visualDescription}, ${karakterUtama} muncul dengan langkah linglung di gang sempit, diikuti ${hewanPendamping}${
    makhlukAneh?.trim() ? `, dan ${makhlukAneh} yang bergerak absurd seperti karakter dari mimpi aneh` : ""
  }. Saat mereka melangkah, tiba-tiba sepeda menabrak kerucut lalu lintas bercahaya — dari sana, judul film “${
    judulFilm || "Judul Film Absurd"
  }” meledak keluar dalam huruf kartun kenyal berwarna oranye neon, teal, dan kuning. Efek suara seperti ${backsound} mengiringi adegan penuh warna ini. Tanpa dialog, hanya ekspresi konyol dan irama komedik khas pembukaan film animasi. Negative prompt: tanpa horor, tanpa kekerasan, tanpa gaya realis, tanpa warna kusam, tanpa adegan menyeramkan.`;
}

export function formatClosingNarrative({
  karakterUtama,
  hewanPendamping,
  makhlukAneh,
  visualStyle,
  visualDescription,
  sfx,
  closingTwist
}) {
  return `Dalam suasana hening yang magis, ${karakterUtama} menatap ${hewanPendamping}${
    makhlukAneh?.trim() ? `, dan ${makhlukAneh}` : ""
  } dengan ekspresi heran bercampur syukur. Mark, drone super canggih yang tadi beraksi seperti toaster kesurupan, kini melayang pelan di udara dengan lampu-lampu warna pastel berkedip. Mereka bertiga berdiri di tengah puing warung cilok yang hangus setengah, dikelilingi bekas hujan meteor dan kabel yang menggantung dari pohon pisang. Gaya visual ${visualStyle.toLowerCase()} ${visualDescription.toLowerCase()} tetap mendominasi layar — saat kamera perlahan menjauh, memperlihatkan desa dari ketinggian dengan langit ungu kehijauan seperti campuran jus alpukat dan tape. Lalu, tiba-tiba… suara ringtone Nokia jadul berbunyi dari dalam perut Mark. Joni menggonggong, Suparman teriak, “ITU WA EMBAK??” — dan layar langsung gelap. Efek suara penutup berupa ${sfx || "suara kipas angin berhenti, satu kentut kecil... lalu sunyi"}. Twist: ${closingTwist || "ternyata semuanya hanyalah mimpi absurd si Mark saat sedang dicas sambil memutar musik dangdut remix dalam mode tidur"}. Negative prompt: tanpa nuansa horor gelap, tanpa kekerasan, tanpa gaya realis, tanpa warna kusam, tanpa adegan menakutkan.`;
}

export function formatClosingNarrativeEng({
  karakterUtama,
  hewanPendamping,
  makhlukAneh,
  visualStyle,
  visualDescriptionEng,
  sfx,
  closingTwistEng
}) {
  return `In a magical silence, ${karakterUtama} looks at ${hewanPendamping}${
    makhlukAneh?.trim() ? `, and ${makhlukAneh}` : ""
  } with a mix of wonder and gratitude. Mark, the advanced drone who previously behaved like a possessed toaster, now floats gently in the air with blinking pastel lights. The three of them stand in the middle of a half-burnt cilok stall, surrounded by meteor puddles and cables hanging from a banana tree. The ${visualStyle.toLowerCase()} visual style (${visualDescriptionEng.toLowerCase()}) still dominates the screen — as the camera slowly zooms out, revealing the village under a greenish-purple sky resembling avocado smoothie mixed with fermented tape. Suddenly… a classic Nokia ringtone plays from inside Mark’s belly. Joni barks, Suparman shouts, “IS THAT MOM’S WHATSAPP??” — and the screen cuts to black. Ending SFX: ${sfx || "the hum of a broken fan fades, one awkward fart sound... then silence"}. Twist: ${closingTwistEng || "it was all just an absurd dream inside Mark’s system while charging and playing dangdut remix in sleep mode"}. Negative prompt: no horror tones, no violence, no realism, no dull colors, no scary scenes.`;
}
