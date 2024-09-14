import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import DropDown from "./Templates/DropDown";
import Axios from "../Utils/Axios";
import Cards from "./Templates/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const People = () => {
  document.title = "Movie App | People";
  const [person, setPerson] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const getPeople = async () => {
    try {
      const data = await Axios.get(`/person/popular?page=${page}`);

      if (data.data.results.length > 0) {
        setPerson((prev) => [...prev, ...data.data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);  
      }
    } catch (error) {
        console.log(error)
    }
  };

  const refreshHandler = ()=>{
    if(person.length === 0){
        getPeople()
    }else{
        setPerson([])
        setPage(1)
        getPeople()
    }
  }

  useEffect(()=>{
    refreshHandler()
  },[])

  return person.length > 0 ? (
    <div className="w-full h-screen">
      <div className="flex p-10 px-[5vw] items-center gap-5">
        <div className="flex items-center gap-5">
          <FaArrowLeftLong
            onClick={() => navigate(-1)}
            className="text-[1.7vw] cursor-pointer text-zinc-400"
          />
          <h1 className="text-3xl text-zinc-400 flex items-end">People</h1>
        </div>

        <TopNav />

      </div>

      <InfiniteScroll
        dataLength={person.length}
        hasMore={hasMore}
        next={getPeople}
        loader={<h1>Loading...</h1>}
      >
        <Cards title="people" data={person} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default People;
