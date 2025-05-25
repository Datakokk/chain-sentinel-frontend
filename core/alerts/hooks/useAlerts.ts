import { useEffect, useState } from "react";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { Alert } from "@/core/alerts/interface/alert";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const useAlerts = () => {
  const { token } = useAuthStore();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      if (!token || !API_URL) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/v1/alerts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch alerts");

        const data = await res.json();
        setAlerts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [token]);

  return { alerts, loading, error };
};
