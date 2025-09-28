export interface PlaceOrderPayload {
  items: Array<{ id: string; name: string; price: number; quantity: number }>;
  totalPrice: number;
  shippingInfo: {
    address: string;
    city: string;
    state: string;
    zip_code: string;
  };
  paymentMethod: "card" | "paypal" | "cod";
}
