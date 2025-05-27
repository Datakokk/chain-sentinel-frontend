import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";
import { useTheme } from "react-native-paper";

const BottomNavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();

  const iconColor = (route: string) =>
    pathname === route ? theme.colors.primary : "gray";

  const iconItems = [
    { name: "home", label: "Home", route: "/" },
    { name: "search", label: "Consultar", route: "/consulta" },
    { name: "analytics", label: "Análisis", route: "/pagina2" },
    { name: "notifications", label: "Alertas", route: "/pagina3", badge: true },
    { name: "settings", label: "Configuración", route: "/configuracion" },
  ];

  type Route = "/" | "/consulta" | "/pagina2" | "/pagina3" | "/configuracion";

  return (
    <View style={styles.navbar}>
      {iconItems.map((item) => (
        <TouchableOpacity
          key={item.route}
          onPress={() => router.push(item.route as Route)}
          style={styles.navItem}
        >
          <View style={{ position: "relative" }}>
            <Ionicons
              name={item.name as any}
              size={24}
              color={iconColor(item.route)}
            />
            {item.badge && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>1</Text>
              </View>
            )}
          </View>
          <Text style={[styles.label, { color: iconColor(item.route) }]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: "#444",
    backgroundColor: "#000",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 10,
    marginTop: 2,
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -10,
    backgroundColor: "red",
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
    minWidth: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default BottomNavBar;
