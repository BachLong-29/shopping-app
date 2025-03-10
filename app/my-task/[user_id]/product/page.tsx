"use client";

import { ChevronDown, Filter, Plus, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { StyledDropdown } from "@/components/layout/custom/StyledDropdown";
import StyledPagination from "@/components/layout/custom/StyledPagination";
import { StyledTable } from "@/components/layout/custom/StyledTable";
import WrapperContent from "@/components/layout/WrapperContent";
import { getStudentCols } from "./utils/getProductCols";
import { useLanguage } from "@/core/context/LanguageContext";
import { useState } from "react";
import withMyTask from "@/components/forms/withMyTask";

const products = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
    stock: 20,
    status: "Available",
    type: "Electronics",
  },
  {
    id: 2,
    name: "Product 2",
    price: 200,
    stock: 50,
    status: "Out of stock",
    type: "Furniture",
  },
];

const ProductPage = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { t } = useLanguage();

  const menuPagination = [
    { key: 10, label: "10" },
    { key: 20, label: "20" },
    { key: 30, label: "30" },
  ];

  const columns = getStudentCols();

  return (
    <WrapperContent>
      <div className="space-y-4 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">{t("module.product")}</h2>
          <div className="flex items-center space-x-6">
            <div className="flex items-center gap-4">
              <div>Showing</div>
              <StyledDropdown
                menu={menuPagination}
                isCheckbox
                checkedValue={itemsPerPage}
                onChange={setItemsPerPage}
              >
                <Button className="bg-blue-400 hover:bg-blue-500">
                  {itemsPerPage}
                  <ChevronDown />
                </Button>
              </StyledDropdown>
            </div>
            <Button variant="outline">
              <Filter /> Filter
            </Button>
            <Button variant="outline">
              <Upload /> Export
            </Button>
            <Button className="bg-blue-400 hover:bg-blue-500">
              <Plus /> Add New Product
            </Button>
          </div>
        </div>

        <StyledTable data={products} columns={columns} />

        <StyledPagination
          pageSize={itemsPerPage}
          total={2}
          styles="!m-0 bg-[hsl(var(--reverse-background))] rounded-bl-lg rounded-br-lg border-t border-gray-300"
        />
      </div>
    </WrapperContent>
  );
};

export default withMyTask(ProductPage);
