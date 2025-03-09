import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { getMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Share } from "react-native"; // Add this import
import { router } from "expo-router";

interface MovieReference {
  label: string;
  value: string | number | null;
}

const MovieInfo = ({ label, value }: MovieReference) => {
  return (
    <View className="flex-col items-start justify-center mb-3">
      <Text className="text-white font-bold text-sm ">{label}</Text>
      <Text className="text-white font-normal text-sm mt-1">
        {value ?? "N/A"}
      </Text>
    </View>
  );
};

const Info = () => {
  const [Fav, setFav] = useState([]);
  const { id } = useLocalSearchParams();
  const {
    Data: movie,
    Error: error,
    Loading: loading,
  } = useFetch(() => getMovieDetails(id as string));

  const handleShare = async () => {
    try {
      const shareOptions = {
        message: `Check out this movie: ${movie?.title}\n\n${
          movie?.poster_path
        }\n\nRating: ${movie?.vote_average?.toFixed(1)}/10`,
        title: `Share ${movie?.title}`,
        url: movie?.homepage || `https://www.themoviedb.org/movie/${id}`,
      };

      await Share.share(shareOptions);
    } catch (error) {
      console.error("Error sharing movie:", error);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-backGround">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-backGround">
        <Text className="text-red-500">Error fetching movie details</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-backGround h-full">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Movie Poster */}
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[450px]"
            resizeMode="cover"
          />
        </View>

        {/* Movie Details */}
        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-2xl font-bold text-white">{movie?.title}</Text>

          <View className="flex-row items-center gap-3 mt-2">
            <Text className="text-white">
              {movie?.release_date?.split("-")[0] ?? "N/A"}
            </Text>
            {movie?.runtime ? (
              <Text className="text-white">{movie.runtime} min</Text>
            ) : null}
          </View>

          <View className="flex-row items-center gap-2 mt-2">
            <View className="flex-row items-center gap-1">
              <AntDesign name="star" size={20} color="#FFD700" />
              <Text className="text-white">
                {movie?.vote_average?.toFixed(1) ?? "N/A"}/10
              </Text>
            </View>
            <Text className="text-white">
              ({movie?.vote_count ?? "0"} votes)
            </Text>
          </View>
        </View>

        {/* 3 sections Bar  */}
        <View className="flex-row justify-around mt-5 px-5 py-3">
          <TouchableOpacity className="flex-row justify-center items-center gap-5 bg-gray-700 rounded-lg py-3 px-3">
            <AntDesign name="videocamera" size={28} color="#FFD700" />
            <Text className="text-white text-sm mt-1">Trailer</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row justify-center items-center gap-5 bg-gray-700 rounded-lg py-3 px-3">
            <AntDesign name="hearto" size={28} color="#FFD700" />
            <Text className="text-white text-sm mt-1">Favorites</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleShare}
            className="flex-row justify-center items-center gap-5 bg-gray-700 rounded-lg py-3 px-3"
          >
            <AntDesign name="sharealt" size={28} color="#FFD700" />
            <Text className="text-white text-sm mt-1">Share</Text>
          </TouchableOpacity>
        </View>

        {/* Overview Section */}
        <View className="flex-col items-start justify-center mt-5 px-5">
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={
              movie?.genres?.map((genre: any) => genre.name).join(" - ") ??
              "N/A"
            }
          />
          <View className="flex-row justify-start gap-8 w-full">
            <MovieInfo
              label="Budget"
              value={`$${movie?.budget?.toLocaleString() ?? "N/A"}`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${movie?.revenue?.toLocaleString() ?? "N/A"}`}
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies
                ?.map((company: any) => company.name)
                .join(" - ") ?? "N/A"
            }
          />
        </View>

        {/* Casts Section */}
        <View className="flex-col items-start justify-center mt-5 px-5 mb-5">
          <Text className="text-white font-bold text-lg mb-2">Casts</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {movie?.cast?.slice(0, 10).map((cast: any) => (
              <View
                key={cast.id}
                className="flex-col items-center justify-center mr-5"
              >
                <Image
                  source={{
                    uri: cast.profile_path
                      ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
                      : "https://via.placeholder.com/100x150.png?text=No+Image",
                  }}
                  className="w-[100px] h-[100px] rounded-full"
                  resizeMode="cover"
                />
                <Text className="text-white text-sm mt-1">{cast.name}</Text>
                <Text className="text-gray-400 text-xs mt-1">
                  {cast.character}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-row items-center justify-center bg-gray-700 py-3 gap-2"
          >
            <AntDesign name="arrowleft" size={24} color="#FFD700" />
            <Text className="text-white text-sm">Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* back button  */}
    </View>
  );
};

export default Info;
