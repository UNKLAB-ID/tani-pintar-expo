import React, { useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Components Global
import CustomButton from "@/components/ui/component-globals/button-primary";
import CustomTextInput from "@/components/ui/component-globals/input-text";
import PhoneInput from "@/components/ui/component-globals/input-phone";
import ImagePickerInput from "@/components/ui/component-globals/input-images";
import BackIcons from "@/assets/icons/global/back-icons";
import { Controller, useForm } from "react-hook-form";

// React Query
import { useMutation } from "@tanstack/react-query";
import api from "@/utils/api/api";

const RegisterScreen = () => {
    const router = useRouter();
    const { control, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
            name: "",
            email: "",
            phone_number: "",
            id_card_file: null,
        },
    });

    const mutation = useMutation({
        mutationFn: async (data: { name: string; email: string; phone_number: string; id_card_file: any }) => {
            const formData = new FormData();

            // Tambahkan data ke FormData
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("phone_number", data.phone_number);

            // Tambahkan file ke FormData
            if (data.id_card_file) {
                formData.append("id_card_file", {
                    uri: data.id_card_file.uri,
                    name: data.id_card_file.fileName || "id_card.jpg",
                    type: data.id_card_file.mimeType || "image/jpeg",
                } as any);
            }

            return api.post("/accounts/register/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        },
        onSuccess: (res, variables) => {
            if (res.success) {
                router.replace(`/otp?back=register&phone=${variables.phone_number}`);
            } else if (res.error) {
                Object.keys(res.error).forEach((field) => {
                    setError(field as keyof typeof errors, {
                        type: "server",
                        message: res.error[field][0], // Ambil pesan error pertama
                    });
                });
            } else {
                Alert.alert("Register Failed", res.message);
            }
        },
        onError: (error: any) => {
            Alert.alert("Registration Failed", error.message || "An error occurred during registration.");
        },
    });

    const handleRegister = (data: { name: string; email: string; phone_number: string; id_card_file: any }) => {
        if (!data.name || !data.email || !data.phone_number || !data.id_card_file) {
            return;
        }

        mutation.mutate(data);
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAwareScrollView
                enableOnAndroid
                extraScrollHeight={100}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 50 }}
            >
                <TouchableOpacity className="mb-3" onPress={() => router.back()}>
                    <BackIcons width={24} height={24} color={"#1F1F1F"} />
                </TouchableOpacity>
                <Text className="text-4xl font-bold text-primary">
                    Register
                </Text>
                <Text className="text-xl text-text-secondary mt-3" style={{ fontWeight: 500 }}>
                    Create an account to continue!
                </Text>

                {/* Name Input */}
                <View className="mt-8">
                    <Controller
                        control={control}
                        name="name"
                        rules={{ required: "Name is required" }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <>
                                <CustomTextInput
                                    value={value}
                                    label="Name"
                                    error={!!error}
                                    placeholder="Input your full name"
                                    onChangeText={onChange}
                                />
                            </>
                        )}
                    />
                </View>

                {/* Email Input */}
                <View className="my-4">
                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: true,
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email format",
                            },
                        }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <>
                                <CustomTextInput
                                    value={value}
                                    label="Email"
                                    type="email-address"
                                    error={!!error}
                                    placeholder="Input your active email"
                                    onChangeText={onChange}
                                />
                            </>
                        )}
                    />
                </View>

                {/* KTP Photo Input */}
                <View>
                    <Controller
                        control={control}
                        name="id_card_file"
                        rules={{ required: "KTP photo is required" }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <>
                                <ImagePickerInput
                                    value={value}
                                    onChange={(image: ImagePicker.ImagePickerAsset) => onChange(image)}
                                    label="KTP Photo (Max 2Mb)"
                                    error={!!error}
                                    placeholder="Select file in your gallery ID card photo"
                                />
                                {error && (
                                    <Text className="text-red-500 mt-1">
                                        {error.message}
                                    </Text>
                                )}
                            </>
                        )}
                    />
                </View>

                {/* Phone Number Input */}
                <View className="my-4">
                    <Controller
                        control={control}
                        name="phone_number"
                        rules={{ required: "Phone number is required" }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <>
                                <Text className={`mb-2 text-lg text-black`}>Phone Number</Text>
                                <PhoneInput
                                    value={value}
                                    className="px-[20px]"
                                    error={!!error}
                                    onChangeText={onChange}
                                />
                            </>
                        )}
                    />
                </View>

                {/* Register Button */}
                <View>
                    <CustomButton
                        title="Register"
                        onPress={handleSubmit(handleRegister)}
                        className="py-[13px]"
                    />
                </View>

                {/* Footer */}
                <View className="flex-row justify-center mt-8 mb-8">
                    <Text className="text-xl text-text-secondary" style={{ fontWeight: 500 }}>
                        Already have an account?{" "}
                    </Text>
                    <TouchableOpacity onPress={() => { router.push("/login"); }}>
                        <Text className={`text-xl text-primary underline`} style={{ fontWeight: 500 }}>
                            Log In
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default RegisterScreen;
