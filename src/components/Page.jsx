import React from "react";
import Nav from "./Nav";

export default function Page({ children, className }) {
  return (
    <main className="min-h-screen flex flex-col">
      <Nav />
      <div className="flex justify-center flex-1">
        <div className={className}>{children}</div>
      </div>
    </main>
  );
}
