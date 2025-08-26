import { useCartStore } from "@/store/cart.store";
import { CartItemType } from "@/type";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Octicons from "react-native-vector-icons/Octicons";

interface Props {
  item: CartItemType;
}

const CartCard: React.FC<Props> = ({ item }) => {
  const { increaseQty, decreaseQty, removeItem } = useCartStore();

  return (
    <View className={"cart-item gap-4"}>
      <View className="cart-item__image">
        <Image
          source={{ uri: item.image_url }}
          resizeMode="contain"
          className="size-24"
        />
      </View>

      <View className="flex-1">
        {/* title */}
        <Text className="base-semibold mb-2">{item.name}</Text>
        <Text className="text-sm font-semibold text-gray-500 mb-4">
          ${item.price}
        </Text>

        <View className="flex-between flex-row items-center">
          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              onPress={() => decreaseQty(item.id, item.customizations ?? [])}
            >
              <Octicons name="dash" size={15} />
            </TouchableOpacity>
            <Text className="font-bold text-gray-500 text-lg">
              {item.quantity}
            </Text>
            <TouchableOpacity
              onPress={() => increaseQty(item.id, item.customizations ?? [])}
            >
              <Octicons name="plus" size={15} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => removeItem(item.id, [])}>
            <Icon name="delete-outline" size={22} color="#c61717" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartCard;
