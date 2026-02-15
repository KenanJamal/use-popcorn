import { useState, useEffect } from "react";
export function useLocalStorageState(intinalState, key) {
  const [value, setValue] = useState(function () {
    const storedWatchedFilms = localStorage.getItem(key);
    return storedWatchedFilms ? JSON.parse(storedWatchedFilms) : intinalState;
  });
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key],
  );
  return [value, setValue];
}
