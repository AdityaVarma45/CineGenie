import axios from "axios";
import https from "https";

const agent = new https.Agent({
  family: 4
});

export const fetchMovies = async ({ genreId, language, year }) => {
  try {

    const apiKey = process.env.TMDB_API_KEY;

    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&with_original_language=${language}&sort_by=popularity.desc&page=1`;

    if (year) {
      url += `&primary_release_year=${year}`;
    }

    console.log("TMDB URL:", url);

    const response = await axios.get(url, {
      httpsAgent: agent,
      timeout: 15000
    });

    return response.data.results.slice(0, 30);

  } catch (error) {
    console.error("TMDB ERROR:", error.message);
    throw error;
  }
};