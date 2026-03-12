import { fetchMovies } from "../services/tmdbService.js";
import { generateMovieInsights } from "../services/aiService.js";
import { genreMap } from "../utils/genreMap.js";

export const getMovies = async (req, res) => {
  try {

    const { genre, language, year } = req.body;

    if (!genre || !language) {
      return res.status(400).json({
        message: "Genre and language are required"
      });
    }

    const genreId = genreMap[genre.toLowerCase()];

    const movies = await fetchMovies({
      genreId,
      language,
      year
    });

    const firstFive = movies.slice(0, 5);

    let aiExplanation = "AI explanation unavailable";

    try {
      aiExplanation = await generateMovieInsights(firstFive);
    } catch (aiError) {
      console.error("AI error:", aiError.message);
    }

    return res.status(200).json({
      movies: firstFive,
      aiExplanation
    });

  } catch (error) {

    console.error("Controller error:", error.message);

    return res.status(500).json({
      message: "Server error"
    });

  }
};