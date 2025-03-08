"use client";

import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { RootState } from "@/redux/store/store";
import WrapperContent from "@/components/layout/WrapperContent";
import dayjs from "dayjs";
import { setUser } from "@/redux/reducer/profileReducer";
import { useEffect } from "react";
import { useGetInfoFromPath } from "@/hooks/useGetUserId";
import { useLanguage } from "@/core/context/LanguageContext";
import { useProfile } from "./context/ProfileContext";
import { useRouter } from "next/navigation";
import withMyTask from "@/components/forms/withMyTask";

const ProfilePage = () => {
  const profile = useProfile();
  const { t } = useLanguage();
  const router = useRouter();
  const { userId } = useGetInfoFromPath();
  console.log({ profile });
  const profileState = useSelector((state: RootState) => state.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!profileState.id) {
      dispatch(setUser(profile));
    }
  }, [profile, dispatch]);

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
          <h2 className="text-xl font-semibold mt-2">{profile.name}</h2>

          <div className="space-y-4 w-[50%] flex flex-col mt-4 items-center">
            <div>
              <Label>{`${t("user.info.email")}: `}</Label>
              {profileState.email}
            </div>
            <div>
              <Label>{`${t("user.info.birthday")}: `}</Label>
              {dayjs(profileState.birthdate as string).format("DD/MM/YYYY")}
              {}
            </div>
            <div>
              <Label>{`${t("user.info.gender")}: `}</Label>
              {t(`general.${profileState.gender}`)}
            </div>
            <div>
              <Label>{`${t("user.info.phone")}: `}</Label>
              {profileState.phone}
            </div>
            <div>
              <Label>{`${t("user.info.address")}: `}</Label>
              {profileState.address}
            </div>
          </div>
        </div>
      </WrapperContent>

      <WrapperContent>
        <div className="w-full flex justify-end gap-4">
          <Button
            onClick={() => router.push(`/my-task/${userId}/profile/edit`)}
            className="w-auto bg-blue-500 hover:bg-blue-600"
          >
            {t("action.edit")}
          </Button>
        </div>
      </WrapperContent>
    </>
  );
};

export default withMyTask(ProfilePage);
