import HttpService from "./httpService";

interface ShippingAddress {
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  state?: string;
  postal?: string;
  country?: string;
  paymentMethod?: string;
}

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
    products: { product: string; quantity: number }[];
    shippingAddress?: ShippingAddress;
  }) {
    const { userId, amount, products, sellerId, shippingAddress } = req;
    return await this.post(`/api/${userId}/payment`, {
      amount,
      products,
      sellerId,
      currency: "VND",
      shippingAddress,
      paymentMethod: shippingAddress?.paymentMethod ?? "cod",
    });
  }
}

const paymentService = new PaymentService();

export default paymentService;
