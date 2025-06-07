import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import { Text, Button } from "react-native-paper";
import { useNavigation } from "expo-router";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import BottomNavBar from "./components/BottomNavBar";
import { auth, db } from "@/core/auth/firebaseConfig";
import { updateEmail, updatePassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

const ConfiguracionScreen = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState(() => auth.currentUser?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    navigation.setOptions({ title: "Configuración" });
  }, []);

  const handleUpdate = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Error", "Usuario no autenticado.");
      return;
    }

    try {
      if (email && email !== user.email) {
        await updateEmail(user, email);
      }

      if (newPassword) {
        await updatePassword(user, newPassword);
      }

      if (name) {
        await updateDoc(doc(db, "users", user.uid), { name });
      }

      Alert.alert("Éxito", "Datos actualizados correctamente.");
    } catch (error) {
      console.error("Error al actualizar: ", error);
      Alert.alert("Error", "No se pudo actualizar la información.");
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* ✅ Logo */}
      <Image
        source={require("@/assets/images/TecnologicoFuturista.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>Configuración de Usuario</Text>

      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor="#80cbc4"
      />
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#80cbc4"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Contraseña actual (opcional)"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        style={styles.input}
        placeholderTextColor="#80cbc4"
        secureTextEntry
      />
      <TextInput
        placeholder="Nueva contraseña"
        value={newPassword}
        onChangeText={setNewPassword}
        style={styles.input}
        placeholderTextColor="#80cbc4"
        secureTextEntry
      />

      <Button mode="contained" onPress={handleUpdate} style={styles.saveButton}>
        Guardar
      </Button>

      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.logoutButton}
      >
        Cerrar sesión
      </Button>

      <BottomNavBar />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#061621",
    padding: 20,
    flexGrow: 1,
    justifyContent: "center",
  },
  logo: {
    width: 140,
    height: 140,
    alignSelf: "center",
    marginBottom: 10,
  },
  title: {
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: "#80cbc4",
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    color: "#fff",
  },
  saveButton: {
    backgroundColor: "#00bfa5",
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: "#c62828",
  },
});

export default ConfiguracionScreen;
