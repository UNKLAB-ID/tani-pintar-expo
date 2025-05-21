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
import { useRef, useState, useEffect } from "react";

import InputSearchPrimary from "@/components/ui/component-globals/input-seach-primary";
import MessageIcons from "@/assets/icons/global/message-icons";
import CartIcons from "@/assets/icons/e-commerce/cart-icons";
import LocationIcons from "@/assets/icons/e-commerce/locations-icons";
import ArrowRightIcons from "@/assets/icons/e-commerce/arrow-right-icons";
import CustomButton from "@/components/ui/component-globals/button-primary";
import WalletIcons from "@/assets/icons/global/wallet-icons";
import Wallet2Icons from "@/assets/icons/global/wallet2-icons";
import VoucherIcons from "@/assets/icons/global/voucher-icons";

const { width } = Dimensions.get("window");

const realBanners = [
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
  {
    id: 3,
    title: "Jual Murah",
    subtitle: "Only Today",
    image: require("@/assets/images/bottle.png"),
  },
];

const banners = [
  realBanners[realBanners.length - 1],
  ...realBanners,
  realBanners[0],
];

const EcommerceIndex = () => {
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);

    let realIndex = index - 1;
    if (index === 0) realIndex = realBanners.length - 1;
    else if (index === banners.length - 1) realIndex = 0;
    setActiveIndex(realIndex);
  };

  useEffect(() => {
    if (currentIndex === banners.length - 1) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index: 1, animated: false });
        setCurrentIndex(1);
      }, 300);
    } else if (currentIndex === 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: banners.length - 2,
          animated: false,
        });
        setCurrentIndex(banners.length - 2);
      }, 300);
    }
  }, [currentIndex]);

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

      {/* Banner Slider */}
      <View className="mt-4">
        <FlatList
          ref={flatListRef}
          data={banners}
          keyExtractor={(_, i) => i.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScrollEnd}
          initialScrollIndex={1}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
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
                    textClassName="font-extralight text-[11.9px]"
                    className="rounded-full px-4 py-[3px] mt-2"
                  />
                </View>
              </View>
            </View>
          )}
        />

        {/* Dot Indicator */}
        <View className="flex-row justify-center mt-2">
          {realBanners.map((_, index) => (
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

      {/* Tani Pays */}
      <View className="flex-row bg-[#f9f9f9] rounded-2xl px-5 py-4 mx-5 mt-5 space-x-4">
        {/* TaniPay */}
        <View className="w-1/3 items-start">
          <View className="flex-row items-center mb-1">
            <WalletIcons width={18} height={18} className="mr-2" />
            <Text className="text-sm font-medium text-black">TaniPay</Text>
          </View>
          <Text className="text-sm font-bold text-black">Rp20.000</Text>
          <Text
            className="text-xs text-gray-500"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Topup minimum...
          </Text>
        </View>

        {/* TaniPinjam */}
        <View className="w-1/3 items-start">
          <View className="flex-row items-center mb-1">
            <Wallet2Icons width={18} height={18} className="mr-2" />
            <Text className="text-sm font-medium text-black">TaniPinjam</Text>
          </View>
          <Text className="text-sm font-bold text-[#28a745]">ActivateNow</Text>
          <Text
            className="text-xs text-gray-500"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Limit up to Rp20...
          </Text>
        </View>

        {/* Voucher */}
        <View className="w-1/3 items-start">
          <View className="flex-row items-center mb-1">
            <VoucherIcons width={18} height={18} className="mr-2" />
            <Text className="text-sm font-medium text-black">Voucher</Text>
          </View>
          <Text className="text-sm font-bold text-black">Voucher Discount</Text>
          <Text
            className="text-xs text-[#28a745]"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Free Delivery Service
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EcommerceIndex;
