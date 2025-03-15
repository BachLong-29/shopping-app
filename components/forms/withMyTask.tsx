import React from "react";
import Sidebar from "../layout/sidebar/Sidebar";
import withAuth from "./withAuth";

const withMyTask = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const MyTaskComponent = (props: P) => {
    return (
      <Sidebar>
        <WrappedComponent {...props} />
      </Sidebar>
    );
  };

  return withAuth(MyTaskComponent);
};

export default withMyTask;
