import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CameraSearch from '@/assets/icons/e-commerce/camera-search';
import BackIcons from '@/assets/icons/global/back-icons';
import SearchPrimary from '@/assets/icons/e-commerce/search-primary';
import SearchGrey from '@/assets/icons/e-commerce/search-grey';
import RecomendationCard from '@/components/ui/e-commerce/card-recomendation';
import SearchIconPrimary from '@/assets/icons/global/search-icons';
import OtherOption from '@/components/ui/e-commerce/other-option';
import { router } from 'expo-router';

const dummyData = [
  'pupuk termurah',
  'pupuk indramayu',
  'pupuk npk',
  'pupuk kodiam',
  'pupuk subang',
  'Bibit Padi Unggul',
  'Alat Semprot Hama',
  'Traktor Mini',
  'Pestisida Nabati',
  'Bibit Jagung Manis',
];

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleBackHome = () => {
    router.push('/ecommerce');
  };

  const handleSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setHasSearched(true);

    if (!searchHistory.includes(trimmed)) {
      setSearchHistory(prev => [trimmed, ...prev]);
    }
  };

  const filteredData = dummyData.filter(item =>
    item.toLowerCase().includes(query.trim().toLowerCase())
  );
  const showActiveStyle = isFocused || query.trim() !== '';

  const displayedHistory = showAllHistory
    ? searchHistory
    : searchHistory.slice(0, 4);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#f8f8f8' }}
      edges={['top', 'left', 'right']}
    >
      <View className="flex-1 bg-[#f8f8f8] ">
        <View className="flex-row justify-between px-4 py-5 bg-white">
          <TouchableOpacity className="pt-1" onPress={handleBackHome}>
            <BackIcons />
          </TouchableOpacity>

          <View
            className={`flex-row items-center rounded-xl px-3 bg-white w-[276px] h-[40px] border ${
              showActiveStyle ? 'border-[#169953]' : 'border-[#525252]'
            }`}
          >
            <TextInput
              value={query}
              onChangeText={setQuery}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Find what you needed..."
              className="flex-1 text-[14px] text-black"
              placeholderTextColor="#525252"
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity onPress={handleSearch}>
              {showActiveStyle ? (
                <SearchPrimary width={32} height={32} />
              ) : (
                <SearchGrey width={32} height={32} />
              )}
            </TouchableOpacity>
          </View>
          <View className="justify-center items-center">
            <TouchableOpacity onPress={() => console.log('Camera Search')}>
              <CameraSearch width={24} height={24} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Suggestion List */}
        <ScrollView className="flex-1">
          {/* Recent Search */}
          {query.trim() === '' && searchHistory.length > 0 && (
            <View className="bg-white py-4 px-2 rounded-xl mt-3">
              <View className="flex-row justify-between items-center mb-3 px-2">
                <Text className="text-black text-base font-semibold">
                  Recent Search
                </Text>
              </View>

              <View className="flex flex-wrap flex-row gap-2 px-2">
                {displayedHistory.map((item, idx) => (
                  <TouchableOpacity
                    key={idx}
                    className="bg-[#F4F4F4] px-3 py-2 rounded-2xl"
                    onPress={() => setQuery(item)}
                  >
                    <View className="flex-row items-center">
                      <SearchIconPrimary className="mr-2" />
                      <Text className="text-black text-[14px]">{item}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
              {searchHistory.length > 4 && (
                <View className="mt-4 items-center">
                  <TouchableOpacity
                    onPress={() => {
                      if (showAllHistory) {
                        setSearchHistory([]);
                        setShowAllHistory(false);
                      } else {
                        setShowAllHistory(true);
                      }
                    }}
                  >
                    <Text className="text-black text-[14px">
                      {showAllHistory ? 'Clear All' : 'See All'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
          {query.trim() === '' && (
            <View className="mt-4">
              <OtherOption />
            </View>
          )}

          {/* Hasil pencarian */}
          {query.trim() !== '' && (
            <View className="mt-4">
              {filteredData.length > 0 ? (
                <FlatList
                  data={filteredData}
                  keyExtractor={(item, index) => `${item}-${index}`}
                  scrollEnabled={false}
                  renderItem={({ item }) => {
                    const startIndex = item
                      .toLowerCase()
                      .indexOf(query.toLowerCase());
                    const queryText = item.slice(0, startIndex + query.length);
                    const remainingText = item.slice(startIndex + query.length);
                    return (
                      <TouchableOpacity
                        className="flex-row items-center py-3 px-2 bg-white"
                        onPress={() => console.log('Selected:', item)}
                      >
                        <SearchIconPrimary className="mr-4" />
                        <Text className="text-[14px] text-[#1F1F1F] ml-4">
                          {queryText}
                          <Text className="font-semibold text-[14px]">
                            {remainingText}
                          </Text>
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              ) : hasSearched ? (
                <View className="items-center justify-center mt-10 px-4">
                  <Image
                    source={require('@/assets/images/EmptyState.png')}
                    style={{ width: 250, height: 200 }}
                    resizeMode="contain"
                  />
                  <Text className="font-semibold text-[20px] text-[#1F1F1F] mt-4">
                    No Results Found
                  </Text>
                  <Text className="text-center text-[16px] text-[#525252] mt-1">
                    Try adjusting your search{'\n'}to find what {`you're` }looking
                    for
                  </Text>
                  <View
                    className="bg-[#169953] rounded-full mt-10 mb-10 px-5 py-4"
                    style={{ width: 340, height: 55 }}
                  >
                    <Text
                      className="text-white text-center font-bold"
                      style={{ fontSize: 18 }}
                    >
                      Search Again
                    </Text>
                  </View>
                </View>
              ) : null}
            </View>
          )}

          {/* Other Options */}
          {query.trim() !== '' && hasSearched && filteredData.length > 0 && (
            <View className="mt-4">
              <RecomendationCard />
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SearchPage;
