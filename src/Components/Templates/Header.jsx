import React from "react";
import { Link } from "react-router-dom";
import { TbSpeakerphone } from "react-icons/tb";
import { GrMultimedia } from "react-icons/gr";

const Header = ({ data }) => {
  console.log(data);
  const imagePath = data.backdrop_path || data.profile_path || data.poster_path;
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5), rgba(0,0,0,.7)), url(https://image.tmdb.org/t/p/original/${imagePath})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-[50vh] text-sm"
    >
      <div className="MovieDetails w-[60%] flex flex-col items-start justify-end px-[4%] py-[4%]">
        <h1 className="text-5xl font-black tracking-wide">
          {data.original_name || data.title || data.name || data.original_title}
        </h1>

        <p className="mt-3">
          {data.overview.slice(0, 150)}{" "}
          <Link className="text-blue-400 font-semibold ">...more</Link>
        </p>

        <div className="annoucement flex items-center gap-2 mt-2">
          {data.release_date ? (
            <div className="flex items-center gap-2">
              <TbSpeakerphone className="text-lg" />
              <p>{data.release_date}</p>
            </div>
          ) : null}

          <GrMultimedia className="ml-4" />
          <p className="uppercase">{data.media_type}</p>


        </div>
          <div className="ratings mt-2">
          <p>Ratings: {data.vote_average}</p>
          </div>

          <Link className="mt-3">
            <button className="bg-[#7F40D1] py-4 rounded-lg px-5 font-semibold">Watch Trailer</button>
          </Link>

      </div>
    </div>
  );
};

export default Header;
