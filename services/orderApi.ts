import api from "@/lib/api";
import { PlaceOrderPayload } from "@/types/placeOrder";

// Fetch orders
export const fetchOrders = async () => {
  const res = await api.get("/orders");
  return res.data;
};

// Cancel order
export const cancelOrder = async (orderId: string) => {
  const res = await api.patch(`/orders/${orderId}`);
  return res.data;
};

// Place order
export const placeOrderRequest = async (payload: PlaceOrderPayload) => {
  console.log("📦 Payload being sent:", payload);
  const res = await api.post("/orders/checkout", payload);
  return res.data;
};
