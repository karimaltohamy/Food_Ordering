import CartCard from "@/components/CartCard";
import CustomHeader from "@/components/shared/CustomHeader";
import BaseButton from "@/components/shared/form/BaseButton";
import { useCartStore } from "@/store/cart.store";
import cn from "clsx";
import React from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";

const ItemSummary = ({
  title,
  value,
  titleStyle,
  valueStyle,
}: {
  title: string;
  value: string;
  titleStyle?: string;
  valueStyle?: string;
}) => {
  return (
    <View className="flex-between flex-row items-center mb-2 last:mb-0">
      <Text className={cn("font-semibold text-gray-500", titleStyle)}>
        {title}
      </Text>
      <Text className={cn("font-bold", valueStyle)}>{value}</Text>
    </View>
  );
};

const Cart = () => {
  const { items } = useCartStore();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={items}
        contentContainerClassName="gap-5 px-5 pb-32 mt-5"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartCard item={item} />}
        ListHeaderComponent={() => (
          <CustomHeader title="Your Cart" className="mb-5" />
        )}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center py-10">
            <Text className="text-gray-500">No results found</Text>
          </View>
        )}
        ListFooterComponent={() =>
          items.length > 0 && (
            <View className="gap-5">
              <View className="p-4 rounded-xl border border-slate-400 gap-1.5">
                <Text className="base-bold text-lg mb-3">Payment Summary</Text>

                <ItemSummary
                  title={`Total Items (${items.length})`}
                  value={`$${items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )}`}
                />
                <ItemSummary title={`Delivery Fee`} value={`$5.00`} />
                <ItemSummary
                  title={`Discount`}
                  value={`- $0.50`}
                  valueStyle="text-green-500"
                />

                <View className="border-t border-slate-400 my-4"></View>

                <ItemSummary
                  title="Total"
                  titleStyle="font-bold text-lg text-black"
                  value={`$${
                    items.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    ) +
                    5.0 -
                    0.5
                  }`}
                  valueStyle="text-xl"
                />
              </View>

              <BaseButton
                label="Order Now"
                isLoading={false}
                onPress={() => {}}
              />
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

export default Cart;
