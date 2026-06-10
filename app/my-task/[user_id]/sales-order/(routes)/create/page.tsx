"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { use, useEffect } from "react";

import SalesOrderForm from "../../component/SalesOrderForm";
import { SalesOrderStatus } from "@/core/model/SO";
import { createSalesOrder } from "@/redux/reducer/salesOrderReducer";
import salesOrderService, { SOFormData } from "../../services/salesOrdertService";
import { useBreadcrumb } from "@/core/context/BreadcrumbContext";
import { useDispatch } from "react-redux";
import { useFetch } from "@/hooks/useFetch";
import { useLanguage } from "@/core/context/LanguageContext";
import { useRouter } from "next/navigation";
import withMyTask from "@/components/forms/withMyTask";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const soSchema = z.object({
  status: z.nativeEnum(SalesOrderStatus),
  notes: z.optional(z.string()),
  totalAmount: z.optional(z.number().min(0)),
});

const CreateSOPage = ({
  params,
}: {
  params: Promise<{ user_id: string }>;
}) => {
  const { user_id: userId } = use(params);
  const { t } = useLanguage();
  const router = useRouter();
  const dispatch = useDispatch();
  const { setBreadcrumb } = useBreadcrumb();

  const form = useForm<SOFormData>({
    resolver: zodResolver(soSchema),
    defaultValues: {
      status: SalesOrderStatus.Draft,
      notes: "",
      totalAmount: 0,
    },
  });

  const { loading, fetchData: execCreate } = useFetch(
    (req: SOFormData & { userId: string }) =>
      salesOrderService.createSalesOrder(req)
  );

  const onSubmit: SubmitHandler<SOFormData> = (data) => {
    execCreate({ ...data, userId })
      .then((res) => {
        if (res?.salesOrder) {
          dispatch(createSalesOrder(res.salesOrder));
          toast.success("Sales order created", {
            description: "The order has been created successfully.",
            duration: 3000,
          });
          setTimeout(() => {
            router.push(`/my-task/${userId}/sales-order`);
          }, 1000);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    setBreadcrumb([
      { label: t("module.sales_order"), href: `/my-task/${userId}/sales-order` },
      { label: "Create Order" },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="p-3 md:p-6">
        <SalesOrderForm
          form={form}
          isNew
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

export default withMyTask(CreateSOPage);
