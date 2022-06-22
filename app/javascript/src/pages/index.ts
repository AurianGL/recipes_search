import * as React from "react";
import { Home } from "./Home"
import { RecipesIndex } from "./RecipesIndex"
import { RecipeShow } from "./RecipeShow"
import { Search } from "./Search"

const pages: Record<string, React.FC> = { Home, RecipesIndex, RecipeShow, Search };

export default pages