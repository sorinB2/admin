import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

// Other resources
import { SaleData } from '../types/types';

export const updateSaleData = (uid: string, data: SaleData) => {
  updateDoc(doc(db, 'sales', uid), {
    ...data,
  });
};
