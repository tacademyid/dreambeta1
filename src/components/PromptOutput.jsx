import React, { useState } from "react";
import { motion } from "framer-motion";

// Helper untuk memotong string tanpa potong kata (maksimal 1000 karakter)
function trimPrompt(text) {
  return text || "";
}

const PromptOutput = ({ prompts }) => {
  if (!prompts) return null;

  const sections = [
    "opening",
    "scene1",
    "scene2",
    "scene3",
    "scene4",
    "scene5",
    "scene6",
    "closing",
  ];

  const titles = {
    opening: "Opening",
    scene1: "Scene 1",
    scene2: "Scene 2",
    scene3: "Scene 3",
    scene4: "Scene 4",
    scene5: "Scene 5",
    scene6: "Scene 6",
    closing: "Closing",
  };

  const [activeLang, setActiveLang] = useState({});
  const [activeSection, setActiveSection] = useState("opening");

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Prompt berhasil disalin!");
  };

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  // ✅ Fungsi ekspor ke .txt
  // ✅ Fungsi ekspor ke .txt (PATCHED dengan UTF-8 + BOM)
const exportToTxt = (prompts) => {
  let txtContent = "📦 Hasil Modular Prompt\n\n";
  for (const [section, content] of Object.entries(prompts)) {
    const title = section.charAt(0).toUpperCase() + section.slice(1);
    txtContent += `📌 ${title}\n`;
    txtContent += `🇮🇩 Bahasa:\n${content.indo || ""}\n\n`;
    txtContent += `🇺🇸 English:\n${content.english || ""}\n\n`;
    txtContent += "-------------------------\n\n";
  }

  // Tambahkan BOM agar emoji tetap muncul di .txt
  const blob = new Blob([`\uFEFF${txtContent}`], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "prompt-modular.txt";
  a.click();
  URL.revokeObjectURL(url);
};

  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-xl font-semibold text-orange-700">
  <span role="img" aria-label="box" className="mr-2">📦</span> Hasil Modular Prompt
</h2>

      {/* 🔘 Navigasi tab modular */}
      <div className="flex flex-wrap gap-2 mb-4">
        {sections.map((sec) => (
          <button
            key={sec}
            onClick={() => handleScrollTo(sec)}
            className={`px-3 py-1 text-sm rounded border transition 
              ${
                activeSection === sec
                  ? "bg-orange-600 text-white"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-orange-100"
              }`}
          >
            {titles[sec]}
          </button>
        ))}
        {/* Tombol ekspor ke .txt */}
        {/* Tombol ekspor ke .txt */}
<button
  onClick={() => exportToTxt(prompts)}
  className="ml-auto bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded text-sm flex items-center gap-1"
>
  <span role="img" aria-label="file">📁</span> Ekspor .txt
</button>

      </div>

      {sections.map((section, index) => {
        const currentLang = activeLang[section] || "indo";
        const contentRaw = prompts[section]?.[currentLang] || "";
        const content = contentRaw; // PATCH: tampilkan full, tanpa trim

        const isOpeningOrClosing = section === "opening" || section === "closing";

        return (
          <motion.div
            id={section}
            key={section}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`border rounded-md p-4 shadow-sm transition
              ${isOpeningOrClosing
                ? "bg-yellow-50 dark:bg-yellow-900 border-yellow-400 dark:border-yellow-600"
                : "bg-gray-50 dark:bg-[#212c42] border-gray-300 dark:border-gray-700"
              }`}
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
              <h3 className={`font-bold text-lg ${
                isOpeningOrClosing ? "text-yellow-800 dark:text-yellow-100" : "text-gray-800 dark:text-yellow-200"
              }`}>
                {section === "opening" ? "🎬 Opening" : section === "closing" ? "🔚 Closing" : titles[section]}
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() =>
                    setActiveLang((prev) => ({ ...prev, [section]: "indo" }))
                  }
                  className={`px-3 py-1 rounded text-sm font-semibold border transition
                    ${
                      currentLang === "indo"
                        ? "bg-orange-500 text-white border-orange-500 shadow-md"
                        : "bg-white dark:bg-[#21325d] text-gray-800 dark:text-yellow-200 border-gray-300 dark:border-blue-800 hover:bg-orange-100 dark:hover:bg-blue-700"
                    }`}
                >
                  Bahasa
                </button>
                <button
                  onClick={() =>
                    setActiveLang((prev) => ({ ...prev, [section]: "english" }))
                  }
                  className={`px-3 py-1 rounded text-sm font-semibold border transition
                    ${
                      currentLang === "english"
                        ? "bg-orange-500 text-white border-orange-500 shadow-md"
                        : "bg-white dark:bg-[#21325d] text-gray-800 dark:text-yellow-200 border-gray-300 dark:border-blue-800 hover:bg-orange-100 dark:hover:bg-blue-700"
                    }`}
                >
                  English
                </button>
                <button
                  onClick={() => handleCopy(content)}
                  className="ml-2 bg-orange-600 dark:bg-orange-700 hover:bg-orange-700 dark:hover:bg-orange-600 text-white px-3 py-1 rounded text-sm font-bold transition flex items-center gap-1"
                >
                  <span className="hidden sm:inline">Copy Prompt</span>
                  <span className="sm:hidden">
                    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                      <path d="M4 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5.414A2 2 0 0 0 13.414 4L10 0.586A2 2 0 0 0 8.586 0H4zm1 2h4V5a1 1 0 0 0 1 1h3v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
            <pre className="bg-white dark:bg-[#233252] dark:text-blue-100 p-3 rounded text-sm whitespace-pre-wrap transition">
              {content}
            </pre>
          </motion.div>
        );
      })}
    </div>
  );
};

export default PromptOutput;
