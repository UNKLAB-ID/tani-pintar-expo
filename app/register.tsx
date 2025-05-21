import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Keyboard,
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

const RegisterScreen = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const [ktpPhoto, setKtpPhoto] = useState<any>(null);

    const handleRegister = () => {
        // if (!name || !email || !phoneNumber) {
        //     setError("All fields are required!");
        //     return;
        // }
        router.push(`/otp?back=register`);  
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
                <Text className="text-xl text-text-secondary mt-3">
                    Create an account to continue!
                </Text>

                <View className="mt-8">
                    <CustomTextInput
                        value={name}
                        label="Name"
                        placeholder="Input your full name"
                        onChangeText={(text) => setName(text)} />
                </View>
                <View className="my-4">
                    <CustomTextInput
                        value={email}
                        label="Email"
                        type="email-address"
                        placeholder="Input your active email"
                        onChangeText={(text) => setEmail(text)} />
                </View>
                <View>
                    <ImagePickerInput
                        value={ktpPhoto}
                        onChange={(image: ImagePicker.ImagePickerAsset) => setKtpPhoto(image)}
                        label="KTP Photo (Max 2Mb)"
                        placeholder="Select file in your gallery ID card photo"
                    />
                </View>

                {error ? (
                    <Text className="text-red-500 text-lg mb-4">{error}</Text>
                ) : null}

                <View className="my-4">
                    <Text className={`mb-2 text-lg text-black`}>Phone Number</Text>
                    <PhoneInput
                        value={phoneNumber}
                        className="px-[20px]"
                        onChangeText={(text) => setPhoneNumber(text)}
                    />
                </View>
                <View>
                    <CustomButton title="Register" onPress={handleRegister} className="py-[13px]" />
                </View>

                <View className="flex-row justify-center mt-8 mb-8">
                    <Text className="text-xl text-text-secondary">
                        Already have an account?{" "}
                    </Text>
                    <TouchableOpacity onPress={() => { router.push("/login"); }}>
                        <Text className={`text-xl text-primary underline`}>
                            Log In
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default RegisterScreen;
