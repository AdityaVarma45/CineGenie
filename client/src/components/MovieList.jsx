export default function MovieList({ movies }) {

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">

      {movies.map((movie) => (

        <div key={movie.id} className="border p-2">

          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />

          <h3 className="font-bold mt-2">
            {movie.title}
          </h3>

          <p className="text-sm">
            ⭐ {movie.vote_average}
          </p>

        </div>

      ))}

    </div>
  );
}