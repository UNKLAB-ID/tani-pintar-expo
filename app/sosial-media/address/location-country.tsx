import BackIcons from '@/assets/icons/global/back-icons';
import DropdownList from '@/components/ui/component-globals/input-dropdown-global';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const countries = [
  { id: 1, name: 'Indonesia', createdAt: '2020-01-01' },
  { id: 2, name: 'Australia', createdAt: '2020-02-01' },
  { id: 3, name: 'United States', createdAt: '2020-03-01' },
];

export default function LocationCountryScreen() {
  const [selected, setSelected] = useState<any | null>(null);
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <View className="px-4">
        <View className="flex-row items-center" style={{ marginBottom: 20 }}>
          <TouchableOpacity className="mr-3" onPress={() => router.back()}>
            <BackIcons size={20} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: '600', color: '#1F1F1F' }}>
            Location
          </Text>
        </View>
        <DropdownList
          data={countries}
          value={selected}
          onSelect={item => setSelected(item)}
          getLabel={item => item.name}
          placeholder="Ex: Indonesia"
        />

        {selected && (
          <Text style={{ marginTop: 20 }}>
            Selected: {selected.name} (ID: {selected.id})
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}
