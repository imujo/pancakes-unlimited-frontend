import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Page from "../components/Page";
import Input from "../components/Input";
import Ingredient from "../components/Ingredient";
import Button from "../components/Button";
import { useQuery } from "react-query";
import server from "../utils/server";
import { INGREDIENT_TYPES } from "../utils/constants";
import { useEffect } from "react";

export default function CreatePancake() {
  const { orderNumber } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [selectedIngredientIds, setSelectedIngredientIds] = useState([]);

  const {
    data: ingredients,
    error,
    isLoading,
  } = useQuery("allIngredients", () => {
    return server
      .get("/ingredient/all?include_type=true")
      .then((res) => res.data);
  });

  if (error) return <p>Error</p>;
  if (isLoading) return <p>Loading...</p>;

  const baseIngredients = ingredients.filter(
    (ingredient) => ingredient.type.id == INGREDIENT_TYPES.BAZA
  );
  const stuffingIngredients = ingredients.filter(
    (ingredient) => ingredient.type.id == INGREDIENT_TYPES.NADJEV
  );
  const toppingIngredients = ingredients.filter(
    (ingredient) => ingredient.type.id == INGREDIENT_TYPES.PRELJEV
  );
  const fruitIngredients = ingredients.filter(
    (ingredient) => ingredient.type.id == INGREDIENT_TYPES.VOCE
  );

  const addPancake = async (orderNumber, name, ingredientIds) => {
    try {
      await server.put(
        `/order/${orderNumber}/add_pancake?ingredient_ids=${ingredientIds.join(
          ","
        )}`,
        {
          name: name,
        }
      );
      navigate(-1);
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg);
    }
  };

  const toggleIngredient = (id) => {
    setSelectedIngredientIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((arrId) => arrId != id);
      } else {
        return [...prev, id];
      }
    });
  };

  const price = ingredients
    .filter((ingredient) => selectedIngredientIds.includes(ingredient.id))
    .reduce((sum, ingredient) => (sum += ingredient.price), 0);

  const noOfHealthyIngredients = ingredients
    .filter((ingredient) => selectedIngredientIds.includes(ingredient.id))
    .reduce(
      (noOfHealthy, ingredient) => (noOfHealthy += ingredient.healthy ? 1 : 0),
      0
    );

  const pancakeHealthy =
    noOfHealthyIngredients / selectedIngredientIds.length > 0.75;

  const noBaseIngredientsSelected = baseIngredients
    .map((baseIngredient) => baseIngredient.id)
    .filter((baseIngredientId) =>
      selectedIngredientIds.includes(baseIngredientId)
    ).length;
  const noStuffingIngredientsSelected = stuffingIngredients
    .map((stuffingIngredient) => stuffingIngredient.id)
    .filter((stuffingIngredientId) =>
      selectedIngredientIds.includes(stuffingIngredientId)
    ).length;

  const submitEnabled =
    name && noBaseIngredientsSelected == 1 && noStuffingIngredientsSelected > 0;

  return (
    <Page className=" flex gap-12 flex-1  flex-col w-full max-w-4xl  2xl:max-w-7xl px-6 py-12 md:py-16">
      <div className="flex flex-col gap-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full text-xl font-light px-1 outline-none border-gray-200 border-b-2 focus:border-gray-400"
          placeholder="Type pancake name..."
        />
        <div className="flex gap-3">
          <span className="font-light">HRK {parseFloat(price).toFixed(2)}</span>
          {pancakeHealthy && (
            <span className="text-green-600 font-light">Healthy</span>
          )}
        </div>
      </div>
      <div className="flex gap-6 flex-col">
        <h3 className="font-extralight">All Ingredients</h3>
        <div className="grid gap-4 grid-cols-1">
          <h2 className="text-sm">Base</h2>
          {baseIngredients.map((ingredient, i) => {
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
        <div className="grid gap-5 grid-cols-1">
          <h2 className="text-sm">Stuffing</h2>
          {stuffingIngredients.map((ingredient, i) => {
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
        <div className="grid gap-5 grid-cols-1">
          <h2 className="text-sm">Topping</h2>
          {toppingIngredients.map((ingredient, i) => {
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
        <div className="grid gap-5 grid-cols-1">
          <h2 className="text-sm">Fruit</h2>
          {fruitIngredients.map((ingredient, i) => {
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
      </div>
      <div className="flex-1"></div>
      <div>
        <Button
          title={"Add pancake"}
          className={"w-full"}
          disabled={!submitEnabled}
          onClick={() => addPancake(orderNumber, name, selectedIngredientIds)}
        />
        <p className=" text-xs pt-3 text-center text-slate-500">
          A valid pancake needs a name, exactly one base ingredient and at least
          one stuffing ingredient
        </p>
      </div>
    </Page>
  );
}
