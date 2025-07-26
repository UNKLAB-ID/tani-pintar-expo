import GarisHorizotal from "@/assets/icons/sosial-media/garis-horizontal-icons"
import React from "react"
import { Modal, View, TouchableOpacity, Text } from "react-native"
import ButtonReport from "../component/button-report"

interface ModalReportMenuSosialMediaProps {
    modalReportMenuSosialMedia: boolean;
    setModalReportMenuSosialMedia: (value: boolean) => void;
    setIndexMenuReportSosialMedia: (value: boolean) => void;
    setModalReportTypeContentSosialMedia: (value: boolean) => void;
    setDataReportTypeContent: (value: any) => void;
}

const ModalReportMenuSosialMedia: React.FC<ModalReportMenuSosialMediaProps> = ({ modalReportMenuSosialMedia, setModalReportMenuSosialMedia, setIndexMenuReportSosialMedia, setDataReportTypeContent, setModalReportTypeContentSosialMedia, }) => {
    const data = [
        {
            id: 1,
            text: "I just don’t like it"
        },
        {
            id: 2,
            text: "Bullying or unwanted contact"
        },
        {
            id: 3,
            text: "Suicide, self injury or eating disorders"
        },
        {
            id: 4,
            text: "Violence, hate or exploitation"
        },
        {
            id: 5,
            text: "Selling or promoting restricted items"
        },
        {
            id: 6,
            text: "Nudity or sexual activity"
        },
        {
            id: 7,
            text: "Scam, fraud or spam"
        },
        {
            id: 8,
            text: "False information"
        }

    ]

    const dataTypeReportConten = (id: number) => {
        var valueListReportTypeConten: any

        console.log(id)
        switch (id) {
            case 2:
                valueListReportTypeConten = {
                    id: 2,
                    textHeader: "What makes this bullying or unwanted contact?",
                    data: [
                        {
                            id: 1,
                            text: "Distribution of nude images without permission"
                        },
                        {
                            id: 2,
                            text: "Bullying and unpleasant treatment"
                        },
                        {
                            id: 3,
                            text: "Spam"
                        }
                    ]
                }

                setDataReportTypeContent(valueListReportTypeConten)
                setModalReportTypeContentSosialMedia(true)
                break;
            case 3:
                valueListReportTypeConten = {
                    id: 3,
                    textHeader: "What kind of self-harm?",
                    data: [
                        {
                            id: 1,
                            text: "Suicidal and self-injurious behavior"
                        },
                        {
                            id: 2,
                            text: "Eating disorder syndrome"
                        },
                    ]
                }

                setDataReportTypeContent(valueListReportTypeConten)
                setModalReportTypeContentSosialMedia(true)
                break;
            case 4:
                valueListReportTypeConten = {
                    id: 4,
                    textHeader: "Reason for reporting: Violence, hatred or exploitation?",
                    data: [
                        {
                            id: 1,
                            text: "Serious threat to safety."
                        },
                        {
                            id: 2,
                            text: "Indications of terrorism or organized crime."
                        },
                        {
                            id: 3,
                            text: "There are indications of exploitation."
                        },
                        {
                            id: 4,
                            text: "Speech or symbols containing hate"
                        },
                        {
                            id: 5,
                            text: "Provocation of violence"
                        },
                        {
                            id: 6,
                            text: "Content displayed contains scenes of violence, death, or significant physical injury"
                        },
                        {
                            id: 7,
                            text: "Animal violence"
                        },
                    ]
                }

                setDataReportTypeContent(valueListReportTypeConten)
                setModalReportTypeContentSosialMedia(true)
                break;
            case 4:
                valueListReportTypeConten = {
                    id: 4,
                    textHeader: "What products or services are offered?",
                    data: [
                        {
                            id: 1,
                            text: "Drugs"
                        },
                        {
                            id: 2,
                            text: "Weapons"
                        },
                        {
                            id: 3,
                            text: "Animals"
                        }
                    ]
                }

                setDataReportTypeContent(valueListReportTypeConten)
                setModalReportTypeContentSosialMedia(true)
                break;
            case 5:
                valueListReportTypeConten = {
                    id: 5,
                    textHeader: "Why is this considered nudity or sexual activity?",
                    data: [
                        {
                            id: 1,
                            text: "Threatening or distributing nude photos"
                        },
                        {
                            id: 2,
                            text: "Indication of prostitution"
                        },
                        {
                            id: 3,
                            text: "Indications of sexual exploitation"
                        },
                        {
                            id: 4,
                            text: "Adult content"
                        }
                    ]
                }

                setDataReportTypeContent(valueListReportTypeConten)
                setModalReportTypeContentSosialMedia(true)
                break;
            case 6:
                valueListReportTypeConten = {
                    id: 6,
                    textHeader: "Does this content involve children under 18?",
                    data: [
                        {
                            id: 1,
                            text: "Yes"
                        },
                        {
                            id: 2,
                            text: "No"
                        }
                    ]
                }

                setDataReportTypeContent(valueListReportTypeConten)
                setModalReportTypeContentSosialMedia(true)
                break;
            case 7:
                valueListReportTypeConten = {
                    id: 7,
                    textHeader: "What is the most appropriate description of the problem?",
                    data: [
                        {
                            id: 1,
                            text: "Fraudulent actions"
                        },
                        {
                            id: 2,
                            text: "Spam"
                        }
                    ]
                }

                setDataReportTypeContent(valueListReportTypeConten)
                setModalReportTypeContentSosialMedia(true)
                break;
            case 8:
                valueListReportTypeConten = {
                    id: 8,
                    textHeader: "What kind of false information?",
                    data: [
                        {
                            id: 1,
                            text: "Mental Health"
                        },
                        {
                            id: 2,
                            text: "Public policy"
                        },
                        {
                            id: 3,
                            text: "Social problems"
                        },
                        {
                            id: 4,
                            text: "Digital modification"
                        }
                    ]
                }

                setDataReportTypeContent(valueListReportTypeConten)
                setModalReportTypeContentSosialMedia(true)
                break;
        }
    }

    return (
        <Modal
            visible={modalReportMenuSosialMedia}
            transparent
            animationType="slide"
            statusBarTranslucent={true}
            onRequestClose={() => setModalReportMenuSosialMedia(false)}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                }}
            >
                <TouchableOpacity
                    style={{ flex: 1 }}
                    activeOpacity={1}
                    onPressOut={() => setModalReportMenuSosialMedia(false)}
                />
                <View
                    style={{
                        backgroundColor: '#fff',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        height: 550,
                    }}
                >
                    <View
                        style={{ alignItems: 'center', marginBottom: 15, marginTop: 20 }}
                    >
                        <GarisHorizotal width={86} height={6} />
                    </View>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: "#E9E9E9", paddingBottom: 5 }}>
                        <Text style={{ fontSize: 18, fontWeight: 600, textAlign: "center" }}>Report</Text>
                    </View>
                    <View className="px-4" style={{ paddingTop: 20, paddingBottom: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: 600, marginBottom: 5 }}>Why are you reporting this photo?</Text>
                        <Text style={{ color: "#8D8D8D" }}>All reports submitted are anonymous to protect your identity. However, in emergency situations that require immediate action, do not hesitate to contact emergency services.</Text>
                    </View>
                    <View className="px-4">
                        {
                            data.map((item, index) => {
                                return (
                                    <View key={index} className="px-1" style={{ borderBottomWidth: 1, borderBottomColor: "#E9E9E9" }}>
                                        <ButtonReport
                                            fontWeight={"500"}
                                            title={item.text}
                                            color="#1F1F1F"
                                            onPress={() => {
                                                switch (item.id) {
                                                    case 1:
                                                        // Tambahkan logika khusus untuk index 1 di sini jika ada
                                                        break;
                                                    default:
                                                        dataTypeReportConten(item.id);
                                                        setModalReportMenuSosialMedia(false);
                                                        break;
                                                }
                                            }}
                                        />
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalReportMenuSosialMedia