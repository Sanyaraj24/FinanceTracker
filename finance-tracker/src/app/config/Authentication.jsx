import {auth,googleProvider} from './firebase';
import { signInWithPopup } from "firebase/auth";

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
