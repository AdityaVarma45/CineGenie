import axios from "axios";

export const fetchMovies = async ({ genreId, language, year }) => {

const BASE_URL = "https://api.themoviedb.org/3/discover/movie";

let collectedMovies = [];

for (let page = 1; page <= 10; page++) {

let url = `${BASE_URL}?api_key=${process.env.TMDB_API_KEY}`;

url += `&with_genres=${genreId}`;
url += `&sort_by=popularity.desc`;
url += `&region=IN`;
url += `&page=${page}`;

if (year) {
  url += `&primary_release_year=${year}`;
}

console.log("TMDB URL:", url);

const response = await axios.get(url);

const results = response.data.results;

/* keep only selected language movies */
const filtered = results.filter(
  movie => movie.original_language === language
);

collectedMovies = [...collectedMovies, ...filtered];

/* stop once we have enough movies */
if (collectedMovies.length >= 20) {
  break;
}

}

return collectedMovies;
};