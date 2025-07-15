import { View, Text } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const Saved = () => {
  return (
    <View className="flex-1 bg-backGround px-6 justify-center items-center">
      <Text className="text-white text-3xl font-extrabold mb-6 self-start mt-10">
        Saved
      </Text>

      <View className="w-full h-64 bg-[#1F263F] rounded-2xl justify-center items-center shadow-lg mt-10 px-4">
        <AntDesign name="hearto" size={50} color="#FFD700" />
        <Text className="text-white text-xl font-semibold mt-4">
          No Saved Movies
        </Text>
        <Text className="text-gray-400 text-sm text-center mt-2">
          Start exploring and tap the heart icon to save your favorite movies here.
        </Text>
      </View>
    </View>
  );
};

export default Saved;
