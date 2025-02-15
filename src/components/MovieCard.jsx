import React from 'react'

export const MovieCard = (movie) => {
  return (
    <div key={movie.imdbID} style={{ margin: "10px", textAlign: "center" }}>
    <img src={movie.Poster} alt={movie.Title} style={{ width: "150px" }} />
    <p>{movie.Title} ({movie.Year})</p>
  </div>
  )
}
