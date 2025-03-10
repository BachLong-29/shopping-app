import { ActionType } from "@/core/utils/actionType";
import { ColumnType } from "@/components/layout/custom/StyledTable";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import ProductStatusTag from "@/components/layout/product/ProductStatusTag";
import { StyledDropdown } from "@/components/layout/custom/StyledDropdown";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStudentCols = (userId: string): ColumnType<any>[] => [
  {
    title: "Product Name",
    key: "name",
    render: (value, record) => {
      console.log({ record });
      return (
        <Link href={`/my-task/${userId}/product/${record.product_id}`}>
          {value}
        </Link>
      );
    },
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
    render: (value) => {
      return <ProductStatusTag value={value} />;
    },
  },
  {
    title: "Action",
    key: "action",
    render: () => {
      return (
        <StyledDropdown
          onChange={(action: ActionType) => {
            console.log({ action });
          }}
          menu={[
            {
              key: ActionType.View,
              label: "View",
            },
            {
              key: ActionType.Edit,
              label: "Edit",
            },
            {
              key: ActionType.Delete,
              label: "Delete",
            },
          ]}
        >
          <Ellipsis className="cursor-pointer" />
        </StyledDropdown>
      );
    },
  },
];
