import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import BagIcons from "@/assets/icons/e-commerce/bag-icons";

interface FlashSaleTabCardProps {
  image: any;
  name: string;
  price: string;
  discount?: string;
  sold: number;
  total: number;
  onPress?: () => void;
}

const FlashSaleTabCard: React.FC<FlashSaleTabCardProps> = ({
  image,
  name,
  price,
  discount,
  sold,
  total,
  onPress,
}) => {
  const remaining = Math.max(total - sold, 0);
  const remainingPercent = total > 0 ? (remaining / total) * 100 : 0;
  const soldPercent = 100 - remainingPercent;

  // Hitung harga diskon jika ada
  const getDiscountPrice = () => {
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
      activeOpacity={0.9}
      className="relative flex-row bg-white rounded-lg overflow-hidden items-center"
      style={{ height: 128, padding: 0 }}
    >
      {/* Gambar Produk */}
      <View className="w-[100px] h-full relative" style={{ marginRight: 16 }}>
        <Image
          source={image}
          resizeMode="cover"
          style={{ width: 128, height: "100%" }}
          className="rounded-md"
        />
        {discount && (
          <View
            className="absolute bg-red-600 px-3 py-0.5"
            style={{
              top: 6,
              left: 0,
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
            }}
          >
            <Text className="text-[14px] text-white font-bold">
              {discount}%
            </Text>
          </View>
        )}
      </View>

      {/* Info Produk */}
      <View className="flex-1 justify-between py-2">
        <Text className="text-[18px] font-semibold text-black mb-5">
          {name.length > 17 ? name.slice(0, 17) + "..." : name}
        </Text>

        {discount ? (
          <View className="flex-col items-start mt-1">
            <Text
              className="text-[12px] text-gray-400"
              style={{
                textDecorationLine: "line-through",
                color: "#9CA3AF",
                marginBottom: 4,
              }}
            >
              {price}
            </Text>
            <Text className="text-[18px] font-bold text-black">
              {getDiscountPrice()}
            </Text>
          </View>
        ) : (
          <Text className="text-[18px] font-bold text-primary mt-1">
            {price}
          </Text>
        )}

        {/* Progress Bar */}
        <View className="mt-2">
          <View
            className="w-[134px] h-[14px] flex-row overflow-hidden bg-gray-300 rounded mr-9"
            style={styles.progressBar}
          >
            <View
              className="h-full"
              style={{ backgroundColor: "#169953", width: `${soldPercent}%` }}
            />
            <View
              className="h-full"
              style={{
                backgroundColor: "#F3F3F3",
                width: `${remainingPercent}%`,
              }}
            />
            {sold > 0 && (
              <Text
                className="absolute text-black text-[12px] font-semibold rounded px-1"
                style={{
                  left: "65%",
                  top: "60%",
                  transform: [{ translateX: -50 }, { translateY: -10 }],
                }}
              >
                {sold} Sold
              </Text>
            )}
          </View>
        </View>
      </View>

      {/* Tombol Buy */}
      <View className="justify-center items-center mr-2">
        <TouchableOpacity className="bg-primary px-3 py-3 h-7 rounded-full flex-row items-center">
          <BagIcons width={16} height={16} style={{ marginRight: 4 }} />
          <Text className="text-white text-[12px] font-bold">Buy</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    width: 134,
    height: 24,
    flexDirection: "row",
    overflow: "hidden",
    backgroundColor: "#ddd",
    position: "relative",
    borderRadius: 10,
    marginTop: 4,
  },
});

export default FlashSaleTabCard;
