import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackIcons from '@/assets/icons/global/back-icons';

const ResultScreen = () => {
  const router = useRouter();
   const insets = useSafeAreaInsets();

  return (
    <ScrollView style={{paddingTop: insets.top}}>
      <View>

      <View
            className="flex-row items-center justify-between"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#E9E9E9',
              paddingBottom: 5,
              paddingHorizontal: 16,
            }}
          >
            <TouchableOpacity
              className="flex-row items-center justify-center"
              style={{ width: 25 }}
              >
              <BackIcons width={17.42} height={14.88} />
            </TouchableOpacity>
            <View style={{ width: 'auto' }}>
              <Text
                style={{ fontSize: 18, fontWeight: 600, textAlign: 'center' }}
              >
                Report
              </Text>
            </View>
            <View
              className="flex-row items-center justify-center"
              style={{ width: 25 }}
            />
          </View>
      </View>
    </ScrollView>
  );
};

export default ResultScreen;
