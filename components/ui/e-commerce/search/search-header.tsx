import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import BackIcons from '@/assets/icons/global/back-icons';
import SearchPrimary from '@/assets/icons/e-commerce/search-primary';
import SearchGrey from '@/assets/icons/e-commerce/search-grey';
import CameraSearch from '@/assets/icons/e-commerce/camera-search';

interface SearchHeaderProps {
  query: string;
  setQuery: (text: string) => void;
  onSearch?: () => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  query,
  setQuery,
  onSearch,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const showActiveStyle = isFocused || query.trim() !== '';

  const handleSearch = () => {
    if (!onSearch) {
      if (query.trim()) {
        router.push({
          pathname: '/e-commerce/search/list-search-product',
          params: { query: query.trim() },
        });
      }
    } else {
      onSearch();
    }
  };

  return (
    <View className="flex-row justify-between px-4 py-5 bg-white">
      <TouchableOpacity className="pt-1" onPress={() => router.back()}>
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
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
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
        <TouchableOpacity
          onPress={() => router.push('/e-commerce/search/search-with-camera')}
        >
          <CameraSearch width={24} height={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchHeader;
