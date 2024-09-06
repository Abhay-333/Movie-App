import React from "react";

const DropDown = ({ title, options,trendingFunc }) => {
  return (
    <div className="select text-zinc-300 outline-none border-none">
      <select onChange={trendingFunc} className="rounded-lg py-2 px-3 w-[10vw] bg-zinc-700">
        <option value="0" disabled>
          {title}
        </option>
        {options.map((o, index) => (
          <option key={index} value={o}>
            {o.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
