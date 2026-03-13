import axios from "axios";

export const fetchMovies = async ({ genreId, language, year }) => {

  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}`;

  url += `&with_genres=${genreId}`;
  url += `&with_original_language=${language}`;
  url += `&sort_by=popularity.desc`;
  url += `&vote_average.gte=6`;
  url += `&vote_count.gte=200`;
  url += `&page=1`;

  if (year) {
    url += `&primary_release_year=${year}`;
  }

  console.log("TMDB URL:", url);

  const response = await axios.get(url);

  return response.data.results;
};