import GarisHorizotal from "@/assets/icons/sosial-media/garis-horizontal-icons"
import React from "react";
import { Modal, TouchableOpacity, Text, View } from "react-native"
import ComponentReportHeader from "../component/component-report-header";
import ButtonReport from "../component/button-report";
import CustomButton from "../../component-globals/button-primary";

interface ModalReportVerifyeProps {
    modalReportVerify: boolean;
    setModalReportVerify: (value: boolean) => void;
    setModalReportSuccess: (value: boolean) => void
}

const ModalReportVerify: React.FC<ModalReportVerifyeProps> = ({ modalReportVerify, setModalReportVerify, setModalReportSuccess }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalReportVerify}
            statusBarTranslucent={true}
            onRequestClose={() => setModalReportVerify(false)}
        >
            <TouchableOpacity
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'flex-end',
                }}
                activeOpacity={1}
                onPressOut={() => setModalReportVerify(false)}
            />
            <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <View
                    className="py-5 px-4"
                    style={{
                        backgroundColor: '#fff',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        paddingHorizontal: 16,
                        height: 530,
                    }}
                >
                    <View style={{ alignItems: 'center', marginVertical: 10 }}>
                        <GarisHorizotal width={86} height={6} />
                    </View>
                    <View style={{ paddingTop: 10 }}>
                        <ComponentReportHeader text="View your report status" />
                    </View>
                    <View style={{ paddingVertical: 20 }}>
                        <Text className="font-semibold" style={{ fontSize: 16, marginBottom: 20 }}>Other steps you can take</Text>
                        <ButtonReport
                            title="Block Natasya Julio"
                            disable={true}
                        />
                        <ButtonReport
                            title="Restrict Natasya Julio"
                            disable={true}
                        />
                    </View>
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            paddingHorizontal: 16,
                            paddingTop: 10,
                            paddingBottom: 60,
                            backgroundColor: "#fff"
                        }}
                    >
                        <CustomButton
                            title="Submit"
                            className="py-[10px]"
                            onPress={() => {
                                setModalReportVerify(false)
                                setModalReportSuccess(true)
                            }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalReportVerify