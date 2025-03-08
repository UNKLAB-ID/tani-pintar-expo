import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const RegisterScreen = () => {
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
        <SafeAreaView className="flex-1 bg-white px-5 pt-16">
            <Text className="text-5xl font-bold text-[#166953] mb-4">
                Register
            </Text>
            <Text className="text-2xl text-gray-500 mb-10">
                Create an account to continue!
            </Text>

            <TextInput
                className="w-full p-5 text-xl border-2 border-[#166953] rounded-lg bg-white mb-5"
                placeholder="Input your full name"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                className="w-full p-5 text-xl border-2 border-[#166953] rounded-lg bg-white mb-5"
                placeholder="Input your active email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <TouchableOpacity
                className="w-full p-16 border-2 border-[#166953] bg-white rounded-lg mb-6 flex-row items-center justify-center"
                onPress={handleImagePicker}
            >
                <MaterialCommunityIcons
                    name="file-image"
                    size={28}
                    color="#166953"
                />
                <Text className="text-[#166953] text-lg font-bold ml-4">
                    {ktpPhoto
                        ? "KTP Photo Selected"
                        : "Select KTP Photo (Optional)"}
                </Text>
            </TouchableOpacity>

            <TextInput
                className="w-full p-5 text-xl border-2 border-[#166953] rounded-lg bg-white mb-5"
                placeholder="+62 Input your phone number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
            />

            {error ? (
                <Text className="text-red-500 text-lg mb-4">{error}</Text>
            ) : null}

            <TouchableOpacity
                className="w-full bg-[#166953] p-6 rounded-lg items-center mb-5"
                onPress={handleRegister}
            >
                <Text className="text-white text-2xl font-bold">Register</Text>
            </TouchableOpacity>

            <View className="flex-row justify-center mt-8">
                <Text className="text-xl text-gray-500">
                    Already have an account?{" "}
                </Text>
                <TouchableOpacity onPress={handleLogin}>
                    <Text className="text-xl text-[#166953] underline">
                        Log In
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default RegisterScreen;
