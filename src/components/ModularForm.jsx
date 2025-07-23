import React, { useState, useEffect } from "react";
import TemplateSelector from "./TemplateSelector"; // Pastikan import benar
const DRAFT_KEY = "dreamworksedition_modularform_draft";

const ModularForm = ({ onGenerate, template }) => {
  const [formData, setFormData] = useState(() => {
    const draft = localStorage.getItem(DRAFT_KEY);
    return draft
      ? JSON.parse(draft)
      : {
          visualStyle: "",
          karakterUtama: "",
          hewanPendamping: "",
          makhlukAneh: "",
          judulFilm: "",
          durasi: "",
          sfx: "",
          ideCerita: "",
        };
  });

  const [customScenes, setCustomScenes] = useState({
  scene1: { aksi: "", sfx: "", dialogKarakter: "", dialogHewan: "", dialogMakhluk: "" },
  scene2: { aksi: "", sfx: "", dialogKarakter: "", dialogHewan: "", dialogMakhluk: "" },
  scene3: { aksi: "", sfx: "", dialogKarakter: "", dialogHewan: "", dialogMakhluk: "" },
  scene4: { aksi: "", sfx: "", dialogKarakter: "", dialogHewan: "", dialogMakhluk: "" },
  scene5: { aksi: "", sfx: "", dialogKarakter: "", dialogHewan: "", dialogMakhluk: "" },
  scene6: { aksi: "", sfx: "", dialogKarakter: "", dialogHewan: "", dialogMakhluk: "" },
});


// PATCH: Helper autofill modular scenes dari template absurd
function autofillModularScenesFromTemplate(template) {
  const totalScenes = 6;
  const scenes = {};
  for (let i = 1; i <= totalScenes; i++) {
    scenes[`scene${i}`] = {
      aksi: `Di scene ${i}, ${template.karakterUtama} bersama ${template.hewanPendamping} & ${template.makhlukAneh} melakukan aksi lucu di dunia ${template.visualStyle}.`,
      sfx: template.sfx || "",
      dialogKarakter: `${template.karakterUtama.split(",")[0]}: "Ayo, kita bikin scene ${i} makin konyol!"`,
      dialogHewan: `${template.hewanPendamping.split(",")[0]}: "Aku ikutan, tapi jangan aneh-aneh ya!"`,
      dialogMakhluk: `${template.makhlukAneh.split(",")[0]}: "Scene ini harus absurd dan memorable!"`,
    };
  }
  return scenes;
}

  // PATCH: Handler utama
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // PATCH: Handler submit
  const handleSubmit = (e) => {
  e.preventDefault();

  // Build customScenes object dengan semua field modular
  const mergedCustomScenes = {};
  Object.keys(customScenes).forEach((sceneKey) => {
    const scene = customScenes[sceneKey];
    // Minimal isi salah satu agar tidak kosong total
    if (scene.aksi.trim() || scene.sfx.trim() || scene.dialogKarakter.trim() || scene.dialogHewan.trim() || scene.dialogMakhluk.trim()) {
      mergedCustomScenes[sceneKey] = {
        aksi: scene.aksi.trim(),
        sfx: scene.sfx.trim(),
        dialogKarakter: scene.dialogKarakter.trim(),
        dialogHewan: scene.dialogHewan.trim(),
        dialogMakhluk: scene.dialogMakhluk.trim(),
      };
    }
  });

  onGenerate?.({
    ...formData,
    customScenes: mergedCustomScenes, // <--- Kirim lengkap ke generator
  });
};

  // PATCH: Handler reset
  const resetForm = () => {
    setFormData({
      visualStyle: "",
      karakterUtama: "",
      hewanPendamping: "",
      makhlukAneh: "",
      judulFilm: "",
      durasi: "",
      sfx: "",
      ideCerita: "",
    });
    localStorage.removeItem(DRAFT_KEY);
    setCustomScenes({
  scene1: { aksi: "", sfx: "", dialogKarakter: "", dialogHewan: "", dialogMakhluk: "" },
  scene2: { aksi: "", sfx: "", dialogKarakter: "", dialogHewan: "", dialogMakhluk: "" },
  scene3: { aksi: "", sfx: "", dialogKarakter: "", dialogHewan: "", dialogMakhluk: "" },
  scene4: { aksi: "", sfx: "", dialogKarakter: "", dialogHewan: "", dialogMakhluk: "" },
  scene5: { aksi: "", sfx: "", dialogKarakter: "", dialogHewan: "", dialogMakhluk: "" },
  scene6: { aksi: "", sfx: "", dialogKarakter: "", dialogHewan: "", dialogMakhluk: "" },
});
  };

  // PATCH: Auto-load template ke input
  useEffect(() => {
    if (template) {
      setFormData({
        visualStyle: template.visualStyle || "",
        karakterUtama: template.karakterUtama || "",
        hewanPendamping: template.hewanPendamping || "",
        makhlukAneh: template.makhlukAneh || "",
        judulFilm: template.judulFilm || "",
        durasi: template.durasi || "",
        sfx: template.sfx || "",
        ideCerita: "",
      });
    }
  }, [template]);

  // PATCH: Auto-save ke localStorage
  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
  }, [formData]);

  // PATCH: Handler pilih template absurd (isi semua field otomatis + autofill customScenes)
const handleTemplateSelect = (tpl) => {
  setFormData({
    visualStyle: tpl.visualStyle || "",
    karakterUtama: tpl.karakterUtama || "",
    hewanPendamping: tpl.hewanPendamping || "",
    makhlukAneh: tpl.makhlukAneh || "",
    judulFilm: tpl.judulFilm || "",
    durasi: tpl.durasi || "",
    sfx: tpl.sfx || "",
    ideCerita: tpl.ideCerita || "",
  });
  // Autofill custom modular scenes juga
  setCustomScenes(autofillModularScenesFromTemplate(tpl));
};

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      {/* 🔥 Pilih Template Absurd */}
      <TemplateSelector onSelect={handleTemplateSelect} />

      {/* ✍️ Ide Cerita */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
  {/* Kiri: Tulis Ide Cerita Sendiri */}
  <div className="flex-1 rounded-lg p-4 mb-2 shadow transition bg-white dark:bg-[#e2d6f6]">
    <label className="flex items-center gap-1 font-bold text-gray-800 dark:text-purple-700 text-lg mb-2">
      ✍️ Tulis Ide Cerita Kamu Sendiri Bro
    </label>
    <textarea
      name="ideCerita"
      value={formData.ideCerita}
      onChange={handleChange}
      rows={3}
      placeholder="Tulis ide cerita kamu di sini..."
      className="w-full border border-gray-300 dark:border-purple-300 focus:border-purple-500 focus:ring-purple-300 p-2 rounded mt-1 bg-white dark:bg-[#c1b6e5] text-gray-900 dark:text-purple-900 placeholder:text-gray-400 dark:placeholder:text-purple-300 focus:outline-none transition"
    />
    <p className="text-sm text-gray-500 dark:text-purple-800 mt-2">
      Jika diisi, aplikasi akan memprioritaskan ide cerita ini daripada template yang dipilih.
    </p>
  </div>
  {/* Kanan: Gaya Visual */}
  <div className="flex-1 rounded-lg p-4 mb-2 shadow transition bg-white dark:bg-[#fef4d5]">
    <label className="flex items-center gap-1 font-bold text-gray-800 dark:text-yellow-700 text-lg mb-2">
      🎨 Pilih Visual (misal: DreamWorks)
    </label>
    <input
      type="text"
      name="visualStyle"
      value={formData.visualStyle}
      onChange={handleChange}
      placeholder="Masukkan 🎨 Gaya Visual (misal: DreamWorks, Stop Motion)"
      className="w-full border border-gray-300 dark:border-yellow-300 focus:border-yellow-500 focus:ring-yellow-300 p-2 rounded mt-1 bg-white dark:bg-[#fff5c2] text-gray-900 dark:text-yellow-900 placeholder:text-gray-400 dark:placeholder:text-yellow-500 focus:outline-none transition"
    />
    <div className="flex flex-wrap gap-2 mt-2">
      {[
        "DreamWorks",
        "Pixar",
        "Stop Motion",
        "Ghibli",
        "Claymation",
        "2D Kartun Lawas",
      ].map((style) => (
        <button
          key={style}
          type="button"
          onClick={() =>
            setFormData((prev) => ({ ...prev, visualStyle: style }))
          }
          className="bg-yellow-200 px-3 py-1 text-sm rounded-full hover:bg-yellow-300 dark:bg-yellow-300 dark:text-yellow-900 dark:hover:bg-yellow-400 transition"
        >
          {style}
        </button>
      ))}
    </div>
  </div>
</div>

      {/* 🔀 Grid Responsif */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* 🧍 Deskripsi Karakter Utama */}
  <div className="rounded-lg p-4 mb-2 shadow transition bg-white dark:bg-[#8996B1]">
    <label className="flex items-center gap-1 font-bold text-gray-800 dark:text-blue-100 text-lg mb-2">
      🧍 Deskripsi Karakter Utama
    </label>
    <input
      type="text"
      name="karakterUtama"
      value={formData.karakterUtama}
      onChange={handleChange}
      placeholder="Masukkan Deskripsi Karakter Utama"
      className="w-full border border-gray-300 dark:border-blue-200 focus:border-blue-400 focus:ring-blue-300 p-2 rounded mt-1 bg-white dark:bg-[#6D7893] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-blue-100 focus:outline-none transition"
    />
    <p className="text-sm text-gray-500 dark:text-blue-50 mt-2">
      Tulis dalam bahasa inggris jika ingin output jadi bahasa inggris.
    </p>
  </div>
  {/* 🐶 Deskripsi Hewan Pendamping */}
  <div className="rounded-lg p-4 mb-2 shadow transition bg-white dark:bg-[#8996B1]">
    <label className="flex items-center gap-1 font-bold text-gray-800 dark:text-blue-100 text-lg mb-2">
      🐶 Deskripsi Pendamping (Manusia/Hewan)
    </label>
    <input
      type="text"
      name="hewanPendamping"
      value={formData.hewanPendamping}
      onChange={handleChange}
      placeholder="Masukkan Deskripsi Hewan Pendamping"
      className="w-full border border-gray-300 dark:border-blue-200 focus:border-blue-400 focus:ring-blue-300 p-2 rounded mt-1 bg-white dark:bg-[#6D7893] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-blue-100 focus:outline-none transition"
    />
    <p className="text-sm text-gray-500 dark:text-blue-50 mt-2">
      Tulis dalam bahasa inggris jika ingin output jadi bahasa inggris.
    </p>
  </div>
  {/* 👾 Deskripsi Makhluk Aneh */}
  <div className="rounded-lg p-4 mb-2 shadow transition bg-white dark:bg-[#8996B1]">
    <label className="flex items-center gap-1 font-bold text-gray-800 dark:text-blue-100 text-lg mb-2">
      👾 Deskripsi Makhluk / Hewan
    </label>
    <input
      type="text"
      name="makhlukAneh"
      value={formData.makhlukAneh}
      onChange={handleChange}
      placeholder="Masukkan Deskripsi Makhluk Aneh"
      className="w-full border border-gray-300 dark:border-blue-200 focus:border-blue-400 focus:ring-blue-300 p-2 rounded mt-1 bg-white dark:bg-[#6D7893] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-blue-100 focus:outline-none transition"
    />
    <p className="text-sm text-gray-500 dark:text-blue-50 mt-2">
      Tulis dalam bahasa inggris jika ingin output jadi bahasa inggris.
    </p>
  </div>
  {/* 🎬 Judul Film */}
  <div className="rounded-lg p-4 mb-2 shadow transition bg-white dark:bg-[#8996B1]">
    <label className="flex items-center gap-1 font-bold text-gray-800 dark:text-blue-100 text-lg mb-2">
      🎬 Judul Film
    </label>
    <input
      type="text"
      name="judulFilm"
      value={formData.judulFilm}
      onChange={handleChange}
      placeholder="Masukkan Judul Film"
      className="w-full border border-gray-300 dark:border-blue-200 focus:border-blue-400 focus:ring-blue-300 p-2 rounded mt-1 bg-white dark:bg-[#6D7893] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-blue-100 focus:outline-none transition"
    />
    <p className="text-sm text-gray-500 dark:text-blue-50 mt-2">
      Tulis dalam bahasa inggris jika ingin output jadi bahasa inggris.
    </p>
  </div>
  {/* ⏱️ Durasi */}
  <div className="rounded-lg p-4 mb-2 shadow transition bg-white dark:bg-[#8996B1]">
    <label className="flex items-center gap-1 font-bold text-gray-800 dark:text-blue-100 text-lg mb-2">
      ⏱️ Durasi (menit)
    </label>
    <input
      type="number"
      name="durasi"
      value={formData.durasi}
      onChange={handleChange}
      placeholder="Masukkan Durasi (menit)"
      className="w-full border border-gray-300 dark:border-blue-200 focus:border-blue-400 focus:ring-blue-300 p-2 rounded mt-1 bg-white dark:bg-[#6D7893] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-blue-100 focus:outline-none transition"
    />
    <p className="text-sm text-gray-500 dark:text-blue-50 mt-2">
      Pilih durasi max 8 detik saja.
    </p>
  </div>
  {/* 🎵 Efek Suara */}
  <div className="rounded-lg p-4 mb-2 shadow transition bg-white dark:bg-[#8996B1]">
    <label className="flex items-center gap-1 font-bold text-gray-800 dark:text-blue-100 text-lg mb-2">
      🎵 Efek Suara
    </label>
    <input
      type="text"
      name="sfx"
      value={formData.sfx}
      onChange={handleChange}
      placeholder="Masukkan Efek Suara"
      className="w-full border border-gray-300 dark:border-blue-200 focus:border-blue-400 focus:ring-blue-300 p-2 rounded mt-1 bg-white dark:bg-[#6D7893] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-blue-100 focus:outline-none transition"
    />
    <p className="text-sm text-gray-500 dark:text-blue-50 mt-2">
      Pilih efek suara / backsound sesuai seleramu.
    </p>
  </div>
</div>

      {/* Custom Modular Output per Scene */}
<div className="mt-8">
  <h3 className="font-bold mb-2 text-gray-900 dark:text-indigo-500 text-xl tracking-wide transition">
    Custom Modular Input per Scene.
  </h3>
  <p className="text-sm text-gray-600 dark:text-indigo-300 mb-4">
    <b>Tips:</b> Isi <b>Aksi Karakter</b> sesuai karakter mana yang ingin didominankan di scene ini. Misal: <i>“Kecoak sakti Coki menyelinap di meja sambil jungkir balik, Bu Juleha malah teriak ketakutan…”</i>
    <br />
    <b>Dialog Karakter:</b> Isi dialog untuk karakter tertentu saja (tidak harus semuanya diisi).
  </p>
  {[1, 2, 3, 4, 5, 6].map((num) => (
    <div key={num} className="mb-6 border p-3 rounded-lg bg-yellow-50 dark:bg-gray-800/30">
      <div className="font-semibold mb-2 text-orange-600">Scene {num}</div>

      {/* Aksi Multi Karakter */}
      <div className="rounded-xl bg-orange-100 dark:bg-orange-900/30 p-3 shadow-sm mb-2 flex flex-col">
        <div className="font-bold mb-1 flex items-center gap-2 text-orange-700 dark:text-yellow-200">
          🎬 Aksi Karakter (Bebas karakter mana saja!)
        </div>
        <textarea
          rows={2}
          value={customScenes[`scene${num}`]?.aksi || ""}
          onChange={(e) =>
            setCustomScenes((prev) => ({
              ...prev,
              [`scene${num}`]: {
                ...prev[`scene${num}`],
                aksi: e.target.value,
              },
            }))
          }
          className="w-full border rounded p-2 mt-1 bg-white dark:bg-yellow-950/50"
          placeholder={`Narasi aksi scene ${num} (contoh: Coki melompat ke wajan, Bu Juleha jatuh, Es batu menari di lantai...)`}
        />
        <span className="text-xs text-gray-500 dark:text-yellow-200 mt-1">
          Masukkan aksi karakter mana saja secara bebas, tidak harus karakter utama.
        </span>
      </div>

      {/* Backsound / SFX */}
      <div className="rounded-xl bg-cyan-50 dark:bg-cyan-100/30 p-3 shadow-sm mb-2 flex flex-col">
        <div className="font-bold mb-1 flex items-center gap-2 text-cyan-700 dark:text-cyan-200">
          🔊 Backsound / SFX
        </div>
        <input
          type="text"
          value={customScenes[`scene${num}`]?.sfx || ""}
          onChange={(e) =>
            setCustomScenes((prev) => ({
              ...prev,
              [`scene${num}`]: {
                ...prev[`scene${num}`],
                sfx: e.target.value,
              },
            }))
          }
          className="w-full border rounded p-2 mt-1 bg-white dark:bg-amber-950/50"
          placeholder={`Efek suara/backsound scene ${num} (contoh: bunyi sendok jatuh, suara tawa, dentum drum…)`}
        />
      </div>

      {/* DIALOG: Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
        {/* Dialog Karakter Utama */}
        <div className="rounded-xl bg-blue-50 dark:bg-blue-900/30 p-3 shadow-sm flex flex-col">
          <div className="font-bold mb-1 flex items-center gap-2 text-blue-800 dark:text-blue-200">
            🧍 Dialog Karakter Utama
          </div>
          <textarea
            rows={1}
            value={customScenes[`scene${num}`]?.dialogKarakter || ""}
            onChange={(e) =>
              setCustomScenes((prev) => ({
                ...prev,
                [`scene${num}`]: {
                  ...prev[`scene${num}`],
                  dialogKarakter: e.target.value,
                },
              }))
            }
            className="w-full border rounded p-2 mt-1 bg-white dark:bg-blue-950/50"
            placeholder="Dialog karakter utama di scene ini…"
          />
        </div>
        {/* Dialog Hewan Pendamping */}
        <div className="rounded-xl bg-green-50 dark:bg-green-900/30 p-3 shadow-sm flex flex-col">
          <div className="font-bold mb-1 flex items-center gap-2 text-green-800 dark:text-green-200">
            🐶 Dialog Hewan Pendamping
          </div>
          <textarea
            rows={1}
            value={customScenes[`scene${num}`]?.dialogHewan || ""}
            onChange={(e) =>
              setCustomScenes((prev) => ({
                ...prev,
                [`scene${num}`]: {
                  ...prev[`scene${num}`],
                  dialogHewan: e.target.value,
                },
              }))
            }
            className="w-full border rounded p-2 mt-1 bg-white dark:bg-green-950/50"
            placeholder="Dialog hewan pendamping di scene ini…"
          />
        </div>
        {/* Dialog Makhluk Aneh */}
        <div className="rounded-xl bg-purple-50 dark:bg-purple-900/30 p-3 shadow-sm flex flex-col">
          <div className="font-bold mb-1 flex items-center gap-2 text-purple-800 dark:text-purple-200">
            👾 Dialog Makhluk Aneh
          </div>
          <textarea
            rows={1}
            value={customScenes[`scene${num}`]?.dialogMakhluk || ""}
            onChange={(e) =>
              setCustomScenes((prev) => ({
                ...prev,
                [`scene${num}`]: {
                  ...prev[`scene${num}`],
                  dialogMakhluk: e.target.value,
                },
              }))
            }
            className="w-full border rounded p-2 mt-1 bg-white dark:bg-purple-950/50"
            placeholder="Dialog makhluk aneh di scene ini…"
          />
        </div>
      </div>
    </div>
  ))}
</div>

      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded text-base w-full sm:w-auto"
      >
        🚀 Generate Prompt Sekarang
      </button>
      <button
        type="button"
        className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded mt-2 ml-2"
        onClick={resetForm}
      >
        🔄 Reset Form
      </button>
    </form>
  );
};

export default ModularForm;
