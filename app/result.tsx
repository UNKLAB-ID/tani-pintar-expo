import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const ResultScreen = () => {
  const router = useRouter();
  const { imageUri, userText } = useLocalSearchParams();

  return (
    <ScrollView className="flex-1 bg-green-50 p-4">
      <View className="items-center mt-10 mb-8">
        <Text className="text-2xl font-bold text-green-700 mb-2">Hasil Scan Penyakit</Text>
        <Text className="text-base text-gray-600 mb-4 text-center">Berikut hasil analisa gambar tanaman yang Anda upload.</Text>
        {imageUri && (
          <Image
            source={{ uri: imageUri as string }}
            className="w-64 h-64 rounded-2xl border-4 border-green-300 mb-6"
          />
        )}
        <View className="bg-white rounded-xl shadow-md p-5 w-full max-w-xl">
          <Text className="text-lg font-semibold text-green-800 mb-2">Respon AI:</Text>
          <Text className="text-gray-700 text-base mb-2">
            {/* Dummy response, bisa diganti dengan hasil API */}
            Tanaman terdeteksi terkena penyakit <Text className="font-bold text-red-600">Hawar Daun</Text>.
          </Text>
          {userText && (
            <Text className="text-gray-500 text-sm mt-2">Catatan Anda: {userText}</Text>
          )}
        </View>
      </View>
      <TouchableOpacity
        className="bg-green-600 py-3 rounded-xl mt-8 mx-10 shadow-lg"
        onPress={() => router.back()}
      >
        <Text className="text-white text-lg font-bold text-center">Scan Ulang</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ResultScreen;
