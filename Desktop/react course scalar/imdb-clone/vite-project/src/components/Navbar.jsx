import React from 'react'
import Logo from '../MovieLogo.png'
import {Link} from 'react-router-dom'
function Navbar() {
  return (
    <div className='flex border space-x-8 pl-3 py-4'>
       <img className='w-[15px]' src="{Logo}" alt="" />
      <Link to="/" className='text-blue-500 text-1xl font-bold'>Movies</Link>
      <Link to="/watchlist" className='text-blue-500 text-1xl font-bold'>Watchlist</Link>
    </div>
  )
}

export default Navbar

