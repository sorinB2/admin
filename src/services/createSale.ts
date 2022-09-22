import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase';

// Other resources
import { SaleData } from '../types/types';

export const createSale = async (data: SaleData) => {
  return await addDoc(collection(db, 'sales'), {
    ...data,
    customer: {
      name: data.customer.name,
      id: data.customer.id,
    },
  });
};
