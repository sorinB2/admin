import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

// Other resources
import { ProductFetchData } from '../types/types';

export const getAllProducts = async () => {
  const products: ProductFetchData[] = [];

  const q = query(collection(db, 'products'));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(doc => {
    products.push({ ...doc.data(), id: doc.id } as ProductFetchData);
  });

  return products;
};
