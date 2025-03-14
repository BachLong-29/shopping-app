"use client";

import Footer from "../layout/Footer";
import Navigation from "../layout/Navigation";
import React from "react";
import Sidebar from "../layout/sidebar/Sidebar";
import { UserInfo } from "@/core/model/User";
import { usePathname } from "next/navigation";
import withAuth from "./withAuth";

const withMyTask = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const MyTaskComponent = (
    props: P & { user: Pick<UserInfo, "_id" | "name" | "email"> }
  ) => {
    const pathName = usePathname();
    const isMyTask = pathName.includes("/my-task");
    return (
      <>
        <div className="flex flex-col min-h-screen">
          {/* Navigation */}
          <Navigation />

          {/* Main Content */}
          <main className="flex-1 pt-4 container mx-auto p-4">
            {isMyTask ? (
              <Sidebar>
                <WrappedComponent {...props} />
              </Sidebar>
            ) : (
              <WrappedComponent {...props} />
            )}
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </>
    );
  };

  return withAuth(MyTaskComponent);
};

export default withMyTask;
