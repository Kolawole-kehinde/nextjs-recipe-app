interface Product {
  id: string
  name: string
  price: number
  image_url?: string
}

interface OrderItem {
  id: string
  quantity: number
  product_id: string
  product_name: string
  product: Product 
}

export interface Order {
  id: string
  created_at: string
  total: number
  order_status: "processing" | "shipped" | "delivered" | "cancelled" 
  order_items: OrderItem[]
}
