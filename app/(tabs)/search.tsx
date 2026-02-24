import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Text,
  KeyboardAvoidingView,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import useFetch from "@/services/useFetch";
import { getMovies, getGenres } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { Ionicons } from "@expo/vector-icons";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  const {
    Data: movies = [],
    Error: error,
    Loading: loading,
    refetch: loadMovies,
    reset,
  } = useFetch(
    () =>
      getMovies({ query: searchQuery, genreId: selectedGenre || undefined }),
    false,
  );

  const { Data: discoveryMovies } = useFetch(
    () => getMovies({ query: "", genreId: selectedGenre || undefined }),
    !searchQuery,
  );
  const { Data: genres } = useFetch(getGenres);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchQuery.trim() || selectedGenre) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, selectedGenre]);

  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center mt-20 px-10">
      <View className="bg-[#1F2937] p-6 rounded-full mb-6">
        <Ionicons name="search" size={40} color="#6B7280" />
      </View>
      <Text className="text-white text-xl font-bold text-center">
        {searchQuery ? "No results found" : "Explore Movies"}
      </Text>
      <Text className="text-gray-400 text-sm text-center mt-2">
        {searchQuery
          ? `We couldn't find any movies matching "${searchQuery}". Try a different title.`
          : "Type the name of a movie, actor, or genre to find your next favorite film."}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-backGround">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 pt-4">
            {/* Header Area */}
            <View className="px-5 mb-4">
              <Text className="text-3xl text-white font-extrabold mb-1 mt-6">
                Search
              </Text>
              <Text className="text-gray-400 text-sm mb-4">
                Discover millions of movies
              </Text>

              <SearchBar
                value={searchQuery}
                placeholder="Movies, actors, genres..."
                onChangeText={setSearchQuery}
                containerClass="h-11"
              />
            </View>

            {/* Filters (Genres) */}
            <View className="mb-4">
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
              >
                <TouchableOpacity
                  onPress={() => setSelectedGenre(null)}
                  className={`mr-2 px-4 py-1.5 rounded-full border ${!selectedGenre ? "bg-secondary border-secondary" : "bg-transparent border-gray-700"}`}
                >
                  <Text
                    className={`text-xs font-bold ${!selectedGenre ? "text-white" : "text-gray-400"}`}
                  >
                    All
                  </Text>
                </TouchableOpacity>
                {genres?.map((genre: any) => (
                  <TouchableOpacity
                    key={genre.id}
                    onPress={() =>
                      setSelectedGenre(
                        genre.id === selectedGenre ? null : genre.id,
                      )
                    }
                    className={`mr-2 px-4 py-1.5 rounded-full border ${selectedGenre === genre.id ? "bg-secondary border-secondary" : "bg-transparent border-gray-700"}`}
                  >
                    <Text
                      className={`text-xs font-bold ${selectedGenre === genre.id ? "text-white" : "text-gray-400"}`}
                    >
                      {genre.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Results Info */}
            {!loading &&
              (searchQuery.trim() || selectedGenre) &&
              movies?.length > 0 && (
                <View className="px-5 mb-4 flex-row justify-between items-center">
                  <Text className="text-gray-400 text-xs font-semibold uppercase tracking-widest">
                    Found {movies.length} Results
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setSearchQuery("");
                      setSelectedGenre(null);
                    }}
                  >
                    <Text className="text-[#FFD700] text-xs font-bold uppercase tracking-widest">
                      Clear All
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

            {/* Main Content */}
            {loading ? (
              <View className="flex-1 justify-start pt-20">
                <ActivityIndicator size="large" color="#FFD700" />
                <Text className="text-gray-400 text-center mt-4">
                  Searching database...
                </Text>
              </View>
            ) : error ? (
              <View className="flex-1 items-center justify-center px-10">
                <Ionicons name="alert-circle" size={50} color="#ef4444" />
                <Text className="text-white font-bold mt-4">
                  Something went wrong
                </Text>
                <Text className="text-gray-400 text-center mt-1">
                  {error.message}
                </Text>
              </View>
            ) : (
              <FlatList
                data={
                  searchQuery.trim() || selectedGenre ? movies : discoveryMovies
                }
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={{ width: "33.33%", padding: 6 }}>
                    <MovieCard {...item} />
                  </View>
                )}
                numColumns={3}
                contentContainerStyle={{
                  paddingHorizontal: 14,
                  paddingBottom: 100,
                }}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                  !searchQuery.trim() &&
                  !selectedGenre &&
                  discoveryMovies?.length > 0 ? (
                    <Text className="text-white text-lg font-bold mb-4 ml-2">
                      Trending Choices
                    </Text>
                  ) : null
                }
                ListEmptyComponent={renderEmptyState()}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Search;
