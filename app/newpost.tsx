import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const NewPostScreen = () => {
    const navigation = useRouter();
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [audience, setAudience] = useState("Public");
    const [modalVisible, setModalVisible] = useState(false);

    // 📸 Pilih gambar
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            {/* 🔝 Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.back()}>
                    <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>New Post</Text>
                <TouchableOpacity
                    style={styles.audienceButton}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.audienceText}>{audience}</Text>
                    <Ionicons name="chevron-down" size={16} color="black" />
                </TouchableOpacity>
            </View>

            {/* 📸 Area Foto */}
            <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <Ionicons name="add-outline" size={40} color="#999" />
                )}
            </TouchableOpacity>

            {/* ✏️ Caption */}
            <Text style={styles.captionLabel}>Caption</Text>
            <TextInput
                style={styles.input}
                placeholder="Write what you are thinking?"
                placeholderTextColor="#999"
                value={caption}
                onChangeText={setCaption}
                multiline
            />

            {/* 🚀 Tombol Post */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Post Now</Text>
            </TouchableOpacity>

            {/* 🔽 MODAL: Pilihan Audience */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Choose Audience</Text>
                        {["Public", "Friends", "Private"].map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={[
                                    styles.option,
                                    audience === option &&
                                        styles.selectedOption,
                                ]}
                                onPress={() => {
                                    setAudience(option);
                                    setModalVisible(false);
                                }}
                            >
                                <Text style={styles.optionText}>{option}</Text>
                                {audience === option && (
                                    <Ionicons
                                        name="checkmark"
                                        size={20}
                                        color="green"
                                    />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default NewPostScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    audienceButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    audienceText: {
        fontSize: 16,
        marginRight: 5,
    },
    imageUpload: {
        width: 100,
        height: 100,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        marginVertical: 10,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    captionLabel: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    input: {
        height: 200, // Increased height
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
        textAlignVertical: "top",
        backgroundColor: "#f9f9f9",
    },
    button: {
        backgroundColor: "#007f4f",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
    },
    option: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
    },
    selectedOption: {
        backgroundColor: "#e8f5e9",
        borderRadius: 5,
    },
    optionText: {
        fontSize: 16,
    },
});
