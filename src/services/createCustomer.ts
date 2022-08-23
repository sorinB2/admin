import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase';

// Other resources
import { CustomerData } from '../types/types';

export const createCustomer = async (data: CustomerData) => {
  return await addDoc(collection(db, 'customers'), {
    ...data,
  });
};
