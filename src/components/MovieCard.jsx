import React from 'react'
import { Link } from 'react-router-dom'

export const MovieCard = (movie) => {
  return (
    <div key={movie.imdbID} style={{ margin: "10px", textAlign: "center" }}>
    <Link to={`/movie/${movie.imdbID}`}>
    <img src={movie.Poster} alt={movie.Title} style={{ width: "150px" }} />
    </Link>
    <p>{movie.Title} ({movie.Year})</p>
  </div>
  )
}
