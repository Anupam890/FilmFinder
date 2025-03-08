import { View, Text, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://via.placeholder.com/500",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {title}
        </Text>
        <View className=" flex-row items-center mt-1">
          <AntDesign name="star" size={12} color="#FFD700" />
          <Text className="text-xs text-white ml-1">
            {Math.round(vote_average / 2)}
          </Text>
          <View className="flex-row items-center ml-2">
            <AntDesign name="calendar" size={12} color="#FFD700" />
            <Text className="text-xs text-white ml-1">
              {release_date.split("-")[0]}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
