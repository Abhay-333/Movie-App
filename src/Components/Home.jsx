import React, { useEffect, useState } from "react";
import SideNav from "./Templates/SideNav";
import TopNav from "./TopNav";
import Header from "./Templates/Header";
import Axios from "../Utils/Axios";
import HorizontalCards from "./Templates/HorizontalCards";
import DropDown from "./Templates/DropDown";
import Loading from "./Loading";

const Home = () => {
  document.title = "Movie App | HomePage";
  const [randomWallpaper, setRandomWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");

  const getWallpaper = async () => {
    try {
      const data = await Axios.get(`/trending/all/day`);
      setTrending(data.data.results);
      const randomData =
        data.data.results[Math.floor(Math.random() * data.data.results.length)];
      setRandomWallpaper(randomData);
    } catch (error) {
      console.log(error);
    }
  };

  const getTrending = async () => {
    try {
      const data = await Axios.get(`/trending/${category}/day`);
      console.log(data.data.results);
      setTrending(data.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrending();
    !randomWallpaper && getWallpaper();
  }, [category]);

  return randomWallpaper ? (
    <>
      <SideNav />

      <div className="w-[80%] h-full  overflow-y-auto">
        <TopNav />
        <Header data={randomWallpaper} />

        <div className="flex items-center gap-7 px-8">
          <h1 className="text-4xl font-semibold py-3">Trending</h1>
          <DropDown
            title="Filter"
            options={["tv", "movie", "all"]}
            trendingFunc={(e) => setCategory(e.target.value)}
          />
        </div>

        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
