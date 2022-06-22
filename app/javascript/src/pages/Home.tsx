import * as React from "react";
import { NavBar } from "../components/NavBar";

interface HomeProps { }

export const Home: React.FC<HomeProps> = () => {
  return (
    <>
      <div className='flex justify-center w-full bg-gray-800 text-gray-300 text-lg'>Home</div>
    </>
  )
}

