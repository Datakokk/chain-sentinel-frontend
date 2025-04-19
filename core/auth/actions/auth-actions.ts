import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

export interface User {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
}

const mapFirebaseUserToUser = (firebaseUser: FirebaseUser): User => {
  return {
    id: firebaseUser.uid,
    email: firebaseUser.email ?? "",
    fullName: firebaseUser.displayName ?? "", // puedes manejar nombres después
    isActive: true, // valor fijo si no usas backend
    roles: ["user"], // puedes ajustar esto luego
  };
};

export const authLogin = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const token = await result.user.getIdToken();
    const user = mapFirebaseUserToUser(result.user);

    return { user, token };
  } catch (error) {
    console.log("Error in Firebase authLogin", error);
    return null;
  }
};

export const authRegister = async (email: string, password: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const token = await result.user.getIdToken();
    const user = mapFirebaseUserToUser(result.user);

    return { user, token };
  } catch (error) {
    console.log("Error in Firebase authRegister", error);
    return null;
  }
};

export const authLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log("Error in Firebase authLogout", error);
  }
};

export const authCkeckStatus = async (): Promise<null | {
  user: User;
  token: string;
}> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      unsubscribe();

      if (!firebaseUser) {
        resolve(null);
        return;
      }

      const token = await firebaseUser.getIdToken();
      const user = mapFirebaseUserToUser(firebaseUser);

      resolve({ user, token });
    });
  });
};
