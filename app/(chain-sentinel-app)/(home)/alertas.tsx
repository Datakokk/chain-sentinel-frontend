import React from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import {
  Card,
  Paragraph,
  Text,
  IconButton,
  useTheme,
  ActivityIndicator,
} from "react-native-paper";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { useAlerts } from "@/core/alerts/hooks/useAlerts";
import BottomNavBar from "./components/BottomNavBar";

const AlertsScreen = () => {
  const { alerts, loading, error } = useAlerts();
  const theme = useTheme();

  const getIconAndColor = (type: string) => {
    switch (type) {
      case "critical":
        return { icon: "alert-circle", color: "#c62828" };
      case "warning":
        return { icon: "alert", color: "#ff9800" };
      case "info":
        return { icon: "information", color: "#00e0c6" };
      default:
        return { icon: "bell", color: "#ccc" };
    }
  };
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: "Alertas" });
  }, []);

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Image
            source={require("@/assets/images/TecnologicoFuturista.png")}
            style={styles.logoSmall}
          />
          <Text style={styles.brandTitle}>ChainSentinel</Text>
        </View>

        <Text style={styles.title}>Alertas de Seguridad</Text>

        {/* Estado de carga / error / vacío */}
        {loading && (
          <ActivityIndicator
            size="large"
            style={{ marginTop: 20 }}
            color="#00e0c6"
          />
        )}

        {error && (
          <Text style={styles.error}>
            Error al cargar alertas: {error.toString()}
          </Text>
        )}

        {!loading && alerts.length === 0 && (
          <Text style={{ color: "#fff" }}>No hay alertas registradas.</Text>
        )}

        {/* Lista de alertas */}
        {alerts.map((alert, index) => {
          const { icon, color } = getIconAndColor(alert.type);
          return (
            <Card key={index} style={styles.card}>
              <Card.Title
                title={(alert.type ?? "DESCONOCIDO").toUpperCase()}
                subtitle={`Hash: ${alert.tx_hash ?? "N/A"}`}
                left={() => <IconButton icon={icon} iconColor={color} />}
              />
              <Card.Content>
                <Paragraph style={styles.message}>{alert.message}</Paragraph>
                <Text style={styles.details}>
                  Fecha: {new Date(alert.created_at).toLocaleString()}
                </Text>
                <Text style={styles.details}>
                  De: {alert.from_address || "N/D"}
                </Text>
                <Text style={styles.details}>
                  A: {alert.to_address || "N/D"}
                </Text>
              </Card.Content>
            </Card>
          );
        })}
      </ScrollView>

      {/* Barra de navegación inferior */}
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
    fontSize: 18,
    color: "#00bfa5",
    marginBottom: 16,
    fontWeight: "bold",
  },
  card: {
    marginBottom: 10,
    backgroundColor: "#121212",
  },
  message: {
    color: "#fff",
    marginBottom: 4,
  },
  details: {
    fontSize: 12,
    color: "#aaa",
    marginBottom: 2,
  },
  error: {
    color: "red",
    marginBottom: 12,
  },
});

export default AlertsScreen;
