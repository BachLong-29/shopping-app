import HttpService from "@/core/services/httpService";

class PurchaseOrderService extends HttpService {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }): Promise<{ data: any[]; total: number }> {
    return this.post(`/api/${id}/purchase-order/search`, {
      offset,
      limit,
      search,
    });
  }

  exportSOList({ userId }: { userId: string }) {
    return this.get(`/api/${userId}/purchase-order/export`, {});
  }
}

const purchaseOrderService = new PurchaseOrderService();

export default purchaseOrderService;
