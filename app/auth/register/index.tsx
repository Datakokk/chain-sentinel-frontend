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
import { authRegister } from "@/core/auth/actions/auth-actions";

const RegisterScreen = () => {
  const { height } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, "background");

  const { changeStatus } = useAuthStore();
  const [isPosting, setIsPosting] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    const { fullName, email, password } = form;
    const errors: any = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (fullName.trim().length < 3) {
      errors.fullName = "El nombre debe tener al menos 3 caracteres.";
    }

    if (!emailRegex.test(email)) {
      errors.email = "El correo electrónico no es válido.";
    }

    if (!passwordRegex.test(password)) {
      errors.password =
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onRegister = async () => {
    const isValid = validateForm();
    if (!isValid) {
      setSnackbarMessage("Corrige los errores del formulario.");
      setSnackbarVisible(true);
      return;
    }

    setIsPosting(true);
    const resp = await authRegister(form.email, form.password);
    setIsPosting(false);

    if (resp) {
      setSnackbarMessage("Usuario creado exitosamente");
      setSnackbarVisible(true);
      await changeStatus(resp.token, resp.user);

      setTimeout(() => {
        router.replace("/auth/login");
      }, 1500);
    } else {
      setSnackbarMessage("No se pudo crear la cuenta.");
      setSnackbarVisible(true);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView
        style={{ paddingHorizontal: 40, backgroundColor: backgroundColor }}
      >
        <View style={{ paddingTop: height * 0.35 }}>
          <ThemedText type="title">Crear cuenta</ThemedText>
          <ThemedText style={{ color: "grey" }}>
            Por favor crea una cuenta para continuar
          </ThemedText>
        </View>

        <View style={{ marginTop: 20 }}>
          <ThemedTextInput
            placeholder="Nombre completo"
            autoCapitalize="words"
            icon="person-outline"
            value={form.fullName}
            onChangeText={(text) => setForm({ ...form, fullName: text })}
            error={!!formErrors.fullName}
            helperText={formErrors.fullName}
          />

          <ThemedTextInput
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
            error={!!formErrors.email}
            helperText={formErrors.email}
          />

          <ThemedTextInput
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            icon="lock-closed-outline"
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
            error={!!formErrors.password}
            helperText={formErrors.password}
          />
        </View>

        <View style={{ marginTop: 20 }} />

        <ThemedButton
          icon="arrow-forward-outline"
          onPress={onRegister}
          disabled={isPosting}
        >
          Crear cuenta
        </ThemedButton>

        <View style={{ marginTop: 50 }} />

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

export default RegisterScreen;
