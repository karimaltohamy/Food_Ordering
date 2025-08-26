import React from "react";
import { View } from "react-native";
import SkeletonLoader from "./SkeletonLoader";

const MenuCardSkeleton: React.FC = () => {
  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm">
      <SkeletonLoader
        width="100%"
        height={120}
        borderRadius={8}
        className="mb-3"
      />
      <SkeletonLoader width="80%" height={16} className="mb-2" />
      <SkeletonLoader width="60%" height={14} />
    </View>
  );
};

export default MenuCardSkeleton;
