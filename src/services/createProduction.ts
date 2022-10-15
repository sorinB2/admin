import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase';

// Other resources
import { ProductionData } from '../types/types';

export const createProduction = async (data: ProductionData) => {
  return await addDoc(collection(db, 'production'), {
    ...data,
  });
};
