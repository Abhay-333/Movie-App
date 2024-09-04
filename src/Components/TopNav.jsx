import React from "react";
import { IoSearch } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState } from "react";

const TopNav = () => {
    const [query, setQuery] = useState("")
    console.log(query)

  return (
    <div className=" w-[80%] relative mx-auto">
      <div className="flex items-center justify-start h-[10vh] gap-3 ml-[20%]">
        <IoSearch className="text-2xl" />
        <input
        onChange={(e)=>setQuery(e.target.value)}
        value={query}
          type="text"
          placeholder="Search Here..."
          className="w-[65%] bg-zinc-700 p-2 outline-none border-none rounded-lg"
        />
        {query.length > 0 && <IoMdClose onClick={()=>setQuery("")} className="text-2xl" />}
        

        <div className="absolute max-h-[50vh] w-[60%] top-[100%] overflow-auto rounded-lg">
          
          <Link className="hover:bg-zinc-300 duration-300 hover:text-[#5043ff] text-black font-semibold bg-zinc-100 p-8 flex items-center justify-start border-b-[gray] border-b-[1px]">
            <img src="" alt="" />
            <span>Movie 1</span>
          </Link>
                  

        </div>
      </div>
    </div>
  );
};

export default TopNav;
