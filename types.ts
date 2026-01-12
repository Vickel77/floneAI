
export interface Product {
  id: number;
  name: string;
  subtitle?: string;
  price: string;
  imageUrl: string;
  description: string;
  isBestSeller?: boolean;
  brand?: 'nike';
  category?: 'English Wears' | 'African Native Wears';
}

export interface CartItem extends Product {
  quantity: number;
  size?: string;
}
