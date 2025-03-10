import HttpService from "@/core/services/httpService";
import { Product } from "@/core/model/Product";

class ProductService extends HttpService {
  getList({
    id,
    offset,
  }: {
    id: string;
    offset: number;
  }): Promise<{ products: Product[]; total: number }> {
    return this.post(`/api/${id}/products`, { offset });
  }
}

const productService = new ProductService();

export default productService;
