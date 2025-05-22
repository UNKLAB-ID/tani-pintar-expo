import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface FlashSaleCardProps {
  image: any;
  name: string;
  price: string;
  discount: string;
  sold: number;
  total: number;
  onPress?: () => void;
}

const FlashSaleCard: React.FC<FlashSaleCardProps> = ({
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

  return (
    <TouchableOpacity
      className="w-[128px] h-[184px]rounded-lg overflow-hidden bg-gray-400/10"
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Gambar Produk */}
      <View
        className="justify-center items-center"
        style={{ width: 128, height: 128 }}
      >
        <Image
          source={image}
          style={{
            width: 128,
            height: 128,
            borderRadius: 4,
          }}
          resizeMode="contain"
        />
        {discount ? (
          <View style={styles.discountBadge}>
            <Text className="text-white text-[12px] font-semibold">
              {discount}
            </Text>
          </View>
        ) : null}
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View
          className="h-full"
          style={{ backgroundColor: "#FF3B30", width: `${soldPercent}%` }}
        />
        <View
          className="h-full"
          style={{ backgroundColor: "#FFA500", width: `${remainingPercent}%` }}
        />

        {sold > 0 && <Text style={styles.soldText}>{sold} Sold</Text>}
      </View>

      {/* Info Produk */}
      <View className="px-[6px] py-[4px]">
        <Text
          className="text-[13px] font-normal text-[#333333]"
          numberOfLines={1}
        >
          {name}
        </Text>
        <Text
          className="text-[14px] font-bold text-[#28a745]"
          numberOfLines={1}
        >
          {price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  discountBadge: {
    position: "absolute",
    top: 8,
    left: 0,
    backgroundColor: "#FF3B30",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  progressBar: {
    width: 128,
    height: 14,
    flexDirection: "row",
    overflow: "hidden",
    backgroundColor: "#ddd",
    position: "relative",
    borderRadius: 4,
    marginTop: 4,
  },
  soldText: {
    position: "absolute",
    left: 6,
    top: "50%",
    transform: [{ translateY: -7 }],
    color: "#fff",
    fontSize: 11,
    fontWeight: "500",
    paddingHorizontal: 4,
  },
});

export default FlashSaleCard;
