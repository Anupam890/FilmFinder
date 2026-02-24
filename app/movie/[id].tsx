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
import { Ionicons } from "@expo/vector-icons";
import { Share, Linking } from "react-native";
import { router, Link } from "expo-router";
import { useFavorites } from "@/context/FavoritesContext";

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
  const { isFavorite, toggleFavorite } = useFavorites();
  const { id } = useLocalSearchParams();
  const {
    Data: movie,
    Error: error,
    Loading: loading,
  } = useFetch(() => getMovieDetails(id as string));

  const handleShare = async () => {
    try {
      const shareMessage = `🎬 Check out "${movie?.title}" on FilmFinder!\n\n⭐️ Rating: ${movie?.vote_average?.toFixed(1)}/10\n📅 Release: ${movie?.release_date}\n\n${movie?.overview?.slice(0, 100)}...\n\n🔗 View more: https://www.themoviedb.org/movie/${movie?.id}`;

      await Share.share({
        message: shareMessage,
        title: movie?.title,
      });
    } catch (error) {
      console.error("Error sharing movie:", error);
    }
  };

  const handleWatchTrailer = async () => {
    if (!movie?.videos || movie.videos.length === 0) {
      alert("No trailer found for this movie.");
      return;
    }

    // Find official trailer or any YouTube video
    const trailer =
      movie.videos.find(
        (v: any) => v.type === "Trailer" && v.site === "YouTube",
      ) || movie.videos.find((v: any) => v.site === "YouTube");

    if (trailer) {
      const url = `https://www.youtube.com/watch?v=${trailer.key}`;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        alert("Cannot open trailer link.");
      }
    } else {
      alert("No official trailer available on YouTube.");
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
              <Ionicons name="star" size={20} color="#FFD700" />
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
          <TouchableOpacity
            onPress={handleWatchTrailer}
            className="flex-row justify-center items-center gap-5 bg-gray-700 rounded-lg py-3 px-3"
          >
            <Ionicons name="videocam" size={28} color="#FFD700" />
            <Text className="text-white text-sm mt-1">Trailer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              movie &&
              toggleFavorite({
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                vote_average: movie.vote_average,
                release_date: movie.release_date,
              })
            }
            className={`flex-row justify-center items-center gap-5 rounded-lg py-3 px-3 ${isFavorite(movie?.id) ? "bg-secondary/20 border border-secondary" : "bg-gray-700"}`}
          >
            <Ionicons
              name={isFavorite(movie?.id) ? "heart" : "heart-outline"}
              size={28}
              color="#FFD700"
            />
            <Text className="text-white text-sm mt-1">
              {isFavorite(movie?.id) ? "Saved" : "Favorite"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleShare}
            className="flex-row justify-center items-center gap-5 bg-gray-700 rounded-lg py-3 px-3"
          >
            <Ionicons name="share-social" size={28} color="#FFD700" />
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
              <Link key={cast.id} href={`/actor/${cast.id}`} asChild>
                <TouchableOpacity className="flex-col items-center justify-center mr-5">
                  <Image
                    source={{
                      uri: cast.profile_path
                        ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
                        : "https://via.placeholder.com/100x150.png?text=No+Image",
                    }}
                    className="w-[100px] h-[100px] rounded-full"
                    resizeMode="cover"
                  />
                  <View className="items-center mt-2">
                    <Text
                      className="text-white text-sm font-semibold"
                      numberOfLines={1}
                    >
                      {cast.name}
                    </Text>
                    <Text className="text-gray-400 text-xs" numberOfLines={1}>
                      {cast.character}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Link>
            ))}
          </ScrollView>
        </View>

        {/* Where to Watch Section */}
        {movie?.watch_providers && (
          <View className="mt-5 px-5 mb-8">
            <Text className="text-white font-bold text-lg mb-4">
              Where to Watch
            </Text>
            {(() => {
              const regionData =
                movie.watch_providers.IN ||
                movie.watch_providers.US ||
                Object.values(movie.watch_providers)[0];

              if (
                !regionData ||
                (!regionData.flatrate && !regionData.rent && !regionData.buy)
              ) {
                return (
                  <Text className="text-gray-500 italic">
                    No watch information available for your region.
                  </Text>
                );
              }

              const ProviderGroup = ({
                title,
                providers,
              }: {
                title: string;
                providers: any[];
              }) => (
                <View className="mb-4">
                  <Text className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">
                    {title}
                  </Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {providers.map((provider: any) => (
                      <View
                        key={provider.provider_id}
                        className="items-center mr-4"
                      >
                        <Image
                          source={{
                            uri: `https://image.tmdb.org/t/p/original${provider.logo_path}`,
                          }}
                          className="w-12 h-12 rounded-xl border border-white/10"
                        />
                        <Text
                          className="text-white text-[10px] mt-1 font-medium max-w-[50px] text-center"
                          numberOfLines={1}
                        >
                          {provider.provider_name}
                        </Text>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              );

              return (
                <View className="bg-white/5 p-4 rounded-3xl border border-white/5">
                  {regionData.flatrate && (
                    <ProviderGroup
                      title="Streaming"
                      providers={regionData.flatrate}
                    />
                  )}
                  {regionData.rent && (
                    <ProviderGroup title="Rent" providers={regionData.rent} />
                  )}
                  {regionData.buy && (
                    <ProviderGroup title="Buy" providers={regionData.buy} />
                  )}
                </View>
              );
            })()}
          </View>
        )}

        <View>
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-row items-center justify-center bg-gray-700 py-3 gap-2"
          >
            <Ionicons name="arrow-back" size={24} color="#FFD700" />
            <Text className="text-white text-sm">Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* back button  */}
    </View>
  );
};

export default Info;
