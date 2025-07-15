import React from "react";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const ICONS = {
  home: "home",
  search: "search1",
  saved: "hearto",
  profile: "user",
};

const FocusIndicator = () => (
  <View
    style={{
      width: 6,
      height: 6,
      backgroundColor: "#FFD700",
      borderRadius: 3,
      marginTop: 4,
    }}
  />
);

const createTabIcon = (iconName: keyof typeof ICONS) => {
  return ({ color, size, focused }: { color: string; size: number; focused: boolean }) => (
    <View style={{ alignItems: "center" }}>
      <AntDesign name={ICONS[iconName]} color={color} size={size} />
      {focused && <FocusIndicator />}
    </View>
  );
};

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FFD700",
        tabBarInactiveTintColor: "#6b7280",
        tabBarStyle: {
          backgroundColor: "#1f2937",
          borderTopWidth: 0,
          height: 80,
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: createTabIcon("home"),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          tabBarIcon: createTabIcon("search"),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          headerShown: false,
          tabBarIcon: createTabIcon("saved"),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: createTabIcon("profile"),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
