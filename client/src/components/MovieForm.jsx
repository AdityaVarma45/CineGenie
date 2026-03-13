import { useState } from "react";

const genres = [
  "action", "comedy", "drama", "thriller", "horror",
  "romance", "animation", "adventure", "crime", "science fiction"
];

const languages = [
  { label: "English",   value: "en" },
  { label: "Hindi",     value: "hi" },
  { label: "Telugu",    value: "te" },
  { label: "Tamil",     value: "ta" },
  { label: "Malayalam", value: "ml" },
  { label: "Kannada",   value: "kn" },
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 25 }, (_, i) => currentYear - i);

export default function MovieForm({ onSearch }) {
  const [genre,    setGenre]    = useState("");
  const [language, setLanguage] = useState("");
  const [year,     setYear]     = useState("");
  const [error,    setError]    = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!genre || !language) {
      setError("▸ SELECT GENRE + LANGUAGE TO CONTINUE");
      return;
    }
    setError("");
    onSearch({ genre, language, year });
  };

  return (
    <div className="form-panel">
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Genre */}
          <div className="form-field">
            <label className="form-label">Genre</label>
            <select
              value={genre}
              onChange={(e) => { setGenre(e.target.value); setError(""); }}
              className="form-select"
            >
              <option value="">— Select —</option>
              {genres.map((g) => (
                <option key={g} value={g}>
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Language */}
          <div className="form-field">
            <label className="form-label">Language</label>
            <select
              value={language}
              onChange={(e) => { setLanguage(e.target.value); setError(""); }}
              className="form-select"
            >
              <option value="">— Select —</option>
              {languages.map((l) => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div className="form-field">
            <label className="form-label">Year</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="form-select"
            >
              <option value="">Any Year</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {error && <p className="error-msg">{error}</p>}

        <button type="submit" className="btn-search">
          ⬡ Initiate Search
        </button>
      </form>
    </div>
  );
}
