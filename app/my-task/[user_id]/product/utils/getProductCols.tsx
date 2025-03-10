import { ActionType } from "@/core/utils/actionType";
import { ColumnType } from "@/components/layout/custom/StyledTable";
import { Ellipsis } from "lucide-react";
import { StyledDropdown } from "@/components/layout/custom/StyledDropdown";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStudentCols = (): ColumnType<any>[] => [
  {
    title: "Product Name",
    key: "name",
  },
  {
    title: "Product ID",
    key: "id",
  },
  {
    title: "Price",
    key: "price",
  },
  {
    title: "Stock",
    key: "stock",
  },
  {
    title: "Status",
    key: "status",
    render: (value) => {
      return (
        <span
          className={`px-2 py-1 rounded-full text-white ${
            value === "Available" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {value}
        </span>
      );
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
          //  onChange={handleTriggerAction}
        >
          <Ellipsis />
        </StyledDropdown>
      );
    },
  },
];
