import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import BackIcons from '@/assets/icons/global/back-icons';
import { EllipsisVertical, SendHorizonal, X } from 'lucide-react-native';
import ChevronRight from '@/assets/icons/e-commerce/chevronright-icons';

const messages = [
  {
    id: '1',
    text: 'Halo apakah kita berdiskusi mengenai perihal pertanian?',
    type: 'sent',
    time: '13:30',
    status: 'Sent',
  },
  {
    id: '2',
    text: 'Iya produk masih tersedia ka. Silahkan diorder ya✨',
    type: 'received',
    time: '14:00',
  },
  {
    id: '3',
    text: 'Siap ka, otw order ka cuss',
    type: 'sent',
    time: '14:20',
    status: 'Read',
  },
  {
    id: '4',
    text: 'Siap ka kami tunggu, thanks',
    type: 'received',
    time: '14:40',
  },
];

const quickReplies = [
  'Hai',
  'Apakah barang tersedia?',
  'Apakah barang ini ready?',
  'Terima kasih',
];

const MessageChat = () => {
  const [text, setText] = useState('');

  const renderMessage = ({ item }: any) => (
    <View
      className={`my-1 px-3 ${
        item.type === 'sent' ? 'items-end' : 'items-start'
      }`}
    >
      <View
        className={`rounded-2xl px-3 py-2 max-w-[75%] ${
          item.type === 'sent' ? 'bg-green-500' : 'bg-white'
        }`}
      >
        <Text
          className={`${
            item.type === 'sent' ? 'text-white' : 'text-black'
          } text-sm`}
        >
          {item.text}
        </Text>
      </View>
      <Text className="text-xs text-gray-400 mt-1">
        {item.time} {item.status ? item.status : ''}
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      className="flex-1 bg-[#f8f8f8]"
    >
      {/* Header */}
      <View className="flex-row bg-white items-center p-4 shadow-sm">
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcons width={24} height={24} />
        </TouchableOpacity>

        <View className="flex-row items-center ml-3">
          <Image
            source={require('@/assets/images/trash/image25.png')}
            className="w-8 h-8 rounded-full"
          />
          <View className="ml-2">
            <Text className="text-base font-semibold">Mudiafarmer</Text>
            <View className="bg-green-100 rounded-full px-2 py-[1px] self-start">
              <Text className="text-green-600 text-xs font-medium">Online</Text>
            </View>
          </View>
        </View>

        <View className="flex-1" />
        <TouchableOpacity>
          <EllipsisVertical width={24} height={24} />
        </TouchableOpacity>
      </View>

      {/* Chat List */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 10 }}
      />

      {/* Product Card (contoh preview) */}
      <View className="bg-white p-4">
        <View
          className="bg-white rounded-xl mb-2 p-3 flex-row items-center w-[70%]"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 4,
            elevation: 3, // penting buat Android
          }}
        >
          <Image
            source={require('@/assets/images/trash/image25.png')}
            className="w-16 h-16 rounded-md"
          />
          <View className="flex-1 ml-3">
            <Text numberOfLines={1} className="font-semibold text-sm">
              INSEKTISIDA GRACIA 100 ML
            </Text>
            <Text className="text-gray-600 mt-1">Rp269.000</Text>
          </View>
          <TouchableOpacity>
            <X size={24} />
          </TouchableOpacity>
        </View>

        {/* Quick Replies */}
        <View className="flex-row flex-wrap px-3 mb-2">
          {quickReplies.map((q, i) => (
            <TouchableOpacity
              key={i}
              className="bg-gray-100 rounded-full px-3 py-1 mr-2 mb-2"
            >
              <Text className="text-sm text-gray-600">{q}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Input Bar */}
      <View className="flex-row items-center bg-white px-3 py-2">
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type Message"
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2"
        />
        <TouchableOpacity className="bg-green-500 rounded-full p-2">
          <SendHorizonal size={24} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MessageChat;
