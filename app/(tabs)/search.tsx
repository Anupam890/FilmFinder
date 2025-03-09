import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import SearchBar from "@/components/SearchBar";


const search = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          className="
       flex-1 bg-backGround h-full"
        >
          <View className="px-5 py-10">
          <Text className="text-2xl text-white">Search</Text>
          </View>
          <View className="px-5 ">
            <SearchBar />
          </View>
        </View>
         {/* scroll container  */}
        


      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default search;
