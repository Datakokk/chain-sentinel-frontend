import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  useWindowDimensions,
  View,
  ScrollView,
  Alert,
} from "react-native";
import { router } from "expo-router";

import { ThemedText } from "@/presentation/theme/components/ThemedText";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedLink from "@/presentation/theme/components/ThemedLink";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { authRegister } from "@/core/auth/actions/auth-actions";

const RegisterScreen = () => {
  const { height } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, "background");

  const { changeStatus } = useAuthStore();
  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const onRegister = async () => {
    const { email, password } = form;

    if (email.length === 0 || password.length === 0) return;

    setIsPosting(true);
    const resp = await authRegister(email, password);
    setIsPosting(false);

    if (resp) {
      await changeStatus(resp.token, resp.user);
      router.replace("/auth/login");
    } else {
      Alert.alert("Error", "No se pudo crear la cuenta.");
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView
        style={{ paddingHorizontal: 40, backgroundColor: backgroundColor }}
      >
        <View
          style={{
            paddingTop: height * 0.35,
          }}
        >
          <ThemedText type="title">Crear cuenta</ThemedText>
          <ThemedText style={{ color: "grey" }}>
            Por favor crea una cuenta para continuar
          </ThemedText>
        </View>

        {/**Email and Password */}

        <View style={{ marginTop: 20 }}>
          <ThemedTextInput
            placeholder="Nombre completo"
            autoCapitalize="words"
            icon="person-outline"
            value={form.fullName}
            onChangeText={(text) => setForm({ ...form, fullName: text })}
          />

          <ThemedTextInput
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
          />

          <ThemedTextInput
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            icon="lock-closed-outline"
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
          />
        </View>

        {/* Space */}
        <View style={{ marginTop: 20 }} />

        {/* Button */}
        <ThemedButton
          icon="arrow-forward-outline"
          onPress={onRegister}
          disabled={isPosting}
        >
          Crear cuenta
        </ThemedButton>

        {/* Space */}
        <View style={{ marginTop: 50 }} />

        {/* Registry link */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThemedText style={{ color: "grey" }}>¿Ya tienes cuenta? </ThemedText>
          <ThemedLink href="/auth/login" style={{ marginHorizontal: 5 }}>
            Ingresar
          </ThemedLink>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
