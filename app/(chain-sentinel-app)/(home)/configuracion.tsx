import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import BottomNavBar from "./components/BottomNavBar";

const ConfiguracionScreen = () => {
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Configuración
      </Text>
      <Button mode="contained" onPress={handleLogout} style={styles.button}>
        Cerrar sesión
      </Button>
      {/* BARRA INFERIOR */}
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#061621",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    marginBottom: 24,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#c62828",
  },
});

export default ConfiguracionScreen;
