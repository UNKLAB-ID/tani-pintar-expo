import BackIcons from '@/assets/icons/global/back-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import api from '@/utils/api/api';
import { useUserLocation } from '@/store/location/location';

type Country = {
  id: number;
  name: string;
  createdAt: string;
};

type CountryResponse = {
  results: Country[];
  next: string | null;
  previous: string | null;
};

const fetchCountries = async (url?: string) => {
  const endpoint = url || '/location/countries/';
  const response = await api.get(endpoint);
  return response.data;
};

export default function LocationCountryScreen() {
  const insets = useSafeAreaInsets();
  const { selectedCountry, setSelectedCountry } = useUserLocation();

  const [countryList, setCountryList] = useState<Country[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const {
    data: countriesData,
    isLoading,
    error,
    refetch,
  } = useQuery<CountryResponse>({
    queryKey: ['countries'],
    queryFn: () => fetchCountries(),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (countriesData?.results) {
      let result = countriesData.results;

      if (selectedCountry) {
        const exists = result.find(c => c.id === selectedCountry.id);
        if (!exists) {
          result = [selectedCountry, ...result];
        } else {
          result = [
            selectedCountry,
            ...result.filter(c => c.id !== selectedCountry.id),
          ];
        }
      }

      setCountryList(result);
      setNextUrl(countriesData.next);
      setPrevUrl(countriesData.previous);
    }
  }, [countriesData, selectedCountry]);

  const loadMoreCountries = async () => {
    if (!nextUrl || isFetchingMore) return;
    setIsFetchingMore(true);
    try {
      const data: CountryResponse = await fetchCountries(nextUrl);
      setNextUrl(data.next);
      setPrevUrl(data.previous);

      const newResults = data.results.filter(
        c => !countryList.find(existing => existing.id === c.id)
      );

      setCountryList(prev => [...prev, ...newResults]);
    } catch (e) {
      console.error('Failed to load more countries:', e);
    } finally {
      setIsFetchingMore(false);
    }
  };

  const handleSelect = (item: Country) => {
    setSelectedCountry({
      ...item,
      createdAt: new Date().toISOString(),
    });
    router.back();
  };

  const renderItem = ({ item }: { item: Country }) => (
    <TouchableOpacity
      className="py-4 border-b border-gray-200"
      onPress={() => handleSelect(item)}
    >
      <Text className="text-base text-black">{item.name}</Text>
    </TouchableOpacity>
  );

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
            Select Country
          </Text>
        </View>

        {/* Error / Loading */}
        {isLoading ? (
          <ActivityIndicator size="large" color="#999" />
        ) : error ? (
          <Text style={{ color: 'red' }}>Error loading countries</Text>
        ) : (
          <FlatList
            data={countryList}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            onEndReached={loadMoreCountries}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isFetchingMore ? (
                <ActivityIndicator size="small" color="#666" />
              ) : null
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}
