import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import SearchBar from "@/components/searchBar";

const search = () => {
  return(
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={
        Keyboard.dismiss
      }>
       <View className="
       flex-1 bg-backGround h-full">
      <SearchBar/>

       </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  );
};

export default search;
