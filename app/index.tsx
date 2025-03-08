import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Link } from "expo-router";
import { StatusBar } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Index() {
  

  const moviePosters = [
    {
      id: "1",
      title: "Plane",
      uri: "https://image.tmdb.org/t/p/w500/qi9r5xBgcc9KTxlOLjssDp4GAs.jpg",
    },
    {
      id: "2",
      title: "Barbie",
      uri: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    },
    {
      id: "3",
      title: "Challengers",
      uri: "https://image.tmdb.org/t/p/w500/xHFKfr2K2kgmgND2fR4czseW6.jpg",
    },
    {
      id: "4",
      title: "Dune",
      uri: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    },
    {
      id: "5",
      title: "Oppenheimer",
      uri: "https://image.tmdb.org/t/p/w500/nb3xI8XI3w4pMVZ38ZL2lkH2xn.jpg",
    },
    {
      id: "6",
      title: "Avatar",
      uri: "https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkkiOBpom6.jpg",
    },
  ];

  const renderPoster = ({ item }) => (
    <Image
      source={{ uri: item.uri }}
      className="w-24 h-32 m-1 rounded-lg"
      resizeMode="cover"
    />
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 bg-[#161B2F]">
          <StatusBar barStyle="light-content" backgroundColor="#161B2F" />
          <View className="px-4 pt-4">
            <FlatList
              data={moviePosters}
              renderItem={renderPoster}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4"
            />
          </View>
          <View className="flex-1 justify-center items-center px-4">
            <View className="items-center">
              <Text className="text-white text-4xl font-bold text-center mb-4">
                Discover New Movies
              </Text>
              <Text className="text-gray-300 text-lg text-center mb-4">
                For Every Mood
              </Text>
              <Text className="text-gray-400 text-sm text-center mb-6">
                Get all access to the latest movies and TV shows
              </Text>
            </View>
            <View className="w-full max-w-xs">
              <View className="bg-gray-800 rounded-lg mb-3 px-3 py-2 flex-row items-center">
                <AntDesign name="user" size={20} color="#9CA3AF" />
                <TextInput
                  className="flex-1 text-white ml-2 text-base"
                  placeholder="Enter your Name"
                  placeholderTextColor="#9CA3AF"
                 
                />
              </View>
              <TouchableOpacity className="bg-secondary py-3 rounded-full">
                <Link href={"/(tabs)/home"}>
                <Text className="text-white text-center text-lg font-semibold">
                 Get Started
                </Text></Link>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
