/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { JSX, ReactNode } from "react";

type IProps = {
  menu: ItemMenuType[];
  children: ReactNode | JSX.Element;
  title?: string;
  isCheckbox?: boolean;
  checkedValue?: any;
  onChange?: (value: any) => void;
};

export type ItemMenuType = {
  key: string | number;
  label: string | ReactNode;
  shortcut?: string;
  icon?: ReactNode;
  action?: () => void;
};

export function StyledDropdown({
  title,
  menu,
  children,
  isCheckbox = false,
  checkedValue,
  onChange,
}: IProps) {
  if (menu.length <= 0) {
    return <></>;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-auto">
        {title && (
          <>
            <DropdownMenuLabel>{title}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        {menu.map((item, index) => (
          <div key={item.key}>
            {isCheckbox ? (
              <DropdownMenuCheckboxItem
                onCheckedChange={() => onChange && onChange(item.key)}
                checked={checkedValue === item.key}
                className="cursor-pointer"
              >
                {item.label}
                {item?.shortcut ? (
                  <DropdownMenuShortcut>{item?.shortcut}</DropdownMenuShortcut>
                ) : (
                  <></>
                )}
              </DropdownMenuCheckboxItem>
            ) : (
              <DropdownMenuItem
                onClick={() =>
                  onChange ? onChange(item.key) : item.action && item?.action()
                }
                className="cursor-pointer gap-4"
              >
                {item.icon}
                {item.label}
                {item?.shortcut ? (
                  <DropdownMenuShortcut>{item?.shortcut}</DropdownMenuShortcut>
                ) : (
                  <></>
                )}
              </DropdownMenuItem>
            )}
            {menu.length - 1 > index && <DropdownMenuSeparator />}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
