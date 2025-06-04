import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import { Text, TextInput, Button, Card, Chip } from "react-native-paper";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { useUser } from "@/core/auth/hooks/useUser";
import BottomNavBar from "./components/BottomNavBar";
import { AnalyzedTransaction } from "@/core/analysis/interface/analyzed-transaction";
import { toAnalyzeRequestDTO } from "@/helpers/adapters/analyze-request.adapter";

const ConsultaScreen = () => {
  const { token } = useAuthStore();
  const { user } = useUser();

  const [hash, setHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: "Consulta" });
  }, []);

  const isValidHash = (value: string) =>
    /^0x[a-fA-F0-9]{64}$/.test(value.trim());

  const handleConsulta = async () => {
    if (!isValidHash(hash)) {
      setError(
        "El hash debe tener formato válido (0x + 64 caracteres hexadecimales)"
      );
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/v1/analyze`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_transaccion: hash,
            hash: "",
            origin_address: user?.wallet_address || "", // o la dirección actual del usuario
            destination_address: "", // puedes dejarlo vacío si el backend lo infiere
            amount: 0, // opcional si el backend lo calcula
            date: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || "Error en la consulta");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error("Consulta error:", err);
      setError(err.message || "Error al consultar la transacción");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setHash("");
    setResult(null);
    setError("");
  };

  const getRiskLevel = (score: number) => {
    if (score > 80) return "Riesgo Alto";
    if (score >= 40) return "Riesgo Medio";
    return "Riesgo Bajo";
  };

  const getRiskColor = (score: number) => {
    if (score > 80) return "#c62828"; // rojo
    if (score >= 40) return "#ff9800"; // naranja
    return "#2e7d32"; // verde
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Image
          source={require("@/assets/images/TecnologicoFuturista.png")}
          style={styles.logoSmall}
        />
        <Text style={styles.brandTitle}>ChainSentinel</Text>
      </View>

      {user?.wallet_address && (
        <Text style={styles.walletInfo}>Wallet: {user.wallet_address}</Text>
      )}

      <TextInput
        label="Hash de la transacción"
        value={hash}
        onChangeText={setHash}
        mode="outlined"
        style={styles.input}
        placeholder="Ej: 0x..."
      />

      <Button
        mode="contained"
        onPress={handleConsulta}
        loading={loading}
        disabled={!hash}
      >
        Consultar
      </Button>

      {error !== "" && <Text style={styles.error}>{error}</Text>}

      {loading && (
        <ActivityIndicator
          size="large"
          style={{ marginTop: 20 }}
          color="#00e0c6"
        />
      )}

      {result && (
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>
              Análisis de Transacción Sospechosa
            </Text>
            <Text style={styles.hash}>{result.hash}</Text>
            <Text style={styles.label}>Fecha:</Text>
            <Text style={styles.value}>
              {new Date(result.analysis_timestamp).toLocaleDateString()}
            </Text>

            <Text style={styles.label}>Monto:</Text>
            <Text style={styles.value}>{result.amount} BTC</Text>

            <Chip
              style={[
                styles.chip,
                {
                  backgroundColor:
                    result.prediction_result === "fraud"
                      ? "#c62828"
                      : "#2e7d32",
                },
              ]}
              textStyle={{ color: "#fff" }}
            >
              {result.prediction_result === "fraud" ? "Sospechoso" : "Seguro"}
            </Chip>

            <Text style={styles.sectionTitle}>Detalles de la Transacción</Text>
            <Text
              style={{
                color:
                  result.prediction_result === "fraud" ? "#ff1744" : "#00e676",
                fontSize: 22,
                fontWeight: "bold",
                marginBottom: 6,
              }}
            >
              {result.prediction_result === "fraud"
                ? "⚠️ Transacción Sospechosa"
                : "✅ Transacción Segura"}
            </Text>

            <Text style={styles.label}>Riesgo:</Text>
            <Text
              style={[
                styles.riskLevel,
                { color: getRiskColor(result.risk_score) },
              ]}
            >
              {getRiskLevel(result.risk_score)}
            </Text>

            <Text style={styles.label}>Confirmaciones:</Text>
            <Text style={styles.value}>{result.confirmations}</Text>
          </Card.Content>
        </Card>
      )}

      {result && (
        <Button mode="outlined" style={{ marginTop: 16 }} onPress={handleReset}>
          Nueva búsqueda
        </Button>
      )}

      <BottomNavBar />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#061621",
    flexGrow: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  logoSmall: {
    width: 100,
    height: 100,
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 0,
    color: "#00e0c6",
  },
  title: {
    fontSize: 24,
    color: "#00e0c6",
    marginBottom: 16,
  },
  walletInfo: {
    color: "#aaa",
    marginBottom: 12,
    fontSize: 14,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  error: {
    marginTop: 10,
    color: "red",
    fontWeight: "bold",
  },
  card: {
    marginTop: 20,
    backgroundColor: "#121212",
  },
  sectionTitle: {
    color: "#00e0c6",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 6,
  },
  hash: {
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  chip: {
    marginTop: 8,
    alignSelf: "flex-start",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ccc",
    marginTop: 4,
  },
  value: {
    color: "#fff",
    marginBottom: 6,
  },
  riskLevel: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
});

export default ConsultaScreen;
