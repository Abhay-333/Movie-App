import "./style.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Trending from "./Components/Trending";
import Popular from "./Components/Popular";
import Movies from "./Components/Movies";
import TvShows from "./Components/TvShows";
import People from "./Components/People";
import TvDetails from "./Components/TvDetails";
import PeopleDetails from "./Components/PeopleDetails";
import MovieDetails from "./Components/MovieDetails";
import Trailer from "./Components/Templates/Trailer";
import NotFound from "./Components/Templates/NotFound";

function App() {
  return (
    <div className="h-screen w-full bg-[#1D1C23] text-white flex">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/trending" element={<Trending />}></Route>
        <Route path="/popular" element={<Popular />}></Route>

        <Route path="/movies" element={<Movies />}></Route>
        <Route path="/movie/details/:id" element={<MovieDetails />}>
          <Route
            path="trailer"
            element={<Trailer />} 
          ></Route>
        </Route>

        <Route path="/tvshows" element={<TvShows />}></Route>
        <Route path="/tv/details/:id" element={<TvDetails />}>
          <Route path="/tv/details/:id/trailer" element={<Trailer/>}></Route>
        </Route>

        <Route path="/people" element={<People />}></Route>
        <Route path="/people/details/:id" element={<PeopleDetails />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
