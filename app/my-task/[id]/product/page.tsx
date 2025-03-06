"use client";

import React from "react";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import withMyTask from "@/components/forms/withMyTask";

const ProductPage = () => {
  return (
    <div>
      <Sidebar />
    </div>
  );
};

export default withMyTask(ProductPage);
