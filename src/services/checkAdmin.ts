import { doc, getDoc } from 'firebase/firestore';

// Other resources
import { db } from '../firebase/firebase';

export const getAdminCredentials = async () => {
  const docRef = doc(db, 'admin', 'adminCredentials');
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return undefined;
  }
};
