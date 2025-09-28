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




export interface PlaceOrderPayload {
  items: any[];
  subtotal: number;
  shippingInfo: {
    address: string;
    city: string;
    state: string;
    zip_code: string;
  };
  paymentMethod: string;
}

export const placeOrderRequest = async (payload: PlaceOrderPayload) => {
  const res = await api.post("/orders/checkout", payload);
  return res.data;
};
