"use client";

import WrapperTable, {
  WrapperTableType,
} from "@/components/layout/section/WrapperTable";
import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ExportButton from "@/components/layout/export/ExportButton";
import ImportButton from "@/components/layout/import/ImportButton";
import { RootState } from "@/redux/store/store";
import StyledPagination from "@/components/layout/custom/StyledPagination";
import { StyledTable } from "@/components/layout/custom/StyledTable";
import WrapperContent from "@/components/layout/section/WrapperContent";
import { getStudentCols } from "../utils/getProductCols";
import { menuPagination } from "@/core/utils/pagination";
import productService from "../services/productService";
import { setProduct } from "@/redux/reducer/productReducer";
import { useLanguage } from "@/core/context/LanguageContext";
import { useListProduct } from "../context/ProductListContext";
import { useRouter } from "next/navigation";
import withMyTask from "@/components/forms/withMyTask";

const ProductPage = ({ params }: { params: Promise<{ user_id: string }> }) => {
  const { t } = useLanguage();
  const { user_id: userId } = use(params);
  const { products, total } = useListProduct();
  const router = useRouter();
  const dispatch = useDispatch();
  const productState = useSelector((state: RootState) => state.product);
  const columns = getStudentCols(userId);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  // const [filter, setFilter] = useState("");

  const handleChangeLimit = (limit: number) => {
    setItemsPerPage(limit);
    productService
      .getList({ id: userId, limit, offset: 0, search })
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

  useEffect(() => {
    if (productState.total <= 0) {
      dispatch(setProduct({ data: products, total }));
    }
  }, [dispatch, productState.total, products, total]);

  const header: WrapperTableType = {
    search: {
      placeholder: t("action.search"),
      onChange: setSearch,
      styles: "",
      onSearch: handleSearch,
    },
    showing: {
      menu: menuPagination,
      size: itemsPerPage,
      onChange: handleChangeLimit,
    },
    filter: {},
    create: {
      title: "Add New Product",
      onClick: () => router.push(`/my-task/${userId}/product/create`),
    },
    exportCSV: {
      title: "Export",
      onExport: handleExport,
    },
    tools: {
      menu: [
        {
          key: "export",
          label: <ExportButton exportExec={handleExport} />,
        },
        {
          key: "import",
          label: (
            <ImportButton
              onClick={() => router.push(`/my-task/${userId}/product/import`)}
            />
          ),
        },
      ],
    },
  };

  return (
    <WrapperContent>
      <div className="space-y-4 p-6">
        <WrapperTable {...header}>
          <StyledTable data={productState.data} columns={columns} />
          <StyledPagination
            pageSize={itemsPerPage}
            currentPage={currentPage}
            onChange={handleChangePage}
            total={productState.total}
            styles="!m-0 bg-[hsl(var(--reverse-background))] rounded-bl-lg p-2 rounded-br-lg border border-gray-300"
          />
        </WrapperTable>
      </div>
    </WrapperContent>
  );
};

export default withMyTask(ProductPage);
