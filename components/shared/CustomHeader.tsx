import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface Props {
  title: string;
  className?: string;
}

const CustomHeader = ({ title, className }: Props) => {
  return (
    <View className={`flex-between flex-row items-center ${className}`}>
      <TouchableOpacity onPress={() => router.back()}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text className="font-bold text-xl">{title}</Text>

      <TouchableOpacity>
        <Icon name="search" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;
