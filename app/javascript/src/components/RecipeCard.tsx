import * as React from "react";
import { Link } from "react-router-dom";

export const RecipeCard = (props) => {
  const { recipe, withDetails } = props;
  return (
    <div className="bg-slate-600 rounded">
      <div className="font-bold w-full bg-rose-700 p-3 rounded-t ">{recipe.title}</div>
      {withDetails && <>
        <div className="p-3">{recipe.ingredients.map((ingredient, index) => {
          return <div key={index}>{ingredient}</div>
        })}</div>
        <img src={recipe.image} alt="" className="w-full max-h-36 rounded-b" />
      </>}
      {!withDetails && <Link className='p-3' to={`/recipes/${recipe.id}`}>Details</Link>}
    </div>
  )
}