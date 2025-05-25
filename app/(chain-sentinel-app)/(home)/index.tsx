import React from "react";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import { View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { useRouter, Stack } from "expo-router";
import { Button } from "react-native-paper";

const HomeScreen = () => {
  const primary = useThemeColor({}, "primary");
  const router = useRouter();
  return (
    <View style={{ paddingTop: 100, paddingHorizontal: 20 }}>
      <ThemedText style={{ fontFamily: "KanitBold", color: primary }}>
        HomeScreen
      </ThemedText>
      <ThemedText style={{ fontFamily: "KanitRegular" }}>HomeScreen</ThemedText>
      <Button mode="contained" onPress={() => console.log("Presionado")}>
        ¡Hola Paper!
      </Button>
      <ThemedText style={{ fontFamily: "KanitThin " }}>HomeScreen</ThemedText>
      <ThemedText>HomeScreen</ThemedText>

      <Stack.Screen options={{ title: "ChainSentinel" }} />
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Menú principal</Text>

      <Button mode="elevated" onPress={() => router.push("./pagina1")}>
        Ir a Página 1
      </Button>
      <Button mode="contained" onPress={() => router.push("./pagina2")}>
        Ir a Página 2
      </Button>
      <Button mode="contained" onPress={() => router.push("./pagina3")}>
        Ir a Página 3
      </Button>
      <Button mode="contained" onPress={() => router.push("./pagina4")}>
        Ir a Página 4
      </Button>
    </View>
  );
};

export default HomeScreen;
