import './style.css'
import { Routes,Route } from 'react-router-dom'
import Home from './Components/Home'
import Trending from './Components/Trending'

function App() {

  return (
    <div className='h-screen w-full bg-[#1D1C23] text-white flex'>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/trending" element={<Trending/>}></Route>
      </Routes>
    </div>
  )
}

export default App
