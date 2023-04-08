import React from "react";
import Button from "./Button";
import Ingredient from "./Ingredient";
import server from "../utils/server";

export default function Pancake({
  name,
  id,
  healthy,
  totalPrice,
  ingredients,
  refetch,
  deleteEnabled,
}) {
  const deletePancake = (pancakeId) => {
    server.delete(`pancake/${pancakeId}`).then(refetch);
  };

  return (
    <div className="w-full bg-blue-50 rounded-2xl p-5 lg:p-8 drop-shadow gap-2 flex flex-col">
      <div className="flex justify-between items-center ">
        <h4 className=" text-xl overflow-clip">{name}</h4>
        <Button
          title="Delete"
          className="w-auto text-xs py-2 px-3"
          disabled={!deleteEnabled}
          onClick={() => deletePancake(id)}
        />
      </div>
      <div className="flex gap-4">
        {healthy && (
          <span className="text-green-600 font-light text-sm">Healthy</span>
        )}

        <span className="text-sm font-extralight ">
          HRK {parseFloat(totalPrice).toFixed(2)}
        </span>
      </div>

      <ul className="mt-4 flex gap-6 flex-col ">
        {ingredients.map((ingredient, i) => (
          <Ingredient key={i} {...ingredient} />
        ))}
      </ul>
    </div>
  );
}
