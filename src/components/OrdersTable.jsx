import React from "react";
import server from "../utils/server";
import TableColumn from "./TableColumn";
import { useQuery } from "react-query";
import { TailSpin } from "react-loader-spinner";

export default function OrdersTable() {
  const {
    data: orders,
    error,
    isLoading,
  } = useQuery("orders", () => {
    return server.get("order/all").then((res) => res.data);
  });

  if (error) return <p>Oops, there is an error</p>;
  if (isLoading) {
    return (
      <div className="flex h-full w-full justify-center items-center">
        <TailSpin
          height={48}
          width={48}
          color="black"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-scroll">
      <div className="  grid grid-rows-4 gap-y-5 gap-x-10    ">
        <div className="col-start-1  row-start-1 text-xs lg:text-sm text-start">
          ORDER NUMBER
        </div>
        <div className=" col-start-2  row-start-1 text-xs lg:text-sm text-start ">
          DATE CREATED
        </div>
        <div className=" col-start-3 row-start-1  text-xs lg:text-sm text-start ">
          DESCRIPTION
        </div>
        <div className=" col-start-4 row-start-1  w-4 "></div>

        {!isLoading &&
          orders.map((order, i) => <TableColumn key={i} order={order} i={i} />)}

        {orders.length === 0 ? <p>No orders found</p> : null}
      </div>
    </div>
  );
}
