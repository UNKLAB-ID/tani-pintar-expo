import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import SearchInput from '../../component-globals/search-input';
import { ChevronRight } from 'lucide-react-native';

const CategoryTab = () => {
  const [search, setSearch] = useState('');
  interface Category {
    id: number;
    name: string;
    count: number;
  }

  const categories: Category[] = [
    { id: 1, name: 'Obat Hama & Pestisida', count: 45 },
    { id: 2, name: 'Benih & Bibit', count: 38 },
    { id: 3, name: 'Pupuk & Nutrisi Tanaman', count: 52 },
    { id: 4, name: 'Alat & Mesin Pertanian', count: 27 },
    { id: 5, name: 'Peralatan Irigasi', count: 18 },
    { id: 6, name: 'Pakan & Kesehatan Ternak', count: 22 },
    { id: 7, name: 'Produk Panen & Hasil Tani', count: 30 },
    { id: 8, name: 'Perlengkapan Pelindung Diri', count: 14 },
  ];

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <SearchInput
          placeholder="Search category"
          value={search}
          onChangeText={setSearch}
        />

        {categories.length === 0 ? (
          <View className="items-center justify-center mt-8">
            <Image
              source={require('@/assets/images/Empty-Category-Store.png')}
              style={{
                width: 250,
                height: 219,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              resizeMode="cover"
            />
            <Text className="text-center text-[16px] mt-4">
              No categories yet
            </Text>
          </View>
        ) : (
          categories.map(category => (
            <TouchableOpacity
              key={category.id}
              className="flex-row items-center justify-between py-4 pl-4 border-b border-gray-100"
            >
              <View className="flex-row items-center">
                <Image
                  source={require('@/assets/images/trash/image25.png')}
                  style={{ width: 48, height: 48, borderRadius: 8 }}
                  resizeMode="cover"
                />

                <Text className="text-base font-medium text-gray-800">
                  {category.name}
                </Text>
                <Text className="text-sm text-gray-500 mt-1 ml-2">
                  ({category.count})
                </Text>
              </View>

              <ChevronRight width={24} height={24} color="#787878" />
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default CategoryTab;
