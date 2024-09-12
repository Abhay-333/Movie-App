import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import DropDown from "./Templates/DropDown";
import Axios from "../Utils/Axios";
import Cards from "./Templates/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const TvShows = () => {
  document.title = "Movie App | TvShows";
  const [tv, setTv] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [category, setCategory] = useState("airing_today");
  const navigate = useNavigate();

  const getTvShows = async () => {
    const data = await Axios.get(`/tv/${category}?page=${page}`);

    if (data.data.results.length > 0) {
      setTv((prev) => [...prev, ...data.data.results]);
      setPage(page + 1);
    } else {
      setHasMore(false);
    }
  };

  const refreshHandler = () => {
    if (tv.length === 0) {
      getTvShows();
    } else {
      setTv([]);
      setPage(1);
      getTvShows();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return tv.length > 0? (
    <div className="w-full h-screen">
      <div className="flex p-10 px-[5vw] items-center gap-5">
        <div className="flex items-center gap-5">
          <FaArrowLeftLong
            onClick={() => navigate(-1)}
            className="text-[1.7vw] cursor-pointer text-zinc-400"
          />
          <h1 className="text-3xl text-zinc-400 flex items-end">TvShows <span className="text-xs">({category.toUpperCase()})</span></h1>
        </div>

        <TopNav />

        <DropDown
          title={"Category"}
          options={["popular", "on_the_air", "airing_today","top_rated"]}
          Func={(e) => setCategory(e.target.value)}
        />
      </div>

      <InfiniteScroll
        dataLength={tv.length}
        hasMore={hasMore}
        next={getTvShows}
        loader={<h1>Loading...</h1>}
      >
        <Cards title={category} data={tv} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default TvShows;
