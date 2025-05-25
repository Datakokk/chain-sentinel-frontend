import { useEffect, useState } from "react";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { AnalyzedTransaction } from "@/core/analysis/interface/analyzed-transaction";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const useAnalysis = () => {
  const { token } = useAuthStore();
  const [analyses, setAnalyses] = useState<AnalyzedTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!token || !API_URL) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/v1/analyzed_transactions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch analyses");

        const data = await res.json();
        setAnalyses(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [token]);

  return { analyses, loading, error };
};
