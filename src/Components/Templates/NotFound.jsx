import React from 'react'
import notfound from '../../Resources/404.gif'

const NotFound = () => {
  return (
    <div className='w-full h-screen bg-black flex items-center justify-center'><img src={notfound} alt="" /></div>
  )
}

export default NotFound