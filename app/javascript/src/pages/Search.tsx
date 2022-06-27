import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { MyForm } from "../components/Form";
import { RecipeCard } from "../components/RecipeCard";
import { DispatchContext, Ingredient, SearchContext, SearchProvider } from "../contexts/search_context";
import { useAxios } from "../hooks";

const withAndWithout = (ingredients: Ingredient[]) => {
  return ingredients.reduce((acc, val) => {
    if (val.with === "with") acc.with = [...acc.with, val.ingredient]
    if (val.with === "without") acc.without = [...acc.without, val.ingredient]
    return acc
  }, {with: [], without: []})
}

const withAndWithoutToParams = (ingredients: Ingredient[]) => {
  const sorted = withAndWithout(ingredients)
  return `ingredients=${sorted.with.join(' ')}&without_ingredients=${sorted.without.join(' ')}`
}


const IngredientList: React.FC = () => {
  const state = useContext(SearchContext)
  const dispatch = useContext(DispatchContext);
  const [result, setResult] = useState([])
  const { response, error } = useAxios({ url: `/api/v1/recipes?${withAndWithoutToParams(state)}`, method: 'get', call: state.length > 0 })

  useEffect(() => {
    if (response !== null ) setResult(response.recipes);
  }, [state, response])

  const removeIngredient = (ingredient) => {
    dispatch({ type: 'REMOVE_INGREDIENT', payload: ingredient });
  }


  return (
    <>
      {state.length > 0 &&
        <ul className="w-full flex flex-col items-center">
          <li>WITH :</li>
          {withAndWithout(state).with.map((ingredient, index) => (
            <li key={index}>
              {ingredient}  <button onClick={() => removeIngredient({ingredient: ingredient, with: "with"})} className='bg-rose-800 cursor-pointer text-white rounded p-1'>X</button>
            </li>
          ))}
          <li>WITHOUT :</li>
          {withAndWithout(state).without.map((ingredient, index) => (
            <li key={index}>
              {ingredient}  <button onClick={() => removeIngredient({ingredient: ingredient, with: "without"})} className='bg-rose-800 cursor-pointer text-white rounded p-1'>X</button>
            </li>
          ))}
        </ul>}
      <div className="w-full flex justify-center p-8">
      {result && state.length > 0 && !error && <div className="w-5/6 grid grid-cols-3 gap-4">{result.map((recipe, index) => {
        return <RecipeCard key={index} recipe={recipe} withDetails />
      })}</div>}
      </div>
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

