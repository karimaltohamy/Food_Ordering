import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

interface MenuCardProps {
  image: string;
  name: string;
  price: number;
}

const MenuCard: React.FC<MenuCardProps> = ({ image, name, price }) => {
  const image_url = `${image}`;

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
      <TouchableOpacity>
        <Text className="text-primary font-bold">Add to cart +</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MenuCard;
