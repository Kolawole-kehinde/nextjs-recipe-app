// Each item in the cart/order
export interface OrderItemPayload {
  id: string;          // product_id from DB
  name: string;        // product_name
  price: number;
  quantity: number;
}

// Payload for placing an order
export interface PlaceOrderPayload {
  items: OrderItemPayload[];
  totalPrice: number;
  paymentMethod: "card" | "paypal" | "cod";
  shippingInfo: {
    address: string;
    city: string;
    state: string;
    zip_code: string;
    phone: string;
  };
}
