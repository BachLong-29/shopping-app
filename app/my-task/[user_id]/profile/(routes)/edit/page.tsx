"use client";

import { Gender, UserInfo } from "@/core/model/User";
import { SubmitHandler, useForm } from "react-hook-form";
import { setUser, updateUser } from "@/redux/reducer/profileReducer";
import { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import EditUserForm from "@/components/forms/EditUserForm";
import { RootState } from "@/redux/store/store";
import { Toaster } from "@/components/ui/sonner";
import WrapperContent from "@/components/layout/section/WrapperContent";
import profileService from "../../services/profileService";
import { toast } from "sonner";
import { useBreadcrumb } from "@/core/context/BreadcrumbContext";
import { useFetch } from "@/hooks/useFetch";
import { useLanguage } from "@/core/context/LanguageContext";
import { useProfile } from "../../context/ProfileContext";
import { useRouter } from "next/navigation";
import withMyTask from "@/components/forms/withMyTask";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const userSchema = z.object({
  name: z.string().min(1, { message: "Tên là bắt buộc" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  birthdate: z.preprocess(
    (value) => (value ? new Date(value as string) : undefined),
    z.date({ message: "Ngày sinh không hợp lệ" })
  ),
  gender: z.nativeEnum(Gender, {
    errorMap: () => ({ message: "Giới tính là bắt buộc" }),
  }),
  address: z.string().min(1, { message: "Địa chỉ là bắt buộc" }),
  phone: z
    .string()
    .min(1, { message: "Số điện thoại là bắt buộc" })
    .regex(/^[0-9]{10}$/, { message: "Số điện thoại phải có 10 chữ số" }),
  avatar: z.optional(z.string()),
});

export type UserFormData = Omit<UserInfo, "_id" | "role">;

const ProfilePage = ({ params }: { params: Promise<{ user_id: string }> }) => {
  const { user_id: userId } = use(params);

  const profile = useProfile();
  const profileState = useSelector((state: RootState) => state.profile);
  const userBirthday = profileState.birthdate
    ? new Date(profileState.birthdate)
    : new Date();

  const initialValues = {
    email: profileState.email || profile.email,
    name: profileState.name || profile.name,
    address: profileState.address || profile.address,
    birthdate: userBirthday || profile.birthdate,
    gender: profileState.gender || profile.gender,
    phone: profileState.phone || profile.phone,
    avatar: profileState.avatar || profile.avatar,
  };
  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: initialValues,
  });
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const router = useRouter();
  const { loading, fetchData: editProfile } = useFetch(
    (
      req: UserFormData & {
        id: string;
      }
    ) => profileService.editUserProfile(req)
  );

  const onSubmit: SubmitHandler<UserFormData> = (data) => {
    editProfile({
      ...data,
      id: userId,
    })
      .then(() => {
        dispatch(
          updateUser({
            ...data,
            birthdate: new Date(data.birthdate).toISOString(),
            _id: userId,
          })
        );
        toast.success(t("user.edit.edit_success"), {
          description: (
            <span className="text-gray-500 dark:text-white">
              {t("user.edit.updated_info")}
            </span>
          ),
          duration: 3000,
        });
        setTimeout(() => {
          router.push(`/my-task/${userId}/profile`);
        }, 1000);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (!profileState._id) {
      dispatch(setUser(profile));
    }
  }, [profile, dispatch, profileState._id]);

  // breadcrumb
  const { setBreadcrumb } = useBreadcrumb();
  useEffect(() => {
    console.log("setBreadcrumb");
    setBreadcrumb([
      {
        label: t("module.profile"),
        href: `/my-task/${userId}/profile`,
      },
      {
        label: t("breadcrumb.edit_profile"),
      },
    ]);
  }, []);

  return (
    <>
      <WrapperContent>
        <div className="flex flex-col items-center">
          <EditUserForm form={form} />
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

export default withMyTask(ProfilePage);
