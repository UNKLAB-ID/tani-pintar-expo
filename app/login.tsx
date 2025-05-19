import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import PhoneInput from "@/components/ui/component-globals/input-phone";
import { Colors } from "@/constants/Colors";
import CustomButton from "@/components/ui/component-globals/button";

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
            <View className="flex-col items-start">
                <Text className={`text-4xl font-bold text-primary`}>
                    Welcome
                </Text>
                <Text className="text-4xl font-bold text-black">Back!</Text>
            </View>

            <Text className="text-xl text-text-secondary mb-10">
                Log In with registered phone number!
            </Text>

            {/* Input Field */}
            <View className="">
                 <Text className={`mb-2 text-lg text-black`}>Phone Number</Text>
            <PhoneInput
                value={phoneNumber}
                className="px-[20px]"
                onChangeText={(text) => setPhoneNumber(text)}
            />
            {error ? (
                <Text className="text-red-500 text-xl mb-5">{error}</Text>
            ) : null}
            </View>

            {/* Login Button */}
            <View>
            <CustomButton title="Login" onPress={handleLogin} className="py-[8px]" disabled={true}/>
            </View>

            {/* Footer */}
            <View className="flex-row justify-center mt-10">
                <Text className="text-xl text-text-secondary">
                    Don't have an account?{" "}
                </Text>
                <TouchableOpacity onPress={handleRegister}>
                    <Text className={`text-xl text-primary underline`}>
                        Register
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;
