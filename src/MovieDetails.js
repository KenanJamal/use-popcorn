import { useState, useEffect } from "react";
import { key } from "./App";
import { Loader } from "./Loader";
import Stars from "./stars";
import { useKey } from "./useKey";

export function MovieDetails({
  selectedId,
  handleCloseSelectedFilm,
  handleAddingMovie,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [star, setStar] = useState(0);
  const [load, setLoad] = useState(false);
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;
  const isWatched = watched.map((ele) => ele.imdbId).includes(selectedId);
  const isWatchedRateByUser = watched.find((ele) => ele.imdbId === selectedId);
  function handleAdd() {
    const newWatchedMovie = {
      imdbId: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      star: Number(star),
    };
    handleAddingMovie(newWatchedMovie);
    handleCloseSelectedFilm();
  }
  useEffect(
    function () {
      async function gettingDetails() {
        setLoad(true);
        const res = await fetch(
          `http://www.omdbapi.com/?i=${selectedId}&apikey=${key}`,
        );
        const data = await res.json();
        setMovie(data);
        setLoad(false);
      }
      gettingDetails();
    },
    [selectedId],
  );
  useKey("Escape", handleCloseSelectedFilm);
  useEffect(
    function () {
      if (!title) return;
      document.title = `${title}`;

      return function () {
        document.title = "Use-Popcorn";
      };
    },
    [title],
  );
  return load ? (
    <Loader />
  ) : (
    <div className="details">
      <header>
        <button className="btn-back" onClick={() => handleCloseSelectedFilm()}>
          &larr;
        </button>
        <img src={poster} alt={`${title} poster was not found`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>{imdbRating} Imdb Rating</p>
        </div>
      </header>
      <section>
        <div className="rating">
          {!isWatched ? (
            <>
              <Stars size={28} maxStarsCount={10} externalRating={setStar} />
              {star > 0 && (
                <button className="btn-add" onClick={() => handleAdd()}>
                  {" "}
                  + Add To List
                </button>
              )}
            </>
          ) : (
            `You have rated this movie a ${isWatchedRateByUser.star}/10`
          )}
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring : {actors}</p>
        <p>Director : {director} </p>
      </section>
    </div>
  );
}
