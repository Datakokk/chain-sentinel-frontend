import { View, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { useAuthStore } from "@/presentation/auth/store/ueseAuthStore";
import { Redirect, Stack } from "expo-router";

const CheckAuthenticationLayout = () => {
  const { status, checkstatus } = useAuthStore();

  useEffect(() => {
    // Check authentication status when the component mounts
    checkstatus();
  }, []);

  if (status === "checking") {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  if (status === "unauthenticated") {
    // Redirect to login screen
    return <Redirect href="/auth/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(home)/index" options={{ title: "ChainSentinel" }} />
    </Stack>
  );
};

export default CheckAuthenticationLayout;
