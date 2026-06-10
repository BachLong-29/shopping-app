import { SortingState, VisibilityState } from "@tanstack/react-table";

import purchaseOrderService from "../services/purchaseOrdertService";
import { setPOList } from "@/redux/reducer/purchaseOrderReducer";
import { useDispatch } from "react-redux";
import { useState } from "react";

export const usePPOList = ({ userId }: { userId: string }) => {
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const dispatch = useDispatch();

  const handleChangeLimit = (limit: number) => {
    setItemsPerPage(limit);
    purchaseOrderService
      .getList({ id: userId, limit, offset: 0, search })
      .then((res) => dispatch(setPOList(res)));
  };

  const handleSearch = () => {
    purchaseOrderService
      .getList({ id: userId, limit: itemsPerPage, offset: 0, search })
      .then((res) => dispatch(setPOList(res)));
  };

  const handleExport = () => {
    return purchaseOrderService.exportSOList({ userId });
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    purchaseOrderService
      .getList({
        id: userId,
        limit: itemsPerPage,
        offset: itemsPerPage * (page - 1),
        search,
      })
      .then((res) => dispatch(setPOList(res)));
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
    onRowSelection: setRowSelection,
  };
};
