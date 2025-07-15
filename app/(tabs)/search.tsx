import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Text,
  KeyboardAvoidingView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import useFetch from "@/services/useFetch";
import { getMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    Data: movies = [],
    Error: error,
    Loading: loading,
    refetch: loadMovies,
    reset,
  } = useFetch(() => getMovies({ query: searchQuery }), false);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }
    
    , 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-backGround"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 px-5 pt-10">
          <Text className="text-2xl text-white font-bold mb-4">Search Movies</Text>

          {/* Search Bar */}
          <View className="w-full mb-4">
            <SearchBar
              value={searchQuery}
              placeholder="Search Movies..."
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Loading Indicator */}
          {loading && (
            <ActivityIndicator size="large" color="white" className="mt-6" />
          )}

          {/* Error Message */}
          {error && (
            <Text className="text-red-500 mt-4 self-center">
              Error: {error.message}
            </Text>
          )}

          {/* Result Header */}
          {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
            <Text className="text-xl text-white font-bold mb-2">
              Search Results for{" "}
              <Text className="text-accent">{searchQuery}</Text>
            </Text>
          )}

          {/* Movie List */}
          <FlatList
            data={movies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieCard {...item} />}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "space-between",
              gap: 12,
              marginVertical: 10,
            }}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              !loading &&
              searchQuery.trim().length > 0 && (
                <Text className="text-white self-center mt-10">
                  No movies found for "{searchQuery}"
                </Text>
              )
            }
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Search;
