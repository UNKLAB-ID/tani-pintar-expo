import BintangIcons from '@/assets/icons/agent/bintang-icons';
import PointIcons from '@/assets/icons/sosial-media/point-icons';
import { router } from 'expo-router';
import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

interface CardAgentTaniProps {
  item: any;
}

const CardAgentTani: React.FC<CardAgentTaniProps> = ({ item }) => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 8,
        // Shadow untuk iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.12, // 1F = sekitar 12% opacity
        shadowRadius: 4,
        // Shadow untuk Android
        elevation: 4,
        marginHorizontal: 2,
      }}
    >
      <TouchableOpacity
        onPress={() => router.push('/agent/detail-agent-tani?id=1')}
      >
        <Image
          source={require('../../../assets/images/trash/unsplash_9P4sDPBry0M.png')}
          style={{
            width: '100%',
            height: 160,
            borderRadius: 8,
          }}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <View className="flex-row justify-between py-4">
        <View className="flex-row items-center">
          <Image
            source={require('../../../assets/images/profile-default.png')}
            className="w-[40px] h-[40px] rounded-full"
            style={{ marginLeft: -6 }}
          />
          <View className="ml-2">
            <Text style={{ fontSize: 12, fontWeight: 600 }}>
              {item.name_perusahaan}
            </Text>
            <View className="flex-row items-center">
              <Text style={{ color: '#AAAAAA' }}>{item.alamat}</Text>
              <PointIcons
                width={6}
                height={6}
                style={{ marginHorizontal: 5 }}
              />
              <View className="flex-row items-center">
                <BintangIcons width={12} height={12} />
                <Text
                  style={{
                    color: '#FCB72E',
                    marginLeft: 5,
                  }}
                >
                  {item.retting}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Text style={{ color: '#AAAAAA' }}>{item.tangal}</Text>
      </View>
      <TouchableOpacity
        onPress={() => router.push('/agent/detail-agent-tani?id=1')}
      >
        <View
          style={{
            borderBottomWidth: 1,
            borderTopWidth: 1,
            paddingVertical: 10,
            borderColor: '#E0E0E0',
          }}
        >
          <View className="flex-row items-center justify-between mb-2">
            <Text style={{ fontSize: 14, fontWeight: 600 }}>
              {item.name_produk}
            </Text>
            <Text style={{ fontSize: 14, fontWeight: 600, color: '#525252' }}>
              {item.kebutuhan}
            </Text>
          </View>
          <Text
            style={{
              textAlign: 'justify',
              color: '#7A7A7A',
            }}
          >
            {item.desscription}
          </Text>
        </View>
        <Text
          style={{
            marginTop: 10,
            marginBottom: 4,
            color: '#169953',
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          {item.harga}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardAgentTani;
