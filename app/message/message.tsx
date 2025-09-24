import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

//icons
import BackIcons from '@/assets/icons/global/back-icons';
import PointThreeHorizontal from '@/assets/icons/global/point-three-horizontal';
import SearchIconPrimary from '@/assets/icons/global/search-icons';
import DoubleCheck from '@/assets/icons/e-commerce/double-check-icons';

import { router } from 'expo-router';

const dataDummy = () => [
  {
    id: 1,
    image: require('@/assets/images/trash/image18.png'),
    store: 'H&L Official',
    dateTime: '2025-07-11 12:00',
    chat: 'Apakah barang ini tersedia?',
    status: 'read',
  },
  {
    id: 2,
    image: require('@/assets/images/trash/image18.png'),
    store: 'Mudiafarmer',
    dateTime: '2025-07-11 15:00',
    chat: 'Halo ka, apakah bisa dikirim hari ini?',
    status: 'sent',
  },
];

interface ChatItem {
  id: number;
  image: any;
  store: string;
  dateTime: string;
  chat: string;
  status: string;
}

const MessageEcommerce = () => {
  const [chatList, setChatList] = useState<ChatItem[]>([]);

  useEffect(() => {
    const fetchData = () => {
      const dummy = dataDummy();
      setChatList(dummy);
    };

    fetchData();
  }, []);

  const handleBackHome = () => {
    router.push('/ecommerce');
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={false}
      />
      <SafeAreaView
        edges={['top', 'left', 'right']}
        className="flex-1 bg-white"
      >
        <View className="flex-row justify-between bg-white items-center p-4 ">
          <TouchableOpacity>
            <BackIcons width={24} height={24} onPress={handleBackHome} />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Chat</Text>
          <TouchableOpacity>
            <PointThreeHorizontal width={24} height={24} />
          </TouchableOpacity>
        </View>

        <View className="mt-3 px-3">
          <View className="flex-row items-center bg-[#F8F8F8] rounded-3xl px-4 py-2">
            <SearchIconPrimary className="mr-2" />
            <TextInput
              placeholder="Search message"
              placeholderTextColor="#999"
              className="flex-1 text-[14px] text-black"
            />
          </View>
        </View>

        {/* List Chat */}
        <FlatList
          data={chatList}
          keyExtractor={item => item.id.toString()}
          className="mt-4"
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push('/message/display-message')}
              className="flex-row items-start px-4 mt-3"
            >
              <Image
                source={item.image}
                className="rounded-full mr-3"
                style={{ width: 45, height: 45 }}
              />
              <View className="flex-1">
                <View className="flex-row justify-between items-center">
                  <Text className="text-[16px] font-semibold text-black">
                    {item.store}
                  </Text>
                  <Text className="text-[12px] text-[#AAAAAA]">
                    {item.dateTime.slice(11, 16)}
                  </Text>
                </View>

                <View className="flex-row items-center mt-2 pb-3 border-b border-gray-300">
                  <Text
                    numberOfLines={1}
                    className="flex-1 text-[14px] text-[#8D8D8D]"
                  >
                    {item.chat}
                  </Text>

                  <View className="ml-2">
                    {item.status === 'read' ? (
                      <DoubleCheck width={16} height={16} color="#2D9CDB" />
                    ) : (
                      <DoubleCheck width={16} height={16} color="#999" />
                    )}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </>
  );
};

export default MessageEcommerce;
