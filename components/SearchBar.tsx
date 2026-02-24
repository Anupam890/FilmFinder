import { View, TextInput, TouchableOpacity, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  onPress?: () => void;
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  editable?: boolean;
  containerClass?: string;
}

const SearchBar = ({
  onPress,
  value,
  placeholder,
  onChangeText,
  editable = true,
  containerClass = "",
}: Props) => {
  if (!editable) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        className={`flex-row items-center bg-[#1F2937] rounded-2xl px-4 py-2 border border-gray-700/50 shadow-lg shadow-black/20 ${containerClass}`}
      >
        <Ionicons name="search-outline" size={20} color="#9CA3AF" />
        <Text className="flex-1 text-[#6B7280] ml-3 text-base font-medium">
          {placeholder || "Search movies..."}
        </Text>
        <View className="pl-2 border-l border-gray-700/50 ml-2">
          <Ionicons name="options-outline" size={20} color="#FFD700" />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View
      className={`flex-row items-center bg-[#1F2937] rounded-2xl px-4 py-2 border border-gray-700/50 shadow-lg shadow-black/20 ${containerClass}`}
    >
      <Ionicons name="search-outline" size={20} color="#9CA3AF" />
      <TextInput
        className="flex-1 text-white ml-3 text-base font-medium"
        placeholder={placeholder || "Search movies..."}
        placeholderTextColor="#6B7280"
        value={value}
        onChangeText={onChangeText}
        autoFocus={editable}
      />
      <TouchableOpacity
        className="pl-2 border-l border-gray-700/50 ml-2"
        onPress={onPress}
      >
        <Ionicons name="options-outline" size={20} color="#FFD700" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
