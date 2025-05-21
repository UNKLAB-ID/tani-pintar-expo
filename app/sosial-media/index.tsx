import MessageIcons from "@/assets/icons/global/message-icons";
import NotifcationIcons from "@/assets/icons/global/notification-icons";
import ButtonPlusIcons from "@/assets/icons/sosial-media/button-plus-icons";
import InputSearchPrimary from "@/components/ui/component-globals/input-seach-primary";
import CardSosialMedia from "@/components/ui/sosial-media/card-sosial-media";
import { SafeAreaView, View, Text, TouchableOpacity, Image, ScrollView } from "react-native";

const SosialMediaIndex = () => {
    const imagesDummy = [
        {
            name: "Ahmad Mambaus Sholihin",
            text: "Saya mempunyai ide bagus untuk membuat bahan baru untuk para petani untuk membuat obat otomatis pembasmi hama supaya mempercepat pengerjaan dan tidak banyak makan waktu?",
            data: []
        },
        {
            name: "Jhon Doe",
            text: "Ada yang pernah make obat ini kah guys? cocok ga ya buat tanaman saya?",
            data: [
                { images: require("../../assets/images/Image-success-otp.png") },
                { images: require("../../assets/images/Image-success-otp.png") },
                { images: require("../../assets/images/Image-success-otp.png") },
                { images: require("../../assets/images/Image-success-otp.png") },
                { images: require("../../assets/images/Image-success-otp.png") },
                { images: require("../../assets/images/Image-success-otp.png") },
                { images: require("../../assets/images/Image-success-otp.png") },
            ]
        }
    ]

    return (
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 67 }}
        >
            <SafeAreaView className="flex-1 w-full">
                <View className="bg-white px-5 py-4" style={{ marginBottom: 3 }}>
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center justify-between">
                            <View className="rounded-full">
                                <Image source={require('../../assets/images/Image-success-otp.png')} className="w-[40px] h-[40px] rounded-full" />
                            </View>
                            <View className="ml-3">
                                <Text className="text-[12px] text-text-secondary">Good Morning,</Text>
                                <Text className="text-[16px] font-semibold text-text-primary">Mambaus Baus</Text>
                            </View>
                        </View>
                        <View className="flex-row items-center justify-between">
                            <TouchableOpacity className="rounded-full bg-primary h-[32px] w-[32px] items-center justify-center">
                                <MessageIcons width={18} height={18} color={"#fff"} />
                            </TouchableOpacity>
                            <TouchableOpacity className="rounded-full bg-primary h-[32px] w-[32px] items-center justify-center ml-2">
                                <NotifcationIcons width={18} height={18} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="flex-row items-center justify-between mt-3">
                        <View className="w-[302px]">
                            <InputSearchPrimary coloricon="#000" placeholder="Find what you’re looking for..." className="px-[12px] h-[39px]" />
                        </View>
                        <TouchableOpacity className=""><ButtonPlusIcons /></TouchableOpacity>
                    </View>
                </View>
                <View>
                    <CardSosialMedia data={imagesDummy} />
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

export default SosialMediaIndex;
