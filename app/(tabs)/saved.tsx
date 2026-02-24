import { View, Text, FlatList, SafeAreaView } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "@/context/FavoritesContext";
import MovieCard from "@/components/MovieCard";

const Saved = () => {
  const { favorites } = useFavorites();

  return (
    <SafeAreaView className="flex-1 bg-backGround">
      <View className="flex-1 px-5 pt-4">
        <Text className="text-3xl text-white font-extrabold mb-1 mt-6">Saved</Text>
        <Text className="text-gray-400 text-sm mb-6">
          Your personal watchlist
        </Text>

        {favorites.length === 0 ? (
          <View className="flex-1 justify-center items-center px-10">
            <View className="bg-[#1F263F] p-8 rounded-full mb-6 shadow-lg">
              <Ionicons
                name="heart-dislike-outline"
                size={60}
                color="#6B7280"
              />
            </View>
            <Text className="text-white text-xl font-bold text-center">
              Your list is empty
            </Text>
            <Text className="text-gray-400 text-sm text-center mt-2 leading-5">
              Start exploring and tap the heart icon on any movie to save it
              here for later.
            </Text>
          </View>
        ) : (
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={{ width: "33.33%", padding: 6 }}>
                <MovieCard {...item} />
              </View>
            )}
            numColumns={3}
            contentContainerStyle={{
              paddingBottom: 120,
            }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Saved;
