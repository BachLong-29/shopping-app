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
}

const productService = new ProductService();

export default productService;
