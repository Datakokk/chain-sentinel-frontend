// app/chain-sentinel-app/(home)/pagina2.tsx
import { View, Text, Button } from "react-native";
import { Stack, useRouter } from "expo-router";

export default function Pagina2() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ title: "Página 2" }} />
      <Text>Página 2</Text>
      <Button title="Volver al Home" onPress={() => router.back()} />
    </View>
  );
}
