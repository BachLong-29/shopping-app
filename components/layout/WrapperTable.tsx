/* eslint-disable @typescript-eslint/no-explicit-any */

import { ChevronDown, Filter, Plus, Search } from "lucide-react";

import { Button } from "../ui/button";
import ExportButton from "./export/ExportButton";
import { Input } from "../ui/input";
import { ReactNode } from "react";
import { StyledDropdown } from "./custom/StyledDropdown";

export interface WrapperTableType {
  search: {
    placeholder: string;
    onChange: (value: string) => void;
    styles: string;
    onSearch: () => void;
  };
  showing: {
    menu: any[];
    size: number;
    onChange: (value: any) => void;
  };
  filter: any;
  exportCSV: {
    title: string;
    onExport: () => Promise<any>;
  };
  create: any;
  tools: any;
}

const WrapperTable = (props: WrapperTableType & { children: ReactNode }) => {
  const { search, showing, children, create, exportCSV, tools } = props;
  return (
    <>
      <div className="flex justify-between items-center mb-4 space-x-6">
        <div className="relative flex items-center w-full">
          <Input
            type="text"
            placeholder={search.placeholder}
            className="w-full pl-4 pr-12 py-2.5 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ height: "32px" }}
            onChange={(e) => search.onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                search.onSearch();
              }
            }}
          />
          <Search
            className="absolute right-4 text-gray-500 cursor-pointer"
            size={20}
            onClick={search.onSearch}
          />
        </div>
        <div className="flex items-center space-x-6">
          <Button variant="outline">
            <Filter /> Filter
          </Button>
          <div className="flex items-center gap-4">
            {/* <div>Showing</div> */}
            <StyledDropdown
              menu={showing.menu}
              isCheckbox
              checkedValue={showing.size}
              onChange={showing.onChange}
            >
              <Button className="bg-blue-400 hover:bg-blue-500">
                {showing.size}
                <ChevronDown />
              </Button>
            </StyledDropdown>
          </div>
          <StyledDropdown menu={tools.menu} onChange={tools.onChange}>
            <Button variant="outline">
              Tools
              <ChevronDown />
            </Button>
          </StyledDropdown>
          {/* {exportCSV && <ExportButton exportExec={exportCSV.onExport} />} */}
          <Button
            className="bg-blue-400 hover:bg-blue-500"
            onClick={create.onClick}
          >
            <Plus /> {create.title}
          </Button>
        </div>
      </div>
      {children}
    </>
  );
};

export default WrapperTable;
