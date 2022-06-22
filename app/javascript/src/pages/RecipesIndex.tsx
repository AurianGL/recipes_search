import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { DispatchContext, RecipesContext } from "../contexts/recipe_context";
import { useAxios } from "../hooks";
import { RecipeCard } from "../components/RecipeCard";


interface RecipesIndexProps {
}

export const RecipesIndex: React.FC<RecipesIndexProps> = () => {
  const [page, setPage] = useState(1)
  const { response, loading, error } = useAxios({ url: `/api/v1/recipes?page=${page}`, method: 'get' });

  const [data, setData] = useState([]);

  useEffect(() => {
    if (response !== null) {
      setData(response);
    }
  }, [response, page]);

  // useContext(RecipesContext);
  // const dispatch = useContext(DispatchContext);

  // () => 

  // useEffect(() => {
  //   dispatch({ type: 'INDEX'})
  // }, [])

  return (
    <>
      {loading && <div>Loading...</div>}
      {data && <div className="p-4 grid grid-cols-3 gap-4">
        {data.map((recipe, index) => {
          return <RecipeCard key={index} recipe={recipe} />
        }
        )}
      </div>}
      {error && <div>{error}</div>}
      <div className="flex justify-center items-center w-full text-center gap-3">
      <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="bg-slate-600 rounded text-slate-100 disabled:bg-slate-200 p-1">previous</button>
      {page}
      <button  disabled={data.length < 10} onClick={() => setPage(page + 1)} className="bg-slate-600 rounded text-slate-100 disabled:bg-slate-200 p-1">next</button>
      </div>
    </>
  )
}

