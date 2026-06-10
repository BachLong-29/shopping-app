"use client";

import { UpComing } from "@/components/design-system/UpComing";
import { useBreadcrumb } from "@/core/context/BreadcrumbContext";
import { useEffect } from "react";
import { useLanguage } from "@/core/context/LanguageContext";
import withMyTask from "@/components/forms/withMyTask";

const CategoryPage = () => {
  const { setBreadcrumb } = useBreadcrumb();
  const { t } = useLanguage();

  useEffect(() => {
    setBreadcrumb([{ label: t("module.category") }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UpComing
      title="Browse Categories"
      description="Explore a fully organized product catalog with smart filters, trending picks, and curated collections — all in one place."
      features={[
        "50+ categories",
        "Smart filters",
        "Trending picks",
        "Curated collections",
        "Sub-categories",
        "Category analytics",
      ]}
      badge="Coming Soon"
      accentColor="violet"
    />
  );
};

export default withMyTask(CategoryPage);
