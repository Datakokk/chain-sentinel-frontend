import React, { useState } from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { Text, Button, Card, Chip, useTheme } from "react-native-paper";
import BottomNavBar from "./components/BottomNavBar";
import { useUserTransactions } from "@/core/auth/hooks/useUserTransactions";
import { useAlerts } from "@/core/alerts/hooks/useAlerts";
import WalletInput from "@/presentation/theme/components/ui/WalletInput";

const HomeScreen = () => {
  const theme = useTheme();
  const [period, setPeriod] = useState("7");

  const [reloadKey, setReloadKey] = useState(0);
  const { transactions, loading } = useUserTransactions(reloadKey);
  const { alerts } = useAlerts();

  const suspiciousTxExists = transactions.some(
    (tx) => tx.status === "suspicious"
  );

  const filteredTransactions = transactions.filter((tx) => {
    const txDate = new Date(tx.timestamp * 1000);
    const now = new Date();
    const diffDays = (now.getTime() - txDate.getTime()) / (1000 * 60 * 60 * 24);
    return period === "7" ? diffDays <= 7 : diffDays <= 30;
  });

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Encabezado */}
        <View style={styles.headerRow}>
          <Image
            source={require("@/assets/images/TecnologicoFuturista.png")}
            style={styles.logoSmall}
          />
          <Text style={styles.brandTitle}>ChainSentinel</Text>
        </View>

        <Text variant="titleMedium" style={styles.subtitle}>
          Monitoreo Inteligente de Fraude en Blockchain
        </Text>

        {/* Componente para ingresar wallet */}
        <WalletInput onWalletSaved={() => setReloadKey((prev) => prev + 1)} />

        {/* RESUMEN DE ACTIVIDAD */}
        <Text variant="titleLarge" style={styles.sectionTitle}>
          Resumen de Actividad Reciente
        </Text>

        <View style={styles.toggleContainer}>
          <Button
            mode={period === "7" ? "contained" : "outlined"}
            onPress={() => setPeriod("7")}
            style={styles.toggleButton}
          >
            Últimos 7 días
          </Button>
          <Button
            mode={period === "30" ? "contained" : "outlined"}
            onPress={() => setPeriod("30")}
            style={styles.toggleButton}
          >
            Últimos 30 días
          </Button>
        </View>

        {/* Transacciones */}
        <Text variant="titleMedium" style={styles.subsectionTitle}>
          Transacciones recientes
        </Text>

        {loading ? (
          <Text style={{ color: "#fff" }}>Cargando transacciones...</Text>
        ) : transactions.length === 0 ? (
          <Text style={{ color: "#fff" }}>
            No hay transacciones disponibles
          </Text>
        ) : (
          filteredTransactions.slice(0, 5).map((tx) => (
            <Card key={tx.hash} style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Text style={{ fontWeight: "bold", color: "#fff" }}>
                  {tx.hash}
                </Text>
                <Text style={{ color: "#fff" }}>
                  {new Date(tx.timestamp * 1000).toISOString().split("T")[0]} ·{" "}
                  {tx.value} ETH
                </Text>
                <Chip
                  style={[
                    styles.chip,
                    {
                      backgroundColor:
                        tx.status === "suspicious" ? "#c62828" : "#2e7d32",
                    },
                  ]}
                  textStyle={{ color: "#fff" }}
                >
                  {tx.status === "suspicious" ? "Sospechoso" : "Seguro"}
                </Chip>
              </Card.Content>
            </Card>
          ))
        )}

        {/* Alerta visible si hay sospechosas */}
        {(suspiciousTxExists || alerts.some((a) => a.type === "critical")) && (
          <Text style={styles.alertText}>
            ⚠️ Actividad sospechosa detectada recientemente
          </Text>
        )}
      </ScrollView>

      {/* Barra inferior */}
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#061621",
  },
  container: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 100,
    alignItems: "center",
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
  subtitle: {
    textAlign: "center",
    marginBottom: 30,
    color: "#fff",
  },
  sectionTitle: {
    marginTop: 30,
    marginBottom: 10,
    alignSelf: "flex-start",
    color: "#00bfa5",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  toggleButton: {
    marginHorizontal: 8,
  },
  subsectionTitle: {
    marginBottom: 10,
    alignSelf: "flex-start",
    color: "#00bfa5",
  },
  card: {
    marginBottom: 10,
    width: "100%",
    backgroundColor: "#121212",
  },
  cardContent: {
    position: "relative",
    gap: 4,
  },
  chip: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  alertText: {
    marginTop: 20,
    color: "red",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default HomeScreen;
