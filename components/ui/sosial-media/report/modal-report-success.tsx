import { Modal, View, Text, TouchableOpacity } from "react-native"
import ButtonReport from "../component/button-report"
import ComponentReportHeader from "../component/component-report-header"
import GarisHorizotal from "@/assets/icons/sosial-media/garis-horizontal-icons"
import CustomButton from "../../component-globals/button-primary"
import React from "react"
import BulatReportPrimaryIcons from "@/assets/icons/sosial-media/report/bulad-primary-icons"
import LineVerticalReportIcons from "@/assets/icons/sosial-media/report/line-vertical-icons"
import BulatReportSecundaryIcons from "@/assets/icons/sosial-media/report/bulat-secundary-icons"

interface ModalReportSuccessProps {
    modalReportSuccess: boolean;
    setModalReportSuccess: (value: boolean) => void;
}

const ModalReportSuccess: React.FC<ModalReportSuccessProps> = ({ modalReportSuccess, setModalReportSuccess }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalReportSuccess}
            statusBarTranslucent={true}
            onRequestClose={() => setModalReportSuccess(false)}
        >
            <TouchableOpacity
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'flex-end',
                }}
                activeOpacity={1}
                onPressOut={() => setModalReportSuccess(false)}
            />
            <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <View
                    className="py-5 px-4"
                    style={{
                        backgroundColor: '#fff',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        paddingHorizontal: 16,
                        height: 660,
                    }}
                >
                    <View style={{ alignItems: 'center', marginVertical: 10 }}>
                        <GarisHorizotal width={86} height={6} />
                    </View>
                    <View style={{ paddingTop: 10 }}>
                        <ComponentReportHeader text="Hide your report status" />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        {/* Ikon Proses */}
                        <View style={{ alignItems: 'center', marginRight: 12 }}>
                            <BulatReportPrimaryIcons />
                            <View className="py-1 flex-row items-center justify-center">
                                <LineVerticalReportIcons />
                            </View>
                            <BulatReportSecundaryIcons />
                        </View>

                        {/* Deskripsi Status */}
                        <View style={{ flex: 1 }}>
                            <View style={{ marginBottom: 24 }}>
                                <Text style={{ fontWeight: '600', fontSize: 14, color: '#000' }}>
                                    Your request is being reviewed
                                </Text>
                                <Text style={{ fontSize: 14, color: '#333' }}>
                                    We work as quickly as possible to remove content that doesn’t meet our standards, using technology and review teams.
                                </Text>
                            </View>

                            <View>
                                <Text style={{ fontWeight: '600', fontSize: 14, color: '#000' }}>
                                    We have made a decision
                                </Text>
                                <Text style={{ fontSize: 14, color: '#333' }}>
                                    We’ll notify you as soon as there’s an update on your Support Request.
                                </Text>
                            </View>
                        </View>
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
                                setModalReportSuccess(false)
                            }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalReportSuccess