"use client";

import WrapperContent from "@/components/layout/section/WrapperContent";
import { useBreadcrumb } from "@/core/context/BreadcrumbContext";
import { useEffect } from "react";
import { useLanguage } from "@/core/context/LanguageContext";
import withMyTask from "@/components/forms/withMyTask";

const WishlistPage = () => {
  const { setBreadcrumb } = useBreadcrumb();
  const { t } = useLanguage();
  useEffect(() => {
    setBreadcrumb([
      {
        label: t("module.wishlist"),
      },
    ]);
  }, []);
  return <WrapperContent>Wishlist Page</WrapperContent>;
};

export default withMyTask(WishlistPage);
