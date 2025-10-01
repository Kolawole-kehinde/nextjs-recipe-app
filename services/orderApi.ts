import api from "@/lib/api";
import { PlaceOrderPayload } from "@/types/placeOrder";

// ✅ Cancel order
export const cancelOrder = async (orderId: string) => {
  const res = await api.patch(`/orders/${orderId}`);
  return res.data.order; 
};

// ✅ Fetch orders
export const fetchOrders = async () => {
  const res = await api.get("/orders");
  return res.data;
};


// Place order
export const placeOrderRequest = async (payload: PlaceOrderPayload) => {
  const res = await api.post("/orders/checkout", payload);
  return res.data;
};
