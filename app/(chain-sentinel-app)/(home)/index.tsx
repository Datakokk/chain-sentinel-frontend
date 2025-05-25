import React, { useState } from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { Text, Button, Card, Chip, useTheme } from "react-native-paper";
import BottomNavBar from "./components/BottomNavBar";
import { useUserTransactions } from "@/core/auth/hooks/useUserTransactions";
import { useAlerts } from "@/core/alerts/hooks/useAlerts";

const HomeScreen = () => {
  const theme = useTheme();
  const [period, setPeriod] = useState("7");

  const { transactions, loading } = useUserTransactions();
  const { alerts } = useAlerts();

  const suspiciousTxExists = transactions.some(
    (tx) => tx.status === "Sospechoso"
  );

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
          transactions.slice(0, 5).map((tx) => (
            <Card key={tx.id} style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Text style={{ fontWeight: "bold", color: "#fff" }}>
                  {tx.hash}
                </Text>
                <Text style={{ color: "#fff" }}>
                  {tx.date} · {tx.amount}
                </Text>
                <Chip
                  style={[
                    styles.chip,
                    {
                      backgroundColor:
                        tx.status === "Sospechoso" ? "#c62828" : "#2e7d32",
                    },
                  ]}
                  textStyle={{ color: "#fff" }}
                >
                  {tx.status}
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
    paddingBottom: 100, // espacio para la barra inferior
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
    color: "#00e0c6", // color turquesa tipo mockup
  },

  subtitle: {
    textAlign: "center",
    marginBottom: 30,
    color: "#fff",
  },
  button: {
    marginVertical: 6,
    width: "100%",
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
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#444",
    backgroundColor: "#000",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default HomeScreen;
