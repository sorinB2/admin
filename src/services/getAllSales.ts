import { collection, query, getDocs } from 'firebase/firestore';

// Other resources
import { db } from '../firebase/firebase';
import { SaleFetchData } from '../types/types';

export const getAllSales = async () => {
  const sales: SaleFetchData[] = [];

  const q = query(collection(db, 'sales'));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(doc => {
    sales.push({ ...doc.data(), id: doc.id } as SaleFetchData);
  });

  return sales;
};
