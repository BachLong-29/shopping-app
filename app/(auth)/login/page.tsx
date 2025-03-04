"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RootState } from "@/redux/store/store";
import { loginRequest } from "@/redux/actions/user.action";
import { redirect } from "next/navigation";
import withMyTask from "@/components/forms/withMyTask";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.me.error);
  const isAuthenticated = useSelector(
    (state: RootState) => state.me.isAuthenticated
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginRequest(email, password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      redirect("/");
    }
  }, [isAuthenticated]);

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>{"Login"}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* {isRegistering && <Input placeholder="Name" className="mb-2" />} */}
        <Input
          type="email"
          placeholder="Email"
          className="mb-2"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          className="mb-2"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="font-semibold text-red-500 mb-2">{error}</p>}
        <Button className="w-full" onClick={handleLogin}>
          {"Login"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default withMyTask(LoginPage);

// cần custom lại để đẹp hơn.
// có thể dùng hình ảnh cho sống động.
// thêm các icon đăng nhập bằng google, facebook, ...
