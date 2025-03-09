import { View, Text,TextInput,TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from "@expo/vector-icons/AntDesign";

const SearchBar = () => {
  return (
    <View className="flex-row items-center bg-gray-800 rounded-lg px-3 py-2">
    <AntDesign name="search1" size={20} color="#9CA3AF" />
    <TextInput
      className="flex-1 text-white ml-2 text-base"
      placeholder="Search movies..."
      placeholderTextColor="#9CA3AF"
    />
    <TouchableOpacity className="p-1">
      <AntDesign name="filter" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  </View>
  )
}

export default SearchBar