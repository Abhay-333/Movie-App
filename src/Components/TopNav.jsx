import React, { useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState } from "react";
import Axios from "../Utils/Axios";
import noImg from '../Resources/no-img.WEBP'

const TopNav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const fetchSearchingData = async () => {
    try {
      const data = await Axios.get(`/search/multi?query=${query}`);
      console.log(data.data.results);
      setSearches(data.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSearchingData();
  }, [query]);

  return (
    <div className=" w-[80%] relative mx-auto">
      <div className="flex items-center justify-start h-[10vh] gap-3 ml-[20%]">
        <IoSearch className="text-2xl" />
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          type="text"
          placeholder="Search Here..."
          className="w-[65%] bg-zinc-700 p-2 outline-none border-none rounded-lg"
        />
        {query.length > 0 && (
          <IoMdClose onClick={() => setQuery("")} className="text-2xl" />
        )}

        <div className="absolute max-h-[50vh] w-[60%] top-[100%] overflow-auto rounded-lg">
          {searches.map((search, index) => (
            <Link className="hover:bg-zinc-300 duration-300 hover:text-[#5043ff] text-black font-semibold bg-zinc-100 p-8 flex items-center justify-start border-b-[gray] gap-4 border-b-[1px]">
              <img
              className="w-[13vw] rounded-lg object-cover object-center"
                src={search.backdrop_path || search.profile_path || search.poster_path ? `https://image.tmdb.org/t/p/original/${search.backdrop_path || search.profile_path || search.poster_path}`: noImg}
                alt=""
              />
              <span>{
                  search.original_name ||
                  search.title ||
                  search.name ||
                  search.original_title
                }</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopNav;
