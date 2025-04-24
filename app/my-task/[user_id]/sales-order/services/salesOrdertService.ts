import HttpService from "@/core/services/httpService";

class SalesOrderService extends HttpService {
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
  }): Promise<{ data: any[]; total: number }> {
    return this.post(`/api/${id}/sales-order/search`, {
      offset,
      limit,
      search,
    });
  }
}

const salesOrderService = new SalesOrderService();

export default salesOrderService;
