import * as React from "react";
import { Link } from "react-router-dom"

export const NavBar = () => {
  return (
    <nav>
      <ul className="grid gap-2 grid-cols-3 w-full  text-center p-4 bg-rose-900">
        <li >
          <Link className='bg-rose-600 hover:bg-rose-400 hover:text-black rounded px-3 py-2 cursor-pointer' to="/">Home</Link>
        </li>
        <li >
          <Link className='bg-rose-600 hover:bg-rose-400 hover:text-black rounded px-3 py-2 cursor-pointer' to={'/index'}>index</Link>
        </li>
        <li >
          <Link className='bg-rose-600 hover:bg-rose-400 hover:text-black rounded px-3 py-2 cursor-pointer' to={'/search'}>search</Link>
        </li>
      </ul>
    </nav>
  )
}
