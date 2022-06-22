import * as React from "react";
import { Link } from "react-router-dom";

interface HomeProps { }

export const Home: React.FC<HomeProps> = () => {
  return (
    <>
      <div className='flex justify-center w-full bg-gray-800 text-gray-300 text-lg'>Home</div>
      <Link to={'/index'}>index</Link>
      <Link to={'/search'}>search</Link>

    </>
  )
}

