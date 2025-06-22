import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { X } from "lucide-react-native";

interface Variant {
  size: string;
  stock: number;
}

interface AddToCartModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: () => void;
  image: any;
  name: string;
  price: string;
  variants: Variant[];
  selectedVariant: string;
  setSelectedVariant: (variant: string) => void;
  quantity: number;
  setQuantity: (qty: number) => void;
}

const { height } = Dimensions.get("window");

const AddToCartModal: React.FC<AddToCartModalProps> = ({
  visible,
  onClose,
  onAdd,
  image,
  name,
  price,
  variants,
  selectedVariant,
  setSelectedVariant,
  quantity,
  setQuantity,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1">
        {/* Background overlay */}
        <TouchableOpacity
          activeOpacity={1}
          className="absolute inset-0 bg-black/50"
          onPress={onClose}
        />

        {/* Floating Modal Above Navbar */}
        <View
          className="absolute bottom-[80px] left-4 right-4 bg-white rounded-2xl pt-4 px-4 pb-6 shadow-2xl"
          style={{ maxHeight: height * 0.65 }}
        >
          {/* Close Button */}
          <TouchableOpacity
            onPress={onClose}
            className="absolute right-3 top-3 z-10"
          >
            <X size={20} color="#000" />
          </TouchableOpacity>

          {/* Product Image and Info */}
          <View className="flex-row items-center mt-2">
            <Image source={image} className="w-20 h-20 rounded" />
            <View className="ml-4 flex-1">
              <Text
                className="text-black font-semibold text-base"
                numberOfLines={2}
              >
                {name}
              </Text>
              <Text className="text-[#169953] text-lg font-bold mt-1">
                {price}
              </Text>
            </View>
          </View>

          {/* Product Variants */}
          <Text className="mt-5 font-semibold text-black">Size</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-2"
          >
            {variants.map((v, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => setSelectedVariant(v.size)}
                className={`border px-4 py-2 rounded-xl mr-2 ${
                  selectedVariant === v.size
                    ? "border-[#169953] bg-[#e6f5ef]"
                    : "border-gray-300"
                }`}
              >
                <Text className="text-black text-sm">{v.size}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Quantity Controls */}
          <Text className="mt-5 font-semibold text-black">Quantity</Text>
          <View className="flex-row items-center mt-3 space-x-5">
            <TouchableOpacity
              onPress={() => quantity > 1 && setQuantity(quantity - 1)}
              className="w-10 h-10 rounded-full border border-gray-400 justify-center items-center"
            >
              <Text className="text-lg font-bold">-</Text>
            </TouchableOpacity>
            <Text className="text-black font-semibold text-lg w-6 text-center">
              {quantity}
            </Text>
            <TouchableOpacity
              onPress={() => {
                const maxStock =
                  variants.find((v) => v.size === selectedVariant)?.stock || 1;
                if (quantity < maxStock) setQuantity(quantity + 1);
              }}
              className="w-10 h-10 rounded-full border border-gray-400 justify-center items-center"
            >
              <Text className="text-lg font-bold">+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddToCartModal;
