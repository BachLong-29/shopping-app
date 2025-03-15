import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Gender } from "@/core/model/User";
import { Input } from "../ui/input";
import Uploader from "../layout/upload/Uploader";
import { UseFormReturn } from "react-hook-form";
import { UserFormData } from "@/app/my-task/[user_id]/profile/(routes)/edit/page";
import { useLanguage } from "@/core/context/LanguageContext";

interface Props {
  form: UseFormReturn<UserFormData>;
}
const EditUserForm: React.FC<Props> = (props) => {
  const { form } = props;
  const { t } = useLanguage();

  return (
    <Form {...form}>
      <form className="w-full">
        <div className="flex flex-col items-center">
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => {
              return (
                <FormItem className="mt-4">
                  <FormControl>
                    <Uploader
                      rounded="full"
                      size={40}
                      defaultImage="/images/female-avatar.jpg"
                      onChange={(value) => {
                        field.onChange(value?.[0]);
                      }}
                      value={field.value ? [field.value] : []}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <div className="space-y-4 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>{t("user.info.name")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("user.placeholder.enter_name")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("user.info.email")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("user.placeholder.enter_email")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date of Birth field */}
          <FormField
            control={form.control}
            name="birthdate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("user.info.birthday")}</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    placeholder={t("user.placeholder.select_dob")}
                    value={
                      field.value
                        ? new Date(field.value).toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? new Date(e.target.value) : null
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender field */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("user.info.gender")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t("user.placeholder.select_gender")}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={Gender.Male}>
                      {t("general.male")}
                    </SelectItem>
                    <SelectItem value={Gender.Female}>
                      {t("general.female")}
                    </SelectItem>
                    <SelectItem value={Gender.Other}>
                      {t("general.other")}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address field */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("user.info.address")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("user.placeholder.enter_address")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone field */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("user.info.phone")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("user.placeholder.enter_phone")}
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

export default EditUserForm;
