import React from "react";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import { View, Text, Button } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { useRouter, Stack } from "expo-router";

const HomeScreen = () => {
  const primary = useThemeColor({}, "primary");
  const router = useRouter();
  return (
    <View style={{ paddingTop: 100, paddingHorizontal: 20 }}>
      <ThemedText style={{ fontFamily: "KanitBold", color: primary }}>
        HomeScreen
      </ThemedText>
      <ThemedText style={{ fontFamily: "KanitRegular" }}>HomeScreen</ThemedText>
      <ThemedText style={{ fontFamily: "KanitThin " }}>HomeScreen</ThemedText>
      <ThemedText>HomeScreen</ThemedText>

      <Stack.Screen options={{ title: "ChainSentinel" }} />
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Menú principal</Text>

      <Button title="Ir a Página 1" onPress={() => router.push("./pagina1")} />
      <Button title="Ir a Página 2" onPress={() => router.push("./pagina2")} />
      <Button title="Ir a Página 3" onPress={() => router.push("./pagina3")} />
      <Button title="Ir a Página 4" onPress={() => router.push("./pagina4")} />
    </View>
  );
};

export default HomeScreen;
