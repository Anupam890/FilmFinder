import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";

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



        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default search;
