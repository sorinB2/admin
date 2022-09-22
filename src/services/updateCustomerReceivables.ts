import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const updateCustomerReceivables = (uid: string, data: string) => {
  updateDoc(doc(db, 'customers', uid), {
    receivables: data,
  });
};
