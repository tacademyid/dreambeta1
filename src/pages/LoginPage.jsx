import React, { useState } from "react";

const LOGIN_PASSWORD = "dreamworks2024"; // Ganti ini sesuai keinginan

export default function LoginPage({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === LOGIN_PASSWORD) {
      localStorage.setItem("dreamworks_loggedin", "yes");
      onLogin?.();
      window.location.reload(); // ⬅️ PATCH AGAR OTOMATIS REFRESH
    } else {
      setError("Password salah bro. Coba lagi ya.");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-blue-100 to-blue-200 dark:from-[#27293d] dark:via-[#333a56] dark:to-[#1b2430] transition">
    <div className="bg-white/80 dark:bg-[#23294d]/80 rounded-3xl shadow-2xl px-8 py-10 w-full max-w-md flex flex-col items-center animate-fadeIn">
      <h1 className="text-3xl md:text-4xl font-extrabold text-orange-600 dark:text-yellow-200 drop-shadow mb-4 tracking-wide text-center">
        DreamWorks Edition <br /> <span className="text-base font-normal block mt-2 text-gray-500 dark:text-gray-300">Prompt Generator Login</span>
      </h1>
      <form onSubmit={handleLogin} className="w-full flex flex-col gap-5 mt-3">
        <label className="font-semibold text-blue-800 dark:text-yellow-100 text-lg">Masukkan Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-blue-200 dark:border-gray-700 bg-white dark:bg-[#313965] text-gray-800 dark:text-gray-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          placeholder="Masukkan password bro..."
          autoFocus
        />
        {error && <div className="text-red-600 bg-red-50 dark:bg-red-900/40 rounded p-2">{error}</div>}
        <button
          type="submit"
          className="mt-2 bg-orange-500 hover:bg-orange-600 dark:bg-yellow-400 dark:hover:bg-yellow-300 text-white dark:text-blue-900 font-bold rounded-xl py-3 shadow-md transition"
        >
          🚀 Masuk Aplikasi
        </button>
      </form>
      <div className="mt-8 text-center text-gray-400 dark:text-gray-300 text-xs">
        <span className="italic">Menggunakan tools milik orang lain tanpa izin, Adalah bentuk pelanggaran atau Hukumnya DOSA.Hubungi pengembang jika berminat</span>
      </div>
    </div>
  </div>
);
}
