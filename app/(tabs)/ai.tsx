import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator,
  Animated,
  Pressable,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const AiScreen = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
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
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
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
  }, []);

  return (
    <ScrollView className="flex-1 bg-gradient-to-b from-green-100 to-green-50 p-4">
      <View className="bg-white rounded-3xl p-6 shadow-lg border border-green-100">
        <Text className="text-2xl font-bold text-green-800 mb-4 text-center">
          Scan Penyakit Tanaman
        </Text>
        <Text className="text-gray-500 text-center mb-6">
          Upload atau foto tanamanmu, lalu masukkan catatan/gejala jika ada.
          Tekan submit untuk melihat hasil analisa AI.
        </Text>

        <View className="bg-green-50 border border-green-200 rounded-xl p-3 mb-5">
          <Text className="text-green-700 font-semibold mb-1">Tips Foto:</Text>
          <Text className="text-green-700 text-xs">
            • Pastikan daun/tanaman terlihat jelas
          </Text>
          <Text className="text-green-700 text-xs">
            • Ambil gambar di tempat terang
          </Text>
          <Text className="text-green-700 text-xs">• Hindari blur/goyang</Text>
        </View>

        {/* Upload Button */}
        <Pressable
          onPress={pickImage}
          className="flex-row items-center justify-center bg-emerald-500 active:bg-emerald-700 rounded-2xl mb-5 shadow-md py-4 px-6"
        >
          <Ionicons name="cloud-upload-outline" size={26} color="#fff" />
          <Text className="text-white font-bold text-lg ml-2">
            {selectedImage ? 'Ganti Foto' : 'Upload / Foto Tanaman'}
          </Text>
        </Pressable>

        {/* Image Preview */}
        {selectedImage && (
          <Animated.View style={{ opacity: fadeAnim }}>
            <Image
              source={{ uri: selectedImage }}
              className="w-full h-56 rounded-2xl mb-5 border-2 border-green-200"
            />
          </Animated.View>
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
        <Pressable
          onPress={handleSubmit}
          disabled={!selectedImage || isSubmitting}
          className={`mt-6 rounded-2xl flex-row items-center justify-center py-4 px-6 shadow-md ${
            !selectedImage ? 'bg-blue-300' : 'bg-blue-500 active:bg-blue-700'
          }`}
        >
          {isSubmitting && <ActivityIndicator color="#fff" className="mr-2" />}
          <Text className="text-white font-bold text-lg">
            {isSubmitting ? 'Memproses...' : 'Submit & Lihat Hasil'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AiScreen;
