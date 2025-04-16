import React from "react";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";

const HomeScreen = () => {
  const primary = useThemeColor({}, "primary");
  return (
    <View style={{ paddingTop: 100, paddingHorizontal: 20 }}>
      <ThemedText style={{ fontFamily: "KanitBold", color: primary }}>
        HomeScreen
      </ThemedText>
      <ThemedText style={{ fontFamily: "KanitRegular" }}>HomeScreen</ThemedText>
      <ThemedText style={{ fontFamily: "KanitThin " }}>HomeScreen</ThemedText>
      <ThemedText>HomeScreen</ThemedText>
    </View>
  );
};

export default HomeScreen;
