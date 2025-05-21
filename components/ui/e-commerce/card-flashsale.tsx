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
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageWrapper}>
        <Image source={image} style={styles.image} resizeMode="contain" />

        {discount ? (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discount}</Text>
          </View>
        ) : null}

        {/* Stock Progress Bar */}
        <View style={styles.progressBar}>
          {/* Sold portion bar */}
          <View style={[styles.soldBar, { width: `${soldPercent}%` }]} />

          {/* Available portion bar */}
          <View
            style={[styles.availableBar, { width: `${remainingPercent}%` }]}
          />

          {/* Sold text, fixed width, absolute so it won't shrink */}
          {sold > 0 && <Text style={styles.soldText}>{sold} Sold</Text>}
        </View>
      </View>

      {/* Product Info */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.price} numberOfLines={1}>
          {price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Card container
  card: {
    width: 125,
    borderRadius: 10,
    overflow: "hidden",
    margin: 0,
    backgroundColor: "rgba(128, 128, 128, 0.09)",
  },

  // Image wrapper for positioning and background
  imageWrapper: {
    width: "100%",
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  // Product image styling
  image: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 0,
    width: "100%",
    height: "80%",
  },

  // Discount badge styles
  discountBadge: {
    position: "absolute",
    top: 20,
    left: 0,
    backgroundColor: "#FF3B30",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  discountText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  // Progress bar container
  progressBar: {
    width: "100%",
    height: 20,
    flexDirection: "row",
    overflow: "hidden",
    backgroundColor: "#ddd",
    position: "relative",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 5,
  },

  // Sold bar style
  soldBar: {
    height: "100%",
    backgroundColor: "#FF3B30",
  },

  // Available stock bar style
  availableBar: {
    height: "100%",
    backgroundColor: "#FFA500",
  },

  // Sold text style, absolute to keep width fixed and overlay bar
  soldText: {
    position: "absolute",
    left: 8,
    top: "50%",
    transform: [{ translateY: -10 }],
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 4,
  },

  // Product info container (name and price)
  info: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  // Product name text
  name: {
    fontSize: 14,
    fontWeight: "400",
    color: "#333",
    marginBottom: 4,
  },

  // Product price text
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#28a745",
  },
});

export default FlashSaleCard;
