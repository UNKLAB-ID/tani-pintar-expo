import InputSearchPrimary from "@/components/ui/component-globals/input-seach-primary";
import { SafeAreaView, View, Text } from "react-native";

const SosialMediaIndex = () => {
  return (
    <SafeAreaView className="flex-1 w-full">
      <View className="bg-white px-5">
        <InputSearchPrimary
          placeholder="Find what you’re looking for..."
          className="px-[12px]"
          coloricon="#000"
        />
      </View>
    </SafeAreaView>
  );
};

export default SosialMediaIndex;
