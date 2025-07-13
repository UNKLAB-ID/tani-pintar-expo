import Share2Icons from "@/assets/icons/e-commerce/share-detail-icons";
import ShareGlobalIcons from "@/assets/icons/global/share-global-icons";
import BlockIcons from "@/assets/icons/sosial-media/block-icons";
import BoockmarkSave from "@/assets/icons/sosial-media/boockmark-save-icons";
import CopyLinkIcons from "@/assets/icons/sosial-media/copy-link-icons";
import GarisHorizotal from "@/assets/icons/sosial-media/garis-horizontal-icons";
import InfoAboutIcons from "@/assets/icons/sosial-media/info-about-icons";
import ReportIcons from "@/assets/icons/sosial-media/report-icons";
import ShareIcons from "@/assets/icons/sosial-media/share-icons";
import UnfollowIcons from "@/assets/icons/sosial-media/unfollow-icons";
import { ShareIcon } from "lucide-react-native";
import React from "react"
import { Modal, Share, Text, TouchableOpacity, View } from "react-native"

interface ModalUserMenuProfileProps {
    modalUserMenu: boolean;
    setModalUserMenu: (value: boolean) => void;
    setModalBlock: (value: boolean) => void;
    setModalReport: (value: boolean) => void;
    setModalShare: (value: boolean) => void;
    setModalCopyLink: (value: boolean) => void;
    setModalAboutThisProfile: (value: boolean) => void;
    typeQuery?: string;
}

const ModalUserMenuProfile: React.FC<ModalUserMenuProfileProps> = ({ modalUserMenu, setModalUserMenu, setModalBlock, setModalReport, setModalShare, setModalCopyLink, setModalAboutThisProfile, typeQuery }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalUserMenu}
            statusBarTranslucent={true}
            onRequestClose={() => {
                setModalUserMenu(false);
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
                    setModalUserMenu(false);
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
                        height: typeQuery === "profile" ? 170 : 390, // Adjust height based on typeQuery
                    }}
                >

                    {/* Garis horizontal */}
                    <View style={{ alignItems: 'center', marginBottom: 16 }}>
                        <GarisHorizotal width={86} height={6} />
                    </View>

                    {
                        typeQuery === "profile" ? (
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        setModalUserMenu(false);
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
                                        setModalUserMenu(false);
                                        setModalCopyLink(true);
                                    }}
                                    className="flex-row items-center mb-4 border-b pb-4"
                                    style={{ borderBottomColor: "#E9E9E9", borderBottomWidth: 1 }}
                                >
                                    <View className="flex-row items-center justify-center mr-3">
                                        <BoockmarkSave width={22} height={22} color="#525252"/>
                                    </View>
                                    <Text style={{ fontWeight: 400, fontSize: 14, color: "#525252" }}>Saved</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        setModalUserMenu(false);
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
                                        setModalUserMenu(false);
                                        setModalCopyLink(true);
                                    }}
                                    className="flex-row items-center mb-4 border-b pb-4"
                                    style={{ borderBottomColor: "#E9E9E9", borderBottomWidth: 1 }}
                                >
                                    <View className="flex-row items-center justify-center mr-3">
                                        <CopyLinkIcons width={24} height={24} color="#525252" />
                                    </View>
                                    <Text style={{ fontWeight: 400, fontSize: 14, color: "#525252" }}>Copy link profile</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        setModalUserMenu(false);
                                    }}
                                    className="flex-row items-center mb-4 border-b pb-4"
                                    style={{ borderBottomColor: "#E9E9E9", borderBottomWidth: 1 }}
                                >
                                    <View className="flex-row items-center justify-center mr-3" style={{ width: 24, height: 24 }}>
                                        <UnfollowIcons width={18} height={18} color="#525252" />
                                    </View>
                                    <Text style={{ fontWeight: 400, fontSize: 14, color: "#525252" }}>Unfollow Natasya Julio</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        setModalUserMenu(false);
                                        setModalReport(true);
                                    }}
                                    className="flex-row items-center mb-4 border-b pb-4"
                                    style={{ borderBottomColor: "#E9E9E9", borderBottomWidth: 1 }}
                                >
                                    <View className="flex-row items-center justify-center mr-3">
                                        <ReportIcons width={24} height={24} color="#525252" />
                                    </View>
                                    <Text style={{ fontWeight: 400, fontSize: 14, color: "#525252" }}>Report</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        setModalUserMenu(false);
                                        setModalBlock(true);
                                    }}
                                    className="flex-row items-center mb-4 border-b pb-4"
                                    style={{ borderBottomColor: "#E9E9E9", borderBottomWidth: 1 }}
                                >
                                    <View className="flex-row items-center justify-center mr-3">
                                        <BlockIcons width={24} height={24} color="#525252" />
                                    </View>
                                    <Text style={{ fontWeight: 400, fontSize: 14, color: "#525252" }}>Block</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        setModalUserMenu(false);
                                        setModalAboutThisProfile(true);
                                    }}
                                    className="flex-row items-center mb-4 pb-4"
                                >
                                    <View className="flex-row items-center justify-center mr-3" style={{ width: 24, height: 24 }}>
                                        <InfoAboutIcons width={18} height={18} />
                                    </View>
                                    <Text style={{ fontWeight: 400, fontSize: 14, color: "#525252" }}>About this profile</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }

                </View>
            </View>
        </Modal>
    )
}

export default ModalUserMenuProfile;