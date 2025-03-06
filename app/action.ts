"use server";

import profileService from "./my-task/[id]/profile/services/profileService";

export async function getProfile(id: string) {
  const userInfo = await profileService.getProfile(id);

  return userInfo;
}
