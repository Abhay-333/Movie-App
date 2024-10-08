import React from "react";
import { Link } from "react-router-dom";
import { TbSpeakerphone } from "react-icons/tb";
import { GrMultimedia } from "react-icons/gr";

const Header = ({ data }) => {
  if (!data) {
    return <h1>Loading...</h1>;
  }
  const imagePath = data.poster_path || data.backdrop_path || data.profile_path;

  const style = {
    background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5), rgba(0,0,0,.7)), url(https://image.tmdb.org/t/p/original/${imagePath})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  return (
    <div
      //   style={{
      //     `,
      //     backgroundPosition: "center",
      //     backgroundSize: "cover",
      //     backgroundRepeat: "no-repeat",
      //   }}
      style={style}
      className="w-full h-[50vh] text-sm"
    >
      <div className="MovieDetails w-[60%] flex flex-col items-start justify-end px-[4%] py-[4%]">
        <h1 className="text-5xl font-black tracking-wide">
          {data.original_name || data.title || data.name || data.original_title}
        </h1>

        <p className="mt-3">
        {data.overview ? data.overview.slice(0, 150) : "No description available"}{" "}
          <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400 font-semibold ">...more</Link>
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

        <Link className="mt-3" to={`${data.media_type}/details/${data.id}/trailer`}>
          <button className="bg-[#7F40D1] py-4 rounded-lg px-5 font-medium">
            Watch Trailer
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
