import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StatusBar,
  Alert,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import IconsAiSuccess from '@/assets/icons/sosial-media/icons-ai-success';
import { useMutation } from '@tanstack/react-query';
import api from '@/utils/api/api';
import { router } from 'expo-router';
import { useAiStore } from '@/store/ai-store/ai-store';

const CameraScreen = () => {
  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const isFocused = useIsFocused();

  const [photoUri, setPhotoUri] = useState<any>(null);
  const [isScanned, setIsScanned] = useState(false);
  const scanAnim = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const { setResulData } = useAiStore();

  const startScanAnimation = () => {
    scanAnim.setValue(0); // reset nilai
    animationRef.current?.stop(); // hentikan animasi sebelumnya jika ada

    animationRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(scanAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    );

    animationRef.current.start();
  };

  useEffect(() => {
    startScanAnimation();
  }, []);

  // ✅ Mutation untuk upload FormData
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return api.post('/thinkflow/plant-disease/analyzer/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: res => {
      setResulData(res.data);
      if (res.success) {
        router.push('/AI/result-ai');
      } else {
        Alert.alert('Gagal', res.data.error || 'Gagal menganalisis gambar.');
      }
    },
    onError: (error: any) => {
      Alert.alert(
        'Error',
        error.message || 'Terjadi kesalahan saat mengirim data.'
      );
    },
  });

  // ✅ Ambil foto
  const handleScan = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.7,
        });
        setPhotoUri(photo);
        setIsScanned(true);
      } catch (error) {
        Alert.alert('Gagal Scan', 'Terjadi kesalahan saat mengambil gambar');
      }
    } else {
      Alert.alert(
        'Kamera Tidak Terdeteksi',
        'Silakan pastikan kamera sudah aktif'
      );
    }
  };

  // ✅ Kirim ke API
  const handlerSuccess = async () => {
    if (!photoUri?.uri) {
      Alert.alert('Gagal', 'Tidak ada foto untuk dianalisis.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', {
        uri: photoUri.uri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      } as any);
      console.log(`[🖼️ PREVIEW GAMBAR]: ${photoUri.uri}`);

      mutation.mutate(formData);
    } catch (error: any) {
      console.log('error 3', error);
      Alert.alert(
        'Gagal',
        error.message || 'Terjadi kesalahan saat memproses foto.'
      );
    }
  };

  // ✅ Izin Kamera
  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return (
      <View>
        <Text>Memeriksa izin kamera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Izin kamera belum diberikan</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text style={{ color: 'blue' }}>Beri Izin</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const translateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 296],
  });

  const resetScan = () => {
    setIsScanned(false);
    setPhotoUri(null);
    startScanAnimation();
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {isFocused && (
        <CameraView
          ref={cameraRef}
          style={{ flex: 1, justifyContent: 'flex-end' }}
          facing="back"
        >
          {/* Border scan style seperti gambar */}
          <View
            style={{
              position: 'absolute',
              top: '25%',
              left: '10%',
              width: '80%',
              height: 300,
              overflow: 'hidden',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Corner-only border */}
            <View
              style={{ position: 'absolute', width: '100%', height: '100%' }}
            >
              {/* 4 sudut */}
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  borderLeftWidth: 4,
                  borderTopWidth: 4,
                  borderColor: 'white',
                  width: 30,
                  height: 30,
                  borderTopLeftRadius: 10,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  borderRightWidth: 4,
                  borderTopWidth: 4,
                  borderColor: 'white',
                  width: 30,
                  height: 30,
                  borderTopRightRadius: 10,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  borderLeftWidth: 4,
                  borderBottomWidth: 4,
                  borderColor: 'white',
                  width: 30,
                  height: 30,
                  borderBottomLeftRadius: 10,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  borderRightWidth: 4,
                  borderBottomWidth: 4,
                  borderColor: 'white',
                  width: 30,
                  height: 30,
                  borderBottomRightRadius: 10,
                }}
              />
            </View>

            {/* Garis scan biru transparan bergerak */}
            {!isScanned && (
              <Animated.View
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: 4,
                  backgroundColor: '#1ECBF1',
                  transform: [{ translateY }],
                  borderRadius: 2,

                  // Shadow iOS
                  shadowColor: '#00FFFF',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 9,
                  shadowRadius: 30, // makin tinggi makin glow

                  // Shadow Android
                  elevation: 30, // makin tinggi makin tebal
                }}
              />
            )}
          </View>

          {/* Tombol */}
          {!isScanned ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 20,
                marginBottom: 40,
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: '#169953',
                  padding: 15,
                  borderRadius: 10,
                }}
                onPress={handleScan}
              >
                <Text style={{ textAlign: 'center', color: 'white' }}>
                  Start Scan
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}
            >
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 20,
                  borderRadius: 12,
                  alignItems: 'center',
                  width: '80%',
                }}
              >
                <IconsAiSuccess width={55.95} height={55.91} />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#169953',
                    marginBottom: 10,
                  }}
                >
                  Scan Successful!
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#333',
                    marginBottom: 20,
                  }}
                >
                  {`Come on, check your scan results now! Not satisfied with the results? Don't worry, you can just rescan!`}
                </Text>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      backgroundColor: 'white',
                      borderWidth: 1,
                      borderColor: '#169953',
                      padding: 12,
                      borderRadius: 10,
                      marginRight: 5,
                    }}
                    onPress={resetScan}
                  >
                    <Text style={{ textAlign: 'center', color: '#169953' }}>
                      Scan Ulang
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      backgroundColor: '#169953',
                      padding: 12,
                      borderRadius: 10,
                      marginLeft: 5,
                    }}
                    onPress={handlerSuccess}
                  >
                    <Text style={{ textAlign: 'center', color: 'white' }}>
                      Lihat Hasil
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </CameraView>
      )}
    </View>
  );
};

export default CameraScreen;
