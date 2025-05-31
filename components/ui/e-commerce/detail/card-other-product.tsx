import React from "react";
import { View, Text, Image } from "react-native";

type Props = {
  image: any;
  name: string;
  price: string;
  discount: string;
};

export default function OtherProductCard({
  image,
  name,
  price,
  discount,
}: Props) {
  return (
    <View className="w-[114px] h-[190px] mr-3 bg-white rounded-lg  p-2">
      <Image
        source={image}
        className="rounded-2xl"
        style={{ width: 114, height: 114 }}
        resizeMode="contain"
      />
      <Text className="text-[12px] mt-2">
        {name?.length > 15 ? name.slice(0, 15) + "..." : name || "Tanpa Nama"}
      </Text>
      <View
        className="flex-row items-center justify-start mt-1"
        style={{ width: 114, height: 25 }}
      >
        <Text className="text-[16px] text-black font-semibold">
          {(() => {
            if (!price) return "";

            const numberOnly = price.replace(/[^0-9]/g, "");
            const numericValue = parseInt(numberOnly);

            if (isNaN(numericValue)) return "";

            if (numericValue < 100000) {
              return "Rp " + numberOnly.slice(0, 2) + ". ...";
            } else {
              return "Rp " + numberOnly.slice(0, 3) + "...";
            }
          })()}
        </Text>

        <View
          className="rounded-full items-center justify-center"
          style={{
            backgroundColor: "#FF0808",
            width: 49,
            height: 24,
            paddingHorizontal: 8,
          }}
        >
          <Text className="text-white text-[10px] font-bold">{discount}</Text>
        </View>
      </View>
    </View>
  );
}
