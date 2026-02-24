import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import { Link } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "@/context/FavoritesContext";

interface MovieCardProps {
  id: number;
  poster_path?: string;
  title: string;
  vote_average: number;
  release_date: string;
  width?: number | string;
  containerStyle?: string;
}

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
  width = "100%",
  containerStyle = "",
}: MovieCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(id);

  const handleFavorite = (e: any) => {
    toggleFavorite({
      id,
      poster_path: poster_path || "",
      title,
      vote_average,
      release_date,
    });
  };

  return (
    <View style={{ width: width as any }} className={containerStyle}>
      <Link href={`/movie/${id}`} asChild>
        <TouchableOpacity activeOpacity={0.7}>
          <View className="shadow-lg shadow-black/50 relative">
            <Image
              source={{
                uri: poster_path
                  ? `https://image.tmdb.org/t/p/w400${poster_path}`
                  : "https://via.placeholder.com/400x600?text=No+Poster",
              }}
              className="w-full aspect-[2/3] rounded-2xl"
              resizeMode="cover"
            />

            {/* Rating Badge */}
            <View className="absolute top-2 left-2 bg-black/60 rounded-lg px-2 py-1 flex-row items-center border border-white/10">
              <Ionicons name="star" size={10} color="#FFD700" />
              <Text className="text-[10px] text-white ml-1 font-bold">
                {(vote_average / 2).toFixed(1)}
              </Text>
            </View>

            {/* Quick Fav Toggle */}
            <Pressable
              onPress={handleFavorite}
              className="absolute top-2 right-2 bg-black/40 p-2 rounded-full border border-white/10"
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            >
              <Ionicons
                name={favorite ? "heart" : "heart-outline"}
                size={16}
                color={favorite ? "#ef4444" : "white"}
              />
            </Pressable>
          </View>

          <Text
            className="text-sm font-semibold text-white mt-3 px-1"
            numberOfLines={1}
          >
            {title}
          </Text>
          <Text className="text-xs text-gray-400 mt-1 px-1">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default MovieCard;
