import DateIcons from "@/assets/icons/sosial-media/date-icons";
import GarisHorizotal from "@/assets/icons/sosial-media/garis-horizontal-icons";
import React from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";

interface ModalAboutProfileUserProps {
    modalAboutProfile: boolean;
    setModalAboutProfile: (value: boolean) => void;
}

const ModalAboutProfileUser: React.FC<ModalAboutProfileUserProps> = ({ modalAboutProfile, setModalAboutProfile }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalAboutProfile}
            statusBarTranslucent={true}
            onRequestClose={() => {
                setModalAboutProfile(false);
            }}
        >
            <TouchableOpacity
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'flex-end',
                }}
                activeOpacity={1}
                onPressOut={() => {
                    setModalAboutProfile(false);
                }}
            />
            <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <View
                    style={{
                        backgroundColor: '#fff',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        paddingHorizontal: 16,
                        paddingVertical: 20,
                        height: 260, // Adjust height based on typeQuery
                    }}
                >
                    {/* Garis horizontal */}
                    <View style={{ alignItems: 'center', marginBottom: 16 }}>
                        <GarisHorizotal width={86} height={6} />
                    </View>
                    <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 10 }}>
                        About Profile
                    </Text>
                    <View style={{ borderWidth: 1, borderColor: "#DEDEDE", borderRadius: 12, padding: 10 }}>
                        <View className="flex-row items-center" style={{ borderBottomWidth: 1, borderBottomColor: '#DEDEDE', paddingBottom: 10 }}>
                            <Image
                                source={require('../../../../assets/images/profile-default.png')}
                                className="w-[40px] h-[40px] rounded-full"
                                style={{ marginLeft: -6 }}
                            />
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: '600' }}>Natasya Julio</Text>
                                <Text style={{ fontSize: 14, fontWeight: '400', color: "#8D8D8D" }}>Bandung</Text>
                            </View>
                        </View>
                        <View className="flex-row items-center"  style={{ marginTop: 10 }}>
                            <View className="flex-row items-center justify-between">
                                <DateIcons width={20} height={20} />
                            </View>
                            <View className="ml-3">
                                <Text style={{ fontSize: 16, fontWeight: '600' }}>Natasya Julio</Text>
                                <Text style={{ fontSize: 14, fontWeight: '400', color: "#8D8D8D" }}>Bandung</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalAboutProfileUser;