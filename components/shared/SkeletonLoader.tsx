import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

interface SkeletonLoaderProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = "100%",
  height = 20,
  borderRadius = 4,
  className = "",
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      animatedValue.setValue(0);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start(() => startAnimation());
    };

    startAnimation();
  }, [animatedValue]);

  const interpolatedColor = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["#e0e0e0", "#f0f0f0", "#e0e0e0"],
  });

  return (
    <Animated.View
      className={className}
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: interpolatedColor,
      }}
    />
  );
};

export default SkeletonLoader;