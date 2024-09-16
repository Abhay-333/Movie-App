import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import NotFound from "../Templates/NotFound";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(pathname)
  const videoCategory = pathname.includes("movie") ? "movie" : "tv";
  const ytVideo = useSelector((state) => state[videoCategory].info.videos);
  return (
    <div className="fixed top-0 left-0 bg-[rgba(0,0,0,0.89)] h-screen w-full flex items-center justify-center">
      <IoMdClose
        onClick={() => navigate(-1)}
        className="absolute z-[10000] cursor-pointer text-2xl top-[5%] right-[3%]"
      />
      {ytVideo ? (
        <ReactPlayer
        controls={true}
          height={600}
          width={1200}
          url={`https://www.youtube.com/watch?v=${ytVideo.key}`}
        ></ReactPlayer>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Trailer;
