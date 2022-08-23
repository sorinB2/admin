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

export interface CustomerData {
  name: string;
  location: string;
  phone: string;
  receivables: number;
  products: { product: string; price: string; id: string }[];
}
