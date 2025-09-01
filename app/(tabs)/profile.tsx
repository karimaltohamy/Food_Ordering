import CustomHeader from "@/components/shared/CustomHeader";
import { images } from "@/constants";
import { signOut } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Profile = () => {
  const { user, setIsAuthenticated, setUser } = useAuthStore();

  const userInfo = [
    {
      label: "Name",
      value: user?.name,
      icon: images.user,
    },
    {
      label: "Email",
      value: user?.email,
      icon: images.user,
    },
    {
      label: "Phone",
      value: user?.phone || "N/A",
      icon: images.phone,
    },
    {
      label: "Address",
      value: user?.address || "N/A",
      icon: images.home,
    },
  ];

  //  handle logout
  const { mutate: signOutMutation, isPending } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      setIsAuthenticated(false);
      setUser(null);
      Alert.alert("Success", "You have been logged out successfully.");
      router.replace("/(auth)/sign-in");
    },
  });

  return (
    <SafeAreaView className="flex-1">
      <ScrollView contentContainerClassName="gap-5 px-5 pb-32">
        <CustomHeader title="Profile" />

        {/* Avatar */}
        <View className="flex-1 justify-center items-center mx-auto mt-10 mb-5 relative size-32">
          <Image
            source={{ uri: user?.avatar }}
            className="size-32 rounded-full"
          />

          <View className=" size-7 rounded-full bg-primary text-white items-center justify-center absolute bottom-2 right-2">
            <Image source={images.pencil} className="size-4" />
          </View>
        </View>

        {/* user info */}
        {userInfo.map((item, index) => (
          <View
            key={index}
            className="flex-row gap-5 items-center justify-start mb-4 last:mb-0 border border-primary/20 p-2 px-3 rounded-lg"
          >
            <Image
              source={item.icon}
              className="size-7  flex items-center justify-center"
            />
            <View>
              <Text className="text-base font-medium text-gray-500">
                {item.label}
              </Text>
              <Text className="text-gray-700 font-semibold text-lg">
                {item.value}
              </Text>
            </View>
          </View>
        ))}

        {/* logout */}
        <TouchableOpacity
          onPress={() => signOutMutation()}
          disabled={isPending}
          className="bg-primary rounded-full p-3 w-full flex flex-row justify-center mt-12 hover:bg-primary/80"
        >
          <Text className="text-white font-semibold text-lg">Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
