import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Alert,
} from "react-native";
import { useRouter } from "expo-router";
import PhoneInput from "@/components/ui/component-globals/input-phone";
import CustomButton from "@/components/ui/component-globals/button-primary";
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from "@tanstack/react-query";
import api from "@/utils/api/api";

const LoginScreen = () => {
    const router = useRouter();
    const { control, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
            phone_number: "",
        },
    });

    const mutation = useMutation({
        mutationFn: async (data: { phone_number: string }) => {
            //  API call for login
            
            return api.post("/accounts/login/", { phone_number: data.phone_number })
        },

        onSuccess: (res, variables) => {
            if (res.success) {
                router.replace(`/otp?back=login&phone=${variables.phone_number}`);
            } else if (res.error) {
                Object.keys(res.error).forEach((field) => {
                    setError(field as keyof typeof errors, {
                        type: "server",
                        message: res.error[field][0], // Ambil pesan error pertama
                    });
                });
            } else{
                Alert.alert("Login Failed", res.message || "An error occurred");
            }
        },

        onError: (error) => {
            Alert.alert("Login Failed", error.message);
        },
    })

    const handleLogin = (data: { phone_number: string }) => {
        if (!data.phone_number) {
            return;
        }

        mutation.mutate(data);
    };

    const handleRegister = () => {
        router.push("/register");
    };

    return (
        <SafeAreaView className="flex-1 bg-white px-5 pt-[65px]">
            {/* Header */}
            <View className="flex-col items-start">
                <Text className="text-4xl font-bold text-primary">
                    Welcome
                </Text>
                <Text className="text-4xl font-bold text-text-primary">Back!</Text>
            </View>

            <Text className="text-xl text-text-secondary mb-10 mt-5" style={{ fontWeight: 500 }}>
                Log In with registered phone number!
            </Text>

            {/* Input Field */}
            <View>
                <Text className="mb-2 text-lg text-black" style={{ fontWeight: 500 }}>
                    Phone Number
                </Text>

                <Controller
                    control={control}
                    name="phone_number"
                    rules={{ required: "Phone number is required" }}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <>
                            <PhoneInput
                                value={value}
                                onChangeText={onChange}
                                error={!!error}
                                className="px-[20px]"
                            />
                        </>
                    )}
                />
            </View>

            {/* Login Button */}
            <View className="mt-10">
                <CustomButton
                    title="Login"
                    onPress={handleSubmit(handleLogin)}
                    className="py-[13px]"
                />
            </View>

            {/* Footer */}
            <View className="flex-row justify-center mt-10">
                <Text className="text-xl text-text-secondary">
                    Don't have an account?{" "}
                </Text>
                <TouchableOpacity onPress={handleRegister}>
                    <Text className="text-xl text-primary underline">
                        Register
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;