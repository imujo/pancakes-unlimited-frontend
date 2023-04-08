import React from "react";
import { formatDate } from "../utils/functions";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function TableColumn({ order, i }) {
  const navigate = useNavigate();

  let formatedDate = formatDate(new Date(order.createdAt));

  return (
    <>
      <div
        className={`text-base font-light lg:text-xl col-start-1 row-start-${
          i + 2
        }`}
      >
        {order.orderNumber}
      </div>
      <div
        className={`text-base font-extralight lg:text-xl col-start-2 row-start-${
          i + 2
        }`}
      >
        {formatedDate}
      </div>
      <div
        className={`text-base font-extralight lg:text-xl col-start-3 max-w-50 row-start-${
          i + 2
        }`}
      >
        {order.description}
      </div>
      <div className={`col-start-4 row-start-${i + 2}`}>
        <Button
          title="Details"
          onClick={() => navigate(`/order/${order.orderNumber}`)}
        />
      </div>
    </>
  );
}
