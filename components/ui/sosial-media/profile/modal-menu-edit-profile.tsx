import GarisHorizotal from "@/assets/icons/sosial-media/garis-horizontal-icons";
import React from "react"
import { Modal, TouchableOpacity, View } from "react-native"

interface ModalMenuEditProfileProps {
    modalMenuEdit: boolean;
    setModalMenuEdit: (value: boolean) => void;
}

const ModalMenuEditProfile: React.FC<ModalMenuEditProfileProps> = ({ modalMenuEdit, setModalMenuEdit }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalMenuEdit}
            statusBarTranslucent={true}
            onRequestClose={() => {
                setModalMenuEdit(false);
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
                    setModalMenuEdit(false);
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
                        height: 290,
                    }}
                >

                    {/* Garis horizontal */}
                    <View style={{ alignItems: 'center', marginBottom: 16 }}>
                        <GarisHorizotal width={86} height={6} />
                    </View>

                </View>
            </View>
        </Modal>
    )
}