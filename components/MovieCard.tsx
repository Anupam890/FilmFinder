import { View, Text, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface MovieCardProps {
  id: number;
  poster_path?: string;
  title: string;
  vote_average: number;
  release_date: string;
}

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: MovieCardProps) => {
  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity className="mr-5 w-32">
        <View className="shadow-lg shadow-black/50">
          <Image
            source={{
              uri: poster_path
                ? `https://image.tmdb.org/t/p/w400${poster_path}`
                : "https://via.placeholder.com/400x600",
            }}
            className="w-32 h-48 rounded-2xl"
            resizeMode="cover"
          />
          <View className="absolute top-2 right-2 bg-black/60 rounded-lg px-2 py-1 flex-row items-center border border-white/10">
            <Ionicons name="star" size={10} color="#FFD700" />
            <Text className="text-[10px] text-white ml-1 font-bold">
              {(vote_average / 2).toFixed(1)}
            </Text>
          </View>
        </View>
        <Text
          className="text-sm font-semibold text-white mt-2 leading-tight"
          numberOfLines={2}
        >
          {title}
        </Text>
        <Text className="text-xs text-gray-500 mt-0.5">
          {release_date ? release_date.split("-")[0] : "N/A"}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
