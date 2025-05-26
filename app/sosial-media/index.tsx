import MessageIcons from "@/assets/icons/global/message-icons";
import NotifcationIcons from "@/assets/icons/global/notification-icons";
import ButtonPlusIcons from "@/assets/icons/sosial-media/button-plus-icons";
import InputSearchPrimary from "@/components/ui/component-globals/input-seach-primary";
import CardSosialMedia from "@/components/ui/sosial-media/card-sosial-media";
import ModalHidenPost from "@/components/ui/sosial-media/modal-hiden-post";
import { hide } from "expo-router/build/utils/splash";
import { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, Image, ScrollView } from "react-native";

const SosialMediaIndex = () => {
    const [dataPosts, setDataPosts] = useState([
        {
            id: 1,
            hidenPost: false,
            name: "Ahmad Mambaus Sholihin",
            text: "Saya mempunyai ide bagus...",
            data: [],
        },
        {
            id: 2,
            hidenPost: false,
            name: "Jhon Doe",
            text: "Ada yang pernah make obat ini kah guys?",
            data: [
                { images: require("../../assets/images/Image-success-otp.png") },
                { images: require("../../assets/images/Image-success-otp.png") },
            ],
        },
    ]);
    
    const getGreeting = () => {
        const hour = new Date().getHours(); // WIB jika di perangkat pengguna sudah diatur ke Indonesia
        if (hour >= 4 && hour < 11) return "Good Morning";
        if (hour >= 11 && hour < 15) return "Good Afternoon";
        if (hour >= 15 && hour < 18) return "Good Evening";
        return "Good Night";
    };

    return (
        <View>
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
                                    <Text className="text-[12px] text-text-secondary">{getGreeting()},</Text>
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
                        <CardSosialMedia data={dataPosts} setData={setDataPosts} />
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
}

export default SosialMediaIndex;
