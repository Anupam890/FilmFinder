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
  RefreshControl,
} from "react-native";
import * as Haptics from "expo-haptics";
import React, { useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Link } from "expo-router";
import useFetch from "@/services/useFetch";
import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getGenres,
  getTrendingPeople,
} from "@/services/api";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import FeaturedCard from "@/components/FeaturedCard";
import { AuthContext } from "@/context/AuthContext";

const Home = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);

  const {
    Data: trending,
    Loading: trendingLoading,
    refetch: refetchTrending,
  } = useFetch(getTrendingMovies);
  const {
    Data: popular,
    Loading: popularLoading,
    refetch: refetchPopular,
  } = useFetch(getPopularMovies);
  const {
    Data: topRated,
    Loading: topRatedLoading,
    refetch: refetchTopRated,
  } = useFetch(getTopRatedMovies);
  const {
    Data: upcoming,
    Loading: upcomingLoading,
    refetch: refetchUpcoming,
  } = useFetch(getUpcomingMovies);
  const { Data: genres, Loading: genresLoading } = useFetch(getGenres);
  const {
    Data: actors,
    Loading: actorsLoading,
    refetch: refetchActors,
  } = useFetch(getTrendingPeople);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([
      refetchTrending(),
      refetchPopular(),
      refetchTopRated(),
      refetchUpcoming(),
      refetchActors(),
    ]);
    setRefreshing(false);
  };

  const renderSection = (
    title: string,
    data: any[],
    loading: boolean,
    isFeatured = false,
  ) => {
    if (loading && !refreshing) {
      return (
        <ActivityIndicator size="small" color="#FFD700" className="my-10" />
      );
    }

    if (!data || data.length === 0) return null;

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
                width={130}
                containerStyle="mr-5 mb-4"
              />
            )
          }
        />
      </View>
    );
  };

  const renderActors = () => {
    if (actorsLoading && !refreshing) return null;
    return (
      <View className="mt-8">
        <View className="px-6 mb-4">
          <Text className="text-xl font-bold text-white tracking-tight">
            Trending People
          </Text>
        </View>
        <FlatList
          data={actors}
          horizontal
          showsHorizontalScrollIndicator={false}
          className="pl-6"
          contentContainerStyle={{ paddingRight: 40 }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Link href={`/actor/${item.id}`} asChild>
              <TouchableOpacity className="mr-5 items-center w-20">
                <Image
                  source={{
                    uri: item.profile_path
                      ? `https://image.tmdb.org/t/p/w200${item.profile_path}`
                      : "https://via.placeholder.com/100",
                  }}
                  className="w-20 h-20 rounded-full border-2 border-gray-700"
                />
                <Text
                  className="text-white text-[10px] mt-2 font-medium text-center"
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            </Link>
          )}
        />
      </View>
    );
  };

  const renderCategories = () => {
    if (genresLoading && !refreshing) return null;
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-6 pl-6"
        contentContainerStyle={{ paddingRight: 40 }}
      >
        {genres?.map((genre: any) => (
          <TouchableOpacity
            key={genre.id}
            className="bg-[#1F2937] px-5 py-2 rounded-full mr-3 border border-gray-700"
            onPress={() =>
              router.push({
                pathname: "/(tabs)/search",
                params: { genreId: genre.id },
              })
            }
          >
            <Text className="text-gray-300 text-xs font-semibold">
              {genre.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
              className="relative"
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push("/(tabs)/profile");
              }}
            >
              <Image
                source={{
                  uri:
                    user?.photoURL ||
                    `https://ui-avatars.com/api/?name=${user?.displayName || "User"}&background=FFD700&color=000`,
                }}
                className="w-10 h-10 rounded-xl border border-secondary/30"
              />
              <View className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full border-2 border-[#161B2F]" />
            </TouchableOpacity>
          </View>

          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#FFD700"
              />
            }
          >
            {/* Search Bar Section */}
            <View className="px-6 mt-2">
              <SearchBar
                placeholder="Search for movies..."
                onPress={() => router.push("/(tabs)/search")}
                editable={false}
              />
            </View>

            {/* Category Chips */}
            {renderCategories()}

            {/* Movie Sections */}
            {renderSection(
              "Trending Now",
              trending || [],
              trendingLoading,
              true,
            )}

            {/* People Section */}
            {renderActors()}

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
