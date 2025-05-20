import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";

import { useState } from "react";

export const useListManagement = ({
  onChangeLimit,
  onExport,
}: {
  onChangeLimit: (limit: number) => void;
  onExport: () => Promise<any>;
}) => {
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const handleChangeLimit = (limit: number) => {
    setItemsPerPage(limit);
    onChangeLimit(limit);
  };
  const handleSearch = () => {};

  return {
    handleChangeLimit,
    handleSearch,
    onSearch: setSearch,
    onShowHideCols: setColumnVisibility,
    itemsPerPage,
    columnVisibility,
    sorting,
    search,
  };
};
