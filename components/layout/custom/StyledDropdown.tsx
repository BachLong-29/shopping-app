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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkedValue?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any) => void;
};

export type ItemMenuType = {
  key: string | number;
  label: string;
  shortcut?: string;
  // children?: ItemMenuType[];
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
                onCheckedChange={() => onChange(item.key)}
                checked={checkedValue === item.key}
              >
                {item.label}
                {item?.shortcut ? (
                  <DropdownMenuShortcut>{item?.shortcut}</DropdownMenuShortcut>
                ) : (
                  <></>
                )}
              </DropdownMenuCheckboxItem>
            ) : (
              <DropdownMenuItem onClick={() => onChange(item.key)}>
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
