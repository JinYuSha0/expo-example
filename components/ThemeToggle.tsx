import { useCssColorVariable } from "@/utils/ui";
import Feather from "@expo/vector-icons/Feather";
import { useColorScheme } from "nativewind";
import React, { memo } from "react";
import { Pressable } from "react-native";

const ThemeToggle: React.FC = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <Pressable onPress={toggleColorScheme}>
      <Feather
        size={24}
        name={colorScheme === "light" ? "moon" : "sun"}
        color={useCssColorVariable("--foreground")}
      />
    </Pressable>
  );
};

export default memo(ThemeToggle);
