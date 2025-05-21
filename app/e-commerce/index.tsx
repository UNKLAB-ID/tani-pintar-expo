import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { useState } from "react";

import InputSearchPrimary from "@/components/ui/component-globals/input-seach-primary";
import MessageIcons from "@/assets/icons/message-icons";
import CartIcons from "@/assets/icons/cart-icons";
import LocationIcons from "@/assets/icons/locations-icons";
import ArrowRightIcons from "@/assets/icons/arrow-right-icons";
import CustomButton from "@/components/ui/component-globals/button-primary";

const { width } = Dimensions.get("window");

const banners = [
  {
    id: 1,
    title: "Year-End Sale",
    subtitle: "Up to 50%",
    image: require("@/assets/images/bottle.png"),
  },
  {
    id: 2,
    title: "Flash Deal",
    subtitle: "Only Today",
    image: require("@/assets/images/bottle.png"),
  },
];

const EcommerceIndex = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setActiveIndex(index);
  };

  return (
    <SafeAreaView className="flex-1 w-full bg-white">
      {/* Header */}
      <View className="bg-white px-5 py-4">
        <View className="flex-row items-center justify-between">
          <View className="w-[276px]">
            <InputSearchPrimary
              placeholder="Find what you’re looking for..."
              className="px-[12px]"
              coloricon="#000"
            />
          </View>
          <View className="flex-row">
            <View className="mr-[9]">
              <MessageIcons width={28} height={28} />
            </View>
            <CartIcons width={28} height={28} />
          </View>
        </View>
      </View>

      {/* Location */}
      <View className="px-5">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <LocationIcons width={25} height={25} color="#28a745" />
            <Text className="ml-2 text-sm font-bold">
              <Text className="text-[#8e8e8e]">Ship to </Text>
              <Text className="text-[#2b2b2b]">
                Jl. Pangeran Diponegoro,...
              </Text>
            </Text>
          </View>
          <ArrowRightIcons width={18} height={18} />
        </View>
      </View>

      {/* Banner */}
      <View className="mt-4">
        <FlatList
          data={banners}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          renderItem={({ item }) => (
            <View style={{ width, paddingHorizontal: 20 }}>
              <View className="w-full h-[120px] rounded-2xl overflow-hidden bg-black flex-row justify-between items-center px-4">
                {/* Images */}
                <View className="flex-row items-end space-x-[-4px] px-[19px]">
                  <Image
                    source={item.image}
                    className="w-[36px] h-[78px]"
                    resizeMode="contain"
                  />
                  <Image
                    source={item.image}
                    className="w-[44px] h-[95px]"
                    resizeMode="contain"
                  />
                  <Image
                    source={item.image}
                    className="w-[36px] h-[78px]"
                    resizeMode="contain"
                  />
                </View>

                {/* Text & Button */}
                <View className="items-center justify-center px-[19px]">
                  <Text className="text-white text-base font-bold text-center">
                    {item.title}
                  </Text>
                  <Text className="text-[#cfcfcf] text-sm text-center">
                    {item.subtitle}
                  </Text>
                  <CustomButton
                    title="Shop Now"
                    textClassName="font-extralight text-[12px]"
                    className="rounded-full px-4 py-[3px] mt-2"
                  />
                </View>
              </View>
            </View>
          )}
        />

        {/* Dot Indicator */}
        <View className="flex-row justify-center mt-2">
          {banners.map((_, index) => (
            <View
              key={index}
              className={`mx-[2px] rounded-full ${
                index === activeIndex
                  ? "bg-[#28a745] w-[20px]"
                  : "bg-[#dcdcdc] w-[8px]"
              } h-[8px]`}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EcommerceIndex;
