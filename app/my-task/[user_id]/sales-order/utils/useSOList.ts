import { SortingState, VisibilityState } from "@tanstack/react-table";

import salesOrderService from "../services/salesOrdertService";
import { setProduct } from "@/redux/reducer/productReducer";
import { setSOList } from "@/redux/reducer/salesOrderReducer";
import { useDispatch } from "react-redux";
import { useState } from "react";

export const useSOList = ({ userId }: { userId: string }) => {
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // const [filter, setFilter] = useState("");
  const dispatch = useDispatch();

  const handleChangeLimit = (limit: number) => {
    setItemsPerPage(limit);
    salesOrderService
      .getList({ id: userId, limit, offset: 0, search })
      .then((res) => {
        dispatch(setProduct(res));
      });
  };

  const handleSearch = () => {
    salesOrderService
      .getList({
        id: userId,
        limit: itemsPerPage,
        offset: 0,
        search,
      })
      .then((res) => {
        dispatch(setSOList(res));
      });
  };

  const handleExport = () => {
    return salesOrderService.exportSOList({ userId });
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    salesOrderService
      .getList({
        id: userId,
        limit: itemsPerPage,
        offset: itemsPerPage * (page - 1),
        search,
      })
      .then((res) => {
        dispatch(setSOList(res));
      });
  };

  //   const onRowSelection = (row: () => Record<string, boolean>) => {
  //     setRowSelection((prev) => ({
  //       ...prev,
  //       ...row(),
  //     }));
  //   };

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
    onRowSelection: setRowSelection,
  };
};
