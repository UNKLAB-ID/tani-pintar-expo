import React, { use, useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import PhoneInput from "@/components/ui/component-globals/input-phone";
import CustomButton from "@/components/ui/component-globals/button-primary";

const LoginScreen = () => {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState(false);

    const handleLogin = () => {
        if (!phoneNumber) {
           setError(true);
            return;
        }
      
        router.push(`/otp?back=login`);       
    };

useEffect(() => {
    if (phoneNumber.length > 0) {
        setError(false);
    }
}, [phoneNumber]);

    const handleRegister = () => {
        router.push("/register");
    };

    return (
        <SafeAreaView className="flex-1 bg-white px-5 pt-[60px]">
            {/* Header */}
            <View className="flex-col items-start">
                <Text className={`text-4xl font-bold text-primary`}>
                    Welcome
                </Text>
                <Text className="text-4xl font-bold text-text-primary">Back!</Text>
            </View>

            <Text className="text-xl text-text-secondary mb-10 mt-5">
                Log In with registered phone number!
            </Text>

            {/* Input Field */}
            <View >
                <Text className={`mb-2 text-lg text-black`}>Phone Number</Text>
                <PhoneInput
                    value={phoneNumber}
                    error={error }
                    className="px-[20px]"
                    onChangeText={(text) => setPhoneNumber(text)}
                />
            </View>

            {/* Login Button */}
            <View className="mt-10">
                <CustomButton title="Login" onPress={handleLogin} className="py-[13px]"  />
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
