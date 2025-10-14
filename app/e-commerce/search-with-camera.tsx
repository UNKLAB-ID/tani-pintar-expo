import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // pakai ini jika kamu pakai expo-router

const SearchWithCamera = () => {
  const router = useRouter();
  const [facing, setFacing] = useState<'front' | 'back'>('back');
  const [flash, setFlash] = useState<'off' | 'on'>('off');
  const [permission, requestPermission] = useCameraPermissions();
  const [isSearching, setIsSearching] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          We need your permission to use the camera
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Fungsi ambil foto lalu kirim ke API
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      if (photo.base64) {
        startImageSearch(photo.base64);
      } else {
        console.warn('Gagal mendapatkan base64 dari foto.');
      }
    }
  };

  // Fungsi pilih gambar dari galeri lalu kirim ke API
  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]?.base64) {
      startImageSearch(result.assets[0].base64);
    }
  };

  // Fungsi kirim ke API pengenal gambar
  const startImageSearch = async (imageBase64: string) => {
    try {
      setIsSearching(true);

      //   const response = await fetch('https://your-api.com/detect-image', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ image: imageBase64 }),
      //   });

      //   const data = await response.json();

      //   const keyword = data.label || 'unknown';

      router.push({
        pathname: '/ecommerce',
        // params: { query: keyword },
      });
    } catch (error) {
      console.error('Image search failed:', error);
      setIsSearching(false);
    }
  };

  const toggleFlash = () => setFlash(prev => (prev === 'off' ? 'on' : 'off'));
  const goBack = () => router.back();

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {isSearching ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="white" />
          <Text style={{ color: 'white', marginTop: 10 }}>Searching...</Text>
        </View>
      ) : (
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          facing={facing}
          flash={flash}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={goBack} style={styles.iconButton}>
              <Ionicons name="chevron-back" size={28} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>Camera</Text>
            <TouchableOpacity onPress={toggleFlash} style={styles.iconButton}>
              <Ionicons
                name={flash === 'on' ? 'flash' : 'flash-off'}
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>

          {/* Bottom Controls */}
          <View style={styles.bottomControls}>
            <TouchableOpacity onPress={openGallery}>
              <Ionicons name="images-outline" size={32} color="white" />
            </TouchableOpacity>

            <TouchableOpacity onPress={takePicture}>
              <View style={styles.shutterButton} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}
            >
              <Ionicons name="camera-reverse-outline" size={32} color="white" />
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
};

export default SearchWithCamera;

const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionText: { textAlign: 'center', paddingBottom: 10 },
  permissionButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
  },
  permissionButtonText: { color: 'white', fontWeight: 'bold' },
  header: {
    position: 'absolute',
    top: 50,
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    padding: 6,
    backgroundColor: '#00000050',
    borderRadius: 30,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  shutterButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    borderWidth: 4,
    borderColor: '#d9d9d9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
