// core/auth/actions/updateWallet.ts
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const updateWalletAddress = async (userId: string, wallet: string) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      wallet_address: wallet,
      last_login: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.error("Error updating wallet address:", error);
    return false;
  }
};
