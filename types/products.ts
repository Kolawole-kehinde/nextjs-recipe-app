
export interface Product {
  id: string | number;
  name: string;
  price: number;
  image_url?: string;    
  description?: string; 
  [key: string]: any;    
}


export type FoodItemProps = {
  id: string | number;
  name: string;
  price: number;
  image_url: string;
  description: string;
};



interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
}

interface Order {
  id: string;
  order_status: "pending" | "processing" | "completed" | "cancelled";
  created_at: string;
  order_items: OrderItem[];
}