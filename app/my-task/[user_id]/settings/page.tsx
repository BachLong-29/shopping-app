"use client";

import React, { useEffect } from "react";

import WrapperContent from "@/components/layout/section/WrapperContent";
import { useBreadcrumb } from "@/core/context/BreadcrumbContext";
import { useLanguage } from "@/core/context/LanguageContext";
import withMyTask from "@/components/forms/withMyTask";
import AddressSection from "./component/AddressSection";

const SettingsPage = () => {
  const { setBreadcrumb } = useBreadcrumb();
  const { t } = useLanguage();
  useEffect(() => {
    setBreadcrumb([
      {
        label: t("module.settings"),
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <WrapperContent>
      <AddressSection />
    </WrapperContent>
  );
};

export default withMyTask(SettingsPage);
