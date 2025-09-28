interface Product {
  id: string
  name: string
  price: number
  image_url?: string
}

// types/order.ts
export interface OrderItem {
  id: string;
  quantity: number;
  product_id: string;
  product_name: string;
  product: {
    name: string;
    price: number;
    image_url: string;
  };
}

export type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

export interface Order {
  id: string;
  created_at: string;
  order_status: OrderStatus;
  order_items: OrderItem[];
}
