import HttpService from "@/core/services/httpService";
import { SalesOrder, SalesOrderStatus } from "@/core/model/SO";

export type SOFormData = {
  status: SalesOrderStatus;
  notes?: string;
  totalAmount?: number;
};

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
  }): Promise<{ data: SalesOrder[]; total: number }> {
    return this.post(`/api/${id}/sales-order/search`, {
      offset,
      limit,
      search,
    });
  }

  getDetail({
    userId,
    orderId,
  }: {
    userId: string;
    orderId: string;
  }): Promise<{ salesOrder: SalesOrder }> {
    return this.get(`/api/${userId}/sales-order/${orderId}`, {});
  }

  createSalesOrder({
    userId,
    ...data
  }: SOFormData & { userId: string }): Promise<{ salesOrder: SalesOrder }> {
    return this.post(`/api/${userId}/sales-order/create`, { ...data });
  }

  editSalesOrder({
    userId,
    orderId,
    ...data
  }: SOFormData & { userId: string; orderId: string }): Promise<{
    salesOrder: SalesOrder;
  }> {
    return this.put(`/api/${userId}/sales-order/${orderId}`, { ...data });
  }

  exportSOList({ userId }: { userId: string }) {
    return this.get(`/api/${userId}/sales-order/export`, {});
  }
}

const salesOrderService = new SalesOrderService();

export default salesOrderService;
