import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { useLocalSearchParams, router } from "expo-router";
import { getActorDetails, getActorMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import MovieCard from "@/components/MovieCard";

const ActorDetail = () => {
  const { id } = useLocalSearchParams();

  const {
    Data: actor,
    Error: actorError,
    Loading: actorLoading,
  } = useFetch(() => getActorDetails(id as string));

  const {
    Data: movies,
    Error: moviesError,
    Loading: moviesLoading,
  } = useFetch(() => getActorMovies(id as string));

  if (actorLoading || moviesLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-backGround">
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  if (actorError || !actor) {
    return (
      <View className="flex-1 items-center justify-center bg-backGround px-6">
        <Ionicons name="alert-circle-outline" size={64} color="#ef4444" />
        <Text className="text-white text-xl font-bold mt-4">
          Actor not found
        </Text>
        <TouchableOpacity
          onPress={() => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            router.back();
          }}
          className="mt-6 bg-gray-800 px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-semibold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-backGround">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header Image */}
        <View className="relative w-full h-[450px]">
          <Image
            source={{
              uri: actor.profile_path
                ? `https://image.tmdb.org/t/p/w780${actor.profile_path}`
                : "https://via.placeholder.com/500x750?text=No+Profile+Image",
            }}
            className="w-full h-full"
            resizeMode="cover"
          />
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => {
              Haptics.selectionAsync();
              router.back();
            }}
            className="absolute top-12 left-6 bg-black/40 p-2 rounded-full border border-white/20"
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View className="px-6 -mt-10 bg-backGround rounded-t-[40px] pt-8">
          <Text className="text-3xl font-extrabold text-white mb-1">
            {actor.name}
          </Text>
          <Text className="text-secondary text-sm font-bold uppercase tracking-widest mb-6">
            {actor.known_for_department}
          </Text>

          {/* Info Grid */}
          <View className="flex-row flex-wrap justify-between bg-white/5 p-4 rounded-3xl mb-8 border border-white/5">
            <View className="w-1/2 mb-4">
              <Text className="text-gray-500 text-[10px] mb-1 uppercase font-bold tracking-widest">
                Born
              </Text>
              <Text className="text-white text-sm font-bold">
                {actor.birthday || "N/A"}
              </Text>
            </View>
            <View className="w-1/2 mb-4">
              <Text className="text-gray-500 text-[10px] mb-1 uppercase font-bold tracking-widest">
                Birthplace
              </Text>
              <Text className="text-white text-sm font-bold" numberOfLines={1}>
                {actor.place_of_birth || "N/A"}
              </Text>
            </View>
            <View className="w-1/2">
              <Text className="text-gray-500 text-[10px] mb-1 uppercase font-bold tracking-widest">
                Popularity
              </Text>
              <Text className="text-white text-sm font-bold">
                {actor.popularity?.toFixed(1) || "N/A"} 🔥
              </Text>
            </View>
          </View>

          {/* Biography */}
          <View className="mb-8">
            <Text className="text-xl font-bold text-white mb-4">Biography</Text>
            <View className="bg-white/5 p-5 rounded-3xl border border-white/5">
              <Text className="text-gray-300 leading-6 text-sm">
                {actor.biography ||
                  `We don't have a biography for ${actor.name} yet.`}
              </Text>
            </View>
          </View>

          {/* Filmography */}
          <View>
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-bold text-white">Filmography</Text>
              <Text className="text-secondary text-xs font-extrabold uppercase tracking-widest">
                {movies?.length || 0} MOVIES
              </Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {movies?.map((movie: any) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  poster_path={movie.poster_path}
                  vote_average={movie.vote_average}
                  release_date={movie.release_date}
                  width={140}
                  containerStyle="mr-5 mb-2"
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ActorDetail;
