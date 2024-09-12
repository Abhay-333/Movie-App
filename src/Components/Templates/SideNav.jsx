import React from "react";
import { Link } from "react-router-dom";
import { IoMdTrendingUp } from "react-icons/io";
import { IoIosPeople } from "react-icons/io";
import { MdPeople } from "react-icons/md";
import { MdLocalMovies } from "react-icons/md";
import { IoTv } from "react-icons/io5";
import { FaCircleInfo } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";

const SideNav = () => {
  return (
    <div className="w-[20%] font-Gugi h-full bg-[#312f3a] p-7">
      <h1 className=" text-2xl font-black cursor-pointer bg-black w-fit px-4 py-4 rounded-lg">
        SCREEN : SPOT
      </h1>

      <h2 className="text-lg mt-5 mb-3 ml-5">New Feeds</h2>

      <nav className="flex flex-col gap-3">
        <Link to="/trending" className="p-4 hover:bg-[#7f40d1] text-sm rounded-lg duration-200 flex items-center gap-2">
          <IoMdTrendingUp className="text-xl" />
          Trending
        </Link>

        <Link to="/popular" className="p-4 hover:bg-[#7f40d1] text-sm rounded-lg duration-200 flex items-center gap-2">
          <IoIosPeople  className="text-xl" />
          Popular
        </Link>

        <Link to="/movies" className="p-4 hover:bg-[#7f40d1] text-sm rounded-lg duration-200 flex items-center gap-2">
          <MdLocalMovies className="text-xl"/>
          Movies
        </Link>

        <Link to="/tvshows" className="p-4 hover:bg-[#7f40d1] text-sm rounded-lg duration-200 flex items-center gap-2">
          <IoTv  className="text-xl"/>
          TV Shows
        </Link>
        <Link to="/people" className="p-4 hover:bg-[#7f40d1] text-sm rounded-lg duration-200 flex items-center gap-2">
          <MdPeople className="text-xl" />
          People
        </Link>
      </nav>

      <hr className="my-5"/>

      <nav className="flex flex-col gap-5">
        <Link className="p-4 hover:bg-[#7f40d1] text-sm rounded-lg duration-200 flex items-center gap-2">
          <FaCircleInfo className="text-xl" />
          About Us
        </Link>

        <Link className="p-4 hover:bg-[#7f40d1] text-sm rounded-lg duration-200 flex items-center gap-2">
          <FaPhoneAlt  className="text-xl" />
          Contact Us
        </Link>

      </nav>
      

    </div>
  );
};

export default SideNav;
