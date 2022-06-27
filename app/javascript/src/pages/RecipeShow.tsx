import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RecipeCard } from "../components/RecipeCard";
import { useAxios } from "../hooks";


interface RecipeShowProps {
  id: number
}

export const RecipeShow: React.FC<RecipeShowProps> = (props) => {
  const params = useParams();

  const { response, loading } = useAxios({url: "/api/v1/recipes/" + params.id, method: 'get'});

  const [data, setData] = useState(null);

  useEffect(() => {
    if (response !== null) {
      setData(response);
    }
  }, [response, params.id]);

  return (
    <div className="p-3">
      {!loading && data && <RecipeCard recipe={data} withDetails/>}
    </div>
  )
}

