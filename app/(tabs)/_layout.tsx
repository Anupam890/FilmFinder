import React from "react";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ICONS = {
  home: { focused: "home", default: "home-outline" },
  search: { focused: "search", default: "search-outline" },
  saved: { focused: "heart", default: "heart-outline" },
  profile: { focused: "person", default: "person-outline" },
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

const createTabIcon = (iconKey: keyof typeof ICONS) => {
  return ({
    color,
    size,
    focused,
  }: {
    color: string;
    size: number;
    focused: boolean;
  }) => (
    <View style={{ alignItems: "center" }}>
      <Ionicons
        name={
          focused
            ? (ICONS[iconKey].focused as any)
            : (ICONS[iconKey].default as any)
        }
        color={color}
        size={size}
      />
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
        tabBarInactiveTintColor: "#9ca3af",
        tabBarStyle: {
          backgroundColor: "#161B2F",
          borderTopWidth: 0,
          height: 80,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarItemStyle: {
          paddingVertical: 10,
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
