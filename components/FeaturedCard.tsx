import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { Link } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface FeaturedCardProps {
  id: number;
  backdrop_path?: string;
  title: string;
  vote_average: number;
  overview: string;
}

const FeaturedCard = ({
  id,
  backdrop_path,
  title,
  vote_average,
  overview,
}: FeaturedCardProps) => {
  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity className="mr-5 w-80 h-48 rounded-3xl overflow-hidden">
        <ImageBackground
          source={{
            uri: backdrop_path
              ? `https://image.tmdb.org/t/p/w780${backdrop_path}`
              : "https://via.placeholder.com/780x440",
          }}
          className="flex-1"
          resizeMode="cover"
        >
          <LinearGradient
            colors={["transparent", "rgba(22, 27, 47, 0.9)"]}
            className="flex-1 justify-end p-4"
          >
            <View className="flex-row items-center mb-1">
              <View className="bg-[#FFD700] px-2 py-0.5 rounded-md mr-2">
                <Text className="text-[10px] font-bold text-black">
                  TRENDING
                </Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="star" size={12} color="#FFD700" />
                <Text className="text-white text-xs ml-1 font-bold">
                  {(vote_average / 2).toFixed(1)}
                </Text>
              </View>
            </View>
            <Text className="text-white text-xl font-bold" numberOfLines={1}>
              {title}
            </Text>
            <Text className="text-gray-300 text-xs mt-1" numberOfLines={2}>
              {overview}
            </Text>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    </Link>
  );
};

export default FeaturedCard;
