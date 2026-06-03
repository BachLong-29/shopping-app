import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/core/context/LanguageContext";
import authService from "@/core/services/authService";
import { AuthType } from "@/core/types/AuthType";
import { cn } from "@/lib/utils";
import { signInRequest } from "@/redux/reducer/authReducer";

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
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await authService.login({ email, password });
      dispatch(signInRequest({ email, password }));
      router.push("/");
    } catch (err) {
      if (err && typeof err === "object" && "message" in err) {
        setError((err as { message: string }).message);
      } else {
        setError("Đăng nhập thất bại, vui lòng thử lại");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardContent
      className={cn(
        "relative w-full md:w-1/2 h-full flex flex-col justify-center items-center transition-all duration-500  p-[40px] px-[80px]",
        currentForm === "sign-in" ? "left-0" : "left-full",
      )}
    >
      <div className="text-lg font-semibold uppercase">
        {t("action.sign_in")}
      </div>
      <form className="w-full" onSubmit={handleLogin}>
        <Input
          className="mt-4"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          className="mt-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          className="mt-4 w-32 bg-blue-500 hover:bg-blue-600"
          type="submit"
          disabled={loading}
        >
          {loading ? "..." : t("action.sign_in")}
        </Button>
        {error && <p className="font-semibold text-red-500 mt-3">{error}</p>}
        <p className="mt-4 text-sm">
          {t("dont_have_account")}
          <button
            type="button"
            onClick={() => setCurrentForm(AuthType.SignUp)}
            className="text-blue-500 underline ml-1"
          >
            {`${t("action.sign_up")}.`}
          </button>
        </p>
      </form>
    </CardContent>
  );
};

export default SignIn;
