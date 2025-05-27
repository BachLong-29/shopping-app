import HttpService from "./httpService";

class PaymentService extends HttpService {
  constructor() {
    super();
  }
  async payment(req: { orderId: string; userId: string }) {
    const { orderId, userId } = req;
    return await this.post(`/api/${userId}/sales-order/${orderId}`, {});
  }
  async checkout(req: {
    userId: string;
    amount: number;
    sellerId: string;
    products: {
      product: string;
      quantity: number;
    }[];
  }) {
    const { userId, amount, products, sellerId } = req;
    return await this.post(`/api/${userId}/payment`, {
      amount,
      products,
      sellerId,
      currency: "VND",
    });
  }
}

const paymentService = new PaymentService();

export default paymentService;
