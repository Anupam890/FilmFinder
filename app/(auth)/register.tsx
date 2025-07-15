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
import React, { useState } from "react";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
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
        userData.password
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
          <View className="bg-gray-800 rounded-lg p-3 mb-4 flex-row items-center">
            <AntDesign name="user" size={20} color="#fff" />
            <TextInput
              className="flex-1 text-white ml-2 text-base"
              placeholder="Full name"
              placeholderTextColor="#fff"
              value={userData.name}
              onChangeText={(text) => handleChange("name", text)}
              autoCapitalize="words"
            />
          </View>

          {/* Email */}
          <Text className="text-gray-400 mb-1">Email</Text>
          <View className="bg-gray-800 rounded-lg p-3 mb-4 flex-row items-center">
            <AntDesign name="mail" size={20} color="#fff" />
            <TextInput
              className="flex-1 text-white ml-2 text-base"
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

          {/* Terms */}
          <TouchableOpacity
            className="flex-row items-center mb-6"
            onPress={() => setIsAccepted(!isAccepted)}
          >
            <AntDesign
              name={isAccepted ? "checkcircle" : "checkcircleo"}
              size={18}
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
            {[{
              name: "Facebook",
              icon: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Facebook_icon_2013.svg",
            }, {
              name: "Google",
              icon: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
            }, {
              name: "Apple",
              icon: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
            }].map((provider, i) => (
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
