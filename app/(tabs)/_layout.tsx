import { HapticTab } from "@/components/HapticTab";
import ThemeToggle from "@/components/ThemeToggle";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { useCssColorVariable } from "@/utils/ui";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";

export default function TabLayout() {
  const backgroundColor = useCssColorVariable("--background");
  const primaryColor = useCssColorVariable("--primary");
  const primaryDisabledColor = useCssColorVariable("--primary", 0.4);
  const foregroundColor = useCssColorVariable("--foreground");
  const borderColor = useCssColorVariable("--border");
  return (
    <Tabs
      screenOptions={{
        tabBarActiveBackgroundColor: backgroundColor,
        tabBarInactiveBackgroundColor: backgroundColor,
        tabBarActiveTintColor: primaryColor,
        tabBarInactiveTintColor: primaryDisabledColor,
        // headerShown: false,
        headerStyle: {
          backgroundColor: backgroundColor,
          shadowColor: foregroundColor,
        },
        headerTitleStyle: {
          color: foregroundColor,
        },
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          borderColor: borderColor,
          position: Platform.select({
            ios: "absolute",
          }),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerRight: () => (
            <View className="pr-2">
              <ThemeToggle />
            </View>
          ),
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="goods"
        options={{
          title: "Goods",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="shopping-cart" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
