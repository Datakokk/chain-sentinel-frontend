import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  useWindowDimensions,
  View,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { Snackbar } from "react-native-paper";

import { ThemedText } from "@/presentation/theme/components/ThemedText";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedLink from "@/presentation/theme/components/ThemedLink";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";

const LoginScreen = () => {
  const { login } = useAuthStore();
  const { height } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, "background");

  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const validateForm = () => {
    const { email, password } = form;
    const errors: any = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      errors.email = "Correo electrónico inválido.";
    }

    if (password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onLogin = async () => {
    const isValid = validateForm();
    if (!isValid) {
      setSnackbarMessage("Corrige los errores del formulario.");
      setSnackbarVisible(true);
      return;
    }

    setIsPosting(true);
    const wasSuccessful = await login(form.email, form.password);
    setIsPosting(false);

    if (wasSuccessful) {
      router.replace("/");
    } else {
      setSnackbarMessage("Usuario o contraseña incorrectos");
      setSnackbarVisible(true);
    }
  };

  const validateField = (field: string, value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    switch (field) {
      case "email":
        if (!emailRegex.test(value)) {
          return "Correo electrónico inválido.";
        }
        break;
      case "password":
        if (value.length < 6) {
          return "La contraseña debe tener al menos 6 caracteres.";
        }
        break;
    }
    return "";
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView
        style={{ paddingHorizontal: 40, backgroundColor: backgroundColor }}
      >
        <View style={{ paddingTop: height * 0.35 }}>
          <ThemedText type="title">Ingresar</ThemedText>
          <ThemedText style={{ color: "grey" }}>
            Por favor ingrese para continuar
          </ThemedText>
        </View>

        {/* Email and Password */}
        <View style={{ marginTop: 20 }}>
          <ThemedTextInput
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
            value={form.email}
            onChangeText={(text) => {
              setForm({ ...form, email: text });
              setFormErrors((prev) => ({
                ...prev,
                email: validateField("email", text),
              }));
            }}
            error={!!formErrors.email}
            helperText={formErrors.email}
          />

          <ThemedTextInput
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            icon="lock-closed-outline"
            value={form.password}
            onChangeText={(text) => {
              setForm({ ...form, password: text });
              setFormErrors((prev) => ({
                ...prev,
                password: validateField("password", text),
              }));
            }}
            error={!!formErrors.password}
            helperText={formErrors.password}
          />
        </View>

        <View style={{ marginTop: 20 }} />

        <ThemedButton
          icon="arrow-forward-outline"
          onPress={onLogin}
          disabled={
            isPosting ||
            !form.email ||
            !form.password ||
            !!formErrors.email ||
            !!formErrors.password
          }
        >
          Ingresar
        </ThemedButton>

        <View style={{ marginTop: 50 }} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThemedText style={{ color: "grey" }}>¿No tienes cuenta? </ThemedText>
          <ThemedLink href="/auth/register" style={{ marginHorizontal: 5 }}>
            Crear cuenta
          </ThemedLink>
        </View>

        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={2500}
          action={{
            label: "OK",
            onPress: () => setSnackbarVisible(false),
          }}
        >
          {snackbarMessage}
        </Snackbar>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
