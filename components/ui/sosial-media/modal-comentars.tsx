import LoveIcons from "@/assets/icons/global/love-icons";
import GarisHorizotal from "@/assets/icons/sosial-media/garis-horizontal-icons";
import IconsComentars from "@/assets/icons/sosial-media/iconst-button-comentars";
import api from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TextInput,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image,
    Modal,
    Text,
    View,
    SafeAreaView,
} from "react-native";
import moment from "moment";

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
        refetchOnWindowFocus: true
    });

    useEffect(() => {
        setDataComentars(data?.results || []);
    }, [data]);

    const emojis = ["😀", "😂", "😍", "😎", "😭", "👍", "🎉", "🔥", "❤️"];

    const formatWaktuSingkat = (tanggal: string) => {
        const now = moment();
        const posted = moment(tanggal);
        const diffInMinutes = now.diff(posted, "minutes");
        const diffInHours = now.diff(posted, "hours");
        const diffInDays = now.diff(posted, "days");
      
        if (diffInMinutes < 60) {
          return `${diffInMinutes}m`; // menit
        } else if (diffInHours < 24) {
          return `${diffInHours}h`; // jam
        } else {
          return `${diffInDays}d`; // hari
        }
      };
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
                                            <Text style={{ fontWeight: "600" }}>{value.user.profile?.full_name}</Text>
                                            <Text style={{ marginTop: 4 }}>{value.content}</Text>
                                            <View style={{ flexDirection: "row", marginTop: 4 }}>
                                                <Text style={{ color: "#999" }}>{formatWaktuSingkat(value.created_at)}</Text>
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
                                padding: 16,
                                borderTopWidth: 1,
                                borderColor: "#ccc",
                                backgroundColor: "#fff",
                            }}
                        >
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
                                {emojis.map((emoji, index) => (
                                    <TouchableOpacity key={index} onPress={() => setCommentInput(prev => prev + emoji)}>
                                        <Text style={{ fontSize: 24, marginHorizontal: 8 }}>{emoji}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <TextInput
                                    value={commentInput}
                                    onChangeText={setCommentInput}
                                    placeholder="Wow, bagus sekali ya bunda-bunda"
                                    style={{
                                        flex: 1,
                                        paddingVertical: Platform.OS === "ios" ? 12 : 8,
                                        fontSize: 14,
                                        marginRight: 10,
                                    }}
                                />
                                <TouchableOpacity
                                    onPress={() => setCommentInput("")}
                                    className="rounded-full bg-primary items-center justify-center"
                                    style={{ width: 36, height: 36, }}
                                >
                                    <IconsComentars width={16} height={16} />
                                </TouchableOpacity>

                            </View>
                        </View>
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
};

export default ModalComentars;
