import { useEffect, useState } from "react";
import { useUser } from "./useUser";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";

interface Transaction {
  id: string;
  hash: string;
  date: string;
  amount: string;
  status: "Sospechoso" | "Seguro";
  [key: string]: any;
}

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const useUserTransactions = () => {
  const { token } = useAuthStore();
  const { user, loading: userLoading, error } = useUser();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!token || !user?.wallet_address || !API_URL) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${API_URL}/api/v1/transactions/${user.wallet_address}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch transactions");

        const data = await res.json();
        setTransactions(data);
      } catch (err: any) {
        setFetchError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (!userLoading && user?.wallet_address) {
      fetchTransactions();
    }
  }, [token, user, userLoading]);

  return {
    transactions,
    loading: loading || userLoading,
    error: fetchError || error,
  };
};
