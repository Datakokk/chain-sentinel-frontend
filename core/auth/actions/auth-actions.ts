import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { User } from "../interface/user";

const mapFirebaseUserToUser = (firebaseUser: FirebaseUser): User => {
  return {
    id: firebaseUser.uid,
    email: firebaseUser.email ?? "",
    wallet_address: "", // 🔹 se puede sobrescribir desde Firestore
    created_at: new Date().toISOString(),
    last_login: new Date().toISOString(),
    is_active: true,
    roles: ["user"],
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

    const userRef = doc(db, "users", user.id);
    await setDoc(userRef, {
      ...user,
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString(),
    });

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
      let user = mapFirebaseUserToUser(firebaseUser);

      // 🔥 Sobrescribir con datos Firestore si existen
      const userRef = doc(db, "users", user.id);
      const userSnap = await getDoc(userRef);
      const extraData = userSnap.exists() ? userSnap.data() : {};

      resolve({ user: { ...user, ...extraData }, token });
    });
  });
};
