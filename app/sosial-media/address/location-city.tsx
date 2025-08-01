import BackIcons from '@/assets/icons/global/back-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import api from '@/utils/api/api';
import { useUserLocation } from '@/store/location/location';

type City = {
  id: number;
  name: string;
};

type CityResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: City[];
};

export default function LocationCityScreen() {
  const insets = useSafeAreaInsets();
  const { selectedCity, setSelectedCity } = useUserLocation();
  const [cityList, setCityList] = useState<City[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>('/location/cities/');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchCities = async (url: string) => {
    try {
      setLoading(true);
      const response = await api.get(url);
      const data: CityResponse = response.data;

      let combinedCities = [...cityList, ...data.results];

      if (selectedCity) {
        const exists = combinedCities.find(c => c.id === selectedCity.id);
        if (!exists) {
          combinedCities = [selectedCity, ...combinedCities];
        } else {
          combinedCities = [
            selectedCity,
            ...combinedCities.filter(c => c.id !== selectedCity.id),
          ];
        }
      }

      setCityList(combinedCities);
      setNextUrl(data.next); // TIDAK PERLU replace di sini
      setError(false);
    } catch (err) {
      console.log('Fetch error:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (nextUrl && cityList.length === 0) {
      const cleanUrl = nextUrl.startsWith('http')
        ? nextUrl.replace(/^https?:\/\/[^/]+/, '')
        : nextUrl;
      fetchCities(cleanUrl);
    }
  }, []);

  const loadMore = () => {
    if (!nextUrl || loading) return;

    const cleanUrl = nextUrl.startsWith('http')
      ? nextUrl.replace(/^https?:\/\/[^/]+/, '')
      : nextUrl;

    fetchCities(cleanUrl);
  };

  const handleSelect = (item: City) => {
    setSelectedCity({
      ...item,
      createdAt: new Date().toISOString(),
    });
    router.back();
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
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View className="px-4">
        {/* Header */}
        <View className="flex-row items-center mb-5">
          <TouchableOpacity className="mr-3" onPress={() => router.back()}>
            <BackIcons size={20} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: '600', color: '#1F1F1F' }}>
            Location
          </Text>
        </View>

        {/* List Cities */}
        {error ? (
          <Text style={{ color: 'red' }}>Error loading cities</Text>
        ) : (
          <FlatList
            data={cityList}
            keyExtractor={item => item.id.toString()}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              loading ? (
                <ActivityIndicator size="small" color="#999" className="my-2" />
              ) : null
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                className="py-3 border-b border-gray-200"
                onPress={() => handleSelect(item)}
              >
                <Text className="text-base text-gray-800">{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
