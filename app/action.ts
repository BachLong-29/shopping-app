"use server";

import productService from "./my-task/[user_id]/product/services/productService";
import profileService from "./my-task/[user_id]/profile/services/profileService";

export async function getProfile(id: string) {
  const userInfo = await profileService.getProfile(id);
  return userInfo;
}

export async function getListProducts(id: string) {
  const productList = await productService.getList({
    id,
    offset: 10,
    limit: 10,
  });
  return productList;
}
