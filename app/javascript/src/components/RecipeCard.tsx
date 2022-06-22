import * as React from "react";
import { Link } from "react-router-dom";

export const RecipeCard = (props) => {
  const { recipe, withDetails } = props;
  return (
    <div className="bg-slate-400 rounded-lg p-3">
      <div className="font-bold">{recipe.title}</div>
      {withDetails && <><div>{recipe.ingredients.map((ingredient, index) => {
        return <div key={index}>{ingredient}</div>
      })}</div>
      <img src={recipe.image} alt="" className="max-h-36"/></>}
      {!withDetails && <Link to={`/recipes/${recipe.id}`}>Details</Link>}
    </div>
  )
}