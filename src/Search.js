import { useEffect, useRef } from "react";

export function Search({ query, setQuery }) {
  const inputField = useRef(null);
  useEffect(
    function () {
      function callback(e) {
        if (document.activeElement === inputField.current) return;
        if (e.code === "Enter") {
          inputField.current.focus();
          setQuery("");
        }
      }
      document.addEventListener("keydown", callback);
    },
    [setQuery],
  );
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputField}
    />
  );
}
