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
import React, { useState } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/services/firebase";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isAccepted, setIsAccepted] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: string, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    if (!isAccepted) {
      alert("Please accept the terms and privacy policy.");
      return;
    }

    if (!userData.name || !userData.email || !userData.password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password,
      );

      await updateProfile(userCredential.user, {
        displayName: userData.name,
      });

      await sendEmailVerification(userCredential.user);

      alert("Verification email sent. Please check your inbox.");
      router.push("/(auth)/login");
    } catch (error: any) {
      alert(error?.message || "Registration failed.");
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
          {/* Title */}
          <Text className="text-white text-2xl font-bold mb-6 text-center">
            Sign Up
          </Text>

          {/* Name */}
          <Text className="text-gray-400 mb-1">Full Name</Text>
          <View className="bg-gray-800 rounded-lg p-3 mb-4 flex-row items-center border border-gray-700">
            <Ionicons name="person-outline" size={20} color="#9ca3af" />
            <TextInput
              className="flex-1 text-white ml-2 text-base"
              placeholder="Full name"
              placeholderTextColor="#9ca3af"
              value={userData.name}
              onChangeText={(text) => handleChange("name", text)}
              autoCapitalize="words"
              style={{ color: "#fff" }}
            />
          </View>

          {/* Email */}
          <Text className="text-gray-400 mb-1">Email</Text>
          <View className="bg-gray-800 rounded-lg p-3 mb-4 flex-row items-center border border-gray-700">
            <Ionicons name="mail-outline" size={20} color="#9ca3af" />
            <TextInput
              className="flex-1 text-white ml-2 text-base"
              placeholder="Your email"
              placeholderTextColor="#9ca3af"
              value={userData.email}
              onChangeText={(text) => handleChange("email", text)}
              keyboardType="email-address"
              autoCapitalize="none"
              style={{ color: "#fff" }}
            />
          </View>

          {/* Password */}
          <Text className="text-gray-400 mb-1">Password</Text>
          <View className="bg-gray-800 rounded-lg p-3 mb-4 flex-row items-center border border-gray-700">
            <Ionicons name="lock-closed-outline" size={20} color="#9ca3af" />
            <TextInput
              className="flex-1 text-white ml-2 text-base"
              placeholder="Enter your password"
              placeholderTextColor="#9ca3af"
              value={userData.password}
              onChangeText={(text) => handleChange("password", text)}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              style={{ color: "#fff" }}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#9ca3af"
              />
            </TouchableOpacity>
          </View>

          {/* Terms */}
          <TouchableOpacity
            className="flex-row items-center mb-6"
            onPress={() => setIsAccepted(!isAccepted)}
          >
            <Ionicons
              name={isAccepted ? "checkmark-circle" : "ellipse-outline"}
              size={20}
              color={isAccepted ? "#FFD700" : "#6B7280"}
            />
            <Text className="ml-2 text-white">
              I accept the terms and privacy policy
            </Text>
          </TouchableOpacity>

          {/* Register Button */}
          <TouchableOpacity
            className="bg-[#FFD700] py-4 rounded-full mb-6"
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#161B2F" />
            ) : (
              <Text className="text-[#161B2F] text-center text-base font-bold">
                Sign Up
              </Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center justify-center mb-4">
            <View className="flex-1 h-px bg-gray-600" />
            <Text className="text-gray-400 px-2">Or Register with</Text>
            <View className="flex-1 h-px bg-gray-600" />
          </View>

          {/* Social Logins */}
          <View className="flex-row justify-between gap-3 mb-8">
            {[
              { name: "Facebook", icon: "logo-facebook", color: "#1877F2" },
              { name: "Google", icon: "logo-google", color: "#DB4437" },
              { name: "Apple", icon: "logo-apple", color: "#000000" },
            ].map((provider, i) => (
              <TouchableOpacity
                key={i}
                className="flex-1 bg-white py-3 rounded-lg flex-row items-center justify-center"
              >
                <Ionicons
                  name={provider.icon as any}
                  size={20}
                  color={provider.color}
                />
                <Text className="text-black font-semibold ml-2">
                  {provider.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Sign In Link */}
          <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
            <Text className="text-white text-center">
              Already have an account?{" "}
              <Text className="text-[#FFD700] font-semibold">Log In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Register;
