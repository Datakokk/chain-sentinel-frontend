import { useEffect, useState } from "react";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { Alert } from "@/core/alerts/interface/alert";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const useAlerts = () => {
  const { token } = useAuthStore();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = async () => {
    if (!token || !API_URL) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/v1/alerts`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("No se pudieron obtener las alertas");

      const data = await res.json();
      setAlerts(data ?? []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteAlert = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/v1/alerts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error al eliminar alerta");

      // Elimina la alerta del estado
      setAlerts((prev) => prev.filter((a) => a.id !== id));
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, [token]);

  const criticalCount = alerts.filter((a) => a.type === "critical").length;
  return { alerts, loading, error, criticalCount, deleteAlert };
};
