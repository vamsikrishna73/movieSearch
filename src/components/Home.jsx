import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import axios from "axios";
import { useDebounce } from "../utils";

function Home() {
  console.log("API Key:", process.env.REACT_APP_API_KEY);
console.log("Base URL:", process.env.REACT_APP_URL);

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const API_KEY = "75c71088";
const URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

  useEffect(() => {
    if (query) {
      searchMovies();
    }
  }, [debouncedQuery]);

  const searchMovies = async () => {
    setLoading(true);
    setError("");

    try {
      console.log(`${process.env.REACT_APP_URL}${process.env.REACT_APP_API_KEY}&s=${query}`)
      console.log(`${URL}&s=${query}`)
      const response = await axios.get(`${process.env.REACT_APP_URL}${process.env.REACT_APP_API_KEY}&s=${query}`);
      // const response = await axios.get(`${URL}&s=${query}`);

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

export default Home;
