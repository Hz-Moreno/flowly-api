import CardComponent from "~/components/card-component";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Register" }];
}

export default function Register() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="grid grid-cols-2">
          <CardComponent>
            <h1 className="text-2xl font-bold">Welcome!</h1>
            <p className="text-gray-400 font-medium">Sign up!</p>
            <label className="w-full ">
              Name
              <input
                className="w-full rounded bg-gray-200 p-2"
                placeholder="My name"
              />
            </label>
            <label className="w-full">
              Email
              <input
                className="w-full rounded bg-gray-200 p-2"
                placeholder="email@example.com"
              />
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="w-full">
                Password
                <input
                  className="w-full rounded bg-gray-200 p-2"
                  placeholder="*****"
                />
              </label>
              <label className="w-full">
                Password confirmation
                <input
                  className="w-full rounded bg-gray-200 p-2"
                  placeholder="*****"
                />
              </label>
            </div>
            <button className="w-full rounded bg-(--purple) text-white p-2">
              Sign up
            </button>
            <p>
              Already have a account?{" "}
              <a className="text-(--purple) font-bold">Sign in</a>
            </p>
          </CardComponent>
          <div className="flex flex-col items-center justify-center">
            <div className="w-md">
              <p className="font-medium text-(--purple)">
                Lorem impsum Lorem impsum Lorem impsum Lorem impsum Lorem impsum
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
