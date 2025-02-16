import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const movieSlice = createSlice({
    name: 'movies',
  initialState: {
    moviesList: [], // Stores searched movies
    favorites: [],  // Stores user's favorite movies
  },
  reducers: {
    setMovies: (state, action) => {
        state.moviesList = action.payload;
    },
    addFavourite: (state, action) => {
      console.log("inside add fav")
        state.favorites.push(action.payload)
        localStorage.setItem("favMovies", JSON.stringify(state.favorites))
    },
    removeFavorite: (state, action) => {
      console.log("inside remove fav")
        state.favorites = state.favorites.filter(movie => movie.imdbID != action.payload.imdbID)
        localStorage.setItem("favMovies", JSON.stringify(state.favorites))
    },
    setFavorite: (state, action) => {
      state.favorites = action.payload
    }
  }

})


export const {setMovies, addFavourite, removeFavorite, setFavorite} = movieSlice.actions
export default movieSlice.reducer