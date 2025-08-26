import { useCartStore } from "@/store/cart.store";
import { MenuItem } from "@/type";
import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

const MenuCard = ({
  item: { $id, image_url, name, price },
}: {
  item: MenuItem;
}) => {
  const { addItem } = useCartStore();

  return (
    <TouchableOpacity className="menu-card w-full">
      <Image
        source={{ uri: image_url }}
        resizeMode="contain"
        className="size-32 absolute -top-10"
      />
      <Text className="font-bold mb-2" numberOfLines={1}>
        {name}
      </Text>
      <Text className="text-sm font-semibold text-gray-500 mb-4">${price}</Text>
      <TouchableOpacity
        onPress={() =>
          addItem({ id: $id, name, price, image_url, customizations: [] })
        }
      >
        <Text className="text-primary font-bold">Add to cart +</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MenuCard;
