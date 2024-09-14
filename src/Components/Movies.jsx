import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import DropDown from "./Templates/DropDown";
import Axios from "../Utils/Axios";
import Cards from "./Templates/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Movies = () => {
  document.title = "Movie App | Movies";
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [category, setCategory] = useState("now_playing");
  const navigate = useNavigate();

  const getMovies = async () => {
    try {
      const data = await Axios.get(`/movie/${category}?page=${page}`);
      if (data.data.results.length > 0) {
        setMovies((prev) => [...prev, ...data.data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (movies.length === 0) {
      getMovies();
    } else {
      setMovies([]);
      setPage(1);
      getMovies();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return movies.length > 0 ? (
    <div className="w-full h-screen">
      <div className="flex p-10 px-[5vw] items-center gap-5">
        <div className="flex items-center gap-5">
          <FaArrowLeftLong
            onClick={() => navigate(-1)}
            className="text-[1.7vw] cursor-pointer text-zinc-400"
          />
          <h1 className="text-3xl text-zinc-400 flex items-end">Movies <span className="text-xs">({category.toUpperCase()})</span></h1>
        </div>

        <TopNav />

        <DropDown
          title={"Category"}
          options={["popular", "top_rated", "upcoming", "now_playing"]}
          Func={(e) => setCategory(e.target.value)}
        />
      </div>

      <InfiniteScroll
        dataLength={movies.length}
        hasMore={hasMore}
        next={getMovies}
        loader={<h1>Loading...</h1>}
      >
        <Cards title="movie" data={movies} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Movies;
