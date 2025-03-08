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
} from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import SearchBar from "@/components/searchBar";
import useFetch from "@/services/useFetch";
import { getMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
const Index = () => {
  const router = useRouter();

  const {
    Data: movies,
    Error: error,
    Loading: loading,
  } = useFetch(() => getMovies({ query: "" }));

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="bg-[#161B2F] h-full">
          <View className="flex-row justify-between items-center px-4 py-4">
            <View>
              <Text className="text-2xl text-white">Hey,</Text>
              <Text className="text-2xl text-blue-500">I'm</Text>
            </View>
            <AntDesign name="bells" size={24} color="white" />
          </View>
          <ScrollView
            className="flex-1 px-5"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
          >
            {loading ? (
              <ActivityIndicator
                size="large"
                color="white"
                className="mt-10 self-center"
              />
            ) : error ? (
              <Text className="text-white"> Error: {error?.message}</Text>
            ) : (
              <View>
                <SearchBar
                  onPress={() => router.push("/(tabs)/search")}
                  placeholder="Search Movies..."
                />
                <Text className="text-2xl text-white mt-10 font-bold">
                  Latest Movies
                </Text>
                <FlatList
                  data={movies}
                  renderItem={({ item }) => (
                    <MovieCard
                      {...item}
                    />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={3}
                  columnWrapperStyle={{
                    justifyContent: "flex-start",
                    marginBottom: 10,
                    gap: 20,
                    paddingRight: 5,
                  }}
                  className="mt-5 pb-32"
                  scrollEnabled={false}
                />
              </View>
            )}
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Index;
