export interface ProductData {
  brand: string;
  name: string;
  wipes: number;
  stock: number;
  density: number;
  width: number;
  fragrance: string;
  material: string;
  id?: string;
}

export interface Product {
  product: string;
  price: string;
  id: string;
}

export interface SaleProduct extends Product {
  stock: string;
}

export interface CustomerData {
  name: string;
  location: string;
  phone: string;
  receivables: number;
  products: Product[];
  id?: string;
}

export interface SaleData {
  customer: CustomerData;
  order: OrderData[];
  date: string;
  totalIncome: number;
  paid: boolean;
  status: string;
  id?: string;
}

export interface OrderData {
  product: SaleProduct;
  units: string;
  income: number;
}
