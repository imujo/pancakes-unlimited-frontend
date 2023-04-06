import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { AiOutlineUser } from "react-icons/ai";
import { MdPassword } from "react-icons/md";
import server from "../utils/server";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
    setLoading(true);
    server
      .post("/auth/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        return navigate("/asd");
      })
      .catch((err) => {
        if (err.response.status == 403) {
          setErrors({
            username: {
              msg: "Username or password is incorrect",
            },
            password: {
              msg: "Username or password is incorrect",
            },
          });
        } else {
          alert.msg("Oops... something went wrong with our servers");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <main className="flex flex-row gap-5">
      <div className="hidden flex-1 relative md:flex justify-center">
        <img
          alt="pancakes"
          src="https://images.unsplash.com/photo-1565299543923-37dd37887442?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=962&q=80"
          className=" object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20" />
        <h1 className=" absolute top-16 font-semibold text-white text-3xl lg:text-4xl xl:text-5xl">
          Pancakes Unlimited
        </h1>
      </div>
      <form className=" h-screen flex flex-col p-12 flex-1" onSubmit={onSubmit}>
        <h1 className=" text-4xl font-light text-slate-800 mb-4">Login</h1>
        <p className=" text-slate-400 font-light text-sm">
          Enter your info and get to your tasty pancakes!
        </p>
        <div className=" my-6" />

        <Input
          title="Username"
          placeholder="Enter your username"
          icon={<AiOutlineUser />}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={errors.username}
          setErrors={setErrors}
          name={"username"}
          className={" h-28"}
        />
        <Input
          title="Password"
          placeholder="Enter your password"
          type="password"
          icon={<MdPassword />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          setErrors={setErrors}
          name={"password"}
        />

        <div className=" flex-1 py-4 " />

        <Button title="Log in" type="submit" loading={loading} />
      </form>
    </main>
  );
}
