import { View, Text } from "react-native";
import React from "react";
import { useThemeColor } from "../hooks/useThemeColor";
import { Link, LinkProps } from "expo-router";

interface Props extends LinkProps {}

const ThemedLink = ({ style, ...rest }: Props) => {
  const primaryColor = useThemeColor({}, "primary");

  return (
    <Link
      style={[
        {
          color: primaryColor,
        },
        style,
      ]}
      {...rest}
    />
  );
};

export default ThemedLink;
