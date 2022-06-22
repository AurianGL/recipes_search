import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { MyForm } from "../components/Form";
import { RecipeCard } from "../components/RecipeCard";
import { SearchContext, SearchProvider } from "../contexts/search_context";
import { useAxios } from "../hooks";


const IngredientList: React.FC = () => {
  const state = useContext(SearchContext)
  const [result, setResult] = useState([])
  const { response, loading, error } =  useAxios({ url: `/api/v1/recipes?ingredients=${state.map(ingredient => ingredient.ingredient)}`, method: 'get' }) 

  useEffect(() => {
    setResult(response);
  }, [state, response])


  return (
    <>
      {state &&
        <ul>
          {state.map((ingredient, index) => (
            <li key={index}>
              {ingredient.ingredient} - {ingredient.quantity} {ingredient.unity}
            </li>
          ))}
        </ul>}
      {response && state.length > 0 && !error && response.map((recipe, index) => {
        return <RecipeCard key={index} recipe={recipe} withDetails />
      })}
    </>
  );
}


interface SearchProps { }

export const Search: React.FC<SearchProps> = () => {
  return (
    <SearchProvider>
      <MyForm />
      <IngredientList />

    </SearchProvider>
  )
}

