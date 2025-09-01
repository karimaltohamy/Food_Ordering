import cn from "clsx";
import React from "react";
import { Text, View } from "react-native";

interface Props {
  title: string;
  value: string;
  titleStyle?: string;
  valueStyle?: string;
}

const PaymentInfo = ({ title, value, titleStyle, valueStyle }: Props) => {
  return (
    <View className="flex-between flex-row items-center mb-2 last:mb-0">
      <Text className={cn("font-semibold text-gray-500", titleStyle)}>
        {title}
      </Text>
      <Text className={cn("font-bold", valueStyle)}>{value}</Text>
    </View>
  );
};

export default PaymentInfo;
