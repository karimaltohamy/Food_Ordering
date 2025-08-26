import CartBtn from "@/components/CartBtn";
import MenuCard from "@/components/MenuCard";
import SearchFilters from "@/components/SearchFilters";
import SearchInput from "@/components/SearchInput";
import MenuCardSkeleton from "@/components/shared/MenuCardSkeleton";
import { getCategories, getMenu } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { MenuItem } from "@/type";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  Text,
  View,
} from "react-native";

const Search = () => {
  const { category, query } = useLocalSearchParams<{
    category: string;
    query: string;
  }>();
  const [refreshing, setRefreshing] = useState(false);

  // get menus
  const {
    data: menus,
    loading,
    error,
    refetch,
  } = useAppwrite({
    fn: getMenu,
    params: { category, query, limit: 6 },
  });

  // get categories
  const { data: categories, loading: categoriesLoading } = useAppwrite({
    fn: getCategories,
  });

  // refetch when category or query changes
  useEffect(() => {
    refetch({ category, query, limit: 6 });
  }, [category, query]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch({ category, query, limit: 6 });
    } finally {
      setRefreshing(false);
    }
  };

  const isInitialLoading = loading && !menus;

  if (isInitialLoading) {
    return (
      <SafeAreaView className="flex-1">
        <View className="my-5 gap-5 px-5">
          <View className="flex-between flex-row">
            <View>
              <Text className="text-primary text-[11px]">DELIVER TO</Text>
              <Text className="font-bold text-dark-100 mt-0.5">
                Find your favourite food
              </Text>
            </View>
            <CartBtn />
          </View>
          <SearchInput />
        </View>
        <View className="flex-1 flex-row flex-wrap gap-7 px-5 pb-32">
          {Array.from({ length: 6 }, (_, index) => (
            <View
              key={index}
              className={`${
                index % 2 === 0 ? "mt-0" : "mt-10"
              } relative  w-[45%]`}
            >
              <MenuCardSkeleton />
            </View>
          ))}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={menus || []}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-7 px-5 pb-32 mt-5"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#FF6F00"
            colors={["#FF6F00"]}
          />
        }
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center py-10">
            {error ? (
              <View className="items-center">
                <Text className="text-red-500 text-center mb-2">
                  Something went wrong
                </Text>
                <Text className="text-gray-500 text-center">
                  Pull down to retry
                </Text>
              </View>
            ) : (
              <Text className="text-gray-500">No results found</Text>
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="gap-5">
            <View className="flex-between flex-row">
              <View>
                <Text className="text-primary text-[11px]">DELIVER TO</Text>
                <Text className="font-bold text-dark-100 mt-0.5">
                  Find your favourite food
                </Text>
              </View>
              <CartBtn />
            </View>

            {/* search bar */}
            <SearchInput />

            {/* filters */}
            {!categoriesLoading && categories && (
              <SearchFilters categories={categories} />
            )}
            {categoriesLoading && (
              <View className="h-12 justify-center">
                <ActivityIndicator size="small" color="#FF6F00" />
              </View>
            )}
          </View>
        )}
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0;

          return (
            <View
              className={`${
                isEven ? "mt-0" : "mt-10"
              } relative flex-1 max-w-[48%]`}
            >
              <MenuCard item={item as unknown as MenuItem} />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Search;
