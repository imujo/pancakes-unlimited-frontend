import React from "react";
import OrdersTable from "../components/OrdersTable";
import Page from "../components/Page";

export default function Home() {
  return (
    <Page className="py-16 px-6 md:px-12 ">
      <div className=" w-full flex flex-col gap-24 items-center  ">
        <h1 className=" text-4xl font-light text-start w-full ">Orders</h1>
        <OrdersTable />
      </div>
    </Page>
  );
}
