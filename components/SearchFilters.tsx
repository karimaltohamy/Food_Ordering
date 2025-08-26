import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Models } from "react-native-appwrite";

interface Props {
  categories: Models.DefaultDocument[];
}

const SearchFilters: React.FC<Props> = ({ categories }) => {
  const localSearchParams = useLocalSearchParams<{
    category: string;
  }>();
  const [activeCategory, setActiveCategory] = React.useState<string | null>(
    localSearchParams.category || "all"
  );
  const filteredData = categories
    ? [
        {
          $id: "all",
          name: "All",
        },
        ...categories,
      ]
    : [];

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);

    if (id === "all") router.setParams({ category: undefined });
    else router.setParams({ category: id });
  };

  return (
    <View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className={`filter ${
              activeCategory === item.$id ? "bg-primary" : "bg-white"
            }`}
            onPress={() => handleCategoryChange(item.$id)}
          >
            <Text
              className={`font-semibold ${
                activeCategory === item.$id ? "text-white" : "text-dark-100"
              }`}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-x-2 pb-3"
      />
    </View>
  );
};

export default SearchFilters;
