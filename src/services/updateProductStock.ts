import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const updateProductStock = (uid: string, data: string) => {
  updateDoc(doc(db, 'products', uid), {
    stock: data,
  });
};
