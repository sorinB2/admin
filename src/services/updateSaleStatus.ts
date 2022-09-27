import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const updateSaleStatus = (uid: string, data: string) => {
  updateDoc(doc(db, 'sales', uid), {
    status: data,
  });
};
