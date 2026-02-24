import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { useState, useEffect } from "react";
import { updateProfile } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import {
  Modal,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const Profile = () => {
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [newName, setNewName] = useState(user?.displayName || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("Dark");
  const [currentLang, setCurrentLang] = useState("English (US)");

  // Request permissions for image picker
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access gallery was denied");
        }
      }
    })();
  }, []);

  const handlePickImage = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled && result.assets[0].uri) {
      setIsUpdating(true);
      try {
        if (user) {
          // In a real production app, you would upload to Firebase Storage first
          // Here we update the user's photoURL directly with the local URI for demo
          await updateProfile(user, { photoURL: result.assets[0].uri });
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          Alert.alert("Success", "Profile photo updated!");
        }
      } catch (error) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Alert.alert("Error", "Failed to update photo");
      } finally {
        setIsUpdating(false);
      }
    }
  };

  // Dynamic Rank based on saved movies
  const getRank = () => {
    const count = favorites.length;
    if (count >= 15) return "Director";
    if (count >= 10) return "Producer";
    if (count >= 5) return "Critic";
    return "Viewer";
  };

  const handleUpdateProfile = async () => {
    if (!newName.trim()) return;
    setIsUpdating(true);
    try {
      if (user) {
        await updateProfile(user, { displayName: newName });
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setIsEditModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert("Error", "Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/(tabs)/home"); // Redirect or handle as needed
        },
      },
    ]);
  };

  const ProfileOption = ({
    icon,
    label,
    onPress,
    color = "white",
    subLabel = "",
  }: any) => (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between py-4 border-b border-gray-800/50"
    >
      <View className="flex-row items-center">
        <View className="bg-[#1F2937] p-2 rounded-xl mr-4 border border-gray-700/30">
          <Ionicons name={icon} size={22} color={color} />
        </View>
        <View>
          <Text className="text-white text-base font-semibold">{label}</Text>
          {subLabel ? (
            <Text className="text-gray-500 text-xs mt-0.5">{subLabel}</Text>
          ) : null}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#4B5563" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-backGround">
      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 120 }}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mb-8 mt-6">
          <Text className="text-3xl text-white font-extrabold">Account</Text>
          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              Alert.alert("Settings", "Settings menu coming soon!");
            }}
            className="bg-[#1F2937] p-2.5 rounded-full border border-gray-700/50"
          >
            <Feather name="settings" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View className="bg-[#1F263F] p-6 rounded-3xl border border-white/5 shadow-2xl mb-8">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={handlePickImage} className="relative">
              <Image
                source={{
                  uri:
                    user?.photoURL ||
                    `https://ui-avatars.com/api/?name=${user?.displayName || "User"}&background=FFD700&color=000`,
                }}
                className="w-20 h-20 rounded-2xl border-2 border-secondary/30"
              />
              <View className="absolute -bottom-1 -right-1 bg-secondary p-1 rounded-lg border-2 border-[#1F263F]">
                {isUpdating ? (
                  <ActivityIndicator size="small" color="black" />
                ) : (
                  <Ionicons name="camera" size={12} color="black" />
                )}
              </View>
            </TouchableOpacity>

            <View className="ml-5 flex-1">
              <Text className="text-white text-xl font-bold" numberOfLines={1}>
                {user?.displayName || "Movie Enthusiast"}
              </Text>
              <Text className="text-gray-400 text-sm mt-0.5" numberOfLines={1}>
                {user?.email || "Check your profile settings"}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  setIsEditModalVisible(true);
                }}
                className="bg-secondary/10 border border-secondary/20 px-3 py-1.5 rounded-lg self-start mt-3"
              >
                <Text className="text-secondary text-xs font-bold">
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Divider */}
          <View className="h-[1] bg-white/5 w-full my-6" />

          {/* Stats Bar */}
          <View className="flex-row justify-between">
            <View className="items-center flex-1">
              <Text className="text-white text-lg font-bold">
                {favorites.length}
              </Text>
              <Text className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">
                Saved
              </Text>
            </View>
            <View className="w-[1] bg-white/5" />
            <View className="items-center flex-1">
              <Text className="text-white text-lg font-bold">0</Text>
              <Text className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">
                Reviews
              </Text>
            </View>
            <View className="w-[1] bg-white/5" />
            <View className="items-center flex-1">
              <Text className="text-white text-lg font-bold">{getRank()}</Text>
              <Text className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">
                Rank
              </Text>
            </View>
          </View>
        </View>

        {/* Account Sections */}
        <Text className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 ml-1">
          Media
        </Text>
        <View className="mb-8">
          <ProfileOption
            icon="heart-outline"
            label="Watchlist"
            subLabel={`${favorites.length} movies saved`}
            onPress={() => router.push("/(tabs)/saved")}
            color="#FFD700"
          />
          <ProfileOption
            icon="star-outline"
            label="Ratings"
            subLabel="View your movie reviews"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              Alert.alert(
                "Coming Soon",
                "Ratings and reviews are in development!",
              );
            }}
            color="#FFD700"
          />
          <ProfileOption
            icon="people-outline"
            label="Following Actors"
            subLabel="Manage actor updates"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              Alert.alert(
                "Coming Soon",
                "Actor following feature is coming soon!",
              );
            }}
            color="#FFD700"
          />
        </View>

        <Text className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 ml-1">
          Preferences
        </Text>
        <View className="mb-8">
          <ProfileOption
            icon="notifications-outline"
            label="Notifications"
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              Alert.alert("Notifications", "Notification settings saved!");
            }}
          />
          <ProfileOption
            icon="color-palette-outline"
            label="Theme"
            subLabel={`${currentTheme} Mode Active`}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              Alert.alert("Choose Theme", "Select your preference", [
                { text: "Light", onPress: () => setCurrentTheme("Light") },
                { text: "Dark", onPress: () => setCurrentTheme("Dark") },
                { text: "System", onPress: () => setCurrentTheme("System") },
              ]);
            }}
          />
          <ProfileOption
            icon="language-outline"
            label="Language"
            subLabel={currentLang}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              Alert.alert("Select Language", "Choose your language", [
                {
                  text: "English (US)",
                  onPress: () => setCurrentLang("English (US)"),
                },
                { text: "Hindi", onPress: () => setCurrentLang("Hindi") },
                { text: "Spanish", onPress: () => setCurrentLang("Spanish") },
              ]);
            }}
          />
        </View>

        {/* Footer Actions */}
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center justify-center bg-red-500/10 border border-red-500/20 py-4 rounded-2xl"
        >
          <Ionicons name="log-out-outline" size={22} color="#ef4444" />
          <Text className="text-red-500 font-bold ml-3 text-base">
            Sign Out
          </Text>
        </TouchableOpacity>

        <View className="items-center mt-8">
          <Text className="text-gray-600 text-[10px] font-bold tracking-widest uppercase">
            FilmFinder v1.0.2
          </Text>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/60">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View className="bg-[#1F263F] p-8 rounded-t-[40px] border-t border-white/10">
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-white text-2xl font-bold">
                  Edit Profile
                </Text>
                <TouchableOpacity onPress={() => setIsEditModalVisible(false)}>
                  <Ionicons name="close" size={28} color="white" />
                </TouchableOpacity>
              </View>

              <Text className="text-gray-400 mb-2 ml-1 text-xs font-bold uppercase tracking-widest">
                Display Name
              </Text>
              <View className="bg-[#1F2937]/50 rounded-2xl p-4 flex-row items-center border border-white/5 mb-8">
                <Ionicons name="person-outline" size={20} color="#9ca3af" />
                <TextInput
                  className="flex-1 text-white ml-3 text-base font-medium"
                  placeholder="Your Name"
                  placeholderTextColor="#4B5563"
                  value={newName}
                  onChangeText={setNewName}
                  autoFocus
                />
              </View>

              <TouchableOpacity
                className="bg-secondary p-4 rounded-2xl shadow-xl shadow-secondary/20 h-14 justify-center"
                onPress={handleUpdateProfile}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <ActivityIndicator color="#161B2F" />
                ) : (
                  <Text className="text-[#161B2F] text-center text-lg font-bold">
                    Save Changes
                  </Text>
                )}
              </TouchableOpacity>
              <View className="h-10" />
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Profile;
