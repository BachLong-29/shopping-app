"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { use, useEffect } from "react";

import { ProductStatus } from "@/core/model/Product";
import ProductForm, { ProductFormData } from "../../../component/ProductForm";
import { editProduct } from "@/redux/reducer/productReducer";
import productService from "../../../services/productService";
import { useBreadcrumb } from "@/core/context/BreadcrumbContext";
import { useDispatch } from "react-redux";
import { useFetch } from "@/hooks/useFetch";
import { useLanguage } from "@/core/context/LanguageContext";
import { useProductDetail } from "../../../context/ProductDetailContext";
import { useRouter } from "next/navigation";
import withMyTask from "@/components/forms/withMyTask";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const productSchema = z.object({
  name: z.string().min(1, { message: "Tên là bắt buộc" }),
  price: z.preprocess(
    (v) => (v === "" ? undefined : Number(v)),
    z.number().min(0, { message: "Giá là bắt buộc" })
  ),
  description: z.optional(z.string()),
  quantity: z.number(),
  category: z.optional(z.string()),
  sku: z.optional(z.string()),
  images: z.optional(z.array(z.string())),
  status: z.optional(z.nativeEnum(ProductStatus)),
});

const EditProductPage = ({
  params,
}: {
  params: Promise<{ user_id: string; id: string }>;
}) => {
  const { product } = useProductDetail();
  const { user_id: userId, id: productId } = use(params);
  const { t } = useLanguage();
  const router = useRouter();
  const dispatch = useDispatch();
  const { setBreadcrumb } = useBreadcrumb();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      description: product.description ?? "",
      quantity: product.quantity,
      price: product.price,
      category: product.category ?? "",
      sku: product.sku ?? "",
      images: product.images ?? [],
      status: product.status ?? ProductStatus.Draft,
    },
  });

  const { loading, fetchData: execEdit } = useFetch(
    (req: ProductFormData & { userId: string; productId: string }) =>
      productService.editProduct(req)
  );

  const onSubmit: SubmitHandler<ProductFormData> = (data) => {
    execEdit({ ...data, userId, productId })
      .then((res) => {
        if (res?.product) {
          dispatch(editProduct(res.product));
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
      { label: t("module.product"), href: `/my-task/${userId}/product` },
      { label: t("breadcrumb.edit_product") },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="p-3 md:p-6">
        <ProductForm
          form={form}
          isNew={false}
          productId={productId}
          userId={userId}
          loading={loading}
          onSave={() => form.handleSubmit(onSubmit)()}
          onCancel={() => router.back()}
        />
      </div>
      <Toaster position="top-right" />
    </>
  );
};

export default withMyTask(EditProductPage);
