import './style.css'
import { Routes,Route } from 'react-router-dom'
import Home from './Components/Home'
import Trending from './Components/Trending'
import Popular from './Components/Popular'
import Movies from './Components/Movies'
import TvShows from './Components/TvShows'
import People from './Components/People'

function App() {

  return (
    <div className='h-screen w-full bg-[#1D1C23] text-white flex'>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/trending" element={<Trending/>}></Route>
        <Route path="/popular" element={<Popular/>}></Route>
        <Route path="/movies" element={<Movies/>}></Route>
        <Route path="/tvshows" element={<TvShows/>}></Route>
        <Route path="/people" element={<People/>}></Route>
      </Routes>
    </div>
  )
}

export default App
