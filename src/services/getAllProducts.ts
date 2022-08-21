import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

// Other resources
import { ProductData } from '../types/types';

export const getAllProducts = async () => {
  const products: ProductData[] = [];

  const q = query(collection(db, 'products'));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(doc => {
    products.push({ ...doc.data(), id: doc.id } as ProductData);
  });

  return products;
};
