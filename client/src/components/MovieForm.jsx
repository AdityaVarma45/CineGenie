import { useState } from "react";

export default function MovieForm({ onSearch }) {

  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!genre || !language) {
      alert("Genre and language required");
      return;
    }

    onSearch({ genre, language, year });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <input
        placeholder="Genre (action, comedy...)"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="border p-2 w-full"
      />

      <input
        placeholder="Language (en, hi...)"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="border p-2 w-full"
      />

      <input
        placeholder="Year (optional)"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="border p-2 w-full"
      />

      <button
        className="bg-black text-white px-4 py-2"
      >
        Get Recommendations
      </button>

    </form>
  );
}