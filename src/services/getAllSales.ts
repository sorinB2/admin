import { collection, query, getDocs } from 'firebase/firestore';

// Other resources
import { db } from '../firebase/firebase';
import { SaleData } from '../types/types';

export const getAllSales = async () => {
  const sales: SaleData[] = [];

  const q = query(collection(db, 'sales'));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(doc => {
    sales.push({ ...doc.data(), id: doc.id } as SaleData);
  });

  return sales;
};
