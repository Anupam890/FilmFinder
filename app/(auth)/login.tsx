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
  Switch,
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
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const { login } = useContext(AuthContext);

  const handleChange = (field: string, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    if (!acceptedTerms) {
      alert("Please accept the terms and privacy policy");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      await login(userCredential.user);
      router.replace("/(tabs)/home");
    } catch (error: any) {
      alert(error?.message || "Login failed.");
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
          {/* Logo */}
          <View className="items-center mb-6">
            <View className="w-16 h-16 rounded-full bg-white justify-center items-center">
              <Text className="text-[#161B2F] text-2xl font-bold">L</Text>
            </View>
          </View>

          {/* Title */}
          <Text className="text-white text-2xl font-bold mb-6 text-center">
            Sign In
          </Text>

          {/* Email */}
          <Text className="text-gray-400 mb-1">Email</Text>
          <View className="bg-gray-800 rounded-lg p-3 mb-4 flex-row items-center">
            <AntDesign name="mail" size={20} color="#fff" />
            <TextInput
              className="flex-1 text-[#161B2F] ml-2 text-base"
              placeholder="Your email"
              placeholderTextColor="#fff"
              value={userData.email}
              onChangeText={(text) => handleChange("email", text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password */}
          <Text className="text-gray-400 mb-1">Password</Text>
          <View className="bg-gray-800 rounded-lg p-3 mb-4 flex-row items-center">
            <AntDesign name="lock" size={20} color="#fff" />
            <TextInput
              className="flex-1 text-white ml-2 text-base"
              placeholder="Enter your password"
              placeholderTextColor="#fff"
              value={userData.password}
              onChangeText={(text) => handleChange("password", text)}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <AntDesign
                name={showPassword ? "eye" : "eyeo"}
                size={20}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

          {/* Terms & Privacy */}
          <TouchableOpacity
            className="flex-row items-center mb-4"
            onPress={() => setAcceptedTerms(!acceptedTerms)}
          >
            <AntDesign
              name={acceptedTerms ? "checkcircle" : "checkcircleo"}
              size={18}
              color={acceptedTerms ? "#FFD700" : "#6B7280"}
            />
            <Text className="ml-2 text-white">
              I accept the terms and privacy policy
            </Text>
          </TouchableOpacity>

          {/* Sign In */}
          <TouchableOpacity
            className="bg-[#FFD700] py-4 rounded-full mb-6"
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#161B2F" />
            ) : (
              <Text className="text-[#161B2F] text-center text-base font-bold">
                Sign In
              </Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center justify-center mb-4">
            <View className="flex-1 h-px bg-gray-600" />
            <Text className="text-gray-400 px-2">Or Register with</Text>
            <View className="flex-1 h-px bg-gray-600" />
          </View>

          {/* Social Buttons */}
          <View className="flex-row justify-between gap-3 mb-8">
            {[
              {
                name: "Facebook",
                icon: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Facebook_icon_2013.svg",
              },
              {
                name: "Google",
                icon: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
              },
              {
                name: "Apple",
                icon: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
              },
            ].map((provider, i) => (
              <TouchableOpacity
                key={i}
                className="flex-1 bg-white py-3 rounded-lg flex-row items-center justify-center"
              >
                <Image
                  source={{ uri: provider.icon }}
                  className="w-5 h-5 mr-2"
                />
                <Text className="text-black font-semibold">
                  {provider.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Sign Up Link */}
          <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
            <Text className="text-white text-center">
              Don’t have an account?{" "}
              <Text className="text-[#FFD700] font-semibold">Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
