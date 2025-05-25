import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  FlatList,
} from "react-native";
import ShareSquareIcons from "@/assets/icons/e-commerce/share-icons";
import StarIcons from "@/assets/icons/e-commerce/stars-icons";
import CartIcons from "@/assets/icons/e-commerce/cart-icons";
import BackIcons from "@/assets/icons/global/back-icons";
import Share2Icons from "@/assets/icons/e-commerce/share-detail-icons";
import MenuVerticalIcons from "@/assets/icons/e-commerce/menu-dots-vertikal-icons";
import LoveIcons from "@/assets/icons/global/love-icons";
import ReturnBox from "@/assets/icons/e-commerce/return-box";
import { router } from "expo-router";

const { width } = Dimensions.get("window");
const imageProduct = [
  {
    id: 1,
    image: require("@/assets/images/trash/image25.png"),
  },
  {
    id: 2,
    image: require("@/assets/images/trash/bottle.png"),
  },
  {
    id: 3,
    image: require("@/assets/images/trash/Banner-Promotion.png"),
  },
];

const product = [
  imageProduct[imageProduct.length - 1],
  ...imageProduct,
  imageProduct[0],
];

export default function ProductDetailScreen() {
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1);

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);

    let realIndex = index - 1;
    if (index === 0) realIndex = imageProduct.length - 1;
    else if (index === product.length - 1) realIndex = 0;
    setActiveIndex(realIndex);
  };

  const handleback = () => {
    router.push("/(tabs)/ecommerce");
  };

  return (
    <ScrollView className="bg-[#f8f8f8]">
      <View className="flex-row bg-white items-center justify-between px-3 pb-5 pt-6">
        <TouchableOpacity className="ml-4" onPress={handleback}>
          <BackIcons width={20} height={20} color="#7D7D7D" />
        </TouchableOpacity>

        <View className="flex-row items-center ">
          <TouchableOpacity>
            <CartIcons width={26} height={26} colorIcon="#7D7D7D" />
          </TouchableOpacity>
          <TouchableOpacity className="ml-4">
            <Share2Icons width={26} height={26} />
          </TouchableOpacity>
          <TouchableOpacity className="ml-4">
            <MenuVerticalIcons width={26} height={26} />
          </TouchableOpacity>
        </View>
      </View>

      <View className="bg-[#F0F5EF] w-full h-[335px] items-center py-6">
        <FlatList
          ref={flatListRef}
          data={product}
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
              <TouchableOpacity>
                <Image
                  source={item.image}
                  className="w-full h-[120px] rounded-2xl"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          )}
        />
        <View className="flex-row justify-center bg-white p-1 rounded-full mt-2">
          {imageProduct.map((_, index) => (
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

      {/* Product Info Section */}
      <View className="px-4 pt-4 pb-4 bg-white">
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="text-[24px] font-bold text-black">Rp765.000</Text>
            <View className="flex-row items-center space-x-2 mt-1">
              <View className="bg-red-500 px-2 p-4 py-0.5 rounded-full mr-4 w-[45px] h-[24px] items-center justify-center">
                <Text className="text-white text-[14px] font-semibold">
                  15%
                </Text>
              </View>
              <Text className="text-[14px] text-gray-500 line-through">
                Rp900.000
              </Text>
            </View>
          </View>
          <TouchableOpacity className="mt-1 ml-2">
            <LoveIcons width={25} height={24} color={"#C8C8C8"} />
          </TouchableOpacity>
        </View>

        {/* Product Title */}
        <Text className="mt-3 text-[20px] text-black leading-6">
          Alat Penyemprot Hama H&amp;L – Alat penyemprot listrik manual 2 in 1
          berkapasitas 16 liter
        </Text>

        {/* Rating & Reviews */}
        <View className="flex-row  items-center gap-2 mt-4">
          <Text className="text-[14px] text-gray-600">Sold 60</Text>
          <View className="flex-row  w-[153px] h-[36px] items-center border border-gray-300 rounded-full px-3 py-1">
            <StarIcons width={16} height={16} />
            <Text className="ml-1 text-[14px] text-black font-semibold">
              4.8
            </Text>
            <Text className="ml-1 text-[14px] text-gray-600">(30 Reviews)</Text>
          </View>
          <View className="flex-row border w-[144px] h-[36px] items-center border-gray-300 rounded-full px-3 py-1">
            <Text className="text-[14px] text-black font-semibold">Photo </Text>
            <Text className="ml-1 text-[14px]font text-gray-600">
              (10 Reviews)
            </Text>
          </View>
        </View>
      </View>

      {/* Product Specification Section */}
      <View className="mt-6 px-4 bg-white pb-6">
        <Text className="text-[16px] font-semibold mb-3 text-black">
          Product Specifications
        </Text>

        <View className="space-y-2">
          {/* Brand */}
          <Text className="text-[14px] text-gray-600">
            <Text className="font-semibold text-black">Brand: </Text>
            <Text className="text-[#2F8E6E]">H&amp;L</Text>
          </Text>

          {/* Category */}
          <Text className="text-[14px] text-gray-600">
            <Text className="font-semibold text-black">Category: </Text>
            <Text className="text-[#2F8E6E]">Other Garden Supplies</Text>
          </Text>

          {/* Returns */}
          <View className="flex-row items-center mt-2">
            <ReturnBox width={20} height={20} />
            <Text className="text-[14px] text-[#2F8E6E] ml-1">
              Free 14 Days Returns (conditional)
            </Text>
          </View>

          {/* Function */}
          <View className="flex-row border-b border-gray-200 pt-3 pb-2 mt-4">
            <Text className="text-[14px] text-gray-400">Function</Text>
            <Text
              className="text-[14px]  text-justify text-gray-400"
              style={{ marginLeft: 50 }}
            >
              Spray Machine
            </Text>
          </View>

          {/* Dimensions */}
          <View className="flex-row border-b border-gray-200 pt-3 pb-2">
            <Text className="text-[14px] text-gray-400">Dimensions</Text>
            <Text
              className="text-[14px] text-gray-400"
              style={{ marginLeft: 30 }}
            >
              30×30×30
            </Text>
          </View>

          {/* Heavy */}
          <View className="flex-row border-b border-gray-200 pt-3 pb-2">
            <Text className="text-[14px] text-gray-400">Heavy</Text>
            <Text
              className="text-[14px] text-gray-400"
              style={{ marginLeft: 65 }}
            >
              7000
            </Text>
          </View>

          {/* Brand again */}
          <View className="flex-row pt-3">
            <Text className="text-[14px] text-gray-400">Brand:</Text>
            <Text
              className="text-[14px] text-gray-400"
              style={{ marginLeft: 65 }}
            >
              H&amp;L
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
