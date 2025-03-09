import React from "react";
import { Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { View } from "react-native";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FFD700",
        tabBarInactiveTintColor: "#6b7280",
        tabBarStyle: {
          backgroundColor: "#161B2F",
          borderTopWidth: 0,
          height: 60,
          paddingVertical: 5,
          bottom: 30,
          position: "absolute",
          
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,

          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: "center" }}>
              <AntDesign name="home" color={color} size={size} />
              {focused && (
                <View
                  style={{
                    width: 6,
                    height: 6,
                    backgroundColor: "#FFD700",
                    borderRadius: 3,
                    marginTop: 4,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: "center" }}>
              <AntDesign name="search1" color={color} size={size} />
              {focused && (
                <View
                  style={{
                    width: 6,
                    height: 6,
                    backgroundColor: "#FFD700",
                    borderRadius: 3,
                    marginTop: 4,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: "center" }}>
              <AntDesign name="hearto" color={color} size={size} />
              {focused && (
                <View
                  style={{
                    width: 6,
                    height: 6,
                    backgroundColor: "#FFD700",
                    borderRadius: 3,
                    marginTop: 4,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;