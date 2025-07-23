import React from 'react';
import templates from '../data/templates.json';

const TemplatePicker = ({ onSelect }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2 text-amber-700">🔥 Pilih Template Absurd</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {templates.map((template, index) => (
          <div
            key={index}
            className="p-4 bg-yellow-50 border-l-4 border-amber-400 rounded-xl shadow"
          >
            <h4 className="font-bold text-amber-600 mb-2">{template.judul}</h4>
            <p className="text-sm text-gray-700 mb-3">🎭 {template.karakterUtama}</p>
            <button
              onClick={() => onSelect(template)}
              className="px-3 py-1 bg-amber-500 text-white rounded hover:bg-amber-600 transition"
            >
              Gunakan Template Ini
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatePicker;
