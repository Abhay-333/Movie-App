import React from 'react'
import { LuLoader2 } from "react-icons/lu";
import "./Loader.css"

const Loading = () => {
  return (
    <div className='h-screen w-full bg-black flex items-center justify-center'>
        {/* <img src={loader} alt="" className='w-[10%] text-white' /> */}
            <LuLoader2 className='text-5xl spin-slow'/>
    </div>
  )
}

export default Loading