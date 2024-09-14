import React from "react";
import { Link } from "react-router-dom";

const HorizontalCards = ({ data }) => {
  return (
    <div className="min-h-[40vh] w-full px-5 py-3 overflow-y-auto">
      <div className="cards h-[20rem] w-full gap-5 flex">
        {data.map((card, index) => (
          <Link
            to={`${card.media_type}/details/${card.id}`}
            key={index}
            style={{
              background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5), rgba(0,0,0,.7)), url(https://image.tmdb.org/t/p/original/${
                card.backdrop_path || card.profile_path || card.poster_path
              })`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            className="card w-[20%] h-full border-[1px] border-gray-400 flex-shrink-0 rounded-lg flex items-end justify-center"
          >
            <div className="cardDetails flex flex-col p-4">
              <h1 className="text-xl font-semibold my-2">
                {card.original_name ||
                  card.title ||
                  card.name ||
                  card.original_title}
              </h1>

              <p className="text-sm">
                {card.overview.slice(0, 50)}{" "}
                <Link className="text-blue-400 font-semibold ">...more</Link>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCards;
