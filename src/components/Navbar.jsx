import React from 'react'
import { NavLink } from 'react-router-dom'


const Navbar = () => {
  return (
    <div className='flex gap-4 place-content-center border-b p-2 text-xl font-bold text-white bg-cyan-700'>
        <NavLink to="/" className=" hover:font-extrabold hover:text-lime-300">
            Home
        </NavLink>
        <NavLink to='/notes'  className=" hover:font-extrabold hover:text-lime-300">
            Notes
        </NavLink>
    </div>
  )
}

export default Navbar