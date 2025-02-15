import React from 'react'
import Home from './components/Home'
import {MovieDetails} from "./components/MovieDetails"
import {Route, Routes} from "react-router-dom"

const App = () => {
  console.log("API Key:", process.env.REACT_APP_API_KEY);
console.log("Base URL:", process.env.REACT_APP_URL);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/movie/:id' element={<MovieDetails />} />
      
    </Routes>
  )
}

export default App
