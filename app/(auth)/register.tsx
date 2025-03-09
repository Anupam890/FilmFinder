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
  Switch,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { client } from "@/services/appwrite";
import { Account, ID } from "react-native-appwrite";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isAccepted, setIsAccepted] = useState(false);

  const handleChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const acc = new Account(client);

  const handleRegister = async () => {
    if (!isAccepted) {
      alert("Please accept the terms and privacy policy");
      return;
    }
    try {
      const createAccount = await acc.create(
        ID.unique(),
        userData.email,
        userData.password
      );

      await acc.updatePrefs({ name: userData.name });

      console.log("Account Created:", createAccount);
      router.replace("/(tabs)/home");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Failed to register. Please try again.");
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
            Sign up
          </Text>
          <Text className="text-gray-400 mb-2">Full Name</Text>
          <View className="bg-gray-800 rounded-lg p-4 mb-4 flex-row items-center">
            <AntDesign name="user" size={20} color="#9CA3AF" />
            <TextInput
              className="flex-1 text-white text-base ml-3"
              placeholder="Full Name"
              placeholderTextColor="#9CA3AF"
              onChangeText={(text) => handleChange("name", text)}
              autoCapitalize="words"
            />
          </View>
          <Text className="text-gray-400 mb-2">Email</Text>
          <View className="bg-gray-800 rounded-lg p-4 mb-4 flex-row items-center">
            <AntDesign name="mail" size={20} color="#9CA3AF" />
            <TextInput
              className="flex-1 text-white text-base ml-3"
              placeholder="Your email"
              placeholderTextColor="#9CA3AF"
              onChangeText={(text) => handleChange("email", text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <Text className="text-gray-400 mb-2">Password</Text>
          <View className="bg-gray-800 rounded-lg p-4 mb-4 flex-row items-center">
            <AntDesign name="lock" size={20} color="#9CA3AF" />
            <TextInput
              className="flex-1 text-white text-base ml-3"
              placeholder="Enter your password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              onChangeText={(text) => handleChange("password", text)}
              autoCapitalize="none"
            />
            <AntDesign name="eye" size={20} color="#9CA3AF" />
          </View>
          <View className="flex-row items-center mb-6">
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isAccepted ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setIsAccepted}
              value={isAccepted}
            />
            <Text className="text-gray-400 text-base ml-2">
              I accept the terms and privacy policy
            </Text>
          </View>
          <TouchableOpacity
            className="bg-[#FFD700] py-4 rounded-xl mb-6"
            onPress={handleRegister}
          >
            <Text className="text-[#161B2F] text-center text-lg font-bold">
              Sign up
            </Text>
          </TouchableOpacity>
          <Text className="text-gray-400 text-center text-base mb-6">
            Or Register with
          </Text>
          <View className="flex-row justify-center gap-4 mb-6">
            <TouchableOpacity className="rounded-full p-3">
              <Image
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Facebook_icon_2013.svg",
                }}
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <TouchableOpacity className="rounded-full p-3">
              <Image
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
                }}
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <TouchableOpacity className="rounded-full p-3">
              <Image
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
                }}
                className="w-6 h-6"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="mt-8"
            onPress={() => router.push("/(auth)/login")}
          >
            <Text className="text-[#FFD700] text-center text-base">
              Already have an account? Log in
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Register;
