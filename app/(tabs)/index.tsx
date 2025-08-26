import CartBtn from "@/components/CartBtn";
import { images, offers } from "@/constants";
import cn from "clsx";
import { Fragment } from "react";
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        contentContainerClassName="px-4 pt-4"
        data={offers}
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0;

          return (
            <View>
              <Pressable
                className={cn(
                  "offer-card",
                  isEven ? "flex-row-reverse" : "flex-row"
                )}
                style={{
                  backgroundColor: item.color,
                }}
                android_ripple={{ color: "#fffff22" }}
              >
                {({ pressed }) => (
                  <Fragment>
                    <View className="w-1/2 h-full">
                      <Image
                        source={item.image}
                        resizeMode="contain"
                        className="size-full"
                      />
                    </View>
                    <View
                      className={cn(
                        "offer-card__info",
                        isEven ? "pl-10" : "pr-10"
                      )}
                    >
                      <Text className="h1-bold text-white">{item.title}</Text>
                      <Image
                        source={images.arrowRight}
                        className="size-10"
                        resizeMode="contain"
                      />
                    </View>
                  </Fragment>
                )}
              </Pressable>
            </View>
          );
        }}
        ListHeaderComponent={() => (
          <View className="flex-between flex-row my-5">
            <View>
              <Text className="text-primary text-[11px]">DELIVER TO</Text>
              <TouchableOpacity className="flex-row items-center gap-1">
                <Text className="font-bold text-dark-100 mt-0.5">Croatia</Text>
                <Image
                  source={images.arrowDown}
                  className="size-3"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <CartBtn />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
