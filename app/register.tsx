import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

// Components Global
import CustomButton from "@/components/ui/component-globals/button-primary";
import CustomTextInput from "@/components/ui/component-globals/input-text";
import PhoneInput from "@/components/ui/component-globals/input-phone";
import ImagePickerInput from "@/components/ui/component-globals/input-images";

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
        router.replace("/login");
    };

    return (
        <SafeAreaView className="flex-1 bg-white px-5 pt-16">
            <Text className="text-4xl font-bold text-primary">
                Register
            </Text>
            <Text className="text-xl text-text-secondary">
                Create an account to continue!
            </Text>

            <View>
                <CustomTextInput
                    value={name}
                    label="Name"
                    className="px-[20px]"
                    placeholder="Input your full name"
                    onChangeText={(text) => setName(text)} />
            </View>
            <View>
                <CustomTextInput
                    value={email}
                    label="Email"
                    type="email-address"
                    className="px-[20px]"
                    placeholder="Input your active email"
                    onChangeText={(text) => setEmail(text)} />
            </View>
            <View>
                <ImagePickerInput
                    value={ktpPhoto}
                    onChange={ (image: ImagePicker.ImagePickerAsset) => {setKtpPhoto(image) }}
                    label="KTP Photo (Max 2Mb)"
                    placeholder="Select file in your gallery ID card photo"
                />
            </View>

            {error ? (
                <Text className="text-red-500 text-lg mb-4">{error}</Text>
            ) : null}

            <View>
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

            <View className="flex-row justify-center mt-8">
                <Text className="text-xl text-text-secondary">
                    Already have an account?{" "}
                </Text>
                <TouchableOpacity onPress={() => {router.push("/login"); }}>
                    <Text className={`text-xl text-primary underline`}>
                        Log In
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default RegisterScreen;
