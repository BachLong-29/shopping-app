import HttpService from "@/core/services/httpService";
import { Product } from "@/core/model/Product";

class ProductService extends HttpService {
  getList({
    id,
    offset,
    limit,
  }: {
    id: string;
    offset: number;
    limit: number;
  }): Promise<{ products: Product[]; total: number }> {
    return this.post(`/api/${id}/products`, { offset, limit });
  }
}

const productService = new ProductService();

export default productService;
