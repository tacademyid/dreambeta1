import React from "react";

const templateAbsurdList = [
  {
    title: "Gorengan Berontak",
    visualStyle: "Laika (Stop Motion)",
    karakterUtama: "Agung, anak kos penggila gorengan",
    hewanPendamping: "Tikus dapur bernama Bobi, suka nge-rap",
    makhlukAneh: "Tahu isi dan tempe mendoan hidup, hobi kabur dari wajan",
    judulFilm: "Gorengan Berontak",
    durasi: "8",
    sfx: "Criiisss, Tik-tik, Suara minyak ngomel",
    ideCerita: "Di tengah malam, gorengan di dapur Agung memberontak, saling balapan keluar dari piring demi menghindari sambal pedas legendaris.",
  },
  {
    title: "Kulkas Berlari di Tengah Kota",
    karakterUtama: "Frigo si Kulkas pelari dari pabrik elektronik",
    hewanPendamping: "Burung kipas yang suka berteriak",
    makhlukAneh: "Remote rusak yang bisa mengontrol manusia",
    visualStyle: "Pixar",
    judulFilm: "Lari Frigo Lari",
    durasi: "8",
    sfx: "Beep Beep Freeze",
    ideCerita: "Di tengah malam, kulkas di dapur Frigo merontak, sambil berlari keluar dari dapur dan berlari ke tengah kota bersama kipa angin yang suka berteriak"
  },
  {
    title: "Cendol Melayang",
    visualStyle: "Pixar",
    karakterUtama: "Bu Juleha, penjual cendol super semangat",
    hewanPendamping: "Kecoak sakti bernama Coki, jadi asisten dapur",
    makhlukAneh: "Es batu menari dan sirup bisa bikin rap",
    judulFilm: "Cendol Melayang",
    durasi: "8",
    sfx: "Pluk, Splash, Sirup Beatbox",
    ideCerita: "Setiap Bu Juleha teriak ‘Cendol, cendol!’, cendol di embernya langsung melayang dan menari di udara, bikin pembeli bengong dan hewan dapur mulai ikut lomba joget.",
  },
  // Tambahan 3 template baru:
  {
    title: "Sandal Tertukar Dimensi",
    visualStyle: "Stop Motion",
    karakterUtama: "Ucup, bocah lupa sandal",
    hewanPendamping: "Cicak bisa teleportasi",
    makhlukAneh: "Sandal bicara dari dunia paralel",
    judulFilm: "Sandal Ajaib",
    durasi: "5",
    sfx: "Whoosh, Zip, Pop",
    ideCerita: "Setiap Ucup bangun tidur, sandal di lantai selalu ngomong Selamat pagi cup, Cicak didingding juga berteriak teriak lapar..lapar"
  },
  {
    title: "Sepeda Melamun di Lampu Merah",
    visualStyle: "Cartoon Network",
    karakterUtama: "Dewi, pelajar super pelupa",
    hewanPendamping: "Ikan cupang dalam toples, bernama Lilo",
    makhlukAneh: "Sepeda gowes yang suka melamun & suka curhat",
    judulFilm: "Sepeda Melamun di Lampu Merah",
    durasi: "8",
    sfx: "Tiiiin, Suara sepeda ngorok, Air gelombang",
    ideCerita: "Saat menunggu lampu merah, sepeda Dewi tiba-tiba curhat panjang lebar ke ikan cupang soal cita-citanya jadi sepeda balap, bikin pengendara lain pada kebingungan.",
  },
  {
    title: "UFO Nongkrong di Cafe",
    visualStyle: "2D Kartun Lawas",
    karakterUtama: "Mbak warteg super galak",
    hewanPendamping: "Kucing garong penjaga warteg",
    makhlukAneh: "Alien pecinta sambal",
    judulFilm: "Alien Warteg",
    durasi: "7",
    sfx: "Zap, Meow, Hahaha",
    ideCerita: "Setiap malam Mbak warteg selalu ditemani kucing penjaga wartegnya. tiba-tiba muncul Alien yang ingin makan dengan sambel super pedas"
  },
];

const TemplateSelector = ({ onSelect }) => {
  return (
    <div className="mb-6">
      <label className="font-semibold block mb-2 text-gray-800 dark:text-orange-800">🔥 Pilih Template Absurd</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {templateAbsurdList.map((tpl, idx) => (
  <div
    key={tpl.title}
    className="border bg-white dark:bg-gray-900 rounded-lg shadow px-4 py-3 text-left hover:bg-yellow-50 dark:hover:bg-gray-800/20 transition cursor-pointer text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700 flex flex-col min-h-[120px]"
  >
    {/* JUDUL TEMPLATE */}
    <div className="font-bold text-md mb-3">{tpl.title}</div>
    {/* JUDUL FILM + ICON */}
    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 text-sm mb-4">
      <span role="img" aria-label="movie">🎬</span>{tpl.judulFilm}
    </div>
    {/* TOMBOL PILIH */}
    <button
      type="button"
      onClick={() => onSelect && onSelect(tpl)}
      className="bg-orange-500 text-white px-4 py-2 rounded mt-auto w-fit hover:bg-orange-600 transition dark:bg-orange-600 dark:hover:bg-orange-700"
    >
      Gunakan Template Ini
    </button>
  </div>
))}
      </div>
    </div>
  );
};

export default TemplateSelector;
