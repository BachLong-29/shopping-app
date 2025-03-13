import HttpService from "@/core/services/httpService";
import { Product } from "@/core/model/Product";

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
}

const productService = new ProductService();

export default productService;
