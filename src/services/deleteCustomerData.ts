import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const deleteCustomerData = async (uid: string) => {
  await deleteDoc(doc(db, 'customers', uid));
};
