import { useEffect, useState } from "react";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import type { User } from "@/core/auth/interface/user";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const useUser = () => {
  const { token, user, changeStatus } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchedUser, setFetchedUser] = useState<User | undefined>(user);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token || !API_URL) {
        setLoading(false);
        setError("No token or API URL available");
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
        setFetchedUser(userData);

        await changeStatus(token, userData);
      } catch (err: any) {
        console.error("useUser error:", err.message);
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
