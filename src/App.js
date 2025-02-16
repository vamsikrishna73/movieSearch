import React, { useEffect } from 'react'
import Home from './components/Home'
import {MovieDetails} from "./components/MovieDetails"
import {Route, Routes} from "react-router-dom"
import { useDispatch } from 'react-redux'
import {setFavorite} from './redux/movieSlice'

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fav =localStorage.getItem("favMovies");
    if(fav !== null) {
      const favMovies = JSON.parse(fav)
      dispatch(setFavorite(favMovies))
    }
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/movie/:id' element={<MovieDetails />} />
      
    </Routes>
  )
}

export default App
