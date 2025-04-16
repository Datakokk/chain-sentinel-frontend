import React from "react";
import { KeyboardAvoidingView, useWindowDimensions, View } from "react-native";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import { ScrollView } from "react-native-gesture-handler";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedLink from "@/presentation/theme/components/ThemedLink";

const LoginScreen = () => {
  const { height } = useWindowDimensions();

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 40 }}>
        <View
          style={{
            paddingTop: height * 0.35,
          }}
        >
          <ThemedText type="title">Ingresar</ThemedText>
          <ThemedText style={{ color: "grey" }}>
            Por favor ingrese para continuar
          </ThemedText>
        </View>

        {/**Email and Password */}
        <View style={{ marginTop: 20 }}>
          <ThemedTextInput
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
          />

          <ThemedTextInput
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            icon="lock-closed-outline"
          />
        </View>

        {/* Space */}
        <View style={{ marginTop: 20 }} />

        {/* Button */}
        <ThemedButton icon="arrow-forward-outline">Ingresar</ThemedButton>

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
          <ThemedText style={{ color: "grey" }}>¿No tienes cuenta? </ThemedText>
          <ThemedLink href="/auth/register" style={{ marginHorizontal: 5 }}>
            Registrate
          </ThemedLink>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
