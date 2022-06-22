import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { MyForm } from "../components/Form";
import { RecipeCard } from "../components/RecipeCard";
import { DispatchContext, SearchContext, SearchProvider } from "../contexts/search_context";
import { useAxios } from "../hooks";


const IngredientList: React.FC = () => {
  const state = useContext(SearchContext)
  const dispatch = useContext(DispatchContext);
  const [result, setResult] = useState([])
  const { response, loading, error } = useAxios({ url: `/api/v1/recipes?ingredients=${state.map(ingredient => ingredient.ingredient).join(' ')}`, method: 'get' })

  useEffect(() => {
    setResult(response);
  }, [state, response])

  const removeIngredient = (ingredient) => {
    dispatch({ type: 'REMOVE_INGREDIENT', payload: ingredient });
  }


  return (
    <>
      {state &&
        <ul className="w-full flex flex-col-reverse items-center">
          {state.map((ingredient, index) => (
            <li key={index}>
              {ingredient.ingredient} - {ingredient.quantity} {ingredient.unity} <button onClick={() => removeIngredient(ingredient)} className='cursor-pointer text-red-800'>X</button>
            </li>
          ))}
        </ul>}

      {result && state.length > 0 && !error && <div className="p-4 grid grid-cols-3 gap-4">{result.map((recipe, index) => {
        return <RecipeCard key={index} recipe={recipe} withDetails />
      })}</div>}
    </>
  );
}


interface SearchProps { }

export const Search: React.FC<SearchProps> = () => {
  return (
    <SearchProvider>
      <div className="w-full flex justify-center">
        <MyForm />
      </div>
      <IngredientList />
    </SearchProvider>
  )
}

