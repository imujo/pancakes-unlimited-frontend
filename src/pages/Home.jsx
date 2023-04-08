import React from "react";
import OrdersTable from "../components/OrdersTable";
import Page from "../components/Page";

export default function Home() {
  return (
    <Page className="  flex flex-col gap-24 items-center  overflow-hidden ">
      <h1 className=" text-4xl font-light text-start w-full ">Orders</h1>
      <OrdersTable />
    </Page>
  );
}
