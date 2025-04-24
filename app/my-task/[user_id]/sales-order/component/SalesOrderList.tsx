"use client";

import React, { useEffect } from "react";

import { DataTable } from "@/components/layout/custom/DataTable";
import WrapperContent from "@/components/layout/section/WrapperContent";
import { getSOCols } from "../utils/getSOCols";
import { getStudentCols } from "../../product/utils/getProductCols";
import { useBreadcrumb } from "@/core/context/BreadcrumbContext";
import { useLanguage } from "@/core/context/LanguageContext";
import withMyTask from "@/components/forms/withMyTask";

interface ISalesOrderList {
  salesOrders: any[];
  total: number;
}

const SalesOrderList = ({ salesOrders, total }: ISalesOrderList) => {
  const { setBreadcrumb } = useBreadcrumb();
  const { t } = useLanguage();
  useEffect(() => {
    setBreadcrumb([
      {
        label: t("module.sales_order"),
      },
    ]);
  }, []);

  const cols = getSOCols();
  return (
    <WrapperContent>
      <div className="space-y-4 p-6">
        <DataTable columns={cols} data={salesOrders} />
      </div>
    </WrapperContent>
  );
};

export default withMyTask(SalesOrderList);
