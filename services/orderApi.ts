import api from "@/lib/api";

// Fetch orders from backend
export const fetchOrders = async () => {
  const res = await api.get("/orders");
  return res.data;
};

// Cancel order (example)
export const cancelOrder = async (orderId: string) => {
  const res = await api.delete(`/orders/${orderId}`);
  return res.data;
};
