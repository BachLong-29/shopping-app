"use client";

import { UserInfo } from "@/core/model/User";
import { useAuth } from "@/core/context/AuthContext";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<
    P & { user: Pick<UserInfo, "_id" | "name" | "email"> }
  >
) => {
  const AuthComponent = (props: P) => {
    const { user } = useAuth();

    return <WrappedComponent {...props} user={user} />;
  };

  return AuthComponent;
};

export default withAuth;
