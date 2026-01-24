import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { Link } from "expo-router";
import React, { useEffect } from "react";
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
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
    transform: [{ translateY: (1 - fadeIn.value) * 20 }],
  }));

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ImageBackground
        source={require("@/assets/images/background.jpeg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />

        <View className="flex-1 justify-end pb-20 px-6">
          <Animated.View style={[animatedStyle]}>
            <BlurView
              intensity={60}
              tint="dark"
              className="p-6 rounded-2xl bg-black/30"
            >
              <Image
                source={require("@/assets/images/logo.png")}
                className="w-20 h-20 mb-4"
                resizeMode="contain"
              />
              <Text className="text-white text-3xl font-bold mb-2">
                FilmFinder
              </Text>
              <Text className="text-gray-300 text-base mb-6">
                Discover trending movies and save your favorites.
              </Text>

              <Link href={"/(auth)/register"} asChild>
                <TouchableOpacity className="bg-secondary py-3 rounded-xl">
                  <Text className="text-white text-center text-lg font-semibold">
                    Get Started
                  </Text>
                </TouchableOpacity>
              </Link>
            </BlurView>
          </Animated.View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
