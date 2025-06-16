import LoveIcons from "@/assets/icons/global/love-icons";
import GarisHorizotal from "@/assets/icons/sosial-media/garis-horizontal-icons";
import api from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    Image,
    Modal,
    Text,
    View,
    SafeAreaView,
} from "react-native";

interface ModalComentarsProps {
    modalCommentVisible: boolean;
    setModalCommentVisible: (visible: boolean) => void;
    id?: string;
}

const ModalComentars: React.FC<ModalComentarsProps> = ({
    modalCommentVisible,
    setModalCommentVisible,
    id,
}) => {
    const [dataComentars, setDataComentars] = useState<any[]>([]);
    const [commentInput, setCommentInput] = useState("");

    const feactDataComentarList = async () => {
        const response = await api.get(`/social-media/posts/${id}/comments`);
        return response.data;
    };

    const { data } = useQuery({
        queryKey: ["postComentarList"],
        queryFn: feactDataComentarList,
    });

    useEffect(() => {
        setDataComentars(data?.results || []);
    }, [data]);

    console.log(data)
    console.log(id)

    return (
        <Modal
            visible={modalCommentVisible}
            transparent
            animationType="slide"
            onRequestClose={() => setModalCommentVisible(false)}
            // statusBarTranslucent={true}
        >
            <TouchableWithoutFeedback onPress={() => setModalCommentVisible(false)}>
                <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", }} />
            </TouchableWithoutFeedback>
            <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
                >
                    <SafeAreaView
                        style={{
                            height: 700, // ✅ HANYA 600
                            width: "100%",
                            backgroundColor: "#fff",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                        }}
                    >
                        {/* HEADER / TITLE */}
                        <View style={{ alignItems: "center", marginTop: 12, marginBottom: 12 }}>
                            <GarisHorizotal width={86} height={6} />
                        </View>
                        <Text style={{ fontSize: 18, textAlign: "center", fontWeight: "600" }}>Comment</Text>

                        {/* KOMENTAR */}
                        <ScrollView
                            style={{ flex: 1 }}
                            contentContainerStyle={{ padding: 16, paddingBottom: 10 }}
                            keyboardShouldPersistTaps="handled"
                        >
                            {dataComentars.length > 0 ? (
                                dataComentars.map((value: any, index: number) => (
                                    <View key={index} style={{ flexDirection: "row", marginBottom: 16 }}>
                                        {/* Avatar dan isi komentar */}
                                        <Image
                                            source={require("../../../assets/images/Image-success-otp.png")}
                                            style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
                                        />
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontWeight: "600" }}>Mambaus Baus</Text>
                                            <Text style={{ marginTop: 4 }}>{value.content}</Text>
                                            <View style={{ flexDirection: "row", marginTop: 4 }}>
                                                <Text style={{ color: "#999" }}>30m</Text>
                                                <Text style={{ marginLeft: 8, fontWeight: "bold", color: "#169953" }}>Reply</Text>
                                            </View>
                                        </View>
                                        {/* Like icon */}
                                        <View style={{ alignItems: "center", marginLeft: 8 }}>
                                            <LoveIcons width={18} height={18} color={"#434343"} />
                                            <Text>100</Text>
                                        </View>
                                    </View>
                                ))
                            ) : (
                                <Text style={{ textAlign: "center", color: "#999", marginTop: 20 }}>Belum ada komentar</Text>
                            )}
                        </ScrollView>

                        {/* INPUT KOMENTAR */}
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                padding: 16,
                                borderTopWidth: 1,
                                borderColor: "#ccc",
                                backgroundColor: "#fff",
                            }}
                        >
                            <TextInput
                                value={commentInput}
                                onChangeText={setCommentInput}
                                placeholder="Tulis komentar..."
                                style={{
                                    flex: 1,
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: 20,
                                    paddingHorizontal: 16,
                                    paddingVertical: Platform.OS === "ios" ? 12 : 8,
                                    fontSize: 14,
                                    marginRight: 10,
                                }}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    console.log("Komentar:", commentInput);
                                    setCommentInput("");
                                }}
                                style={{
                                    backgroundColor: "#3b82f6",
                                    paddingHorizontal: 16,
                                    paddingVertical: 10,
                                    borderRadius: 20,
                                }}
                            >
                                <Text style={{ color: "#fff", fontWeight: "600" }}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
};

export default ModalComentars;
