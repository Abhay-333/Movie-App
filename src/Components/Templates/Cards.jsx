import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ data }) => {

  return (
    <div className="w-full flex items-center gap-8 flex-wrap justify-center">
      {data.map((card, index) => {
        return (
          <Link className=" h-[50vh] flex flex-col w-[30vw] rounded-lg overflow-hidden shadow-lg" key={index}>
            <img
            className="w-full h-full object-cover object-center rounded-lg"
              src={`https://image.tmdb.org/t/p/original/${card.backdrop_path || card.profile_path || card.poster_path}`}
              alt=""
            />

            <h1 className="text-center text-xl">
              {card.original_name ||
                card.title ||
                card.name ||
                card.original_title}
            </h1>
          </Link>
        );
      })}
    </div>
  );
};

export default Cards;
