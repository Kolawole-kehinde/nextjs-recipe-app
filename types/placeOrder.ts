
export interface OrderItemPayload {
  id: string;       
  name: string;     
  price: number;
  quantity: number;
}

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
