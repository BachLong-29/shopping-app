import CategoriesCard from "./CategoriesCard";
import { Plus } from "lucide-react";
import React from "react";
import Section from "../Section";

const CategoriesSection = ({
  data,
}: {
  data: { id: string; name: string; image: string }[];
}) => {
  return (
    <div>
      <Section title="Categories">
        <div className="grid grid-cols-3 md:grid-cols-8 gap-4">
          {data.map((category) => (
            <CategoriesCard category={category} key={category.id} />
          ))}
          <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer">
            <Plus size={24} />
            <span className="mt-2 text-sm font-medium">More</span>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default CategoriesSection;
