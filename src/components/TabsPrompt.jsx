import React, { useState } from "react";

const TabsPrompt = ({ indoPrompt, englishPrompt }) => {
  const [activeTab, setActiveTab] = useState("indo");

  const handleCopy = () => {
    const textToCopy = activeTab === "indo" ? indoPrompt : englishPrompt;
    navigator.clipboard.writeText(textToCopy);
    alert("Prompt berhasil disalin!");
  };

  return (
    <div className="border rounded-lg bg-gray-50 p-4">
      {/* Tabs */}
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={() => setActiveTab("indo")}
          className={`px-3 py-1 rounded-md text-sm ${
            activeTab === "indo"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          🇮🇩 Bahasa
        </button>
        <button
          onClick={() => setActiveTab("english")}
          className={`px-3 py-1 rounded-md text-sm ${
            activeTab === "english"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          🇬🇧 English
        </button>
        <button
          onClick={handleCopy}
          className="ml-auto px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          📋 Copy Prompt
        </button>
      </div>

      {/* Output */}
      <div className="whitespace-pre-wrap text-sm font-mono">
        {activeTab === "indo" ? indoPrompt : englishPrompt}
      </div>
    </div>
  );
};

export default TabsPrompt;
