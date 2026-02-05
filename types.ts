
export type Category = 'Roses' | 'Bouquets' | 'Wedding' | 'Gifts';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  images?: string[]; // Multiple images support
  description: string;
  longDescription?: string; // Detailed story
  freshness?: string; // How long it lasts
  isFeatured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}
