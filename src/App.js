import { useEffect, useState } from "react";
import { MovieCard } from "./components/MovieCard";
import axios from "axios";
import { useDebounce } from "./utils";

const API_KEY = "75c71088";
const URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (query) {
      searchMovies();
    }
  }, [debouncedQuery]);

  const searchMovies = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`${URL}&s=${query}`);

      if (response.data.Response === "True") {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
        setError("No movies found.");
      }
    } catch (err) {
      setError("Failed to fetch data.");
    }

    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>🎬 Movie Search App</h1>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchMovies}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} {...movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
