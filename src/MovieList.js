import { Movie } from "./Movie";

export function MovieList({ movies, handleSelectedMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => {
        return (
          <Movie
            key={movie.imdbID}
            movie={movie}
            handleSelectedMovie={handleSelectedMovie}
          />
        );
      })}
    </ul>
  );
}
