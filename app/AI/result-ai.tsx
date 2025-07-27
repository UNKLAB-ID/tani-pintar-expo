import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackIcons from '@/assets/icons/global/back-icons';
import { useAiStore } from '@/store/ai-store/ai-store';

const ResultScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { resuldata } = useAiStore()

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <StatusBar
        barStyle="dark-content" // teks/status icon jadi hitam
        backgroundColor="#fff" // background putih
      />
      <View
        className="flex-row items-center justify-between"
        style={{
          position: "absolute",
          paddingTop: insets.top, // 👈 ini penting agar tidak kena status bar
          borderBottomWidth: 1,
          borderBottomColor: '#E9E9E9',
          paddingBottom: 5,
          paddingHorizontal: 16,
          width: "100%",
          backgroundColor: "#fff",
          zIndex: 1
        }}
      >
        <TouchableOpacity
          className="flex-row items-center justify-center"
          style={{ width: 25 }}
          onPress={() => router.push("/(tabs)/ai")}
        >
          <BackIcons width={17.42} height={14.88} />
        </TouchableOpacity>
        <View style={{ width: 'auto' }}>
          <Text
            style={{ fontSize: 18, fontWeight: '600', textAlign: 'center' }}
          >
            {resuldata.disease_name}
          </Text>
        </View>
        <View style={{ width: 25 }} />
      </View>


      <ScrollView
        contentContainerStyle={{
          paddingTop: 20,
        }}
      >
        <View style={{ paddingHorizontal: 16, paddingVertical: 20 }}>
          <Image
            source={{ uri: resuldata.image }}
            style={{
              width: "100%",
              height: 211,
              borderRadius: 12
            }}
          />
          <Text style={{ fontSize: 18, fontWeight: '600', textAlign: "center", marginVertical: 20 }}>View Results</Text>

          <View>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>Penjelasan</Text>
            <Text style={{ textAlign: "justify" }}>{resuldata.mini_article}</Text>
          </View>

          {resuldata?.symptoms?.length > 0 && (
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: '600' }}>
                Gejala : {resuldata.severity}
              </Text>
              {resuldata.symptoms.map((item: any, index: number) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 4 }}>
                  <Text style={{ width: 24 }}>{index + 1}.</Text>
                  <Text style={{ flex: 1 }}>{item}</Text>
                </View>
              ))}
            </View>
          )}

          {resuldata?.preventive_measures?.length > 0 && (
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: '600' }}>
                Tindakan Pencegahan
              </Text>
              {resuldata.preventive_measures.map((item: any, index: number) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 4 }}>
                  <Text style={{ width: 24 }}>{index + 1}.</Text>
                  <Text style={{ flex: 1 }}>{item}</Text>
                </View>
              ))}
            </View>
          )}

          {resuldata?.treatment_recommendations?.length > 0 && (
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: '600' }}>
                Rekomendasi Pengobatan
              </Text>
              {resuldata.treatment_recommendations.map((item: any, index: number) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 4 }}>
                  <Text style={{ width: 24 }}>{index + 1}.</Text>
                  <Text style={{ flex: 1 }}>{item}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResultScreen;
