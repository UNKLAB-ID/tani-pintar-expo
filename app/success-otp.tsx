import CustomButton from "@/components/ui/component-globals/button-primary";
import { router } from "expo-router";
import { Image, SafeAreaView, Text, View } from "react-native";

const SuccessOTPScreen = () => {
  return (
   <SafeAreaView className="flex-1 bg-white px-5 pt-[64px]">
    <View>
        <Image source={require('../assets/images/Image-success-otp.png')} className="w-full"/>
    </View>
    <View>
        <Text className="text-[24px] font-bold text-center text-text-primary mt-[50px]">Account Created Successfully!</Text>
        <Text className="text-[16px] text-center text-text-secondary mt-3">
           Your account has been successfully created. Now, you can start exploring all the available features.
        </Text>
    </View>
    <View className="mt-[50px]">
        <CustomButton className='py-[10px]' title="Start Exploring" onPress={()=> router.replace('/(tabs)/sosmed')}/>
    </View>
   </SafeAreaView>
  );
}
export default SuccessOTPScreen;