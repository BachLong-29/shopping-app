"use client";

import React from "react";
import withAuth from "./withAuth";

const withMyTask = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const MyTaskComponent = (props: P) => {
    return <WrappedComponent {...props} />;
  };

  return withAuth(MyTaskComponent);
};

export default withMyTask;
