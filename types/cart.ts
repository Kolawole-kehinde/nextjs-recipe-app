
export type FoodItemProps = {
  id: string | number;
  name: string;
  price: number;
  image_url: string;
  description: string;
};

export interface Product {
  id: string | number;
  name: string;
  price: number;
  image_url: string;
  description: string;
  [key: string]: any;
}


export type CartItem = {
  id: string;
  name: string;
  price: number;
  image_url: string;
  description: string;
  quantity: number;
};

export interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  image_url?: string; 
}

export interface BuyNowItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string; 
}
