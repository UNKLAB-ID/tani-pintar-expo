import DeleteIcons from "@/assets/icons/global/delete-icons";
import ShareGlobalIcons from "@/assets/icons/global/share-global-icons";
import BoockmarkSave from "@/assets/icons/sosial-media/boockmark-save-icons";
import EditBgImagesSosialMediaIcons from "@/assets/icons/sosial-media/edit-bg-images-profile-sosial-media-icons";
import GarisHorizotal from "@/assets/icons/sosial-media/garis-horizontal-icons";
import { router } from "expo-router";
import React from "react"
import { Modal, Share, Text, TouchableOpacity, View } from "react-native"

interface ModalPostMenuProfileProps {
    modalPostMenu: boolean;
    setModalPostMenu: (value: boolean) => void;
    setModalShare: (value: boolean) => void;
    setModalDeletePost: (value: boolean) => void;
    typeQuery?: string;
}

const ModalPostMenuProfile: React.FC<ModalPostMenuProfileProps> = ({ modalPostMenu, setModalPostMenu,  setModalShare, setModalDeletePost, typeQuery }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalPostMenu}
            statusBarTranslucent={true}
            onRequestClose={() => {
                setModalPostMenu(false);
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
                    setModalPostMenu(false);
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
                        height: 270, // Adjust height based on typeQuery
                    }}
                >

                    {/* Garis horizontal */}
                    <View style={{ alignItems: 'center', marginBottom: 16 }}>
                        <GarisHorizotal width={86} height={6} />
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                setModalPostMenu(false);
                                setModalShare(true);
                            }}
                            className="flex-row items-center mb-4 border-b pb-4"
                            style={{ borderBottomColor: "#E9E9E9", borderBottomWidth: 1 }}
                        >
                            <View className="flex-row items-center justify-center mr-3" style={{ width: 24, height: 24 }}>
                                <ShareGlobalIcons width={18} height={18} color="#525252" />
                            </View>
                            <Text style={{ fontWeight: 400, fontSize: 14, color: "#525252" }}>Share profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setModalPostMenu(false);
                            }}
                            className="flex-row items-center mb-4 border-b pb-4"
                            style={{ borderBottomColor: "#E9E9E9", borderBottomWidth: 1 }}
                        >
                            <View className="flex-row items-center justify-center mr-3">
                                <BoockmarkSave width={22} height={22} color="#525252" />
                            </View>
                            <Text style={{ fontWeight: 400, fontSize: 14, color: "#525252" }}>Saved</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                setModalPostMenu(false);
                                router.push("/sosial-media/create-post-media?typePost=update");
                            }}
                            className="flex-row items-center mb-4 border-b pb-4"
                            style={{ borderBottomColor: "#E9E9E9", borderBottomWidth: 1 }}
                        >
                            <View className="flex-row items-center justify-center mr-3" style={{ width: 24, height: 24 }}>
                                <EditBgImagesSosialMediaIcons
                                    width={16}
                                    height={16}
                                    color={'#525252'}
                                />
                            </View>
                            <Text style={{ fontWeight: 400, fontSize: 14, color: "#525252" }}>Edit post</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                setModalPostMenu(false);
                                setModalDeletePost(true);
                            }}
                            className="flex-row items-center mb-4 border-b pb-4"
                            style={{ borderBottomColor: "#E9E9E9", borderBottomWidth: 1 }}
                        >
                            <View className="flex-row items-center justify-center mr-3">
                                <DeleteIcons width={20} height={24} color="#525252" />
                            </View>
                            <Text style={{ fontWeight: 400, fontSize: 14, color: "#525252" }}>Delete post</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalPostMenuProfile;