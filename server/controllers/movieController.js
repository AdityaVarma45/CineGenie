import { fetchMovies } from "../services/tmdbService.js";
import { generateMovieInsights } from "../services/aiService.js";
import { genreMap } from "../utils/genreMap.js";

/* simple in-memory cache */
let movieCache = [];
let currentIndex = 0;

export const getMovies = async (req, res) => {
  try {
    const { genre, language, year } = req.body;

    if (!genre || !language) {
      return res.status(400).json({
        message: "Genre and language are required",
      });
    }

    const genreId = genreMap[genre.toLowerCase()];

    /* fetch movies only if cache empty */
    if (movieCache.length === 0) {
      const movies = await fetchMovies({
        genreId,
        language,
        year,
      });

      movieCache = movies.slice(0, 20);
      currentIndex = 0;
    }

    /* get next 5 movies */
    const nextMovies = movieCache.slice(currentIndex, currentIndex + 5);

    currentIndex += 5;

    const aiExplanation = await generateMovieInsights(nextMovies);

    res.json({
      movies: nextMovies,
      aiExplanation,
      hasMore: currentIndex < movieCache.length,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getNextMovies = async (req, res) => {
  try {
    if (currentIndex >= movieCache.length) {
      return res.json({
        movies: [],
        message: "No more movies",
      });
    }

    const nextMovies = movieCache.slice(currentIndex, currentIndex + 5);

    currentIndex += 5;

    const aiExplanation = await generateMovieInsights(nextMovies);

    res.json({
      movies: nextMovies,
      aiExplanation,
      hasMore: currentIndex < movieCache.length,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
