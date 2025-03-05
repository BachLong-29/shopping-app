/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import authService from "@/core/services/authService";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import { useFetch } from "@/core/hooks/useFetch";

const SignIn = ({ currentForm, setCurrentForm }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { fetchData, error, loading } = useFetch(
    (req: any) => authService.login(req),
    {
      email,
      password,
    }
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    fetchData().then(() => {
      redirect("/");
    });
  };
  return (
    <CardContent
      className={cn(
        "relative w-1/2 h-full flex flex-col justify-center items-center transition-all duration-500  p-[40px] px-[80px]",
        currentForm === "sign-in" ? "left-0" : "left-full"
      )}
    >
      <div className="text-lg font-semibold uppercase">Login</div>
      <div className="w-full">
        <Input
          className="mt-4"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          className="mt-4"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          className="mt-4 w-32 bg-blue-500 hover:bg-blue-600"
          onClick={handleLogin}
          disabled={loading}
        >
          Sign In
        </Button>
        {error && <p className="font-semibold text-red-500 mb-2">{error}</p>}
        <p className="mt-4 text-sm">
          {"Don't have an account?"}
          <button
            onClick={() => setCurrentForm("sign-up")}
            className="text-blue-500 underline ml-1"
          >
            Sign up.
          </button>
        </p>
      </div>
    </CardContent>
  );
};

export default SignIn;
