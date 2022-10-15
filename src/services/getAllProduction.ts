import { collection, query, getDocs } from 'firebase/firestore';

// Other resources
import { db } from '../firebase/firebase';
import { ProductionFetchData } from '../types/types';

export const getAllProduction = async () => {
  const production: ProductionFetchData[] = [];

  const q = query(collection(db, 'production'));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(doc => {
    production.push({ ...doc.data(), id: doc.id } as ProductionFetchData);
  });

  return production;
};
