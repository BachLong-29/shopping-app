import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import ProductAction from "../component/ProductAction";
import ProductStatusTag from "@/components/layout/product/ProductStatusTag";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStudentCols = (userId: string): ColumnDef<any>[] => [
  {
    accessorKey: "name",
    header: "Product Name",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <Link href={`/my-task/${userId}/product/${product._id}`}>
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
        <Link href={`/my-task/${userId}/product/${product._id}`}>
          {row.getValue("product_id")}
        </Link>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
  },

  {
    accessorKey: "quantity",
    header: "Quantity",
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <ProductStatusTag value={row.getValue("status")} />,
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
