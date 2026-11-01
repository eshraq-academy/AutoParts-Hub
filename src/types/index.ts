export interface Product {
  id: string;
  name: string;
  nameEn: string;
  sku: string;
  oem: string;
  description: string;
  price: number;
  oldPrice?: number;
  stock: number;
  category: string;
  brand: string;
  compatibleCars: string[];
  image: string;
  featured: boolean;
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  engine?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
}

export interface Order {
  id: string;
  customerId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}
