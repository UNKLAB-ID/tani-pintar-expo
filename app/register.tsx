import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const RegisterScreen = ({ navigation }: any) => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const [ktpPhoto, setKtpPhoto] = useState<any>(null);

    const handleRegister = () => {
        if (!name || !email || !phoneNumber) {
            setError("All fields are required!");
            return;
        }
        console.log("Registering with:", {
            name,
            email,
            phoneNumber,
            ktpPhoto,
        });
        router.push("/login");
    };

    const handleImagePicker = async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted) {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setKtpPhoto(result.assets[0].uri);
            }
        } else {
            alert("Permission to access gallery is required!");
        }
    };

    const handleLogin = () => {
        router.push("/login");
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <Text style={styles.subtitle}>Create an account to continue!</Text>

            <TextInput
                style={styles.input}
                placeholder="Input your full name"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Input your active email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <TouchableOpacity
                style={styles.photoButton}
                onPress={handleImagePicker}
            >
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                        name="file-image"
                        size={24}
                        color="#166953"
                    />
                    <Text style={styles.photoButtonText}>
                        {ktpPhoto
                            ? "KTP Photo Selected"
                            : "Select KTP Photo (Optional)"}
                    </Text>
                </View>
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                placeholder="+62 Input your phone number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <View style={styles.footerContainer}>
                <Text style={styles.footerText}>Already have an account? </Text>
                <TouchableOpacity onPress={handleLogin}>
                    <Text style={styles.loginText}>Log In</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        top: 80,
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#166953",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: "#888",
        marginBottom: 35,
    },
    input: {
        width: "100%",
        padding: 14,
        borderRadius: 8,
        backgroundColor: "#fff",
        marginBottom: 14,
        fontSize: 18,
        borderWidth: 2,
        borderColor: "#166953",
    },
    photoButton: {
        width: "100%",
        padding: 50, // Increase padding for larger button
        borderRadius: 8,
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#166953",
        marginBottom: 20, // More space below the button
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    },
    photoButtonText: {
        color: "#166953",
        fontSize: 15, // Increase font size for better readability
        fontWeight: "bold",
        marginLeft: 12,
    },

    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    errorText: {
        color: "red",
        fontSize: 16,
        marginBottom: 12,
    },
    button: {
        width: "100%",
        backgroundColor: "#166953",
        padding: 18,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 12,
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
    footerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 22,
    },
    footerText: {
        fontSize: 18,
        color: "#888",
    },
    loginText: {
        color: "#166953",
        fontSize: 18,
        textDecorationLine: "underline",
    },
});

export default RegisterScreen;
