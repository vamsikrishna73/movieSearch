import axios from 'axios'
import React, { useState , useEffect} from 'react'
import { useParams } from 'react-router-dom'



export const MovieDetails = () => {
    const [loading,setLoading] = useState(false);
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(false);
    const { id } = useParams();

    console.log(`https://www.omdbapi.com/?i=${id.id}&apikey=${process.env.REACT_APP_API_KEY}`)
    useEffect(() => {
        const fetchMovie = async () => {
          try {
            const response = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=${process.env.REACT_APP_API_KEY}`);
            console.log(response.data)
            if (response.data.Response === "True") {
              console.log("response is true")
              setMovie(response.data);
            } else {
              setError("Movie not found.");
            }
          } catch (err) {
            setError("Failed to load movie details.");
          }
          setLoading(false);
        };
    
        fetchMovie();
      }, [id]);
  
  if (!movie) {
    return <p>Loading movie details...</p>;
  }
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>{movie.Title}</h1>
      <img src={movie.Poster} alt={movie.Title} style={{ width: "250px" }} />
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Actors:</strong> {movie.Actors}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
    </div>
  );
}
