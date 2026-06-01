import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { Badge } from "@/components/design-system/Badge";
import { ProductStatus } from "@/core/model/Product";
import ProductAction from "../component/ProductAction";

type BadgeVariant =
  | "success"
  | "error"
  | "soft"
  | "outline"
  | "warning"
  | "info";

const statusVariantMap: Record<ProductStatus, BadgeVariant> = {
  [ProductStatus.Available]: "success",
  [ProductStatus.Draft]: "soft",
  [ProductStatus.OutOfStock]: "error",
  [ProductStatus.Inactive]: "outline",
};

const statusLabelMap: Record<ProductStatus, string> = {
  [ProductStatus.Available]: "Available",
  [ProductStatus.Draft]: "Draft",
  [ProductStatus.OutOfStock]: "Out of Stock",
  [ProductStatus.Inactive]: "Inactive",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStudentCols = (userId: string): ColumnDef<any>[] => [
  {
    accessorKey: "name",
    header: "Product Name",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <Link
          href={`/my-task/${userId}/product/${product._id}`}
          className="font-medium hover:underline"
        >
          {row.getValue("name")}
        </Link>
      );
    },
  },
  {
    accessorKey: "product_id",
    header: "Product ID",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <Link
          href={`/my-task/${userId}/product/${product._id}`}
          className="font-mono text-xs text-muted-foreground hover:text-foreground"
        >
          {row.getValue("product_id")}
        </Link>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <span className="font-semibold tabular-nums">
        ${row.getValue<number>("price")}
      </span>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const qty = row.getValue<number>("quantity");
      return (
        <span
          className={
            qty === 0
              ? "text-halo-rose font-semibold"
              : qty < 20
              ? "text-halo-amber font-semibold"
              : "tabular-nums"
          }
        >
          {qty}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<ProductStatus>("status");
      return (
        <Badge variant={statusVariantMap[status] ?? "soft"}>
          {statusLabelMap[status] ?? status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;
      return <ProductAction productId={product._id} userId={userId} />;
    },
  },
];
