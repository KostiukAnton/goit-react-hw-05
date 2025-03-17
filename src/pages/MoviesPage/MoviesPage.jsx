import { useState, useEffect } from "react";
import { searchMovies } from "../../components/api";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        setMovies([]);
        const results = await searchMovies(query);
        setMovies(results);
      } catch (error) {
        console.error("Error fetchMovies", error);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchQuery = e.target.elements.query.value.trim();
    if (!searchQuery) return;
    setSearchParams({ query: searchQuery });
    setInputValue("");
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          name="query"
        />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
}
