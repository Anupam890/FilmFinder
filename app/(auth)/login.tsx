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
  Alert,
} from "react-native";
import * as Haptics from "expo-haptics";
import React, { useState, useContext, useEffect } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "@/context/AuthContext";
import { auth } from "@/services/firebase";
import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import * as AppleAuthentication from "expo-apple-authentication";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const { login: authLogin } = useContext(AuthContext);

  // Google Sign-In Configuration
  // Note: These IDs should be created in the Firebase/Google Cloud Console
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "YOUR_ANDROID_CLIENT_ID",
    iosClientId: "YOUR_IOS_CLIENT_ID",
    webClientId: "YOUR_WEB_CLIENT_ID",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      handleGoogleLogin(id_token);
    }
  }, [response]);

  const handleGoogleLogin = async (idToken: string) => {
    setLoading(true);
    try {
      const credential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(auth, credential);
      await authLogin(userCredential.user);
      router.replace("/(tabs)/home");
    } catch (error: any) {
      console.error(error);
      alert("Google login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      setLoading(true);
      const { identityToken } = credential;
      if (identityToken) {
        const provider = new OAuthProvider("apple.com");
        const firebaseCredential = provider.credential({
          idToken: identityToken,
        });
        const userCredential = await signInWithCredential(
          auth,
          firebaseCredential,
        );
        await authLogin(userCredential.user);
        router.replace("/(tabs)/home");
      }
    } catch (e: any) {
      if (e.code === "ERR_CANCELED") {
        // handle cancel
      } else {
        alert("Apple login failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    if (!userData.email || !userData.password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userData.email,
        userData.password,
      );
      await authLogin(userCredential.user);
      router.replace("/(tabs)/home");
    } catch (error: any) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      alert(error?.message || "Login failed.");
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 justify-center px-8">
            {/* Header Section */}
            <View className="items-center mb-10">
              <View className="bg-[#1F263F] p-5 rounded-[30px] shadow-2xl shadow-black/50 border border-white/5 mb-6">
                <Ionicons name="film" size={50} color="#FFD700" />
              </View>
              <Text className="text-white text-3xl font-extrabold tracking-tight">
                Welcome Back
              </Text>
              <Text className="text-gray-400 text-sm mt-2 font-medium">
                Please sign in to your account
              </Text>
            </View>

            {/* Form Section */}
            <View className="space-y-4">
              <View>
                <Text className="text-gray-400 mb-2 ml-1 text-xs font-bold uppercase tracking-widest">
                  Email Address
                </Text>
                <View className="bg-[#1F2937]/50 rounded-2xl p-3 flex-row items-center border border-white/5 focus:border-secondary">
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

              <TouchableOpacity className="self-end mt-2">
                <Text className="text-secondary text-xs font-bold">
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            {/* Action Button */}
            <TouchableOpacity
              className="bg-[#FFD700] p-4 rounded-2xl mt-8 shadow-xl shadow-[#FFD700]/20 h-14 justify-center"
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#161B2F" />
              ) : (
                <Text className="text-[#161B2F] text-center text-lg font-bold">
                  Sign In
                </Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center my-10">
              <View className="flex-1 h-[1px] bg-white/5" />
              <Text className="text-gray-500 px-4 text-xs font-bold uppercase tracking-widest">
                Or Continue With
              </Text>
              <View className="flex-1 h-[1px] bg-white/5" />
            </View>

            {/* Social Logins */}
            <View className="flex-row justify-center space-x-4 gap-4">
              <TouchableOpacity
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  promptAsync();
                }}
                className="bg-white p-4 rounded-2xl shadow-sm flex-1 items-center justify-center"
              >
                <Ionicons name="logo-google" size={24} color="#DB4437" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  handleAppleLogin();
                }}
                className="bg-white p-4 rounded-2xl shadow-sm flex-1 items-center justify-center"
              >
                <Ionicons name="logo-apple" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  Alert.alert(
                    "Coming Soon",
                    "Facebook login is currently in development.",
                  );
                }}
                className="bg-white p-4 rounded-2xl shadow-sm flex-1 items-center justify-center"
              >
                <Ionicons name="logo-facebook" size={24} color="#1877F2" />
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View className="flex-row justify-center mt-10">
              <Text className="text-gray-400 text-sm font-medium">
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
                <Text className="text-secondary text-sm font-bold underline">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
