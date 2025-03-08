"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { setUser, updateUser } from "@/redux/reducer/profileReducer";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import EditUserForm from "@/components/forms/EditUserForm";
import { Gender } from "@/core/model/User";
import Image from "next/image";
import { RootState } from "@/redux/store/store";
import { Toaster } from "@/components/ui/sonner";
import WrapperContent from "@/components/layout/WrapperContent";
import profileService from "../services/profileService";
import { toast } from "sonner";
import { useEffect } from "react";
import { useFetch } from "@/hooks/useFetch";
import { useLanguage } from "@/core/context/LanguageContext";
import { useProfile } from "../context/ProfileContext";
import { useRouter } from "next/navigation";
import withMyTask from "@/components/forms/withMyTask";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const userSchema = z.object({
  name: z.string().min(1, { message: "Tên là bắt buộc" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  dob: z.string().min(1, { message: "Ngày sinh là bắt buộc" }),
  gender: z.string().min(1, { message: "Giới tính là bắt buộc" }),
  address: z.string().min(1, { message: "Địa chỉ là bắt buộc" }),
  phone: z
    .string()
    .min(1, { message: "Số điện thoại là bắt buộc" })
    .regex(/^[0-9]{10}$/, { message: "Số điện thoại phải có 10 chữ số" }),
});

export type UserFormData = {
  name: string;
  email: string;
  dob: string;
  gender: string;
  address: string;
  phone: string;
};

const ProfilePage = () => {
  const profile = useProfile();
  const profileState = useSelector((state: RootState) => state.profile);
  const userId = profileState._id;
  const initialValues = {
    email: profileState.email || profile.email,
    name: profileState.name || profile.name,
    address: profileState.address || profile.address,
    dob: (profileState.birthdate as string) || (profile.birthdate as string),
    gender: profileState.gender || profile.gender,
    phone: profileState.phone || profile.phone,
  };
  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: initialValues,
  });
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const router = useRouter();
  const { loading, fetchData: editProfile } = useFetch(
    (req: {
      id: string;
      name: string;
      birthdate: string;
      address: string;
      gender: string;
      phone: string;
    }) => profileService.editUserProfile(req)
  );

  const onSubmit: SubmitHandler<UserFormData> = (data) => {
    console.log(data);
    editProfile({
      ...data,
      birthdate: data.dob,
      id: userId,
    })
      .then(() => {
        dispatch(
          updateUser({
            ...data,
            gender: data.gender as Gender,
            birthdate: data.dob,
            id: userId,
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
    if (!profileState.id) {
      dispatch(setUser(profile));
    }
  }, [profile, dispatch, profileState.id]);

  return (
    <>
      <WrapperContent>
        <div className="flex flex-col items-center">
          <Image
            src="/images/default-avatar.jpg"
            alt="User Avatar"
            width={165}
            height={165}
            className="rounded-full border"
          />
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
