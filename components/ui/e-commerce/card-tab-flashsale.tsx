import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

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

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className="flex-row bg-white rounded-lg overflow-hidden p-2"
    >
      {/* Gambar Produk */}
      <View className="relative w-[80px] h-[80px] mr-3 ">
        <Image
          source={image}
          resizeMode="contain"
          style={{ width: 128, height: 128 }}
          className=" rounded-md"
        />
        {discount && (
          <View style={styles.discountBadge}>
            <Text className="text-white text-xs font-semibold">{discount}</Text>
          </View>
        )}
      </View>

      {/* Informasi Produk */}
      <View className="flex-1 justify-between">
        <View>
          <Text numberOfLines={1} className="text-sm font-semibold text-black">
            {name}
          </Text>
          <Text className="text-base font-bold text-black">{price}</Text>
        </View>

        {/* Progress Bar dan Sold */}
        <View className="mt-1">
          <View className="" style={styles.progressBar}>
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

            {sold > 0 && <Text style={styles.soldText}>{sold} Sold</Text>}
          </View>
        </View>
      </View>

      {/* Tombol Beli */}
      <TouchableOpacity
        className="bg-primary px-3   rounded-full mt-5 ml-2 justify-center items-center flex-row"
        style={{ height: 28 }}
      >
        <Text className="text-white text-sm font-bold">Buy</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  discountBadge: {
    position: "absolute",
    top: 4,
    left: 0,
    backgroundColor: "#EF4444",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
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
    color: "#000",
    fontSize: 11,
    fontWeight: "500",
    paddingHorizontal: 4,
  },
});

export default FlashSaleTabCard;
