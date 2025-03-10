import { ActionType } from "@/core/utils/actionType";
import { ColumnType } from "@/components/layout/custom/StyledTable";
import { Ellipsis } from "lucide-react";
import ProductStatusTag from "@/components/layout/product/ProductStatusTag";
import { StyledDropdown } from "@/components/layout/custom/StyledDropdown";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStudentCols = (): ColumnType<any>[] => [
  {
    title: "Product Name",
    key: "name",
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
