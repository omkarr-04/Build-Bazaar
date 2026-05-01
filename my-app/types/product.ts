export interface AdditionalInfo {
  weight: string;
  brand: string;
  productCategory: string;
  certification: string;
  warranty: string;
  _id: string;
}

export interface ProductImage {
  url: string;
  alt: string;
}

export interface Review {
  _id?: string;
  reviewer: string;
  rating: number;
  title: string;
  comment: string;
  verified?: boolean;
  helpful?: number;
  createdAt?: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  imageUrl: string;
  category: string;
  stock: number;
  rating?: number;
  additionalInfo?: AdditionalInfo;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  images?: ProductImage[];
  reviews?: Review[];
}

export interface CartItem {
  _id: string;
  productId: Product;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}
