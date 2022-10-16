import { DateClickArg } from '@fullcalendar/interaction';
import React from 'react';

export interface ProductData {
  brand: string;
  name: string;
  wipes: number;
  stock: number;
  density: number;
  width: number;
  fragrance: string;
  material: string;
}

export interface ProductFetchData extends ProductData {
  id: string;
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
}

export interface CustomerFetchData extends CustomerData {
  id: string;
}

export interface SaleData {
  customer: CustomerFetchData;
  order: OrderData[];
  date: string;
  totalIncome: number;
  paid: boolean;
  status: string;
}

export interface SaleFetchData extends SaleData {
  id: string;
}

export interface OrderData {
  product: SaleProduct;
  units: string;
  income: number;
}

export interface SaleModalProps {
  open: boolean;
  onClose: () => void;
  sale: SaleFetchData;
  index: number;
}

export interface SaleCardProps {
  sale: SaleFetchData;
  onClick: (e: React.MouseEvent) => void;
}

export interface FormProps {
  submitHandler: (event: React.FormEvent) => void;
  buttonTitle: string;
  title: string;
}

export interface ActionConfirmModalProps {
  id?: string;
  isVisible: boolean;
  title: string;
  description: string;
  confirmHandler: (e: React.MouseEvent) => void;
  closeHandler: () => void;
}

export interface ProductionData {
  date: string;
  products: {
    product: string;
    id: string;
    units: string;
  }[];
}

export interface ProductionFetchData extends ProductionData {
  id: string;
}

export interface Event {
  title: string;
  start: string;
  id: string;
  className: string;
  color: string;
  textColor: string;
}

export interface ProductionCalendarProps {
  dateClickHandler: (event: DateClickArg) => void;
  events: Event[];
  onEventClick: (eventId: string) => void;
}

export interface ProductionModalProps {
  open: boolean;
  onClose: () => void;
  production: ProductionFetchData;
}
