import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import LoveIcons from "@/assets/icons/global/love-icons";
import StarIcons from "@/assets/icons/e-commerce/stars-icons";

interface ProductDetailCardProps {
  product: {
    name: string;
    price: number;
    discount?: number;
    originalPrice?: number;
    sold: number;
    rating: number;
    totalReview: number;
    photoReview: number;
  };
  imageProduct: { id: number; image: any }[];
  activeIndex: number;
  flatListRef: React.RefObject<FlatList<any>>;
  onScrollEnd: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export default function ProductDetailCard({
  product,
  imageProduct,
  activeIndex,
  flatListRef,
  onScrollEnd,
}: ProductDetailCardProps) {
  const { width } = useWindowDimensions();

  return (
    <>
      {/* Product Images Slider */}
      <View className="bg-[#F0F5EF] w-full h-[335px] items-center py-6">
        <FlatList
          ref={flatListRef}
          data={imageProduct}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onScrollEnd}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          renderItem={({ item }) => (
            <View style={{ width, paddingHorizontal: 20 }}>
              <TouchableOpacity activeOpacity={0.8}>
                <Image
                  source={item.image}
                  className="w-full h-[300px] rounded-2xl"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          )}
        />
        {/* Dot Indicator */}
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
            <Text className="text-[24px] font-bold text-black">
              Rp{product.price.toLocaleString("id-ID")}
            </Text>
            {product.discount && product.originalPrice && (
              <View className="flex-row items-center space-x-2 mt-1">
                <View className="bg-red-500 px-2 py-0.5 rounded-full mr-3 w-[45px] h-[24px] items-center justify-center">
                  <Text className="text-white text-[14px] font-semibold">
                    {product.discount}%
                  </Text>
                </View>
                <Text className="text-[14px] text-gray-500 line-through">
                  Rp{product.originalPrice.toLocaleString("id-ID")}
                </Text>
              </View>
            )}
          </View>
          <TouchableOpacity className="mt-1 ml-2" activeOpacity={0.7}>
            <LoveIcons width={25} height={24} color={"#C8C8C8"} />
          </TouchableOpacity>
        </View>

        {/* Product Title */}
        <Text className="mt-3 text-[20px] text-black leading-6">
          {product.name}
        </Text>

        {/* Rating & Reviews */}
        <View className="flex-row items-center gap-2 mt-4">
          <Text className="text-[14px] text-gray-600">Sold {product.sold}</Text>

          <View className="flex-row w-[153px] h-[36px] items-center border border-gray-300 rounded-full px-3 py-1">
            <StarIcons width={16} height={16} />
            <Text className="ml-1 text-[14px] text-black font-semibold">
              {product.rating}
            </Text>
            <Text className="ml-1 text-[14px] text-gray-600">
              ({product.totalReview} Reviews)
            </Text>
          </View>

          <View className="flex-row w-[144px] h-[36px] items-center border border-gray-300 rounded-full px-3 py-1">
            <Text className="text-[14px] text-black font-semibold">Photo</Text>
            <Text className="ml-1 text-[14px] text-gray-600">
              ({product.photoReview} Reviews)
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}
