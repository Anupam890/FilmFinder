import {
  View,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import {
  getMovies,
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/services/api";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import FeaturedCard from "@/components/FeaturedCard";
import { AuthContext } from "@/context/AuthContext";

const Home = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const { Data: trending, Loading: trendingLoading } =
    useFetch(getTrendingMovies);
  const { Data: popular, Loading: popularLoading } = useFetch(getPopularMovies);
  const { Data: topRated, Loading: topRatedLoading } =
    useFetch(getTopRatedMovies);
  const { Data: upcoming, Loading: upcomingLoading } =
    useFetch(getUpcomingMovies);

  const renderSection = (
    title: string,
    data: any[],
    loading: boolean,
    isFeatured = false,
  ) => {
    if (loading) {
      return (
        <ActivityIndicator size="small" color="#FFD700" className="my-10" />
      );
    }

    return (
      <View className="mt-8">
        <View className="flex-row justify-between items-center px-6 mb-4">
          <Text className="text-xl font-bold text-white tracking-tight">
            {title}
          </Text>
          <TouchableOpacity onPress={() => router.push("/(tabs)/search")}>
            <Text className="text-[#FFD700] text-sm font-semibold">
              See All
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          className="pl-6"
          contentContainerStyle={{ paddingRight: 40 }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) =>
            isFeatured ? (
              <FeaturedCard
                id={item.id}
                title={item.title}
                backdrop_path={item.backdrop_path}
                vote_average={item.vote_average}
                overview={item.overview}
              />
            ) : (
              <MovieCard
                id={item.id}
                title={item.title}
                poster_path={item.poster_path}
                vote_average={item.vote_average}
                release_date={item.release_date}
              />
            )
          }
        />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="bg-[#161B2F] flex-1">
          {/* Header */}
          <View className="pt-14 pb-6 px-6 flex-row justify-between items-center bg-[#161B2F]">
            <View className="flex-row items-center">
              <Image
                source={require("@/assets/images/logo.png")}
                className="w-12 h-12 mr-3"
                resizeMode="contain"
              />
              <View>
                <Text className="text-gray-400 text-sm font-medium">
                  Welcome back,
                </Text>
                <Text className="text-white text-2xl font-bold">
                  {user?.displayName || "Movie Lover"}!
                </Text>
              </View>
            </View>
            <TouchableOpacity
              className="bg-[#1F2937] p-2 rounded-full border border-gray-700"
              onPress={() => router.push("/(tabs)/profile")}
            >
              <Ionicons name="notifications-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            {/* Search Bar Section */}
            <View className="px-6 mt-2">
              <SearchBar
                placeholder="Search for movies..."
                onPress={() => router.push("/(tabs)/search")}
                editable={false}
              />
            </View>

            {/* Movie Sections */}
            {renderSection(
              "Trending Now",
              trending || [],
              trendingLoading,
              true,
            )}
            {renderSection("Popular", popular || [], popularLoading)}
            {renderSection("Upcoming", upcoming || [], upcomingLoading)}
            {renderSection("Top Rated", topRated || [], topRatedLoading)}
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Home;
