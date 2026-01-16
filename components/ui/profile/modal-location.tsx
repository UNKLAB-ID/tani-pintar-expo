import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { X } from 'lucide-react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import api from '@/utils/api/api';

// Types based on API response
interface Country {
  id: number;
  name: string;
  code: string;
}

interface Province {
  id: number;
  country: Country;
  name: string;
}

interface City {
  id: number;
  province: Province;
  name: string;
}

interface District {
  id: number;
  city: City;
  name: string;
}

interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

interface SelectedLocation {
  provinceId: number;
  provinceName: string;
  cityId: number;
  cityName: string;
  districtId: number;
  districtName: string;
}

interface ModalLocationPickerProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (data: SelectedLocation) => void;
}

// API fetch functions with pagination
const fetchProvinces = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<ApiResponse<Province>> => {
  const url = `/location/provinces/?page=${pageParam}&page_size=10`;
  const res = await api.get(url);

  if (!res.success || !res.data) {
    return {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };
  }

  const data = res.data;

  if (data.results) {
    return data;
  }

  if (Array.isArray(data)) {
    return {
      count: data.length,
      next: null,
      previous: null,
      results: data,
    };
  }

  return {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };
};

const fetchCities = async (
  provinceId: number,
  pageParam: number
): Promise<ApiResponse<City>> => {
  const url = `/location/cities/?page=${pageParam}&page_size=50`;
  const res = await api.get(url);

  if (!res.success || !res.data) {
    return { count: 0, next: null, previous: null, results: [] };
  }

  const data = res.data;

  if (data.results) {
    // Filter cities by province_id on the client side
    const filteredResults = data.results.filter(
      (city: City) => city.province.id === provinceId
    );

    return {
      count: filteredResults.length,
      next: data.next,
      previous: data.previous,
      results: filteredResults,
    };
  }

  if (Array.isArray(data)) {
    const filteredResults = data.filter(
      (city: City) => city.province.id === provinceId
    );
    return {
      count: filteredResults.length,
      next: null,
      previous: null,
      results: filteredResults,
    };
  }

  return { count: 0, next: null, previous: null, results: [] };
};

const fetchDistricts = async (
  cityId: number,
  pageParam: number
): Promise<ApiResponse<District>> => {
  const url = `/location/districts/?page=${pageParam}&page_size=50`;
  const res = await api.get(url);

  if (!res.success || !res.data) {
    return { count: 0, next: null, previous: null, results: [] };
  }

  const data = res.data;

  if (data.results) {
    // Filter districts by city_id on the client side
    const filteredResults = data.results.filter(
      (district: District) => district.city.id === cityId
    );

    return {
      count: filteredResults.length,
      next: data.next,
      previous: data.previous,
      results: filteredResults,
    };
  }

  if (Array.isArray(data)) {
    const filteredResults = data.filter(
      (district: District) => district.city.id === cityId
    );
    return {
      count: filteredResults.length,
      next: null,
      previous: null,
      results: filteredResults,
    };
  }

  return { count: 0, next: null, previous: null, results: [] };
};

const ModalLocationPicker: React.FC<ModalLocationPickerProps> = ({
  visible,
  onClose,
  onSelect,
}) => {
  const [step, setStep] = useState<'province' | 'city' | 'district'>(
    'province'
  );
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<{
    provinceId: number | null;
    provinceName: string;
    cityId: number | null;
    cityName: string;
    districtId: number | null;
    districtName: string;
  }>({
    provinceId: null,
    provinceName: '',
    cityId: null,
    cityName: '',
    districtId: null,
    districtName: '',
  });

  // Fetch provinces with infinite scroll
  const {
    data: provincesData,
    isLoading: provincesLoading,
    isError: provincesError,
    fetchNextPage: fetchNextProvinces,
    hasNextPage: hasNextProvinces,
    isFetchingNextPage: isFetchingNextProvinces,
  } = useInfiniteQuery({
    queryKey: ['provinces'],
    queryFn: fetchProvinces,
    enabled: visible && step === 'province',
    retry: 2,
    staleTime: 10 * 60 * 1000, // 10 minutes cache
    gcTime: 15 * 60 * 1000, // Keep in cache for 15 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    getNextPageParam: lastPage => {
      if (!lastPage || !lastPage.next) return undefined;
      try {
        const url = new URL(lastPage.next);
        const pageStr = url.searchParams.get('page');
        return pageStr ? parseInt(pageStr, 10) : undefined;
      } catch (error) {
        return undefined;
      }
    },
    initialPageParam: 1,
  });

  // Fetch cities with infinite scroll
  const {
    data: citiesData,
    isLoading: citiesLoading,
    isError: citiesError,
    fetchNextPage: fetchNextCities,
    hasNextPage: hasNextCities,
    isFetchingNextPage: isFetchingNextCities,
  } = useInfiniteQuery({
    queryKey: ['cities', selected.provinceId],
    queryFn: ({ pageParam }) => fetchCities(selected.provinceId!, pageParam),
    enabled: visible && step === 'city' && selected.provinceId !== null,
    retry: 2,
    staleTime: 10 * 60 * 1000, // 10 minutes cache
    gcTime: 15 * 60 * 1000, // Keep in cache for 15 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    getNextPageParam: lastPage => {
      if (!lastPage || !lastPage.next) return undefined;
      try {
        const url = new URL(lastPage.next);
        const pageStr = url.searchParams.get('page');
        return pageStr ? parseInt(pageStr, 10) : undefined;
      } catch {
        return undefined;
      }
    },
    initialPageParam: 1,
  });

  // Fetch districts with infinite scroll
  const {
    data: districtsData,
    isLoading: districtsLoading,
    isError: districtsError,
    fetchNextPage: fetchNextDistricts,
    hasNextPage: hasNextDistricts,
    isFetchingNextPage: isFetchingNextDistricts,
  } = useInfiniteQuery({
    queryKey: ['districts', selected.cityId],
    queryFn: ({ pageParam }) => fetchDistricts(selected.cityId!, pageParam),
    enabled: visible && step === 'district' && selected.cityId !== null,
    retry: 2,
    staleTime: 10 * 60 * 1000, // 10 minutes cache
    gcTime: 15 * 60 * 1000, // Keep in cache for 15 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    getNextPageParam: lastPage => {
      if (!lastPage || !lastPage.next) return undefined;
      try {
        const url = new URL(lastPage.next);
        const pageStr = url.searchParams.get('page');
        return pageStr ? parseInt(pageStr, 10) : undefined;
      } catch {
        return undefined;
      }
    },
    initialPageParam: 1,
  });

  const reset = () => {
    setStep('province');
    setSelected({
      provinceId: null,
      provinceName: '',
      cityId: null,
      cityName: '',
      districtId: null,
      districtName: '',
    });
    setSearch('');
  };

  const handleSelectProvince = (province: Province) => {
    setSelected({
      provinceId: province.id,
      provinceName: province.name,
      cityId: null,
      cityName: '',
      districtId: null,
      districtName: '',
    });
    setStep('city');
    setSearch('');
  };

  const handleSelectCity = (city: City) => {
    setSelected(prev => ({
      ...prev,
      cityId: city.id,
      cityName: city.name,
      districtId: null,
      districtName: '',
    }));
    setStep('district');
    setSearch('');
  };

  const handleSelectDistrict = (district: District) => {
    const final: SelectedLocation = {
      provinceId: selected.provinceId!,
      provinceName: selected.provinceName,
      cityId: selected.cityId!,
      cityName: selected.cityName,
      districtId: district.id,
      districtName: district.name,
    };
    onSelect(final);
    onClose();
    reset();
  };

  // Memoize flattened list to avoid re-computing on every render
  const currentList = useMemo(() => {
    try {
      switch (step) {
        case 'province':
          return (
            provincesData?.pages?.flatMap(
              (page: ApiResponse<Province>) => page?.results || []
            ) || []
          );
        case 'city':
          return (
            citiesData?.pages?.flatMap(
              (page: ApiResponse<City>) => page?.results || []
            ) || []
          );
        case 'district':
          return (
            districtsData?.pages?.flatMap(
              (page: ApiResponse<District>) => page?.results || []
            ) || []
          );
        default:
          return [];
      }
    } catch {
      return [];
    }
  }, [step, provincesData?.pages, citiesData?.pages, districtsData?.pages]);

  // Memoize filtered list
  const filteredList = useMemo(() => {
    try {
      if (!currentList || !Array.isArray(currentList)) return [];
      return currentList.filter(item =>
        item?.name?.toLowerCase().includes(search.toLowerCase())
      );
    } catch {
      return [];
    }
  }, [currentList, search]);

  // Check loading state
  const isLoading = provincesLoading || citiesLoading || districtsLoading;

  // Check error state
  const hasError = provincesError || citiesError || districtsError;

  // Load more handler for all steps
  const handleLoadMore = () => {
    if (step === 'province' && hasNextProvinces && !isFetchingNextProvinces) {
      fetchNextProvinces();
    } else if (step === 'city' && hasNextCities && !isFetchingNextCities) {
      fetchNextCities();
    } else if (
      step === 'district' &&
      hasNextDistricts &&
      !isFetchingNextDistricts
    ) {
      fetchNextDistricts();
    }
  };

  // Check if fetching next page
  const isFetchingMore =
    isFetchingNextProvinces || isFetchingNextCities || isFetchingNextDistricts;

  // Render footer for load more
  const renderFooter = () => {
    if (!isFetchingMore) return null;
    return (
      <View style={{ padding: 10, alignItems: 'center' }}>
        <ActivityIndicator size="small" color="#3B82F6" />
        <Text style={{ marginTop: 5, color: '#6B7280', fontSize: 12 }}>
          Memuat lebih banyak...
        </Text>
      </View>
    );
  };

  // Don't render if not visible
  if (!visible) {
    return null;
  }

  return (
    <Modal transparent animationType="slide" visible={visible}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}
      >
        <Pressable style={{ flexGrow: 1 }} onPress={onClose} />

        <View
          style={{
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
            maxHeight: '85%',
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <TouchableOpacity onPress={onClose}>
              <X size={20} color="#1F1F1F" />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#1F1F1F',
                marginLeft: 12,
              }}
            >
              Pilih{' '}
              {step === 'province'
                ? 'Provinsi'
                : step === 'city'
                  ? 'Kota'
                  : 'Kecamatan'}
            </Text>
            <View style={{ flex: 1 }} />
            <TouchableOpacity onPress={reset}>
              <Text style={{ color: '#F87171' }}>Reset</Text>
            </TouchableOpacity>
          </View>

          {/* Breadcrumb */}
          <View
            style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 }}
          >
            {selected.provinceName ? (
              <Text style={{ color: '#3B82F6', marginRight: 8 }}>
                {selected.provinceName}
              </Text>
            ) : null}
            {selected.cityName ? (
              <Text style={{ color: '#3B82F6', marginRight: 8 }}>
                {selected.cityName}
              </Text>
            ) : null}
            {selected.districtName ? (
              <Text style={{ color: '#3B82F6', marginRight: 8 }}>
                {selected.districtName}
              </Text>
            ) : null}
          </View>

          {/* Search */}
          <TextInput
            placeholder={`Cari ${step === 'province' ? 'provinsi' : step === 'city' ? 'kota' : 'kecamatan'}`}
            value={search}
            onChangeText={setSearch}
            style={{
              borderWidth: 1,
              borderColor: '#E5E7EB',
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 8,
              marginBottom: 10,
              fontSize: 14,
            }}
          />

          {/* Loading Indicator */}
          {isLoading ? (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#3B82F6" />
              <Text style={{ marginTop: 10, color: '#6B7280' }}>
                Memuat data...
              </Text>
            </View>
          ) : hasError ? (
            /* Error State */
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text
                style={{ color: '#EF4444', fontSize: 16, fontWeight: '600' }}
              >
                Gagal memuat data
              </Text>
              <Text
                style={{ color: '#6B7280', marginTop: 8, textAlign: 'center' }}
              >
                Terjadi kesalahan saat mengambil data. Silakan tutup dan coba
                lagi.
              </Text>
            </View>
          ) : (
            /* List with infinite scroll */
            <FlatList
              data={filteredList}
              keyExtractor={(item, index) => `${step}-${item.id}-${index}`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    if (step === 'province') {
                      handleSelectProvince(item as Province);
                    } else if (step === 'city') {
                      handleSelectCity(item as City);
                    } else {
                      handleSelectDistrict(item as District);
                    }
                  }}
                  style={{
                    paddingVertical: 12,
                    paddingHorizontal: 4,
                    borderBottomWidth: 1,
                    borderBottomColor: '#F3F4F6',
                  }}
                >
                  <Text style={{ fontSize: 14, color: '#1F2937' }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View style={{ padding: 20, alignItems: 'center' }}>
                  <Text style={{ color: '#6B7280' }}>Tidak ada data</Text>
                </View>
              }
              ListFooterComponent={renderFooter}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.3}
              removeClippedSubviews={true}
              maxToRenderPerBatch={10}
              updateCellsBatchingPeriod={50}
              windowSize={10}
              initialNumToRender={15}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalLocationPicker;
