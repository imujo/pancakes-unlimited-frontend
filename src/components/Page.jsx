import React from "react";
import Nav from "./Nav";

export default function Page({ children, className }) {
  return (
    <main className="min-h-screen flex flex-col">
      <Nav />
      <div className="flex justify-center flex-1">
        <div
          className={
            "sm:px-12 w-full max-w-4xl  2xl:max-w-7xl px-6 py-12 md:py-16" +
            " " +
            className
          }
        >
          {children}
        </div>
      </div>
    </main>
  );
}
