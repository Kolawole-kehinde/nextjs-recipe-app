export interface Product {
  id: string;
  name: string;
  price: number;
  [key: string]: any;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  image?: string;
}

export interface BuyNowItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}
