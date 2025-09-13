export interface Product {
  id: string;
  name: string;
  price: number;
  [key: string]: any;
}

export interface CartItem extends Product {
  quantity: number;
}
