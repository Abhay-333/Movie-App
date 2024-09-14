import { configureStore } from "@reduxjs/toolkit";
import MovieReducer from "./Reducers/MovieSlice";
import TvReducer from "./Reducers/TvSlice";
import PeopleReducer from "./Reducers/PeopleSlice";

export const store = configureStore({
    reducer:{
        movie: MovieReducer,
        tv:TvReducer,
        people:PeopleReducer,
    },
})