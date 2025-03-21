import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { ProductFormData } from "../(routes)/create/page";
import Uploader from "@/components/layout/upload/Uploader";
import { UseFormReturn } from "react-hook-form";
import { useLanguage } from "@/core/context/LanguageContext";

interface Props {
  form: UseFormReturn<ProductFormData>;
}
const ProductForm: React.FC<Props> = (props) => {
  const { form } = props;
  const { t } = useLanguage();
  return (
    <Form {...form}>
      <form className="w-full">
        <div className="flex flex-col items-start">
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => {
              return (
                <FormItem className="mt-4">
                  <FormLabel>{t("product.images")}</FormLabel>
                  <FormControl>
                    <Uploader
                      rounded="md"
                      size={40}
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                      isMultiple
                      value={field.value ?? []}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <div className="space-y-4 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>{t("product.name")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("product.placeholder.name")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>{t("product.price")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("product.placeholder.price")}
                    {...field}
                    onChange={(e) => {
                      let value = e.target.value;

                      // Chỉ cho phép số và dấu chấm
                      value = value.replace(/[^0-9.]/g, "");

                      // Ngăn chặn nhiều dấu chấm
                      const parts = value.split(".");
                      if (parts.length > 2) {
                        value = parts[0] + "." + parts.slice(1).join("");
                      }

                      field.onChange(value); // Giữ dạng string để không mất dấu `.`
                    }}
                    onBlur={() => {
                      // Ép kiểu về số khi blur khỏi input
                      const parsedValue = parseFloat(field.value.toString());
                      field.onChange(isNaN(parsedValue) ? 0 : parsedValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>{t("product.description")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("product.placeholder.description")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>{t("product.quantity")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("product.placeholder.quantity")}
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      const numberValue = value.replace(/\D/g, ""); // Chỉ cho phép nhập số
                      field.onChange(Number(numberValue));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>{t("product.category")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("product.placeholder.category")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
