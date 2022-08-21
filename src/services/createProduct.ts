import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase';

// Other resources
import { ProductData } from '../types/types';

export const createProduct = async (data: ProductData) => {
  return await addDoc(collection(db, 'products'), {
    ...data,
  });
};
