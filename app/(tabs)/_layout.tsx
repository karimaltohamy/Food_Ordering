import { images } from "@/constants";
import useAuthStore from "@/store/auth.store";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

const TabBarIcon = ({
  name,
  icon,
  isFocused,
}: {
  name: string;
  icon: any; // require("...") or { uri: "..." }
  isFocused: boolean;
}) => {
  return (
    <View className="flex min-h-full min-w-20 items-center justify-center gap-1 mt-10">
      <Image
        source={icon}
        className="size-6"
        resizeMode="contain"
        tintColor={isFocused ? "#FE8C00" : "gray"}
      />
      <Text
        style={{
          color: isFocused ? "#FE8C00" : "gray",
        }}
      >
        {name}
      </Text>
    </View>
  );
};

const AppLayout = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Redirect href="/(auth)/sign-in" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
          height: 80,
          marginHorizontal: 20,
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 5,
          borderRadius: 50,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="Home" icon={images.home} isFocused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              name="Search"
              icon={images.search}
              isFocused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon name="Cart" icon={images.bag} isFocused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              name="Profile"
              icon={images.person}
              isFocused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default AppLayout;
