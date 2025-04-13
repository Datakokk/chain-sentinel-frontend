import React from "react";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";

const HomeScreen = () => {
  const primary = useTheme().colors.primary;
  return (
    <View style={{ paddingTop: 100, paddingHorizontal: 20 }}>
      <ThemedText style={{ fontFamily: "KanitBold" }}>HomeScreen</ThemedText>
      <ThemedText style={{ fontFamily: "KanitRegular" }}>HomeScreen</ThemedText>
      <ThemedText style={{ fontFamily: "KanitThin " }}>HomeScreen</ThemedText>
      <ThemedText>HomeScreen</ThemedText>
    </View>
  );
};

export default HomeScreen;
