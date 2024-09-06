import React, { useEffect, useState } from "react";
import SideNav from "./Templates/SideNav";
import TopNav from "./TopNav";
import Header from "./Templates/Header";
import Axios from "../Utils/Axios";

const Home = () => {
  document.title = "Movie App | HomePage";
  const [randomWallpaper, setRandomWallpaper] = useState(null);

  const getWallpaper = async () => {
    try {
      const data = await Axios.get(`/trending/all/day`);
      const randomData =
        data.data.results[Math.floor(Math.random() * data.data.results.length)];
      setRandomWallpaper(randomData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    !randomWallpaper && getWallpaper();
  }, []);

  return randomWallpaper ? (
    <>
      <SideNav />

      <div className="w-[80%] h-full">
        <TopNav />
        <Header data={randomWallpaper} />
      </div>
    </>
  ) : <h1>Loading...</h1>;
};

export default Home;
