import api from "@/lib/api";

// fetch orders
export const fetchOrders = async () => {
  const res = await api.get("/orders");
  return res.data;
};

// cancel order
export const cancelOrder = async (orderId: string) => {
  const res = await api.patch(`/orders/${orderId}/cancel`);
  return res.data;
};
