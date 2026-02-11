export function WatchedMovieList({ watched, handleDelete }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <li key={movie.imdbId}>
          <img src={movie.poster} alt={`${movie.title} poster`} />
          <h3>{movie.title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.star}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>
          </div>
          <button
            className="btn-delete"
            onClick={() => handleDelete(movie.imdbId)}
          >
            X
          </button>
        </li>
      ))}
    </ul>
  );
}
