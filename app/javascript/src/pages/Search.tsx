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
  }, { with: [], without: [] })
}

const withAndWithoutToParams = (ingredients: Ingredient[]) => {
  const sorted = withAndWithout(ingredients)
  return `ingredients=${sorted.with.join(' ')}&without_ingredients=${sorted.without.join(' ')}`
}


const IngredientList: React.FC = () => {
  const state = useContext(SearchContext)
  const dispatch = useContext(DispatchContext);
  const [anyRecipes, setAnyRecipes] = useState([])
  const [exactRecipes, setExactRecipes] = useState([])
  const [tab, setTab] = useState('any')
  const { response, error } = useAxios({ url: `/api/v1/recipes?${withAndWithoutToParams(state)}`, method: 'get', call: state.length > 0 })

  useEffect(() => {
    if (response !== null) {
      setAnyRecipes(response.any_recipes);
      setExactRecipes(response.exact_recipes);
    }
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
              {ingredient}  <button onClick={() => removeIngredient({ ingredient: ingredient, with: "with" })} className='bg-rose-800 cursor-pointer text-white rounded p-1'>X</button>
            </li>
          ))}
          <li>WITHOUT :</li>
          {withAndWithout(state).without.map((ingredient, index) => (
            <li key={index}>
              {ingredient}  <button onClick={() => removeIngredient({ ingredient: ingredient, with: "without" })} className='bg-rose-800 cursor-pointer text-white rounded p-1'>X</button>
            </li>
          ))}
        </ul>}
      <div className="w-full flex justify-center p-8">
        <button onClick={() => setTab('any')} className={`hover:bg-rose-400 hover:text-black rounded px-3 py-2 cursor-pointer mr-2 ${tab === 'any' ? 'bg-rose-600' : 'bg-rose-200 '}`}>simplest results</button>
        <button onClick={() => setTab('exact')} className={`hover:bg-rose-400 hover:text-black rounded px-3 py-2 cursor-pointer mr-2 ${tab === 'exact' ? 'bg-rose-600' : 'bg-rose-200 '}`}>closest results</button>
      </div>
      <div className="p-8">
        {tab === 'any' && 'those results give you recipes matching any of your ingredients but not take the without ones in account, they take in account the length of the ingredients list trying to prioritize the shortest ones and are ranked by complexity (a score taking in account ratings, prep time and ingredient length)'}
        {tab === 'exact' && 'those results give you an exact match with your search'}
      </div>
      <div className="w-full flex justify-center p-8">
        {response && state.length > 0 && !error && <div className="w-5/6 grid grid-cols-3 gap-4">
          {tab === 'any' && anyRecipes && anyRecipes.map((recipe, index) => <RecipeCard key={index} recipe={recipe} withDetails />)}
          {tab === 'exact' && exactRecipes && exactRecipes.map((recipe, index) => <RecipeCard key={index} recipe={recipe} withDetails />)}
        </div>}
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

