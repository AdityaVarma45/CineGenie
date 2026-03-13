import { useState } from "react";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";
import AIExplanation from "./components/AIExplanation";
import { fetchMovies, fetchNextMovies } from "./api/movieApi";

/* Film strip ticker content */
const TICKER_ITEMS = [
  "Action",
  "Drama",
  "Thriller",
  "Sci-Fi",
  "Horror",
  "Romance",
  "Animation",
  "Adventure",
  "Crime",
  "Comedy",
  "Mystery",
  "Fantasy",
  "Documentary",
  "Noir",
  "Cyberpunk",
];

function FilmStrip() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="film-strip-wrapper">
      <div className="film-strip">
        {doubled.map((item, i) => (
          <>
            <span className="film-hole" key={"hole-${i}"} />
            <span className="film-frame" key={"frame-${i}"}>
              {item}
            </span>
          </>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [movies, setMovies] = useState([]);
  const [aiText, setAiText] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  /* Search Movies */
  const handleSearch = async (data) => {
    setLoading(true);

    /* clear previous results */
    setMovies([]);
    setAiText("");
    setHasMore(false);

    try {
      const res = await fetchMovies(data);

      if (!res) return;

      setMovies(res.movies || []);
      setAiText(res.aiExplanation || "");
      setHasMore(res.hasMore || false);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* Next 5 Movies */
  const handleNext = async () => {
    setLoading(true);

    try {
      const res = await fetchNextMovies();

      setMovies(res.movies || []);
      setAiText(res.aiExplanation || "");
      setHasMore(res.hasMore || false);
    } catch (error) {
      console.error("Next error:", error);
    } finally {
      setLoading(false);
    }
  };

  const showEmpty = !loading && movies.length === 0 && !aiText;

  return (
    <div className="app-wrapper">
      {/* Header */}
      <header className="app-header">
        <h1 className="app-title">CineGenie</h1>
        <p className="app-subtitle">AI-Powered Movie Discovery</p>
        <span className="title-line" />
      </header>

      {/* Film Strip */}
      <FilmStrip />

      {/* Search Form */}
      <MovieForm onSearch={handleSearch} />

      {/* Movie Posters */}
      <MovieList movies={movies} loading={loading} />

      {/* AI Explanation BELOW movies */}
      <AIExplanation text={aiText} />

      {/* Empty State */}
      {showEmpty && (
        <div className="empty-state">
          <span className="empty-icon">🎬</span>
          Select your preferences above to begin
        </div>
      )}

      {/* Next 5 Button */}
      {hasMore && !loading && (
        <button className="btn-next" onClick={handleNext}>
          ▶ Next 5 Titles
        </button>
      )}
    </div>
  );
}
