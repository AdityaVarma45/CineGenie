import { useState } from "react";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";
import AIExplanation from "./components/AIExplanation";
import { fetchMovies, fetchNextMovies } from "./api/movieApi";

export default function App() {

  const [movies, setMovies] = useState([]);
  const [aiText, setAiText] = useState("");
  const [hasMore, setHasMore] = useState(false);

  const handleSearch = async (data) => {

    const res = await fetchMovies(data);

    setMovies(res.movies);
    setAiText(res.aiExplanation);
    setHasMore(res.hasMore);
  };

  const handleNext = async () => {

    const res = await fetchNextMovies();

    setMovies(res.movies);
    setAiText(res.aiExplanation);
    setHasMore(res.hasMore);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        CineGenie 🎬
      </h1>

      <MovieForm onSearch={handleSearch} />

      <MovieList movies={movies} />

      <AIExplanation text={aiText} />

      {hasMore && (
        <button
          onClick={handleNext}
          className="mt-6 bg-blue-500 text-white px-4 py-2"
        >
          Next 5 Movies
        </button>
      )}

    </div>
  );
}