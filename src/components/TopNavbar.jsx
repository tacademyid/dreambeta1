// src/components/TopNavbar.jsx
import React from "react";

const TopNavbar = () => {
  return (
    <nav className="hidden md:flex justify-between items-center py-4 px-6 bg-white shadow-sm mb-4">
      <div className="text-xl font-bold text-orange-800 flex items-center gap-2">
        🎬 DreamWorksEdition
      </div>
      <div className="space-x-6">
        <a href="#" className="text-gray-700 hover:text-orange-600 transition">Tutorial</a>
        <a href="#" className="text-gray-700 hover:text-orange-600 transition">Pengembang</a>
        <a href="#" className="text-gray-700 hover:text-orange-600 transition">API Key</a>
      </div>
    </nav>
  );
};

export default TopNavbar;
