"use client";

import { ChevronDown, Filter, Plus, Upload } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store/store";
import { StyledDropdown } from "@/components/layout/custom/StyledDropdown";
import StyledPagination from "@/components/layout/custom/StyledPagination";
import { StyledTable } from "@/components/layout/custom/StyledTable";
import WrapperContent from "@/components/layout/WrapperContent";
import { getStudentCols } from "./utils/getProductCols";
import productService from "./services/productService";
import { setProduct } from "@/redux/reducer/productReducer";
import { useGetInfoFromPath } from "@/hooks/useGetInfoFromPath";
import { useLanguage } from "@/core/context/LanguageContext";
import { useListProduct } from "./context/ProductListContext";
import withMyTask from "@/components/forms/withMyTask";

const ProductPage = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { products, total } = useListProduct();
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const productState = useSelector((state: RootState) => state.product);
  const { userId } = useGetInfoFromPath();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (productState.length <= 0) {
      dispatch(setProduct(products));
    }
  }, [dispatch, productState.length, products]);

  const menuPagination = [
    { key: 10, label: "10" },
    { key: 20, label: "20" },
    { key: 30, label: "30" },
  ];

  const columns = getStudentCols(userId);
  const handleChangeLimit = (limit: number) => {
    setItemsPerPage(limit);
    productService.getList({ id: userId, limit, offset: 0 }).then((res) => {
      dispatch(setProduct(res.products));
    });
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    productService
      .getList({
        id: userId,
        limit: itemsPerPage,
        offset: itemsPerPage * (page - 1),
      })
      .then((res) => {
        dispatch(setProduct(res.products));
      });
  };

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
                onChange={handleChangeLimit}
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

        <StyledTable data={productState} columns={columns} />

        <StyledPagination
          pageSize={itemsPerPage}
          currentPage={currentPage}
          onChange={handleChangePage}
          total={total}
          styles="!m-0 bg-[hsl(var(--reverse-background))] rounded-bl-lg p-2 rounded-br-lg border-t border-gray-300"
        />
      </div>
    </WrapperContent>
  );
};

export default withMyTask(ProductPage);
