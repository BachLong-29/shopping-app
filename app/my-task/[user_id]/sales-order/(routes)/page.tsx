import SalesOrderList from "../component/SalesOrderList";
import salesOrderService from "../services/salesOrdertService";

const Page = async ({ params }: { params: Promise<{ user_id: string }> }) => {
  const resolvedParams = await params;
  const userId = resolvedParams.user_id;

  const salesOrders = await salesOrderService.getList({
    id: userId,
    limit: 10,
    offset: 0,
    search: "",
  });
  return (
    <SalesOrderList
      salesOrders={salesOrders.data}
      total={salesOrders.total}
      userId={userId}
    />
  );
};

export default Page;
