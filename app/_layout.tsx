import { Stack } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./global.css";

export default function RootLayout() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="(tabs)/home" />
      ) : (
        <Stack.Screen name="(auth)/login" />
      )}
      <Stack.Screen name="(auth)/register" />
    </Stack>
  );
}
