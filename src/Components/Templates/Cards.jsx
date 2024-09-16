import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ data, title }) => {
  return (
    <div className="w-full flex bg-[#1D1C23] items-center gap-8 flex-wrap justify-center">
      {data.map((card, index) => {
        return (
          <Link to={`/${card.media_type || title}/details/${card.id}`}
            className=" h-[50vh] relative flex flex-col w-[30vw] rounded-lg overflow-hidden shadow-lg"
            key={index}
          >
            <img
              className="w-full h-[90%] object-cover object-center rounded-lg"
              src={`https://image.tmdb.org/t/p/original/${
                card.profile_path || card.backdrop_path || card.poster_path
              }`}
              alt=""
            />

            <h1 className="text-center text-xl">
              {card.original_name ||
                card.title ||
                card.name ||
                card.original_title}
            </h1>

            {card.vote_average && (
              <div className="rating bg-yellow-500 absolute right-[0%] top-[0%] h-[7vh] w-[3.5vw] flex items-center justify-center rounded-full">
                {card.vote_average.toFixed(2)} <sup>*</sup>
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default Cards;
