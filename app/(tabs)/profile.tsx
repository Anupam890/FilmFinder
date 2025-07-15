import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";

const user = {
  username: "anupam_mandal",
  email: "anupam@example.com",
  avatar: "https://i.pravatar.cc/150?img=12",
  posts: 12,
  followers: 120,
  following: 85,
};

const Profile = () => {
  return (
    <View className="flex-1 bg-backGround px-6 pt-10">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-white text-2xl font-bold">Profile</Text>
        <Feather name="settings" size={24} color="white" />
      </View>

      {/* Avatar & Info */}
      <View className="items-center">
        <Image
          source={{ uri: user.avatar }}
          className="w-24 h-24 rounded-full mb-3"
        />
        <Text className="text-white text-xl font-semibold">
          {user.username}
        </Text>
        <Text className="text-gray-400 text-sm">{user.email}</Text>
      </View>

      {/* Stats */}
      <View className="flex-row justify-around mt-6">
        <View className="items-center">
          <Text className="text-white text-lg font-bold">{user.posts}</Text>
          <Text className="text-gray-400 text-xs">Posts</Text>
        </View>
        <View className="items-center">
          <Text className="text-white text-lg font-bold">{user.followers}</Text>
          <Text className="text-gray-400 text-xs">Followers</Text>
        </View>
        <View className="items-center">
          <Text className="text-white text-lg font-bold">{user.following}</Text>
          <Text className="text-gray-400 text-xs">Following</Text>
        </View>
      </View>

      {/* Buttons */}
      <View className="flex-row justify-center gap-4 mt-6">
        <TouchableOpacity className="bg-accent px-4 py-2 rounded-full">
          <Text className="text-white font-medium">Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-700 px-4 py-2 rounded-full">
          <AntDesign name="logout" size={18} color="white" />
        </TouchableOpacity>
      </View>

      {/* Optional Post Grid */}
      {/* <FlatList
        data={[...Array(6).keys()]}
        keyExtractor={(item) => item.toString()}
        numColumns={3}
        renderItem={() => (
          <View className="w-1/3 aspect-square bg-gray-800 m-1 rounded-md" />
        )}
        className="mt-8"
      /> */}
    </View>
  );
};

export default Profile;
