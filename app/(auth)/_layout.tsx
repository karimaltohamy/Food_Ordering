import { images } from "@/constants";
import useAuthStore from "@/store/auth.store";
import { Redirect, Slot } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";

const AuthLayout = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) return <Redirect href={"/"} />;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <View
          className="w-full relative"
          style={{
            height: Number(Dimensions.get("screen").height) / 2.25,
          }}
        >
          <ImageBackground
            source={images.loginGraphic}
            resizeMode="stretch"
            className="size-full rounded-b-lg"
          />

          <Image
            source={images.logo}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 "
            style={{ width: 150, height: 150 }}
            // resizeMode="contain"
          />
        </View>

        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthLayout;
