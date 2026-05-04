import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { MapPinHouse } from "lucide-react";

import { useLanguage } from "@/core/context/LanguageContext";
interface IProps {}

const AddressSection = ({}: IProps) => {
  const { t } = useLanguage();
  return (
    <div className="flex w-full flex-col gap-6">
      <Item variant="outline">
        <ItemMedia>
          <MapPinHouse color="#000000" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{t("user.info.address")}</ItemTitle>
          <ItemDescription>291/66 Truong chinh</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button
            size="sm"
            variant="outline"
            className="rounded-md"
            aria-label="Invite"
          >
            {t("action.edit")}
          </Button>
        </ItemActions>
      </Item>
    </div>
  );
};

export default AddressSection;
