import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import DropDown from "./Templates/DropDown";
import Axios from "../Utils/Axios";
import Cards from "./Templates/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  document.title = "Movie App | Trending"
  const navigate = useNavigate();
  const [trending, setTrending] = useState([]);
  const [duration, setDuration] = useState("day");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true)
  
  const getTrending = async () => {
    try {
      const data = await Axios.get(`/trending/${category}/${duration}?page=${page}`);
      
      if(data.data.results.length > 0){
        setTrending((prevState)=>[...prevState, ...data.data.results]);
        setPage(page+1)
      }else{
        setHasMore(false)
      }

    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = ()=>{
    if(trending.length === 0){
      getTrending()
    }else{
      setPage(1)
      setTrending([])
      getTrending()
    }
  }

  useEffect(() => {
    refreshHandler()
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="w-full h-screen">
      <div className="flex p-10 px-[5vw] items-center gap-5">
        <div className="flex items-center gap-5">
          <FaArrowLeftLong
            onClick={() => navigate(-1)}
            className="text-[1.7vw] cursor-pointer text-zinc-400"
          />
          <h1 className="text-3xl text-zinc-400">Trending</h1>
        </div>

        <TopNav />

        <DropDown
          title={"Category"}
          options={["movie", "tv", "all"]}
          Func={(e) => setCategory(e.target.value)}
        />

        <DropDown
          title={"Duration"}
          options={["week", "day"]}
          Func={(e) => setDuration(e.target.value)}
        />
      </div>

      <InfiniteScroll dataLength={trending.length} hasMore={hasMore} next={getTrending} loader={<h1>Loading...</h1>}>
        <Cards title={category} data={trending} />
      </InfiniteScroll>

    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
