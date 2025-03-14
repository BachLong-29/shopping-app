import { Pencil, Trash2, View } from "lucide-react";

import Action from "@/components/layout/action/Action";
import { ActionType } from "@/core/utils/actionType";
import React from "react";
import { deleteProduct } from "@/redux/reducer/productReducer";
import productService from "../services/productService";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

interface IProps {
  userId: string;
  productId: string;
}

const ProductAction = ({ userId, productId }: IProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleDeleteProduct = () => {
    productService.deleteProduct({ userId, productId }).then(() => {
      dispatch(deleteProduct(productId));
    });
  };
  return (
    <Action
      menu={[
        {
          key: ActionType.View,
          label: "View",
          icon: <View />,
          action: () => router.push(`/my-task/${userId}/product/${productId}`),
        },
        {
          key: ActionType.Edit,
          label: "Edit",
          icon: <Pencil />,
          action: () =>
            router.push(`/my-task/${userId}/product/${productId}/edit`),
        },
        {
          key: ActionType.Delete,
          label: "Delete",
          icon: <Trash2 />,
          action: () => handleDeleteProduct(),
        },
      ]}
    />
  );
};

export default ProductAction;
