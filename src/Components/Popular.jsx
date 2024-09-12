import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import DropDown from "./Templates/DropDown";
import Axios from "../Utils/Axios";
import Cards from "./Templates/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Popular = () => {
  document.title = "Movie App | Popular";
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [category, setCategory] = useState("movie");
  const navigate = useNavigate();

  const getPopulars = async () => {
    try {
      const data = await Axios.get(`${category}/popular?page=${page}`);
      if (data.data.results.length > 0) {
        setPopular((prev) => [...prev, ...data.data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (popular.length === 0) {
      getPopulars();
    } else {
      setPage(1);
      setPopular([]);
      getPopulars();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return popular.length > 0 ? (
    <div className="w-full h-screen">
      <div className="flex p-10 px-[5vw] items-center gap-5">
        <div className="flex items-center gap-5">
          <FaArrowLeftLong
            onClick={() => navigate(-1)}
            className="text-[1.7vw] cursor-pointer text-zinc-400"
          />
          <h1 className="text-3xl text-zinc-400">Popular</h1>
        </div>

        <TopNav />

        <DropDown
          title={"Category"}
          options={["movie", "tv"]}
          Func={(e) => setCategory(e.target.value)}
        />
      </div>

      <InfiniteScroll
        dataLength={popular.length}
        hasMore={hasMore}
        next={getPopulars}
        loader={<h1>Loading...</h1>}
      >
        <Cards title={category} data={popular} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Popular;
