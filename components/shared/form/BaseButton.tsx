import React from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";

interface Props {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  isLoading?: boolean;
  disabled?: boolean;
}

const BaseButton: React.FC<Props> = ({
  label,
  onPress,
  variant = "primary",
  isLoading = false,
  disabled = false,
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case "secondary":
        return "bg-gray-200 rounded-full px-5 py-3";
      case "outline":
        return "border-2 border-primary rounded-full px-5 py-3";
      default:
        return "bg-primary rounded-full px-5 py-3";
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case "secondary":
        return "text-gray-800 font-semibold text-center";
      case "outline":
        return "text-primary font-semibold text-center";
      default:
        return "text-white font-semibold text-center";
    }
  };

  return (
    <Pressable
      className={`${getButtonStyle()} ${disabled ? "opacity-50" : ""}`}
      onPress={onPress}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === "primary" ? "#fff" : "#FE8C00"} />
      ) : (
        <Text className={getTextStyle()}>{label}</Text>
      )}
    </Pressable>
  );
};

export default BaseButton;
