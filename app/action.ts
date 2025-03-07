"use server";

import profileService from "./my-task/[user_id]/profile/services/profileService";

export async function getProfile(id: string) {
  const userInfo = await profileService.getProfile(id);

  return userInfo;
}
