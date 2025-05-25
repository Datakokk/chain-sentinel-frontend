// app/chain-sentinel-app/(home)/pagina3.tsx
import { View, Text, Button } from "react-native";
import { Stack, useRouter } from "expo-router";
import BottomNavBar from "./components/BottomNavBar";

export default function Pagina3() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ title: "Página 3" }} />
      <Text>Página 3</Text>
      <Button title="Volver al Home" onPress={() => router.back()} />
      {/* BARRA INFERIOR */}
      <BottomNavBar />
    </View>
  );
}
