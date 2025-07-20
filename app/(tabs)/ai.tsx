import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const AiScreen = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push({
        pathname: '/result',
        params: {
          imageUri: selectedImage || '',
          userText: textInput,
        },
      });
    }, 1200);
  };

  useEffect(() => {
    pickImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView className="flex-1 bg-gradient-to-b from-green-100 to-green-50 p-4">
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 bg-white rounded-3xl shadow-lg mb-6 border-b-2 border-green-200">
        <View className="flex-row items-center">
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/3.jpg' }}
            className="w-14 h-14 rounded-full border-2 border-green-400"
          />
          <View className="ml-4">
            <Text className="text-green-600 text-base font-medium">Welcome Back,</Text>
            <Text className="text-xl font-bold text-green-900">Mambaus Baus</Text>
          </View>
        </View>
        <View className="flex-row space-x-3">
          <TouchableOpacity className="bg-green-500 p-3 rounded-full shadow">
            <Ionicons name="notifications-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-green-500 p-3 rounded-full shadow">
            <Ionicons name="chatbubble-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* AI Post Card */}
      <View className="bg-white rounded-3xl p-6 shadow-lg border border-green-100">
        <Text className="text-2xl font-bold text-green-800 mb-4 text-center">
          Scan Penyakit Tanaman
        </Text>
        <Text className="text-gray-500 text-center mb-6">
          Upload atau foto tanamanmu, lalu masukkan catatan/gejala jika ada. Tekan submit untuk melihat hasil analisa AI.
        </Text>

        {/* Upload Button */}
        <TouchableOpacity
          className="flex-row items-center justify-center bg-blue-600 px-5 py-3 rounded-xl mb-5 shadow-md"
          onPress={pickImage}
        >
          <Ionicons name="cloud-upload-outline" size={24} color="white" />
          <Text className="text-white text-lg font-semibold ml-2">
            {selectedImage ? 'Ganti Foto' : 'Upload / Foto Tanaman'}
          </Text>
        </TouchableOpacity>

        {/* Image Preview */}
        {selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            className="w-full h-56 rounded-2xl mb-5 border-2 border-green-200"
          />
        )}

        {/* Text Input */}
        <TextInput
          className="w-full bg-green-50 p-4 rounded-xl text-lg border border-green-200 mb-2"
          placeholder="Catatan/gejala tanaman (opsional)"
          value={textInput}
          onChangeText={setTextInput}
          multiline
        />

        {/* Submit Button */}
        <TouchableOpacity
          className={`mt-6 bg-green-600 py-4 rounded-xl shadow-lg ${!selectedImage ? 'opacity-50' : ''}`}
          onPress={handleSubmit}
          disabled={!selectedImage || isSubmitting}
        >
          <Text className="text-white text-lg font-bold text-center">
            {isSubmitting ? 'Memproses...' : 'Submit & Lihat Hasil'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AiScreen;
