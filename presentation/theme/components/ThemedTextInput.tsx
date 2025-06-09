import { View, Text, TextInputProps, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "../hooks/useThemeColor";

interface Props extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
  error?: boolean;
  helperText?: string;
}

const ThemedTextInput = ({ icon, error, helperText, ...rest }: Props) => {
  const primaryColor = useThemeColor({}, "primary");
  const textColor = useThemeColor({}, "text");

  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef<TextInput>(null);

  return (
    <View style={{ marginBottom: 4 }}>
      <View
        style={{
          ...styles.border,
          borderColor: error ? "red" : isActive ? primaryColor : "#ccc",
        }}
        onTouchStart={() => inputRef.current?.focus()}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={24}
            color={textColor}
            style={{ marginRight: 10 }}
          />
        )}

        <TextInput
          ref={inputRef}
          placeholderTextColor="#5c5c5c"
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
          style={{
            color: textColor,
            marginRight: 10,
            flex: 1,
          }}
          {...rest}
        />
      </View>

      {helperText && (
        <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
          {helperText}
        </Text>
      )}
    </View>
  );
};

export default ThemedTextInput;

const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
  },
});
