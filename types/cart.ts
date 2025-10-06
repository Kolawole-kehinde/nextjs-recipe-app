export type FoodItemProps = {
  id: string; 
  name: string;
  price: number;
  image_url: string;
  description: string;
};

export interface Product {
  id: string; 
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


export interface WishlistItem {
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

export type CartItemType = {
  id: string; 
  name: string;
  seller?: string;
  price: number;
  quantity: number;
  image_url: string;
};
