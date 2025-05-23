import HidenPostIcons from "@/assets/icons/sosial-media/hiden-post-icons";
import ReportIcons from "@/assets/icons/sosial-media/report-icons";
import UndoPostIcons from "@/assets/icons/sosial-media/undo-post-icons";
import { Colors } from "@/constants/Colors";
import React from "react"
import { Image } from "react-native";
import { Modal, Text, TouchableOpacity, View } from "react-native"

interface ModalHidenPostProps {
    hidenPost: boolean;
    setHidenPost: (visible: boolean) => void;
}

const ModalHidenPost: React.FC<ModalHidenPostProps> = ({ hidenPost, setHidenPost }) => {
    return (
        <TouchableOpacity
        className="px-5 py-4"
            style={{
                flex: 1,
                justifyContent: 'flex-end',
            }}
            activeOpacity={1}
            onPressOut={() => setHidenPost(false)}
        >
            <View style={{borderBottomColor:"#C8C8C8", borderBottomWidth: 1, paddingBottom:10}}>
                <View className="flex-row mb-1">
                    <HidenPostIcons width={22.01} height={20.16} color={Colors.color.primary} />
                    <Text className="text-[14px] text-center text-text-secondary ml-3">Hidden</Text>
                </View>
                <Text className="text-[16px] font-semibold text-text-primary">Hide posts for more relevant feeds.</Text>
            </View>
            <View className="py-4">
                <View className="flex-row ">
                    <Image
                        source={require("../../../assets/images/Image-success-otp.png")}
                        className="mb-5"
                        style={{ width: 28, height: 28, borderRadius: 100 }}
                    />
                    <Text className="text-center text-[14px] ml-3 items-center" style={{fontWeight:500}}>Do not show Natasya Julio for 14 days</Text>
                </View>
                <View className="flex-row items-center mb-4">
                    <ReportIcons width={22} height={22} color={"#1F1F1F"} />
                    <Text className="text-[14px] text-text-primary ml-3" style={{fontWeight:500}}>Report post</Text>
                </View>
                <View className="flex-row items-center">
                    <UndoPostIcons width={22} height={22} color={"#1F1F1F"} />
                    <Text className="text-[14px] text-text-primary ml-3" style={{fontWeight:500}}>Undo post</Text>
                </View>
            </View>
        </TouchableOpacity>

    )
}

export default ModalHidenPost