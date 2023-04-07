import React from "react";
import Nav from "./Nav";

export default function Page({ children, className }) {
  return (
    <main className="min-h-screen flex flex-col">
      <Nav />
      <div className={className}>{children}</div>
    </main>
  );
}
