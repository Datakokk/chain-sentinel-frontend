import { useEffect, useState } from "react";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import type { User } from "@/core/auth/interface/user";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const useUser = () => {
  const { token, user, changeStatus } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchedUser, setFetchedUser] = useState<User | undefined>(user);

  useEffect(() => {
    const fetchUser = async () => {
      console.log("🔎 Verificando token y API_URL", { token, API_URL });

      if (!token) {
        console.warn("⛔ No token disponible");
        setError("No token available");
        setLoading(false);
        return;
      }

      if (!API_URL) {
        console.warn("⛔ No API_URL disponible");
        setError("No API URL available");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/v1/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch user");

        const userData = await res.json();

        const userRef = doc(db, "users", userData.id);
        const userSnap = await getDoc(userRef);
        const firestoreData = userSnap.exists() ? userSnap.data() : {};

        console.log("📦 Firestore data:", firestoreData);
        console.log("🔑 Backend user:", userData);

        const enrichedUser: User = {
          ...firestoreData,
          ...userData,
        };

        console.log("👤 Enriched user with wallet:", enrichedUser);

        setFetchedUser(enrichedUser);
        await changeStatus(token, enrichedUser);
      } catch (err: any) {
        console.error("❌ useUser error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (!user && token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token, user]);

  return {
    user: fetchedUser,
    loading,
    error,
  };
};
