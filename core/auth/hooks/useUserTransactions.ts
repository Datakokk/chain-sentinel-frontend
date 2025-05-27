import { useEffect, useState } from "react";
import { useUser } from "./useUser";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { Transaction } from "@/core/transactions/interface/transaction";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const useUserTransactions = (reloadKey?: number) => {
  const { user, token } = useAuthStore();
  const userLoading = !user;

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    console.log("✅ useUserTransactions hook mounted");

    if (userLoading) {
      console.log("⏳ Esperando a que cargue el usuario...");
      return;
    }

    if (!token || !user?.wallet_address || !API_URL) {
      console.warn("⛔ Falta token, wallet_address o API_URL", {
        token,
        wallet_address: user?.wallet_address,
        API_URL,
      });
      setLoading(false);
      return;
    }

    const fetchTransactions = async () => {
      try {
        const url = `${API_URL}/api/v1/transactions/${user.wallet_address}`;
        console.log("🚀 GET:", url);

        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const errMsg = await res.text();
          throw new Error(`Error ${res.status}: ${errMsg}`);
        }

        const data: Transaction[] = await res.json();
        console.log("✅ Transacciones recibidas:", data);
        setTransactions(data);
      } catch (err: any) {
        console.error("❌ Error al cargar transacciones:", err.message);
        setFetchError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [token, user?.wallet_address, userLoading, reloadKey]);

  return {
    transactions,
    loading: loading || userLoading,
    error: fetchError,
  };
};
