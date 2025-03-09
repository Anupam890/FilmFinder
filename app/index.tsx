import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { Link } from "expo-router";
import React, { useEffect } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { BlurView } from "expo-blur";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export default function Index() {
  const fadeIn = useSharedValue(0);

  useEffect(() => {
    fadeIn.value = withTiming(1, { duration: 1000 });
  }, [fadeIn]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
    transform: [{ translateY: (1 - fadeIn.value) * 20 }],
  }));

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          source={require("@/assets/images/background.jpeg")}
          style={{ flex: 1 }}
        >
          <StatusBar barStyle="light-content" hidden />
          <View className="flex-1 justify-center items-center px-4">
            <Animated.View
              style={[animatedStyle, { width: "100%", maxWidth: 300 }]}
            >
              <View className="bg-gray-800 rounded-lg mb-2 px-3 py-1 flex-row items-center">
                <AntDesign name="user" size={18} color="#9CA3AF" />
                <TextInput
                  className="flex-1 text-white ml-2 text-sm"
                  placeholder="Enter your Name"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <TouchableOpacity className="bg-secondary py-2 rounded-lg">
                <Link href={"/(auth)/register"} asChild>
                  <Text className="text-white text-center text-base font-semibold">
                    Get Started
                  </Text>
                </Link>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
