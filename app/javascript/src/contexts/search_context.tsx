import * as React from "react";
import { createContext, Reducer, useReducer, useEffect } from "react";

interface SearchContextProps {
  children: React.ReactNode;
}

type Action =
  | { type: "ADD_INGREDIENT"; payload: Ingredient }

export type Ingredient = {
    ingredient: string;
    quantity: number;
    unity: string;
}



export const SearchContext = createContext<Ingredient[]>(null as any);

export const DispatchContext = createContext<React.Dispatch<Action>>(
  () => null
);

const searchReducer: Reducer<Ingredient[], Action> = (state, action) => {
  switch (action.type) {
    case "ADD_INGREDIENT":
      console.log(action.payload)
      return [ ...state, action.payload ]; 
    default:
      return state;
  }
};

export const SearchProvider: React.FC<SearchContextProps> = ({
  children
}) => {
  const [state, dispatch] = useReducer(searchReducer, []);

  return (
    <SearchContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </SearchContext.Provider>
  );
};

