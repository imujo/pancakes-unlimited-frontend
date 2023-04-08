import React from "react";
import Ingredient from "../Ingredient";

export default function IngredientGrid({ ingredients, toggleIngredient }) {
  return (
    <div className="grid gap-x-16 gap-y-4 grid-cols-1 md:grid-cols-2">
      {ingredients.map((ingredient, i) => {
        return (
          <Ingredient
            onSelect={() => toggleIngredient(ingredient.id)}
            selectable={true}
            {...ingredient}
            key={i}
          />
        );
      })}
    </div>
  );
}
