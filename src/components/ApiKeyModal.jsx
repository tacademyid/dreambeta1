import React from "react";

const ApiKeyModal = ({ isOpen, onClose, apiKey, setApiKey }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 max-w-md p-6 rounded-xl shadow-lg space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">🔑 Masukkan API Key Anda</h2>
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Masukkan API Key..."
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-4 py-1 rounded hover:bg-gray-300"
          >
            Batal
          </button>
          <button
            onClick={onClose}
            className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;
