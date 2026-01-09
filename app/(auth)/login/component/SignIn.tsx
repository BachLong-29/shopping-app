import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/core/context/LanguageContext";
import authService from "@/core/services/authService";
import { AuthType } from "@/core/types/AuthType";
import { cn } from "@/lib/utils";
import { signInRequest } from "@/redux/reducer/authReducer";
import { redirect } from "next/navigation";

const SignIn = ({
  currentForm,
  setCurrentForm,
}: {
  currentForm: AuthType;
  setCurrentForm: (value: AuthType) => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { t } = useLanguage();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await authService.login({ email, password });
      setTimeout(() => {
        dispatch(signInRequest({ email, password }));
        redirect("/");
      }, 1000);
    } catch (e) {
      if (e && typeof e === "object") {
        if ("message" in e && typeof e.message === "string") {
          setError(e?.message);
          console.error(error);
        }
      }
    }
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
          // disabled={loading}
        >
          {t("action.sign_in")}
        </Button>
        {error && <p className="font-semibold text-red-500 mt-3">{error}</p>}
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
