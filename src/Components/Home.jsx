import React from "react";
import SideNav from "./Templates/SideNav";
import TopNav from "./TopNav";

const Home = () => {
  document.title = "Movie App | HomePage";
  return (
    <>
      <SideNav />
      
      <div className="w-[80%] h-full">
        <TopNav />
      </div>
    </>
  );
};

export default Home;
