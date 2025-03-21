"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { use, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Product } from "@/core/model/Product";
import ProductForm from "../../component/ProductForm";
import WrapperContent from "@/components/layout/section/WrapperContent";
import { createProduct } from "@/redux/reducer/productReducer";
import productService from "../../services/productService";
import { useBreadcrumb } from "@/core/context/BreadcrumbContext";
import { useDispatch } from "react-redux";
import { useFetch } from "@/hooks/useFetch";
import { useLanguage } from "@/core/context/LanguageContext";
import { useRouter } from "next/navigation";
import withMyTask from "@/components/forms/withMyTask";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const productSchema = z.object({
  name: z.string().min(1, { message: "Tên là bắt buộc" }),
  price: z.number().min(1, { message: "Giá là bắt buộc" }),
  description: z.optional(z.string()),
  quantity: z.number(),
  category: z.optional(z.string()),
  images: z.optional(z.array(z.string())),
});

export type ProductFormData = Omit<
  Product,
  "_id" | "productId" | "ownerId" | "status"
>;

const CreateProductPage = ({
  params,
}: {
  params: Promise<{ user_id: string }>;
}) => {
  const { user_id: userId } = use(params);
  const { t } = useLanguage();
  const router = useRouter();
  const dispatch = useDispatch();
  const { setBreadcrumb } = useBreadcrumb();

  const initialValues = {
    name: "",
    description: "",
    quantity: 0,
    price: 0,
    images: [],
  };
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialValues,
  });

  const { loading, fetchData: execCreate } = useFetch(
    (req: ProductFormData & { userId: string }) =>
      productService.createProduct(req)
  );

  const onSubmit: SubmitHandler<ProductFormData> = (data) => {
    execCreate({
      ...data,
      userId,
    })
      .then((res) => {
        if (res?.product) {
          dispatch(createProduct(res.product));
          toast.success(t("user.edit.edit_success"), {
            description: (
              <span className="text-gray-500 dark:text-white">
                {t("user.edit.updated_info")}
              </span>
            ),
            duration: 3000,
          });
          setTimeout(() => {
            router.push(`/my-task/${userId}/product`);
          }, 1000);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    setBreadcrumb([
      {
        label: t("module.product"),
        href: `/my-task/${userId}/product`,
      },
      {
        label: t("breadcrumb.create_product"),
      },
    ]);
  }, []);

  return (
    <>
      <WrapperContent>
        <div className="flex flex-col items-center">
          <ProductForm form={form} />
        </div>
      </WrapperContent>
      <WrapperContent>
        <div className="w-full flex justify-end gap-4">
          <Button
            disabled={loading}
            onClick={() => router.back()}
            className="w-auto bg-gray-400 hover:bg-gray-600"
          >
            {t("action.cancel")}
          </Button>
          <Button
            disabled={loading}
            onClick={form.handleSubmit(onSubmit)}
            className="w-auto bg-blue-500 hover:bg-blue-600"
          >
            {t("action.save")}
          </Button>
        </div>
      </WrapperContent>
      <Toaster position="top-right" />
    </>
  );
};

export default withMyTask(CreateProductPage);
