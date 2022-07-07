import * as React from "react";
import { NavBar } from "../components/NavBar";

interface HomeProps { }

export const Home: React.FC<HomeProps> = () => {
  return (
    <div className='flex justify-center w-full text-gray-300 text-lg p-10'>
      check the github repo :&nbsp;<a href="https://github.com/AurianGL/recipes_search" className="hover:text-rose-700 cursor-pointer"> Strawberry Fields</a>
    </div>
  )
}

