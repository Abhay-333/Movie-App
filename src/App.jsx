import { useState } from 'react'
import './style.css'
import { Routes,Route } from 'react-router-dom'
import Home from './Components/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='h-screen w-full bg-[#1D1C23] text-white flex'>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
      </Routes>
    </div>
  )
}

export default App
