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
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
//icons
import SearchIconPrimary from '@/assets/icons/global/search-icons';
//components
import RecomendationCard from '@/components/ui/e-commerce/card-recomendation';
import OtherOption from '@/components/ui/e-commerce/other-option';
import EmptyState from '@/components/ui/e-commerce/search/empty-state';
import SearchHeader from '@/components/ui/e-commerce/search/search-header';

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
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const filteredData = dummyData.filter(item =>
    item.toLowerCase().includes(query.trim().toLowerCase())
  );

  const displayedHistory = showAllHistory
    ? searchHistory
    : searchHistory.slice(0, 4);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#f8f8f8' }}
      edges={['top', 'left', 'right']}
    >
      <View className="bg-[#f8f8f8] ">
        <SearchHeader query={query} setQuery={setQuery} />
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
                      onPress={() =>
                        router.push({
                          pathname: '/e-commerce/search/list-search-product',
                          params: { query: item },
                        })
                      }
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
              <EmptyState
                onPressButton={() => {
                  setQuery('');
                  setHasSearched(false);
                }}
              />
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
    </SafeAreaView>
  );
};

export default SearchPage;
