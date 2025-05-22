import GarisHorizotal from "@/assets/icons/sosial-media/garis-horizontal-icons";
import MessageBlockIcons from "@/assets/icons/sosial-media/message-block-incos";
import NotificationBlockIcons from "@/assets/icons/sosial-media/notification-block-icons";
import SettingIcons from "@/assets/icons/sosial-media/setting-icons";
import CustomButton from "@/components/ui/component-globals/button-primary";
import React from "react";
import { TouchableOpacity, Modal, Text, View, Image } from "react-native"

interface BlockScrinerProps {
    modalBlock: boolean;
    setModalBlock: (visible: boolean) => void;
}

const BlockScriner: React.FC<BlockScrinerProps> = ({
    modalBlock,
    setModalBlock
}) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalBlock}
            onRequestClose={() => setModalBlock(false)}
        >
            <TouchableOpacity
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'flex-end',
                }}
                activeOpacity={1}
                onPressOut={() => setModalBlock(false)}
            >
                <View
                    className="py-5 px-4"
                    style={{
                        backgroundColor: '#fff',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    }}
                >
                    <View style={{ alignItems: 'center', marginVertical: 20 }}>
                        <GarisHorizotal width={86} height={6} />
                    </View>
                    <View>
                        <View style={{ alignItems: 'center', marginBottom: 10 }}>
                            <Image
                                source={require("../../../assets/images/Image-success-otp.png")}
                                className="mb-5"
                                style={{ width: 68, height: 68, borderRadius: 100 }}
                            />
                            <Text className="text-center text-[18px] font-semibold">Block Natasya Julio?</Text>
                            <Text className="text-center text-[14px] text-text-secondary">This action will block this account and prevent the creation of new accounts to maintain a safe environment</Text>
                        </View>
                        <View>
                            <View className="flex-row items-center">
                                <MessageBlockIcons width={24} height={24} />
                                <Text className="text-[12px] ml-3 text-[#191919]">They will no longer have access to your profile or content on TaniVerse, and they won't be able to message you.</Text>
                            </View>
                            <View className="flex-row items-center" style={{marginVertical:10}}>
                                <NotificationBlockIcons width={24} height={24} />
                                <Text className="text-[12px] ml-3 text-[#191919]">They don’t get a notification of the blocked.</Text>
                            </View>
                            <View className="flex-row items-center">
                                <SettingIcons width={24} height={24} />
                                <Text className="text-[12px] ml-3 text-[#191919]">You can easily unblock a user through Settings.</Text>
                            </View>
                        </View>
                        <View className="mt-5">
                            <CustomButton title="Block" className="py-[10px]" onPress={() => {
                                setModalBlock(false)
                            }} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>

    )
}

export default BlockScriner


