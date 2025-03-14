import { ColumnType } from "@/components/layout/custom/StyledTable";
import Link from "next/link";
import ProductAction from "../component/ProductAction";
import ProductStatusTag from "@/components/layout/product/ProductStatusTag";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStudentCols = (userId: string): ColumnType<any>[] => [
  {
    title: "Product Name",
    key: "name",
    render: (value, record) => (
      <Link href={`/my-task/${userId}/product/${record._id}`}>{value}</Link>
    ),
  },
  {
    title: "Product ID",
    key: "product_id",
  },
  {
    title: "Price",
    key: "price",
  },
  {
    title: "Quantity",
    key: "quantity",
  },
  {
    title: "Status",
    key: "status",
    render: (value) => <ProductStatusTag value={value} />,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <ProductAction productId={record._id} userId={userId} />
    ),
  },
];
