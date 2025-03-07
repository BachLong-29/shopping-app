import React, { useState } from "react";

import { AuthType } from "@/core/types/AuthType";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import authService from "@/core/services/authService";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { useLanguage } from "@/core/context/LanguageContext";

const SignIn = ({
  currentForm,
  setCurrentForm,
}: {
  currentForm: AuthType;
  setCurrentForm: (value: AuthType) => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    fetchData: login,
    error,
    loading,
  } = useFetch((req) => authService.login(req), {
    email,
    password,
  });
  const { t } = useLanguage();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    login().then(() => {
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
      <div className="text-lg font-semibold uppercase">
        {t("action.sign_in")}
      </div>
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
          {t("action.sign_in")}
        </Button>
        {error && <p className="font-semibold text-red-500 mb-2">{error}</p>}
        <p className="mt-4 text-sm">
          {t("dont_have_account")}
          <button
            onClick={() => setCurrentForm(AuthType.SignUp)}
            className="text-blue-500 underline ml-1"
          >
            {`${t("action.sign_up")}.`}
          </button>
        </p>
      </div>
    </CardContent>
  );
};

export default SignIn;
