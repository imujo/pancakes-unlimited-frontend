import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Page from "../components/Page";
import Button from "../components/Button";
import Pancake from "../components/Pancake";
import server from "../utils/server";
import { formatDate } from "../utils/functions";
import { useQuery } from "react-query";

export default function OrderDetails() {
  const { orderNumber } = useParams("orderNumber");
  const navigate = useNavigate();

  const {
    isLoading,
    error,
    data: order,
    refetch,
  } = useQuery(["order"], () => {
    return server
      .get(
        `order/${orderNumber}?include_pancakes=true&include_ingredients=true`
      )
      .then((res) => {
        return res.data;
      });
  });

  if (!order || isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <Page
      className={
        "px-8 w-full gap-12  flex py-12 md:py-16 flex-col max-w-4xl  2xl:max-w-7xl "
      }
    >
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-extralight">{orderNumber}</h1>
          <h3 className="text-lg font-light text-green-600">
            HRK {parseFloat(order.finalPrice).toFixed(2)}
          </h3>
        </div>
        <span className=" text-sm font-light">
          {formatDate(new Date(order.createdAt))}
        </span>
      </div>
      {!!order.description && (
        <div>
          <h2 className=" text-xl font-light mb-2">Description</h2>
          <p className=" font-light text-sm">{order.description}</p>
        </div>
      )}

      <div>
        <div className="flex gap-4 items-center justify-between">
          <h2 className=" text-xl font-light mb-2">Pancakes</h2>
          <Button
            title="Add pancake"
            className=" text-xs w-auto"
            onClick={() => navigate(`/order/${orderNumber}/pancake`)}
          />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 2xl:grid-cols-3  auto-rows-auto">
          {order.pancakeList.map((pancake, i) => (
            <Pancake
              {...pancake}
              refetch={refetch}
              deleteEnabled={order.pancakeList.length > 1}
              key={i}
            />
          ))}
        </div>
      </div>
    </Page>
  );
}
