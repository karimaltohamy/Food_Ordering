import { images } from "@/constants";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const CartBtn = () => {
  const totalItems = 5;
  return (
    <TouchableOpacity className="cart-btn">
      <Image source={images.bag} className="size-5" resizeMode="contain" />
      {totalItems > 0 && (
        <View className="cart-badge">
          <Text className="text-white text-sm">{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CartBtn;
