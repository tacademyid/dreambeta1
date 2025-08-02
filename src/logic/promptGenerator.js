// src/logic/promptGenerator.js
import { sceneModular } from './sceneFormatter';

const defaultValues = {
  visualStyle: "Gaya visual absurd (misal: DreamWorks)",
  karakterUtama: "Karakter utama misterius",
  hewanPendamping: "Hewan pendamping super random",
  makhlukAneh: "Makhluk aneh dari dimensi lain",
};

import {
  formatOpeningNarrative,
  formatClosingNarrative,
  formatClosingNarrativeEng
} from './openingClosingFormatter';

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

  const safeVisualStyle = visualStyle?.trim() || defaultValues.visualStyle;
  const safeKarakterUtama = karakterUtama?.trim() || defaultValues.karakterUtama;
  const safeHewanPendamping = hewanPendamping?.trim() || defaultValues.hewanPendamping;
  const safeMakhlukAneh = makhlukAneh?.trim() || "";

  const useManual = ceritaManual && ceritaManual.trim() !== "";

  // Deskripsi visual
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

  // Manual prompt (semua scene sama)
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

  const options = {
    visualStyle: safeVisualStyle,
    visualDescription,
    visualDescriptionEng,
    karakterUtama: safeKarakterUtama,
    hewanPendamping: safeHewanPendamping,
    makhlukAneh: safeMakhlukAneh,
    sfx,
    sfxEng: sfx
  };

  return {
    opening: {
      indo: formatOpeningNarrative({
        judulFilm,
        karakterUtama: safeKarakterUtama,
        hewanPendamping: safeHewanPendamping,
        makhlukAneh: safeMakhlukAneh,
        visualStyle: safeVisualStyle,
        visualDescription,
        backsound: sfx,
      }),
      english: formatOpeningNarrative({
        judulFilm,
        karakterUtama: safeKarakterUtama,
        hewanPendamping: safeHewanPendamping,
        makhlukAneh: safeMakhlukAneh,
        visualStyle: safeVisualStyle,
        visualDescription: visualDescriptionEng,
        backsound: sfx,
      }),
    },
    scene1: sceneModular("scene1", customScenes, options),
    scene2: sceneModular("scene2", customScenes, options),
    scene3: sceneModular("scene3", customScenes, options),
    scene4: sceneModular("scene4", customScenes, options),
    scene5: sceneModular("scene5", customScenes, options),
    scene6: sceneModular("scene6", customScenes, options),
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
