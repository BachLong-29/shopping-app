import HttpService from "@/core/services/httpService";
import { Product } from "@/core/model/Product";
import { ProductFormData } from "../(routes)/create/page";

class ProductService extends HttpService {
  getList({
    id,
    offset,
    limit,
    search,
  }: {
    id: string;
    offset: number;
    limit: number;
    search?: string;
  }): Promise<{ data: Product[]; total: number }> {
    return this.post(`/api/${id}/products`, { offset, limit, search });
  }

  exportProduct({
    userId,
  }: {
    userId?: string;
    offset?: number;
    limit?: number;
    search?: string;
  }) {
    return this.get(`/api/${userId}/products/export-product`, {});
  }

  createProduct({
    userId,
    ...data
  }: ProductFormData & { userId: string }): Promise<{
    product: Product;
  }> {
    return this.post(`/api/${userId}/products/create`, { ...data });
  }

  editProduct({
    userId,
    ...data
  }: ProductFormData & { userId: string; productId: string }): Promise<{
    product: Product;
  }> {
    return this.put(`/api/${userId}/products/${data.productId}`, { ...data });
  }

  deleteProduct({ userId, productId }: { userId: string; productId: string }) {
    return this.delete(`/api/${userId}/products/${productId}`);
  }

  async getProductDetail({
    userId,
    productId,
  }: {
    userId: string;
    productId: string;
  }): Promise<Product> {
    const res = await this.get(`/api/${userId}/products/${productId}`, {});
    return res.product;
  }

  async getProductDetailFromMKP({
    productId,
  }: {
    productId: string;
  }): Promise<Product> {
    const res = await this.get(`/api/product/${productId}`, {});
    return res.product;
  }

  getProductsMKP({
    category,
    minPrice,
    maxPrice,
    sortBy,
    order,
    page,
    limit,
  }: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    order?: "asc" | "desc";
    page: number;
    limit: number;
  }) {
    const params = new URLSearchParams({
      category: category || "",
      minPrice: minPrice?.toString() || "",
      maxPrice: maxPrice?.toString() || "",
      sortBy: sortBy || "createdAt",
      order: order || "desc",
      page: page?.toString() || "1",
      limit: limit?.toString() || "10",
    });
    // Xóa param trống để tránh lỗi API
    params.forEach((value, key) => {
      if (!value) params.delete(key);
    });
    return this.get(`/api/product?${params.toString()}`, {});
  }
}

const productService = new ProductService();

export default productService;
