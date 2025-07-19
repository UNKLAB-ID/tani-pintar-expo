import GarisHorizotal from "@/assets/icons/sosial-media/garis-horizontal-icons";
import BackReportProfile from "@/assets/icons/sosial-media/profile/back-report-icons";
import React, { useEffect, useState } from "react";
import { Modal, TouchableOpacity, View, Text, ScrollView, Image } from "react-native";
import CustomButton from "../../component-globals/button-primary";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ModalReportPostProps {
    data: any[];
    modalReportPost: boolean;
    setModalReportPost: (value: boolean) => void
    setModalReport: (value: boolean) => void
}

const ModalReportPost: React.FC<ModalReportPostProps> = ({ modalReportPost, setModalReportPost, data, setModalReport }) => {
    const insets = useSafeAreaInsets();
    const [checkedIds, setCheckedIds] = useState<string[]>([]);

    const toggleCheck = (slug: string) => {
        setCheckedIds(prev => {
            if (prev.includes(slug)) {
                return prev.filter(itemId => itemId !== slug);
            } else {
                return [...prev, slug];
            }
        });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalReportPost}
            statusBarTranslucent={true}
            onRequestClose={() => {
                setModalReportPost(false);
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
                    setModalReportPost(false);
                }}
            />
            <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <View
                    style={{
                        backgroundColor: '#fff',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        paddingVertical: 20,
                        height: 740, // Adjust height based on typeQuery
                        marginBottom: insets.bottom
                    }}
                >
                    {/* Garis horizontal */}
                    <View style={{ alignItems: 'center', marginBottom: 16 }}>
                        <GarisHorizotal width={86} height={6} />
                    </View>
                    <View className="flex-row items-center justify-between" style={{ borderBottomWidth: 1, borderBottomColor: "#E9E9E9", paddingHorizontal: 16, paddingBottom: 10 }}>
                        <TouchableOpacity className="flex-row items-center justify-center" style={{ width: 20 }} onPress={() => {
                            setModalReportPost(false)
                            setModalReport(true)
                        }}>
                            <BackReportProfile width={8} height={14} />
                        </TouchableOpacity>
                        <View style={{ width: 100 }}>
                            <Text style={{ fontSize: 16, fontWeight: '600', textAlign: "center" }}>
                                Report
                            </Text>
                        </View>
                        <View className="flex-row items-center justify-center" style={{ width: 20 }} >

                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
                        <Text className="font-semibold" style={{ fontSize: 16 }}>Select the post you want to report</Text>
                        <Text style={{ color: "#6F6F6F" }}>
                            {`If there's something you need to look at that isn't on the list, please open the content and report it directly.`}
                        </Text>
                        <ScrollView className="mt-3" contentContainerStyle={{ paddingBottom: 150 }}>
                            {
                                data.map((item: any, index: number) => {
                                    const isChecked = checkedIds.includes(item.slug);
                                    return (
                                        <View className="flex-row items-center justify-between my-2" key={index}>
                                            <View style={{ width: 318, borderWidth: 1, borderRadius: 12, borderColor: "#C8C8C8", padding: 10 }}>
                                                <View className="flex-row items-center">
                                                    <Image
                                                        source={require('../../../../assets/images/profile-default.png')}
                                                        className="w-[40px] h-[40px] rounded-full"
                                                        style={{ marginLeft: -6 }}
                                                    />
                                                    <View className="ml-2">
                                                        <View className="flex-row items-center">
                                                            <Text className="font-semibold me-3">{item.user.profile?.full_name}</Text>
                                                            <Text style={{ color: "#6F6F6F" }}>updated post</Text>
                                                        </View>
                                                        <Text style={{ color: "#525252", fontSize: 12 }}>{formatDate(item.created_at)}</Text>
                                                    </View>
                                                </View>
                                                <View>
                                                    {
                                                        item.content && (
                                                            <Text>
                                                                {item.content}
                                                            </Text>
                                                        )
                                                    }
                                                    {
                                                        item.images.length !== 0 && (
                                                            <ScrollView
                                                                horizontal
                                                                showsHorizontalScrollIndicator={false}
                                                                style={{ marginTop: 10 }}
                                                            >
                                                                {
                                                                    item.images.map((img: any, idx: number) => (
                                                                        <Image
                                                                            key={idx}
                                                                            source={{ uri: img.image }}
                                                                            style={{ width: 270, height: 116, borderRadius: 10, marginRight: 10 }}
                                                                            resizeMode="cover"
                                                                        />
                                                                    ))
                                                                }
                                                            </ScrollView>
                                                        )
                                                    }

                                                </View>
                                            </View>

                                            {/* ✅ Checkbox Input */}
                                            <TouchableOpacity
                                                onPress={() => toggleCheck(item.slug)}
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    marginTop: 16,
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        width: 28,
                                                        height: 28,
                                                        borderRadius: 3,
                                                        borderWidth: 1,
                                                        borderColor: isChecked ? '#169953' : '#6F6F6F',
                                                        backgroundColor: isChecked ? '#169953' : 'transparent',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        marginRight: 10,
                                                    }}
                                                >
                                                    {isChecked && (
                                                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 19 }}>✓</Text>
                                                    )}
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>

                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            paddingHorizontal: 16,
                            paddingTop: 10,
                            paddingBottom: 20,
                            backgroundColor: "#fff"
                        }}
                    >
                        <CustomButton
                            title="Next"
                            className="py-[10px]"
                            disabled={checkedIds.length === 0}
                            onPress={() => {
                                setModalReportPost(false);
                            }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalReportPost