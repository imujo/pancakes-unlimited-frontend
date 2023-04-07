import React, { useEffect, useState } from "react";
import server from "../utils/server";
import Button from "./Button";
import { formatDate } from "../utils/functions";
import TableColumn from "./TableColumn";

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    setLoading(true);
    server
      .get("order/all")
      .then((res) => setOrders(res.data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (!!Object.keys(error).length) return <div>Error</div>;

  return (
    <div className=" w-full grid grid-rows-4 gap-y-5 gap-x-10  ">
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

      {orders.map((order, i) => (
        <TableColumn key={i} order={order} i={i} />
      ))}

      {loading && <p>Loading...</p>}
    </div>
  );
}
