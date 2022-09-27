import { collection, query, getDocs } from 'firebase/firestore';

// Other resources
import { db } from '../firebase/firebase';
import { CustomerFetchData } from '../types/types';

export const getAllCustomers = async () => {
  const customers: CustomerFetchData[] = [];

  const q = query(collection(db, 'customers'));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(doc => {
    customers.push({ ...doc.data(), id: doc.id } as CustomerFetchData);
  });

  return customers;
};
