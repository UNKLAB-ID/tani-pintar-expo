import { SafeAreaView, View, Text } from "react-native";
//icons
import InputSearchPrimary from "@/components/ui/component-globals/input-seach-primary";
import MessageIcons from "@/assets/icons/message-icons";
import CartIcons from "@/assets/icons/cart-icons";
import LocationIcons from "@/assets/icons/locations-icons";
import ArrowRightIcons from "@/assets/icons/arrow-right-icons";

const EcommerceIndex = () => {
  return (
    <SafeAreaView className="flex-1 w-full bg-white">
      <View className="bg-white px-5 py-4">
        <View className="flex-row items-center justify-between">
          {/* Search input */}
          <View className="w-[276px]">
            <InputSearchPrimary
              placeholder="Find what you’re looking for..."
              className="px-[12px]"
              coloricon="#000"
            />
          </View>

          {/* Icons */}
          <View className="flex-row">
            <View className="mr-[9]">
              <MessageIcons width={28} height={28} />
            </View>
            <CartIcons width={28} height={28} />
          </View>
        </View>
      </View>

      {/* Location Row */}
      <View className="px-5">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <LocationIcons width={25} height={25} color="#28a745" />
            <Text className="ml-2 text-sm font-bold">
              <Text className="text-[#8e8e8e]">Ship to </Text>
              <Text className="text-[#2b2b2b]">
                Jl. Pangeran Diponegoro,...
              </Text>
            </Text>
          </View>
          <ArrowRightIcons width={18} height={18} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EcommerceIndex;
