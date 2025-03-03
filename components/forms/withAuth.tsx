"use client";

import { useAuth } from "@/core/context/AuthContext";

const withAuth = <P extends object>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  WrappedComponent: React.ComponentType<P & { user: any }>
) => {
  const AuthComponent = (props: P) => {
    const { user } = useAuth();

    return <WrappedComponent {...props} user={user} />;
  };

  return AuthComponent;
};

export default withAuth;
