import api from "@/lib/api";
import { PlaceOrderPayload } from "@/types/placeOrder";

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


export const placeOrderRequest = async (payload: PlaceOrderPayload) => {
  const res = await api.post("/orders/checkout", payload);
  return res.data;
};
