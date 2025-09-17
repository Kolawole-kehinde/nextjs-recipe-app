
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



