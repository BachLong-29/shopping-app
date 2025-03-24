import { Pencil, Trash2, View } from "lucide-react";

import Action from "@/components/layout/action/Action";
import { ActionType } from "@/core/utils/actionType";
import { Confirmation } from "@/components/layout/custom/Confirmation";
import { deleteProduct } from "@/redux/reducer/productReducer";
import productService from "../services/productService";
import { useDispatch } from "react-redux";
import { useLanguage } from "@/core/context/LanguageContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IProps {
  userId: string;
  productId: string;
}

const ProductAction = ({ userId, productId }: IProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const [visibale, setVisible] = useState(false);
  const handleDeleteProduct = () => {
    productService.deleteProduct({ userId, productId }).then(() => {
      dispatch(deleteProduct(productId));
    });
  };
  return (
    <>
      <Action
        menu={[
          {
            key: ActionType.View,
            label: t("action.view"),
            icon: <View />,
            action: () =>
              router.push(`/my-task/${userId}/product/${productId}`),
          },
          {
            key: ActionType.Edit,
            label: t("action.edit"),
            icon: <Pencil />,
            action: () =>
              router.push(`/my-task/${userId}/product/${productId}/edit`),
          },
          {
            key: ActionType.Delete,
            label: t("action.delete"),
            icon: <Trash2 />,
            action: () => setVisible(true),
          },
        ]}
      />
      <Confirmation
        open={visibale}
        onConfirm={handleDeleteProduct}
        onCancel={() => setVisible(false)}
        content={t("product.message.confirm_delete")}
      />
    </>
  );
};

export default ProductAction;
