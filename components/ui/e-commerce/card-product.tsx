import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Location2Icons from "@/assets/icons/e-commerce/locations2-icons";
import StarIcons from "@/assets/icons/e-commerce/stars-icons";

interface ProductCardProps {
  image: any;
  name: string;
  price: string;
  rating: number;
  sold: number;
  location: string;
  discount?: string;
  onPress?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  price,
  rating,
  sold,
  location,
  discount,
  onPress,
}) => {
  const calculateDiscountPrice = () => {
    if (!discount) return price;
    const numericPrice = parseFloat(price.replace(/[^\d]/g, ""));
    const numericDiscount = parseFloat(discount);
    const discountedPrice =
      numericPrice - (numericPrice * numericDiscount) / 100;
    return `Rp ${discountedPrice.toLocaleString("id-ID")}`;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="relative bg-white rounded-2xl"
      style={{ width: 180, height: 272 }}
      activeOpacity={0.85}
    >
      {/* Gambar Produk */}
      <View
        className="bg-gray-50 justify-center items-center"
        style={{
          width: 177,
          height: 172,
        }}
      >
        <Image
          source={image}
          resizeMode="contain"
          className="w-full h-full rounded-2xl"
        />
      </View>

      {/* Badge Discount */}
      {discount && (
        <View
          className="absolute px-4 py-1 z-10"
          style={{
            left: 0,
            top: 15,
            backgroundColor: "#EF4444",
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <Text className="text-[14px] text-white font-bold">{discount}</Text>
        </View>
      )}

      {/* Detail Produk */}
      <View className="p-2 space-y-1">
        <Text
          numberOfLines={1}
          className="text-[16px] font-medium text-[#1F1F1F]"
          style={{ fontWeight: "400" }}
        >
          {name.length > 20 ? name.slice(0, 20) + "..." : name}
        </Text>

        {discount ? (
          <View className="flex-row items-center mt-1">
            <Text className="text-[18px] font-bold text-primary">
              {calculateDiscountPrice()}
            </Text>
            <Text
              className="text-[12px]"
              style={{
                marginLeft: 8,
                color: "#9CA3AF",
                textDecorationLine: "line-through",
              }}
            >
              {price}
            </Text>
          </View>
        ) : (
          <Text className="text-[18px] font-bold text-primary mt-1">
            {price}
          </Text>
        )}

        {/* Rating & Sold */}
        <View className="flex-row items-center mt-1">
          <StarIcons width={16} height={16} />
          <Text className="text-[12px] text-gray-600 ml-2">
            {rating.toFixed(1)}
          </Text>
          <Text className="text-[12px] text-gray-400 ml-1">| Sold {sold}</Text>
        </View>

        {/* Lokasi */}
        <View className="flex-row items-center mt-1">
          <Location2Icons width={14} height={14} className="-ml-1 mt-[1px]" />
          <Text className="text-[12px] text-gray-500 ml-2">{location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
