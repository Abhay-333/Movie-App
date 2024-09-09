import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import DropDown from "./Templates/DropDown";
import Axios from "../Utils/Axios";
import Cards from "./Templates/Cards";
import Loading from "./Loading";

const Trending = () => {
  const navigate = useNavigate();
  const [trending, setTrending] = useState([]);
  const [duration, setDuration] = useState("day");
  const [category, setCategory] = useState("all");

  const getTrending = async () => {
    try {
      const data = await Axios.get(`/trending/${category}/${duration}`);
      setTrending(data.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrending();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="w-full h-screen overflow-y-auto">
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

      <Cards title={category} data={trending} />
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
