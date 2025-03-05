"use client";

import { AuthType } from "@/core/types/AuthType";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import { cn } from "@/lib/utils";
import { useState } from "react";
import withMyTask from "@/components/forms/withMyTask";

const LoginPage = () => {
  const [currentForm, setCurrentForm] = useState<AuthType>(AuthType.SignIn);
  return (
    <div className="flex justify-center items-center h-[84vh]">
      <Card className="relative w-[1000px] h-[600px] overflow-hidden shadow-lg">
        <div className="flex h-full w-full absolute">
          <SignIn currentForm={currentForm} setCurrentForm={setCurrentForm} />
          <Image
            src="/banner/login.jpg"
            alt="sign-in"
            className={cn(
              "w-1/2 h-full relative transition-all duration-500",
              currentForm === "sign-in" ? "left-0" : "left-[-100%]"
            )}
            width={500}
            height={600}
          />
        </div>
        <div className="flex h-full">
          <Image
            src="/banner/register.jpg"
            alt="sign-up"
            className={cn(
              "w-1/2 h-full relative transition-all duration-500",
              currentForm === "sign-up" ? "left-0" : "left-[-100%]"
            )}
            width={500}
            height={600}
          />
          <SignUp currentForm={currentForm} setCurrentForm={setCurrentForm} />
        </div>
      </Card>
    </div>
  );
};

export default withMyTask(LoginPage);

// thêm các icon đăng nhập bằng google, facebook, ...
