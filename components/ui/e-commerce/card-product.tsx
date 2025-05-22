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
  discount: string;
  onPress?: () => void;
}

const ProductCard = ({
  image,
  name,
  price,
  rating,
  sold,
  location,
  discount,
  onPress,
}: ProductCardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="relative bg-white rounded-2xl  shadow-sm overflow-hidden"
      style={{ width: 181, height: 287 }}
      activeOpacity={0.85}
    >
      {/* Gambar Produk */}
      <View
        className="bg-gray-50"
        style={{
          width: 177,
          height: 177,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={image}
          resizeMode="contain"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>

      {/* Badge Discount */}
      {discount && (
        <View
          style={{
            position: "absolute",
            left: 0,
            top: 15,
            backgroundColor: "#EF4444",
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderTopRightRadius: 999,
            borderBottomRightRadius: 999,
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
            zIndex: 10,
          }}
        >
          <Text className="text-[12] text-white font-bold">{discount} OFF</Text>
        </View>
      )}

      {/* Detail Produk */}
      <View className="p-2 space-y-1">
        <Text numberOfLines={2} className="text-[14px] font-medium text-black">
          {name}
        </Text>

        {discount ? (
          <View className="flex-row items-center mt-1">
            {/* Harga setelah diskon */}
            <Text className="text-[16px] font-bold text-primary">
              {`Rp ${(
                parseFloat(price.replace(/[^\d]/g, "")) -
                (parseFloat(price.replace(/[^\d]/g, "")) *
                  parseFloat(discount)) /
                  100
              ).toLocaleString("id-ID")}`}
            </Text>

            {/* Harga asli dicoret */}
            <Text className="text-[12px] text-gray-40 line-through ml-[12px]">
              {price}
            </Text>
          </View>
        ) : (
          <Text className="text-[16px] font-bold text-primary mt-1">
            {price}
          </Text>
        )}

        {/* Rating & Sold */}
        <View className="flex-row items-center mt-[2px]">
          <StarIcons width={16} height={16} />
          <Text className="text-[12px] text-gray-600 ml-1">
            {(rating ?? 0).toFixed(1)}
          </Text>
          <Text className="text-[12px] text-gray-400 ml-2">| Sold {sold}</Text>
        </View>

        {/* Lokasi */}
        <View className="flex-row items-center mt-[2]">
          <Location2Icons width={17} height={20} />
          <Text className="text-[12px] text-gray-500 ml-[6px]">{location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
