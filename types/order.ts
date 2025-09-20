export interface Product {
  id: string;
  name: string;
  price: number;
  image_url?: string;
}

export interface OrderItem {
  id: string;
  quantity: number;
  products: Product;
}

export interface Order {
  id: string;
  created_at: string;
  total: number;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  order_items: OrderItem[];
}
