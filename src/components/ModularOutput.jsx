const ModularForm = ({ onGenerate }) => {
  const [formData, setFormData] = useState({
    visualStyle: "",
    karakterUtama: "",
    hewanPendamping: "",
    makhlukAneh: "",
    ideCerita: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onGenerate(formData);
  };

  return (
    <div className="max-w-screen-md mx-auto bg-white p-6 rounded-xl shadow-lg mt-8 space-y-4">
      <h1 className="text-2xl font-bold text-center text-yellow-700 mb-2">
        🎬 DreamWorksEdition Prompt Generator
      </h1>
      <p className="text-sm text-center text-gray-500 mb-4">
        Buat adegan lucu dan absurd dengan gaya visual animasi favoritmu!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="visualStyle"
          placeholder="Visual Style (e.g. DreamWorks)"
          value={formData.visualStyle}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="karakterUtama"
          placeholder="Karakter Utama (Manusia)"
          value={formData.karakterUtama}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="hewanPendamping"
          placeholder="Hewan Pendamping"
          value={formData.hewanPendamping}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="makhlukAneh"
          placeholder="Makhluk Aneh"
          value={formData.makhlukAneh}
          onChange={handleChange}
          className="input"
        />
      </div>

      <textarea
        name="ideCerita"
        placeholder="Tulis Ide Cerita Sendiri (Opsional)"
        rows={3}
        value={formData.ideCerita}
        onChange={handleChange}
        className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />

      <div className="text-center mt-4">
        <button
          onClick={handleSubmit}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-lg"
        >
          🚀 Generate Prompt
        </button>
      </div>
    </div>
  );
};

export default ModularForm;
