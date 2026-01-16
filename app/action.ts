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

export async function getDetailProduct(userId: string, productId: string) {
  const product = await productService.getProductDetail({ userId, productId });
  return product;
}

export async function getDetailProductFromMKP(productId: string) {
  const product = await productService.getProductDetailFromMKP({ productId });
  return product;
}

export async function getProductMKP() {
  const products = await productService.getProductsMKP({
    category: "",
    maxPrice: 1000000,
    minPrice: 100000,
    order: "asc",
    sortBy: "price",
    limit: 15,
    page: 1,
  });
  return products;
}
