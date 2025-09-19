export interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
}

export interface OrderItem {
  id: string;
  quantity: number;
  product: Product;
}

export interface Order {
  id: string;
  created_at: string;
  order_status: "pending" | "processing" | "cancelled" | "completed";
  order_items: OrderItem[];
}
