import React, { useState, useEffect, use } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import api from '@/utils/api/api';
import MapsLatLongAddressIcons from '@/assets/icons/global/maps-address-lat-long-icons';
import { generateMap } from '@/modul/maps-modul-app';
import { router } from 'expo-router';
import { useUserLocation } from '@/store/location/location';

const { width, height } = Dimensions.get('window');

interface LocationData {
  latitude: number;
  longitude: number;
}

// 🔑 Ganti pakai token Mapbox kamu
const MAPBOX_TOKEN = process.env.EXPO_PUBLIC_TOKEN_MAPBOX;

const PinLatLongAddress = () => {
  const [mapHtml, setMapHtml] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const { setLatAddress, setLongAddress } = useUserLocation();
  const insets = useSafeAreaInsets();

  const [selectedLocation, setSelectedLocation] = useState<LocationData>({
    latitude: -6.2088,
    longitude: 106.8456,
  });

  // ✅ Function ambil lokasi user
  const getCurrentLocation = async () => {
    try {
      setIsLoadingLocation(true);

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Izin lokasi ditolak', 'Tidak bisa ambil lokasi pengguna.');
        setIsLoadingLocation(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = location.coords;

      setSelectedLocation({ latitude, longitude });
      setMapHtml(generateMap(latitude, longitude));
    } catch (error) {
      console.error('Error get location:', error);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  // ✅ Search lokasi via Mapbox Geocoding
  const handleSearch = async () => {
    if (!search.trim()) return;
    try {
      setIsSearching(true);
      const url = `${process.env.EXPO_PUBLIC_MAPBOX_API_URL}/${encodeURIComponent(
        search
      )}.json?access_token=${MAPBOX_TOKEN}&limit=1`;

      const res = await api.get(url);
      const data = res.data;

      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        setSelectedLocation({ latitude: lat, longitude: lng });
        setMapHtml(generateMap(lat, lng));
      } else {
        Alert.alert('Lokasi tidak ditemukan', 'Coba kata kunci lain.');
      }
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  // ✅ Ambil lokasi user saat pertama kali render
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getAddressFromCoords = async (lat: number, lng: number) => {
    try {
      const url = `${process.env.EXPO_PUBLIC_MAPBOX_API_URL}/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}&language=id`;
      const res = await api.get(url);
      const data = res.data;

      if (data.features && data.features.length > 0) {
        return data.features[0].place_name; // ini alamat lengkap
      }
      return 'Alamat tidak ditemukan';
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      return 'Gagal ambil alamat';
    }
  };

  const handleWebViewMessage = async (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'coordinates') {
        setSelectedLocation({
          latitude: data.latitude,
          longitude: data.longitude,
        });

        const addr = await getAddressFromCoords(data.latitude, data.longitude);
        setAddress(addr);

        setLatAddress(data.latitude);
        setLongAddress(data.longitude);
      }
    } catch (error) {
      console.log('Error parsing message:', error);
    }
  };

  const handleConfirm = () => {
    return router.replace('/profile/register-role-user');
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={{ padding: 4 }} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 10 }}>
          Pin Alamat
        </Text>
        <TouchableOpacity onPress={getCurrentLocation} style={styles.locateBtn}>
          {isLoadingLocation ? (
            <ActivityIndicator size="small" color="#169953" />
          ) : (
            <Ionicons name="locate" size={20} color="#169953" />
          )}
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View
        style={{
          position: 'absolute',
          top: insets.top + 70,
          left: 16,
          right: 16,
          zIndex: 10,
          flexDirection: 'row',
          backgroundColor: '#fff',
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#E0E0E0',
          alignItems: 'center',
          paddingHorizontal: 8,
          paddingVertical: 6,
        }}
      >
        <Ionicons name="search" size={20} color="#999" />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Cari lokasi (contoh: Jakarta, Bandung...)"
          style={styles.searchInput}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity
          onPress={handleSearch}
          style={styles.searchBtn}
          disabled={isSearching}
        >
          {isSearching ? (
            <ActivityIndicator size="small" color="#169953" />
          ) : (
            <Ionicons name="arrow-forward" size={16} color="#169953" />
          )}
        </TouchableOpacity>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <WebView
          originWhitelist={['*']}
          source={{ html: mapHtml }}
          style={styles.webView}
          javaScriptEnabled={true}
          onMessage={handleWebViewMessage}
        />
      </View>

      {/* Bottom */}
      <View
        style={{
          padding: 16,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          width: width,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
          position: 'absolute',
          bottom: insets.bottom,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <MapsLatLongAddressIcons width={26} height={26} />
          <Text style={{ fontSize: 16, fontWeight: '600' }}>
            {' '}
            Lokasi Dipilih
          </Text>
        </View>
        <Text>{address}</Text>
        <Text>
          Lat: {selectedLocation.latitude.toFixed(6)}, Lng:{' '}
          {selectedLocation.longitude.toFixed(6)}
        </Text>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={{ color: '#fff', fontWeight: '600' }}>
            Konfirmasi Lokasi
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  locateBtn: {
    padding: 8,
    backgroundColor: '#E8F5E8',
    borderRadius: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    paddingVertical: 8,
  },
  searchBtn: {
    padding: 8,
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
  },
  mapContainer: { flex: 1 },
  webView: { flex: 1 },
  confirmButton: {
    marginTop: 10,
    backgroundColor: '#169953',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default PinLatLongAddress;
