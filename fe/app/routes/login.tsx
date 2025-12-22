// src/pages/Home.tsx ou src/App.tsx
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import CardComponent from "~/components/card-component";

export default function Login() {
  return (
    <>
      <div className="container px-4 mx-auto flex flex-col items-center justify-center p-5 min-h-screen">
        <div className="grid grid-cols-2 ">
          <CardComponent>
            <h1 className="text-2xl font-bold">Welcome back!</h1>
            <p className="text-gray-400 font-medium">Login in your account</p>
            <label className="flex flex-col w-full lowercase">
              Email
              <input
                className="bg-gray-100 rounded p-2"
                placeholder="email@example.com"
              />
            </label>
            <label className="flex flex-col w-full lowercase">
              Password
              <input className="bg-gray-100 rounded p-2" placeholder="*****" />
            </label>
            <button className="bg-(--purple) text-white p-2 w-md rounded">
              Login
            </button>
            <span>
              Not have a account?{" "}
              <a className="text-(--purple) font-bold">Sign up</a>
            </span>
          </CardComponent>
          <div className="justify-center items-center flex flex-col">
            <div className=" w-md">
              <p className="text-2xl font-bold text-(--purple)">
                lorem impsum lorem impsum lorem impsum lorem impsum
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
