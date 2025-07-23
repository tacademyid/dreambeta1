import React from "react";

const HeaderTitle = ({ small }) => {
  return (
    <div className="text-center mb-6">
      {/* Hanya tampil di layar md ke atas */}
      <h1 className="text-2xl sm:text-3xl font-bold text-orange-800 hidden md:block">
        🎬 DreamWorksEdition Prompt Generator
      </h1>
    </div>
  );
};

export default HeaderTitle;
