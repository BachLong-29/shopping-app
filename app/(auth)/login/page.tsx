"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import authService from "@/core/services/authService";
import { useAuth } from "../../../core/context/AuthContext";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { user } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await authService.login({ email, password });

    if (result?.error) {
      alert("Login failed!");
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    if (user?.id) {
      router.replace("/");
    }
  }, [user, router]);
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
        <Button className="w-full" onClick={handleLogin}>
          {"Login"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoginPage;

// cần custom lại để đẹp hơn.
// có thể dùng hình ảnh cho sống động.
// thêm các icon đăng nhập bằng google, facebook, ...
