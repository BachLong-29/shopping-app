"use client";

import React, { useEffect } from "react";

import WrapperContent from "@/components/layout/section/WrapperContent";
import { UpComing } from "@/components/design-system/UpComing";
import { useBreadcrumb } from "@/core/context/BreadcrumbContext";
import { useLanguage } from "@/core/context/LanguageContext";
import withMyTask from "@/components/forms/withMyTask";
import AddressSection from "./component/AddressSection";

const SettingsPage = () => {
  const { setBreadcrumb } = useBreadcrumb();
  const { t } = useLanguage();

  useEffect(() => {
    setBreadcrumb([{ label: t("module.settings") }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col">
      {/* <WrapperContent>
        <AddressSection />
      </WrapperContent> */}

      <UpComing
        title="Advanced Settings"
        description="Security controls, notification preferences, privacy options, and connected apps are all on the way to give you full control of your account."
        features={[
          "Security & 2FA",
          "Notification center",
          "Privacy controls",
          "Theme preferences",
          "Connected apps",
          "Data export",
        ]}
        badge="Coming Soon"
        accentColor="sky"
      />
    </div>
  );
};

export default withMyTask(SettingsPage);
