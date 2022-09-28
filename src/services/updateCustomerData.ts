import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

// Other resources
import { CustomerData } from '../types/types';

export const updateCustomerData = (uid: string, data: CustomerData) => {
  updateDoc(doc(db, 'customers', uid), {
    ...data,
  });
};
