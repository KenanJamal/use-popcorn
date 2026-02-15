import { useEffect, useState } from "react";
import { Loader } from "./Loader.js";
import { Error } from "./Error.js";
import { Nav } from "./Nav.js";
import { Logo } from "./Logo.js";
import { Search } from "./Search.js";
import { NumResult } from "./NumResult.js";
import { Main } from "./Main.js";
import { Box } from "./Box.js";
import { MovieDetails } from "./MovieDetails.js";
import { MovieList } from "./MovieList.js";
import { WatchedSummary } from "./WatchedSummary.js";
import { WatchedMovieList } from "./WatchedMovieList.js";
import { useLocalStorageState } from "./useLocalStorageState.js";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
export const key = "925ffd4c";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }
  function handleCloseSelectedFilm() {
    setSelectedId(null);
  }
  function handleAddingMovie(movie) {
    setWatched([...watched, movie]);
  }
  function handleDelete(id) {
    setWatched(watched.filter((ele) => ele.imdbId !== id));
  }
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetching() {
        try {
          setError("");
          setLoad(true);
          const res = await fetch(
            `http://www.omdbapi.com/?s=${query}&apikey=${key}`,
            { signal: controller.signal },
          );
          if (!res.ok) {
            throw new Error();
          }

          const data = await res.json();
          if (data.Response === "False") {
            throw new Error("Movie not found");
          }
          setMovies(data.Search);
        } catch (error) {
          if (error.message === "Failed to fetch") {
            setError(
              "Unable to connect. Please check your internet connection.",
            );
          } else if (error.name !== "AbortError") {
            setError(error.message);
          }
        } finally {
          setLoad(false);
        }
      }
      if (query.length < 3) {
        setError("");
        setMovies([]);
        return;
      }
      fetching();
      return function () {
        controller.abort();
      };
    },
    [query],
  );
  return (
    <>
      <Nav>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Nav>
      <Main>
        <Box>
          {load ? (
            <Loader />
          ) : error ? (
            <Error message={error} />
          ) : (
            <MovieList
              movies={movies}
              handleSelectedMovie={handleSelectedMovie}
            />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              watched={watched}
              handleAddingMovie={handleAddingMovie}
              selectedId={selectedId}
              handleSelectedMovie={handleSelectedMovie}
              handleCloseSelectedFilm={handleCloseSelectedFilm}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList handleDelete={handleDelete} watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
