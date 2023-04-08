import React from "react";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className=" h-12 flex bg-blue-600 px-12 justify-between">
      <button
        className="text-white font-semibold"
        onClick={() => navigate("/")}
      >
        Pancake Unlimited
      </button>
      <button onClick={logOut} className=" text-white">
        Log out
      </button>
    </nav>
  );
}
