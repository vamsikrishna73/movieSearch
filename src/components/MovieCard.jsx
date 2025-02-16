import React, { use, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {useSelector ,useDispatch} from 'react-redux'
import { addFavourite, removeFavorite } from '../redux/movieSlice'

export const MovieCard = (movie) => {
  const dispatch = useDispatch();
  const favMovies = useSelector(state => state.movies.favorites);
  const [isFav, setFav] = useState(false);
  const toggleFav = () => {
    console.log("inside toggle fav")
    if(isFav) {
      console.log("making unfav")
      dispatch(removeFavorite(movie))
      setFav(false)
    } else {
      console.log("making fav")
      dispatch(addFavourite(movie))
      setFav(true)
  }
}

useEffect(() => {
  const arr = favMovies.filter(ele => ele.imdbID == movie.imdbID);
  console.log(arr)
  if(arr != null && arr.length != 0) {
    setFav(true)
  }
},[])
return (
  <div 
    key={movie.imdbID} 
    style={{ 
      position: "relative", 
      margin: "10px", 
      textAlign: "center", 
      width: "120px",  // Set width to match poster
      padding: "10px",
      border: "1px solid #ccc", 
      borderRadius: "8px",
      background: "#fff" 
    }}
    onClick={toggleFav}
  >
    {/* Like (Favorite) Icon */}
    <img 
      src={isFav ? "/liked.jpg" : "/like.png"} 
      alt="Favorite" 
      style={{ 
        position: "absolute", 
        top: "5px", 
        right: "5px", 
        width: "20px", 
        height: "20px", 
        cursor: "pointer" 
      }} 
    />
    
    {/* Movie Poster */}
    <Link to={`/movie/${movie.imdbID}`}>
      <img 
        src={movie.Poster} 
        alt={movie.Title} 
        style={{ width: "100px", height: "150px", borderRadius: "5px" }} 
      />
    </Link>

    {/* Movie Title */}
    <p style={{ fontSize: "12px", margin: "5px 0" }}>
      {movie.Title} ({movie.Year})
    </p>
  </div>
);

}
