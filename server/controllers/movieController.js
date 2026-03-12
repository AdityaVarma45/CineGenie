import { fetchMovies } from "../services/tmdbService.js";
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

    if (!genreId) {
      return res.status(400).json({
        message: "Invalid genre"
      });
    }

    const movies = await fetchMovies({
      genreId,
      language,
      year
    });

    res.json({
      total: movies.length,
      movies
    });

    console.log(req.body);
    console.log(req.genreId);
  } catch (error) {

    console.error("ERROR:", error.message);

    res.status(500).json({
      message: "Server error"
    });

  }
}