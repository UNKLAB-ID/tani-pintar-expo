import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const AiScreen = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [textInput, setTextInput] = useState("");

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    return (
        <ScrollView className="flex-1 bg-gray-100 p-4">
            {/* Header */}
            <View className="flex-row items-center justify-between p-4 bg-white rounded-2xl shadow-md mb-4">
                <View className="flex-row items-center">
                    <Image
                        source={{
                            uri: "https://randomuser.me/api/portraits/men/3.jpg",
                        }}
                        className="w-12 h-12 rounded-full"
                    />
                    <View className="ml-3">
                        <Text className="text-gray-500 text-sm">
                            Welcome Back,
                        </Text>
                        <Text className="text-lg font-semibold text-gray-800">
                            Mambaus Baus
                        </Text>
                    </View>
                </View>
                <View className="flex-row space-x-3">
                    <TouchableOpacity className="bg-green-500 p-3 rounded-full">
                        <Ionicons
                            name="notifications-outline"
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-green-500 p-3 rounded-full">
                        <Ionicons
                            name="chatbubble-outline"
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* AI Post Card */}
            <View className="bg-white rounded-2xl p-5 shadow-md">
                <Text className="text-xl font-semibold text-gray-800 mb-4">
                    AI Image Processor
                </Text>

                {/* Upload Button */}
                <TouchableOpacity
                    className="flex-row items-center justify-center bg-blue-600 px-5 py-3 rounded-lg mb-5 shadow-md"
                    onPress={pickImage}
                >
                    <Ionicons
                        name="cloud-upload-outline"
                        size={24}
                        color="white"
                    />
                    <Text className="text-white text-lg font-semibold ml-2">
                        Upload Image
                    </Text>
                </TouchableOpacity>

                {/* Image Preview */}
                {selectedImage && (
                    <Image
                        source={{ uri: selectedImage }}
                        className="w-full h-48 rounded-xl mb-5"
                    />
                )}

                {/* Text Input */}
                <TextInput
                    className="w-full bg-gray-200 p-3 rounded-lg text-lg"
                    placeholder="Enter text here..."
                    value={textInput}
                    onChangeText={setTextInput}
                />

                {/* Display Result */}
                {textInput.length > 0 && (
                    <View className="bg-gray-100 p-4 mt-5 rounded-xl shadow-sm">
                        <Text className="text-gray-700 text-lg font-semibold">
                            Result:
                        </Text>
                        <Text className="text-gray-600 text-base">
                            {textInput}
                        </Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

export default AiScreen;
