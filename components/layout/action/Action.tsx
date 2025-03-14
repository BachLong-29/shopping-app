import { ItemMenuType, StyledDropdown } from "../custom/StyledDropdown";

import { Ellipsis } from "lucide-react";

const Action = ({
  menu,
  handleAction,
}: {
  menu: ItemMenuType[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleAction?: any;
}) => {
  return (
    <StyledDropdown onChange={handleAction} menu={menu}>
      <Ellipsis className="cursor-pointer" />
    </StyledDropdown>
  );
};

export default Action;
