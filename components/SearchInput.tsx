import { images } from "@/constants";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";

const SearchInput = () => {
  const localSearchParams = useLocalSearchParams<{
    query: string;
  }>();
  const [query, setQuery] = React.useState(localSearchParams.query || "");

  const handleChangeQuery = (text: string) => {
    setQuery(text);

    if (!text) router.setParams({ query: undefined });
  };

  const handleSubmit = () => {
    if (query.trim()) router.setParams({ query });
  };

  return (
    <View className="searchbar">
      <TextInput
        className="flex-1 p-5 rounded-full border-b border-white"
        placeholder="Search for pizzas, burgers..."
        value={query}
        onChangeText={handleChangeQuery}
        onSubmitEditing={handleSubmit}
        placeholderTextColor={"#878787"}
      />
      <TouchableOpacity
        className="pr-5"
        onPress={() => router.setParams({ query: query })}
      >
        <Image
          source={images.search}
          className="size-5"
          resizeMode="contain"
          tintColor="#5D5F6D"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
