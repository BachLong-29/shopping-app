"use client";

import { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/design-system/Badge";
import { Button } from "@/components/design-system/Button";
import {
  Dropdown,
  Menu,
  MenuItem,
  MenuLabel,
} from "@/components/design-system/Menu";
import { EmptyState } from "@/components/design-system/EmptyState";
import { Icon } from "@/components/design-system/Icon";
import { Pagination } from "@/components/design-system/Pagination";
import { SearchInput } from "@/components/design-system/Input";
import { Skeleton } from "@/components/design-system/Skeleton";

import { ProductStatus } from "@/core/model/Product";
import { RootState } from "@/redux/store/store";
import { setProduct } from "@/redux/reducer/productReducer";
import { useBreadcrumb } from "@/core/context/BreadcrumbContext";
import { useLanguage } from "@/core/context/LanguageContext";
import { useListProduct } from "../context/ProductListContext";
import { useProductList } from "../utils/useProductList";
import { getStudentCols } from "../utils/getProductCols";
import withMyTask from "@/components/forms/withMyTask";

const ProductPage = ({ params }: { params: Promise<{ user_id: string }> }) => {
  const { t } = useLanguage();
  const { user_id: userId } = use(params);
  const { products, total } = useListProduct();
  const router = useRouter();
  const dispatch = useDispatch();
  const productState = useSelector((state: RootState) => state.product);
  const { setBreadcrumb } = useBreadcrumb();

  const {
    handleChangeLimit,
    onSearch,
    onShowHideCols,
    onRowChangeSelection,
    handleSearch,
    handleExport,
    handleChangePage,
    columnVisibility,
    sorting,
    itemsPerPage,
    rowSelection,
    search,
    currentPage,
  } = useProductList({ userId });

  const columns = getStudentCols(userId);

  useEffect(() => {
    setBreadcrumb([{ label: t("module.product") }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (productState.total <= 0) {
      dispatch(setProduct({ data: products, total }));
    }
  }, [dispatch, productState.total, products, total]);

  const totalPages = Math.ceil(productState.total / itemsPerPage) || 1;

  const table = useReactTable({
    data: productState.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: onShowHideCols,
    onRowSelectionChange: onRowChangeSelection,
    state: { sorting, columnVisibility, rowSelection },
  });

  const toggleableColumns = table
    .getAllColumns()
    .filter((col) => col.getCanHide());

  const activeCount = productState.data.filter(
    (p) => p.status === ProductStatus.Available
  ).length;

  const outOfStockCount = productState.data.filter(
    (p) => p.status === ProductStatus.OutOfStock
  ).length;

  return (
    <div className="space-y-6 p-3 md:p-6">
      {/* Page header */}
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-[40px] font-normal leading-none tracking-tight">
            {t("module.product")}
          </h1>
          <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
            <span>
              <strong className="text-foreground">{productState.total}</strong>{" "}
              total
            </span>
            <span>·</span>
            <span>
              <strong className="text-foreground">{activeCount}</strong> active
            </span>
            <span>·</span>
            <span className="font-medium text-halo-rose">
              {outOfStockCount} out of stock
            </span>
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="flex items-center gap-2 flex-wrap border-b border-border pb-4">
        <SearchInput
          className="min-w-[240px] flex-1 max-w-[360px]"
          placeholder={t("action.search")}
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

        <Dropdown
          trigger={
            <Button variant="outline" size="sm">
              <Icon name="grid" size={13} />
              Columns
            </Button>
          }
          align="left"
        >
          <Menu>
            <MenuLabel>Show columns</MenuLabel>
            {toggleableColumns.map((col) => (
              <MenuItem
                key={col.id}
                icon={
                  <Icon
                    name="check"
                    size={12}
                    className={
                      col.getIsVisible() ? "opacity-100" : "opacity-0"
                    }
                  />
                }
                onClick={() => col.toggleVisibility()}
              >
                {typeof col.columnDef.header === "string"
                  ? col.columnDef.header
                  : col.id}
              </MenuItem>
            ))}
          </Menu>
        </Dropdown>

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
          >
            <Icon name="upload" size={13} />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hidden md:inline-flex"
            onClick={() => router.push(`/my-task/${userId}/product/import`)}
          >
            <Icon
              name="upload"
              size={13}
              style={{ transform: "rotate(180deg)" }}
            />
            Import
          </Button>
          <Button
            variant="gradient"
            size="sm"
            onClick={() => router.push(`/my-task/${userId}/product/create`)}
          >
            <Icon name="plus" size={13} />
            Add Product
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-muted/50">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.04em] whitespace-nowrap border-b border-border"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {productState.data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length}>
                    <EmptyState
                      icon={<Icon name="package" size={28} />}
                      title="No products found"
                      description="Try adjusting your search or add a new product."
                      action={
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onSearch("")}
                        >
                          Clear search
                        </Button>
                      }
                    />
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors duration-150"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 whitespace-nowrap">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Skeleton while no data but total > 0 */}
      {productState.data.length === 0 && productState.total > 0 && (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      )}

      {/* Pagination */}
      {productState.total > itemsPerPage && (
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <strong className="text-foreground">
              {(currentPage - 1) * itemsPerPage + 1}–
              {Math.min(currentPage * itemsPerPage, productState.total)}
            </strong>{" "}
            of{" "}
            <strong className="text-foreground">{productState.total}</strong>{" "}
            products
          </p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Rows per page</span>
              <select
                value={itemsPerPage}
                onChange={(e) => handleChangeLimit(Number(e.target.value))}
                className="h-8 px-2 rounded-lg border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-halo-violet"
              >
                {[10, 20, 30].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onChange={handleChangePage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default withMyTask(ProductPage);
