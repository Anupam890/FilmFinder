import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useState, useContext } from "react";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { AuthContext } from "@/context/AuthContext";
import { auth } from "@/services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleChange = (field: string, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      const user = userCredential.user;
      await login(user);
      router.replace("/(tabs)/home");
    } catch (error: any) {
      console.error("Login error:", error);
      alert(error?.message || "Failed to login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="bg-[#161B2F] h-full flex-1 justify-center px-6">
          <Text className="text-white text-2xl font-bold mb-8 text-center">
            Sign in
          </Text>

          {/* Email Input */}
          <Text className="text-gray-400 mb-2">Email</Text>
          <View className="bg-gray-800 rounded-lg p-2 mb-4 flex-row items-center">
            <AntDesign name="mail" size={20} color="#9CA3AF" />
            <TextInput
              className="flex-1 text-white text-base ml-3"
              placeholder="Your email"
              placeholderTextColor="#9CA3AF"
              onChangeText={(text) => handleChange("email", text)}
              keyboardType="email-address"
              autoCapitalize="none"
              value={userData.email}
            />
          </View>

          {/* Password Input */}
          <Text className="text-gray-400 mb-2">Password</Text>
          <View className="bg-gray-800 rounded-lg p-2 mb-6 flex-row items-center">
            <AntDesign name="lock" size={20} color="#9CA3AF" />
            <TextInput
              className="flex-1 text-white text-base ml-3"
              placeholder="Enter your password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              onChangeText={(text) => handleChange("password", text)}
              autoCapitalize="none"
              value={userData.password}
            />
          </View>

          {/* Sign In Button */}
          <TouchableOpacity
            className="bg-[#FFD700] py-4 rounded-xl mb-6"
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#161B2F" />
            ) : (
              <Text className="text-[#161B2F] text-center text-lg font-bold">
                Sign In
              </Text>
            )}
          </TouchableOpacity>

          {/* Social Sign-In Options (optional) */}
          <Text className="text-gray-400 text-center text-base mb-6">
            Or Sign in with
          </Text>
          <View className="flex-row justify-center gap-4 mb-6">
            <TouchableOpacity className="bg-white rounded-full p-3">
              <Image
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Facebook_icon_2013.svg",
                }}
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <TouchableOpacity className="bg-white rounded-full p-3">
              <Image
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
                }}
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <TouchableOpacity className="bg-white rounded-full p-3">
              <Image
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
                }}
                className="w-6 h-6"
              />
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <TouchableOpacity
            className="mt-8"
            onPress={() => router.push("/(auth)/register")}
          >
            <Text className="text-[#FFD700] text-center text-base">
              Don't have an account? Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
