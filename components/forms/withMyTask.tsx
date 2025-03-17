"use client";

import { BreadcrumbProvider } from "@/core/context/BreadcrumbContext";
import React from "react";
import Sidebar from "../layout/sidebar/Sidebar";
import withAuth from "./withAuth";

const withMyTask = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const MyTaskComponent = (props: P) => {
    return (
      <BreadcrumbProvider>
        <Sidebar>
          <WrappedComponent {...props} />
        </Sidebar>
      </BreadcrumbProvider>
    );
  };

  return withAuth(MyTaskComponent);
};

export default withMyTask;
