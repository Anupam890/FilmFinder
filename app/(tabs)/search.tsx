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
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-backGround"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 px-5 pt-10">
          <Text className="text-2xl text-white font-bold mb-6">Search Movies</Text>
           
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
            contentContainerStyle={{ paddingBottom: 100, marginTop: 10 }}
            showsVerticalScrollIndicator={false}
          />
          <View className="w-full mb-4">
            <SearchBar
              value={searchQuery}
              placeholder="Search Movies..."
              onChangeText={setSearchQuery}
            />
          </View>

          {loading && <ActivityIndicator size="large" color="white" className="mt-6" />}
          {error && (
            <Text className="text-red-500 mt-4 self-center">
              Error: {error?.message}
            </Text>
          )}

          {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
            <Text className="text-xl text-white font-bold">
              Search Results for <Text className="text-accent">{searchQuery}</Text>
            </Text>
          )}

          
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Search;
