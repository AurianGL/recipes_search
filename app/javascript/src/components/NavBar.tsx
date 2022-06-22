import * as React from "react";
import { Link } from "react-router-dom"

export const NavBar = () => {
  return (
    <nav>
      <ul className="grid gap-2 grid-cols-3 w-full  text-center p-4 bg-pink-800">
        <li >
          <Link className='hover:bg-slate-400 hover:text-black rounded p-3 cursor-pointer' to="/">Home</Link>
        </li>
        <li >
          <Link className='hover:bg-slate-400 hover:text-black rounded p-3 cursor-pointer' to={'/index'}>index</Link>
        </li>
        <li >
          <Link className='hover:bg-slate-400 hover:text-black rounded p-3 cursor-pointer' to={'/search'}>search</Link>
        </li>
      </ul>
    </nav>
  )
}
