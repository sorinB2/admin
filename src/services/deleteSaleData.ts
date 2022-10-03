import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const deleteSaleData = async (uid: string) => {
  await deleteDoc(doc(db, 'sales', uid));
};
