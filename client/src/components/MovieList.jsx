const SKELETON_COUNT = 10;

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-poster" />
      <div className="skeleton-info">
        <div className="skeleton-line" />
        <div className="skeleton-line short" />
      </div>
    </div>
  );
}

function MovieCard({ movie }) {
  const year = movie.release_date?.slice(0, 4) ?? "";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null;
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <div className="movie-card">
      {year && <span className="card-year-badge">{year}</span>}
      <div className="card-glow" />

      {posterUrl ? (
        <img
          src={posterUrl}
          alt={movie.title}
          className="card-poster"
          loading="lazy"
        />
      ) : (
        <div className="no-poster">🎬</div>
      )}

      <div className="card-overlay">
        <p className="card-title">{movie.title}</p>
        {rating && (
          <div className="card-rating">
            <span className="rating-dot" />
            {rating}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MovieList({ movies, loading }) {
  if (loading) {
    return (
      <div className="movie-grid">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!movies || movies.length === 0) return null;

  return (
    <>
      <div className="section-header">
        <span className="section-title">Results</span>
        <span className="section-line" />
        <span className="section-count">{movies.length} TITLES</span>
      </div>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}
