import PurchaseOrderList from "../component/PurchaseOrderList";
import purchaseOrderService from "../services/purchaseOrdertService";

const Page = async ({ params }: { params: Promise<{ user_id: string }> }) => {
  const resolvedParams = await params;
  const userId = resolvedParams.user_id;

  const salesOrders = await purchaseOrderService.getList({
    id: userId,
    limit: 10,
    offset: 0,
    search: "",
  });
  return (
    <PurchaseOrderList
      purchaseOrders={salesOrders.data}
      total={salesOrders.total}
      userId={userId}
    />
  );
};

export default Page;
