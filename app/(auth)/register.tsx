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
  SafeAreaView,
  ScrollView,
} from "react-native";
import * as Haptics from "expo-haptics";
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
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: string, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    if (!userData.name || !userData.email || !userData.password) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
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
    <SafeAreaView className="flex-1 bg-backGround">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 justify-center px-8 py-10">
              {/* Header Section */}
              <View className="items-center mb-8">
                <View className="bg-[#1F263F] p-5 rounded-[30px] shadow-2xl shadow-black/50 border border-white/5 mb-6">
                  <Ionicons name="sparkles" size={50} color="#FFD700" />
                </View>
                <Text className="text-white text-3xl font-extrabold tracking-tight">
                  Create Account
                </Text>
                <Text className="text-gray-400 text-sm mt-2 font-medium">
                  Join our community of movie lovers
                </Text>
              </View>

              {/* Form Section */}
              <View className="space-y-4">
                <View>
                  <Text className="text-gray-400 mb-2 ml-1 text-xs font-bold uppercase tracking-widest">
                    Full Name
                  </Text>
                  <View className="bg-[#1F2937]/50 rounded-2xl p-3 flex-row items-center border border-white/5">
                    <Ionicons name="person-outline" size={20} color="#9ca3af" />
                    <TextInput
                      className="flex-1 text-white ml-3 text-base font-medium"
                      placeholder="John Doe"
                      placeholderTextColor="#4B5563"
                      value={userData.name}
                      onChangeText={(text) => handleChange("name", text)}
                      autoCapitalize="words"
                    />
                  </View>
                </View>

                <View className="mt-4">
                  <Text className="text-gray-400 mb-2 ml-1 text-xs font-bold uppercase tracking-widest">
                    Email Address
                  </Text>
                  <View className="bg-[#1F2937]/50 rounded-2xl p-3 flex-row items-center border border-white/5">
                    <Ionicons name="mail-outline" size={20} color="#9ca3af" />
                    <TextInput
                      className="flex-1 text-white ml-3 text-base font-medium"
                      placeholder="name@example.com"
                      placeholderTextColor="#4B5563"
                      value={userData.email}
                      onChangeText={(text) => handleChange("email", text)}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                <View className="mt-4">
                  <Text className="text-gray-400 mb-2 ml-1 text-xs font-bold uppercase tracking-widest">
                    Password
                  </Text>
                  <View className="bg-[#1F2937]/50 rounded-2xl p-3 flex-row items-center border border-white/5">
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color="#9ca3af"
                    />
                    <TextInput
                      className="flex-1 text-white ml-3 text-base font-medium"
                      placeholder="••••••••"
                      placeholderTextColor="#4B5563"
                      value={userData.password}
                      onChangeText={(text) => handleChange("password", text)}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                    />
                    <TouchableOpacity
                      onPress={() => {
                        Haptics.selectionAsync();
                        setShowPassword(!showPassword);
                      }}
                    >
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color="#9ca3af"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <Text className="text-gray-500 text-[10px] mt-4 text-center leading-4">
                  By signing up, you agree to our{" "}
                  <Text className="text-secondary font-bold">
                    Terms of Service
                  </Text>{" "}
                  and{" "}
                  <Text className="text-secondary font-bold">
                    Privacy Policy
                  </Text>
                </Text>
              </View>

              {/* Action Button */}
              <TouchableOpacity
                className="bg-[#FFD700] p-4 rounded-2xl mt-8 shadow-xl shadow-[#FFD700]/20 h-14 justify-center"
                onPress={handleRegister}
                disabled={loading}
                activeOpacity={0.8}
              >
                {loading ? (
                  <ActivityIndicator color="#161B2F" />
                ) : (
                  <Text className="text-[#161B2F] text-center text-lg font-bold">
                    Create Account
                  </Text>
                )}
              </TouchableOpacity>

              {/* Divider */}
              <View className="flex-row items-center my-10">
                <View className="flex-1 h-[1px] bg-white/5" />
                <Text className="text-gray-500 px-4 text-xs font-bold uppercase tracking-widest">
                  Or Sign Up With
                </Text>
                <View className="flex-1 h-[1px] bg-white/5" />
              </View>

              {/* Social Logins */}
              <View className="flex-row justify-center space-x-4 gap-4">
                <TouchableOpacity
                  onPress={() =>
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                  }
                  className="bg-white p-4 rounded-2xl shadow-sm flex-1 items-center justify-center"
                >
                  <Ionicons name="logo-google" size={24} color="#DB4437" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                  }
                  className="bg-white p-4 rounded-2xl shadow-sm flex-1 items-center justify-center"
                >
                  <Ionicons name="logo-apple" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                  }
                  className="bg-white p-4 rounded-2xl shadow-sm flex-1 items-center justify-center"
                >
                  <Ionicons name="logo-facebook" size={24} color="#1877F2" />
                </TouchableOpacity>
              </View>

              {/* Footer */}
              <View className="flex-row justify-center mt-10">
                <Text className="text-gray-400 text-sm font-medium">
                  Already have an account?{" "}
                </Text>
                <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                  <Text className="text-secondary text-sm font-bold underline">
                    Log In
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
