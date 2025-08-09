import { Slot } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const AuthLayout = () => {
  return (
    <View>
      <Text>_layout auth</Text>
      <Slot />
    </View>
  );
};

export default AuthLayout;
