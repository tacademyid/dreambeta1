import React, { useState, useEffect } from "react";
import ThemeToggle from "../components/ThemeToggle";
import HeaderTitle from "../components/HeaderTitle";
import TemplateSelector from "../components/TemplateSelector";
import ModularForm from "../components/ModularForm";
import PromptOutput from "../components/PromptOutput";
import { FaCog } from "react-icons/fa";
import ApiKeyModal from "../components/ApiKeyModal";
import { generateModularPrompt } from "../logic/promptGenerator";
import LoginPage from "./LoginPage"; // Pastikan path sudah sesuai

const TemplatePromptPage = () => {
  // --- LOGIN GATE ---
  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem("dreamworks_loggedin") === "yes";
  });

  useEffect(() => {
    setLoggedIn(localStorage.getItem("dreamworks_loggedin") === "yes");
  }, []);

  const handleLogout = () => {
  localStorage.removeItem("dreamworks_loggedin");
  setLoggedIn(false);
  window.location.reload(); // ⬅️ PATCH AGAR OTOMATIS REFRESH
  };

  if (!loggedIn) {
    return <LoginPage onLogin={() => setLoggedIn(true)} />;
  }

  // --- NORMAL LOGIC ---
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [promptOutput, setPromptOutput] = useState(null);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKey, setApiKey] = useState("");

  // ✅ useEffect ini jalan sekali saat halaman dibuka
  useEffect(() => {
    const storedApiKey = localStorage.getItem("dreamworks_api_key"); // ambil dari browser
    if (storedApiKey) {
      setApiKey(storedApiKey); // isi ke dalam state API Key
    }
  }, []); // ← Array kosong artinya cuma jalan sekali waktu komponen dimuat

  const handleGenerate = (formData) => {
    const hasilPrompt = generateModularPrompt(formData);
    setPromptOutput(hasilPrompt);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">

      {/* ✅ Navigasi Responsive */}
      <header className="flex justify-between items-center pb-2 border-b border-orange-200">
        {/* Kiri: Tombol Dark Mode */}
        <div className="flex items-center">
          <ThemeToggle />
        </div>
        {/* Tombol API Key dengan Icon Gear */}
        <div className="flex items-center">
          <button
            onClick={() => setShowApiKeyModal(true)}
            className="flex items-center gap-2 bg-orange-100 text-orange-700 text-sm font-medium px-3 py-1 rounded-md shadow-sm hover:bg-orange-200 transition-colors duration-300"
          >
            <FaCog className="w-4 h-4" />
            API Key
          </button>

          <ApiKeyModal
            isOpen={showApiKeyModal}
            onClose={() => setShowApiKeyModal(false)}
            apiKey={apiKey}
            setApiKey={setApiKey}
          />
        </div>
      </header>

      <div className="flex justify-between items-center mb-4">
      <h1 className="font-bold text-2xl text-orange-700 dark:text-yellow-400">Welcome, orang-orang HEBAT</h1>
      <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition text-sm"
     >
    Logout
    </button>
    </div>

      {/* ✅ Konten Utama */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 space-y-6">
        <ModularForm onGenerate={handleGenerate} template={selectedTemplate} />
        <PromptOutput prompts={promptOutput} />
      </div>

      {/* Footer */}
      <footer className="pt-6 text-center text-xs text-gray-500">
        DreamWork Edition Prompt Generator ini dikembangkan oleh{" "}
        <a
          href="https://wa.me/6285822072349"
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-600 hover:underline font-semibold"
        >
          TAcademyID
        </a>
        .
      </footer>
    </div>
  );
};

export default TemplatePromptPage;
