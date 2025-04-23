"use client";

import React from "react";
import WrapperContent from "@/components/layout/section/WrapperContent";
import withMyTask from "@/components/forms/withMyTask";

const SalesOrderPage = () => {
  return (
    <WrapperContent>
      <div className="space-y-4 p-6">
        SalesOrderPage
        {/* <WrapperTable {...header}>
      <StyledTable data={productState.data} columns={columns} />
      <StyledPagination
        pageSize={itemsPerPage}
        currentPage={currentPage}
        onChange={handleChangePage}
        total={productState.total}
        styles="!m-0 bg-[hsl(var(--reverse-background))] rounded-bl-lg p-2 rounded-br-lg border border-gray-300"
      />
    </WrapperTable> */}
      </div>
    </WrapperContent>
  );
};

export default withMyTask(SalesOrderPage);
