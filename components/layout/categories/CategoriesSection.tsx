"use client";

import CategoriesCard from "./CategoriesCard";
import { Plus } from "lucide-react";
import Section from "../section/Section";
import { useLanguage } from "@/core/context/LanguageContext";

const CategoriesSection = ({
  data,
}: {
  data: { id: string; name: string; image: string }[];
}) => {
  const { t } = useLanguage();

  return (
    <div>
      <Section title={t("general.category")}>
        <div className="grid grid-cols-3 md:grid-cols-8 gap-4">
          {data.map((category) => (
            <CategoriesCard category={category} key={category.id} />
          ))}
          <div className="flex flex-col items-center justify-center p-4 bg-gray-100 text-black rounded-lg shadow-md cursor-pointer">
            <Plus size={24} />
            <span className="mt-2 text-sm font-medium">
              {t("general.see_more")}
            </span>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default CategoriesSection;
