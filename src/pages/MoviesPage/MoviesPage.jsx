import { useState, useEffect } from "react";
import { searchMovies } from "../../components/api";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromURL = searchParams.get("query") || "";
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!queryFromURL) return;

    const fetchMovies = async () => {
      const results = await searchMovies(queryFromURL);
      setMovies(results);
    };

    fetchMovies();
  }, [queryFromURL]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const results = await searchMovies(query);
    setMovies(results);
    setSearchParams({ query });
    setQuery("");
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
}
