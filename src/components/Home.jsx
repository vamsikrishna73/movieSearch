import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import axios from "axios";
import { useDebounce } from "../utils";
import {useDispatch,  useSelector} from "react-redux"
import {setMovies} from '../redux/movieSlice'

function Home() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const movies = useSelector(state => state.movies.moviesList)

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
        dispatch(setMovies(response.data.Search));
      } else {
       dispatch(setMovies([]));
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
