"use client";

import WrapperTable, {
  WrapperTableType,
} from "@/components/layout/section/WrapperTable";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { DataTable } from "@/components/layout/custom/DataTable";
import ExportButton from "@/components/layout/export/ExportButton";
import ImportButton from "@/components/layout/import/ImportButton";
import { SalesOrder } from "@/core/model/SO";
import WrapperContent from "@/components/layout/section/WrapperContent";
import { getSOCols } from "../utils/getSOCols";
import { menuPagination } from "@/core/utils/pagination";
import { useBreadcrumb } from "@/core/context/BreadcrumbContext";
import { useEffect } from "react";
import { useLanguage } from "@/core/context/LanguageContext";
import { useRouter } from "next/navigation";
import { useSOList } from "../utils/useSOList";
import withMyTask from "@/components/forms/withMyTask";

interface ISalesOrderList {
  salesOrders: SalesOrder[];
  total: number;
  userId: string;
}

const SalesOrderList = ({ salesOrders, userId }: ISalesOrderList) => {
  const { setBreadcrumb } = useBreadcrumb();
  const { t } = useLanguage();
  const router = useRouter();

  const {
    columnVisibility,
    handleChangeLimit,
    handleExport,
    handleSearch,
    itemsPerPage,
    onSearch,
    onShowHideCols,
    sorting,
    rowSelection,
    onRowSelection,
  } = useSOList({
    userId,
  });

  useEffect(() => {
    setBreadcrumb([
      {
        label: t("module.sales_order"),
      },
    ]);
  }, []);

  const cols = getSOCols();

  const header: WrapperTableType = {
    search: {
      placeholder: t("action.search"),
      onChange: onSearch,
      styles: "",
      onSearch: handleSearch,
    },
    showing: {
      menu: menuPagination,
      size: itemsPerPage,
      onChange: handleChangeLimit,
    },
    filter: {},
    create: {
      title: "Add New Product",
      onClick: () => router.push(`/my-task/${userId}/product/create`),
    },
    exportCSV: {
      title: "Export",
      onExport: handleExport,
    },
    tools: {
      menu: [
        {
          key: "export",
          label: <ExportButton exportExec={handleExport} />,
        },
        {
          key: "import",
          label: (
            <ImportButton
              onClick={() => router.push(`/my-task/${userId}/product/import`)}
            />
          ),
        },
      ],
    },
  };
  const table = useReactTable({
    data: salesOrders,
    columns: cols,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: onRowSelection,
    onColumnVisibilityChange: onShowHideCols,
    state: {
      sorting,
      columnVisibility,
      // columnFilters,
      rowSelection,
    },
  });
  console.log({ rowSelection });
  return (
    <WrapperContent>
      <div className="space-y-4 p-6">
        <WrapperTable {...header} table={table}>
          <DataTable table={table} columns={cols} />
        </WrapperTable>
      </div>
    </WrapperContent>
  );
};

export default withMyTask(SalesOrderList);
