"use client";

import WrapperTable, {
  WrapperTableType,
} from "@/components/layout/section/WrapperTable";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DataTable } from "@/components/layout/custom/DataTable";
import ExportButton from "@/components/layout/export/ExportButton";
import ImportButton from "@/components/layout/import/ImportButton";
import { RootState } from "@/redux/store/store";
import WrapperContent from "@/components/layout/section/WrapperContent";
import { getStudentCols } from "../utils/getProductCols";
import { menuPagination } from "@/core/utils/pagination";
import { setProduct } from "@/redux/reducer/productReducer";
import { useBreadcrumb } from "@/core/context/BreadcrumbContext";
import { useLanguage } from "@/core/context/LanguageContext";
import { useListProduct } from "../context/ProductListContext";
import { useProductList } from "../utils/useProductList";
import { useRouter } from "next/navigation";
import withMyTask from "@/components/forms/withMyTask";

const ProductPage = ({ params }: { params: Promise<{ user_id: string }> }) => {
  const { t } = useLanguage();
  const { user_id: userId } = use(params);
  const { products, total } = useListProduct();
  const router = useRouter();
  const dispatch = useDispatch();
  const productState = useSelector((state: RootState) => state.product);
  const columns = getStudentCols(userId);
  const { setBreadcrumb } = useBreadcrumb();

  const {
    handleChangeLimit,
    onSearch,
    onShowHideCols,
    onRowChangeSelection,
    handleSearch,
    handleExport,
    columnVisibility,
    sorting,
    itemsPerPage,
    rowSelection,
  } = useProductList({
    userId,
  });

  useEffect(() => {
    setBreadcrumb([
      {
        label: t("module.product"),
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (productState.total <= 0) {
      dispatch(setProduct({ data: products, total }));
    }
  }, [dispatch, productState.total, products, total]);

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
    data: productState.data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: onShowHideCols,
    onRowSelectionChange: onRowChangeSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      // columnFilters,
    },
  });
  return (
    <WrapperContent>
      <div className="space-y-4 p-6">
        <WrapperTable {...header} table={table}>
          <DataTable table={table} columns={columns} />
          {/* <StyledPagination
            pageSize={itemsPerPage}
            currentPage={currentPage}
            onChange={handleChangePage}
            total={productState.total}
            styles="!m-0 bg-[hsl(var(--reverse-background))] rounded-bl-lg p-2 rounded-br-lg border border-gray-300"
          /> */}
        </WrapperTable>
      </div>
    </WrapperContent>
  );
};

export default withMyTask(ProductPage);
