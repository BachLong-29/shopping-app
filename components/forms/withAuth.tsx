"use client";

import { redirect } from "next/navigation";
import { useAuth } from "@/core/context/AuthContext";
import { useEffect } from "react";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const AuthComponent = (props: P) => {
    const { user } = useAuth();
    console.log({ user });
    useEffect(() => {
      if (!user?.id) {
        redirect("/login");
      }
    }, [user]);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
