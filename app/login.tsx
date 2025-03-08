import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";

const LoginScreen = () => {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (!phoneNumber) {
            setError("Phone number is required!");
            return;
        }
        console.log("Logging in with:", phoneNumber);
        router.replace("/(tabs)/sosmed");
    };

    const handleRegister = () => {
        router.push("/register");
    };

    return (
        <SafeAreaView className="flex-1 bg-white px-5 pt-36">
            {/* Header */}
            <View className="flex-col mb-10 items-start">
                <Text className="text-5xl font-bold text-[#166953]">
                    Welcome
                </Text>
                <Text className="text-5xl font-bold text-black">Back!</Text>
            </View>

            <Text className="text-2xl text-gray-500 mb-10">
                Log In with registered phone number!
            </Text>

            {/* Input Field */}
            <TextInput
                className="w-full p-5 text-xl border-2 border-[#166953] rounded-lg bg-white mb-5"
                placeholder="+62 Input your phone number"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />

            {error ? (
                <Text className="text-red-500 text-xl mb-5">{error}</Text>
            ) : null}

            {/* Login Button */}
            <TouchableOpacity
                className="w-full bg-[#166953] p-6 rounded-lg items-center mb-5"
                onPress={handleLogin}
            >
                <Text className="text-white text-2xl font-bold">Login</Text>
            </TouchableOpacity>

            {/* Footer */}
            <View className="flex-row justify-center mt-10">
                <Text className="text-xl text-gray-500">
                    Don't have an account?{" "}
                </Text>
                <TouchableOpacity onPress={handleRegister}>
                    <Text className="text-xl text-[#166953] underline">
                        Register
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;
