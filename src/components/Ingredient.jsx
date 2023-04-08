import React from "react";

export default function Ingredient({
  name = "Ingredient name",
  type = { name: "Type" },
  healthy,
  price,
  selectable,
  onSelect,
  disabled,
}) {
  return (
    <div className="flex justify-between items-center ">
      <div className="flex gap-2">
        {selectable && (
          <input
            className={`text-blue-500 bg-gray-100 border-gray-300 rounded foucs:text-blue-500 focus:ring-blue-500 

            `}
            type="checkbox"
            disabled={disabled}
            onChange={onSelect}
          />
        )}
        <h5 className=" font-light text-sm  overflow-clip ">
          {name} <span className="font-extralight">| {type.name}</span>
        </h5>
      </div>
      <div className="font-light text-xs  flex gap-3">
        {healthy && <span className="text-green-600">Healthy</span>}
        <span>HRK {parseFloat(price).toFixed(2)}</span>
      </div>
    </div>
  );
}
