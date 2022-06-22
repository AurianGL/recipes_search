import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RecipeCard } from "../components/RecipeCard";
import { DispatchContext, RecipesContext } from "../contexts/recipe_context";
import { useAxios } from "../hooks";


interface RecipeShowProps {
  id: number
}

export const RecipeShow: React.FC<RecipeShowProps> = (props) => {
  const params = useParams();

  const { response, loading, error } = useAxios({url: "/api/v1/recipes/" + params.id, method: 'get'});

  const [data, setData] = useState(null);

  useEffect(() => {
    if (response !== null) {
      setData(response);
    }
  }, [response, params.id]);

  return (
    <>
      <div className='flex justify-center w-full bg-gray-800 text-gray-300 text-lg'>Home</div>
      {!loading && data && <RecipeCard recipe={data} withDetails/>}
    </>
  )
}

