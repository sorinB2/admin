import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

export const loginFetch = async ({ email, password }: { email: string; password: string }) => {
  return await signInWithEmailAndPassword(auth, email, password);
};
