import React from "react";
import { formatDate } from "../utils/functions";
import Button from "./Button";

export default function TableColumn({ order, i }) {
  let formatedDate = formatDate(new Date(order.createdAt));

  return (
    <>
      <div className={`text-base lg:text-xl col-start-1 row-start-${i + 2}`}>
        {order.orderNumber}
      </div>
      <div className={`text-base lg:text-xl col-start-2 row-start-${i + 2}`}>
        {formatedDate}
      </div>
      <div
        className={`text-base lg:text-xl col-start-3 max-w-50 row-start-${
          i + 2
        }`}
      >
        {order.description}
      </div>
      <div className={`col-start-4 row-start-${i + 2}`}>
        <Button title="Details" />
      </div>
    </>
  );
}
