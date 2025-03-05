/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import authService from "@/core/services/authService";
import { cn } from "@/lib/utils";
import { useFetch } from "@/core/hooks/useFetch";

const SignUp = ({ currentForm, setCurrentForm }: any) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { error, fetchData, loading } = useFetch(
    (req: any) => authService.register(req),
    {
      email,
      password,
      name,
    }
  );

  const handleSignUp = async (e: React.FormEvent) => {
    console.log("sign up");
    e.preventDefault();
    fetchData().then(() => alert("Đăng ký thành công."));
  };
  return (
    <CardContent
      className={cn(
        "relative w-1/2 h-full flex flex-col justify-center items-center transition-all duration-500 p-[40px] px-[80px]",
        currentForm === "sign-up" ? "left-0" : "left-full"
      )}
    >
      <h2 className="text-lg font-semibold uppercase">Create an account</h2>
      <div className="w-full">
        <Input
          className="mt-4"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          className="mt-4"
          placeholder="Username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          className="mt-4"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <Input
          className="mt-4"
          type="password"
          placeholder="Confirm Password"
        /> */}
        {error && <p className="font-semibold text-red-500 mb-2">{error}</p>}
        <Button
          className="mt-4 w-32 bg-green-500 hover:bg-green-600"
          onClick={handleSignUp}
          disabled={loading}
        >
          Sign Up
        </Button>
        <p className="mt-4 text-sm">
          Already have an account?
          <button
            onClick={() => setCurrentForm("sign-in")}
            className="text-blue-500 underline ml-1"
          >
            Sign in.
          </button>
        </p>
      </div>
    </CardContent>
  );
};

export default SignUp;
