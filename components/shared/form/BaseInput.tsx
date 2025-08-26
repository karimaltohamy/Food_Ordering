import React from "react";
import { Text, TextInput, View } from "react-native";

interface Props extends React.ComponentProps<typeof TextInput> {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  error?: string; // optional error message
}

const BaseInput: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  error,
  ...rest
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View className="w-full mb-5">
      <Text className="text-base font-medium text-gray-700 mb-1">{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`px-4 py-3 rounded-xl border-2 text-gray-800
          ${isFocused ? "border-primary" : "border-gray-300"} 
          ${error ? "border-red-500" : ""}
        `}
        {...rest}
      />

      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
};

export default BaseInput;
