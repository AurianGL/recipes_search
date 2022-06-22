import * as React from "react";
import { createContext, Reducer, useReducer, useEffect } from "react";
import { useAxios } from '../hooks'

const fetchRecipes = () => useAxios({url: "/api/v1/recipes", method: 'get'});

interface RecipeContextProps {
  children: React.ReactNode;
}

type Action =
  | { type: "SHOW"; payload: number }
  | { type: "SEARCH"; payload: string[] }
  | { type: "INDEX" };

type Recipes = {
  response: any;
  error: string;
  loading: boolean;
}

export const RecipesContext = createContext<Recipes>(null as any);

export const DispatchContext = createContext<React.Dispatch<Action>>(
  () => null
);

const reducer: Reducer<Recipes, Action> = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return useAxios({url: "/api/v1/recipes/" + action.payload, method: 'get'});
    case "SEARCH":
      return useAxios({url: "/api/v1/recipes/search?query=" + action.payload, method: 'get'});
    case "INDEX":
      return fetchRecipes()
    default:
      return state;
  }
};

export const RecipeProvider: React.FC<RecipeContextProps> = ({
  children
}) => {
  const [state, dispatch] = useReducer(reducer, null);

  return (
    <RecipesContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </RecipesContext.Provider>
  );
};


