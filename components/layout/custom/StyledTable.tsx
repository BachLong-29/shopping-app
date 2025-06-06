import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ArrowDownUp } from "lucide-react";
import { ReactNode } from "react";

export type ColumnType<T> = {
  title: string;
  key: keyof T | "action";
  render?: (value?: T[keyof T], record?: T) => ReactNode;
};

export type TableProps<T> = {
  data: T[];
  columns: ColumnType<T>[];
};

export function StyledTable<T extends object>({
  data,
  columns,
}: TableProps<T>) {
  return (
    <div className="max-h-[65vh] overflow-y-auto rounded-tl-lg rounded-tr-lg border-x border-t">
      <Table className="w-full bg-[hsl(var(--reverse-background))]">
        <TableHeader className="bg-[hsl(var(--reverse-background))] sticky top-0 z-10 shadow-md">
          <TableRow className="border-b border-gray-300">
            {columns.map((col) => (
              <TableCell
                key={col.key as string}
                className={`px-4 py-2 font-semibold border-gray-300 ${
                  col.key !== "action" ? "cursor-pointer" : ""
                }`}
                onClick={() => console.log(col.key)}
              >
                <div className="flex gap-2 items-center">
                  {col.title}
                  {col.key !== "action" && (
                    <ArrowDownUp size={16} className="text-gray-500" />
                  )}
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={item["_id" as keyof T] as string}
              className="border-b border-gray-300"
            >
              {columns?.map((col) => (
                <TableCell
                  key={col.key as string}
                  className="px-4 py-2 border-gray-300"
                >
                  {col?.render
                    ? col.render(
                        col.key === "action" ? undefined : item[col.key],
                        item
                      )
                    : (item[col.key as keyof T] as ReactNode)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
