import { SortingState, VisibilityState } from "@tanstack/react-table";

import productService from "../services/productService";
import { setProduct } from "@/redux/reducer/productReducer";
import { useDispatch } from "react-redux";
import { useState } from "react";

export const useProductList = ({ userId }: { userId: string }) => {
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  // const [filter, setFilter] = useState("");
  // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const dispatch = useDispatch();

  const handleChangeLimit = (limit: number) => {
    setItemsPerPage(limit);
    productService
      .getList({ id: userId, limit, offset: 0, search })
      .then((res) => {
        dispatch(setProduct(res));
      });
  };
  const handleSearch = () => {
    productService
      .getList({
        id: userId,
        limit: itemsPerPage,
        offset: 0,
        search,
      })
      .then((res) => {
        dispatch(setProduct(res));
      });
  };

  const handleExport = () => {
    return productService.exportProduct({ userId });
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    productService
      .getList({
        id: userId,
        limit: itemsPerPage,
        offset: itemsPerPage * (page - 1),
        search,
      })
      .then((res) => {
        dispatch(setProduct(res));
      });
  };

  return {
    handleChangeLimit,
    handleExport,
    handleSearch,
    onSearch: setSearch,
    onShowHideCols: setColumnVisibility,
    handleChangePage,
    itemsPerPage,
    columnVisibility,
    sorting,
    search,
    currentPage,
    rowSelection,
    onRowChangeSelection: setRowSelection,
  };
};
