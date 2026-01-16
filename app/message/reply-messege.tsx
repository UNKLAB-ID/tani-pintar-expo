import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import BackIcons from '@/assets/icons/global/back-icons';
import { EllipsisVertical, Paperclip, X, SendHorizonal } from 'lucide-react-native';
import ProductChatCard, {
  ProductChatData,
} from '@/components/ui/message/product-chat-card';

// Type definitions
interface Message {
  id: string;
  text?: string;
  type: 'sent' | 'received';
  time: string;
  status?: 'Sent' | 'Read';
  product?: ProductChatData;
}

// Dummy product for attachment
const attachedProduct: ProductChatData = {
  id: '1',
  name: 'INSEKTISIDA GRACIA...',
  price: 'Rp269.000',
  unit: '100 Ml',
  image: require('@/assets/images/trash/image25.png'),
};

// Initial messages with product
const initialMessages: Message[] = [
  {
    id: '0',
    type: 'received',
    time: '',
    product: attachedProduct,
  },
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
    time: '14:00',
  },
];

const quickReplies = [
  'Hai, Apakah bar...',
  'Apakah barang ini...',
  'Terima kasih',
];

const ReplyMessage = () => {
  const params = useLocalSearchParams<{
    storeName?: string;
    storeImage?: string;
  }>();

  const [text, setText] = useState('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [showProductAttachment, setShowProductAttachment] = useState(true);
  const flatListRef = useRef<FlatList>(null);

  const storeName = params.storeName || 'Mudiafarmer';

  const handleSend = () => {
    if (text.trim() === '') return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      type: 'sent',
      time: new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'Sent',
    };

    setMessages(prev => [...prev, newMessage]);
    setText('');

    // Scroll to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleQuickReply = (reply: string) => {
    setText(reply);
  };

  // Render message item
  const renderMessage = ({ item }: { item: Message }) => {
    // Product message
    if (item.product) {
      return (
        <View className="px-3 my-2 items-start">
          <ProductChatCard
            product={item.product}
            variant="in-chat"
            showBuyButton={true}
            showWishlist={true}
            onBuyPress={() => console.log('Buy pressed')}
          />
        </View>
      );
    }

    // Text message
    return (
      <View
        className={`my-1 px-3 ${
          item.type === 'sent' ? 'items-end' : 'items-start'
        }`}
      >
        <View
          className={`rounded-2xl px-4 py-3 max-w-[75%] ${
            item.type === 'sent' ? 'bg-primary' : 'bg-white'
          }`}
          style={
            item.type === 'received'
              ? {
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 2,
                  elevation: 1,
                }
              : {}
          }
        >
          <Text
            className={`${
              item.type === 'sent' ? 'text-white' : 'text-black'
            } text-[14px]`}
          >
            {item.text}
          </Text>
        </View>
        <Text className="text-[12px] text-gray-400 mt-1">
          {item.time} {item.status && item.type === 'sent' ? item.status : ''}
        </Text>
      </View>
    );
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={false}
      />
      <SafeAreaView edges={['top']} className="flex-1 bg-[#f8f8f8]">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          {/* Header */}
          <View className="flex-row bg-white items-center px-4 py-3 border-b border-gray-100">
            <TouchableOpacity onPress={() => router.back()}>
              <BackIcons width={24} height={24} />
            </TouchableOpacity>

            <View className="flex-row items-center ml-3 flex-1">
              <Image
                source={require('@/assets/images/trash/image25.png')}
                className="w-10 h-10 rounded-full"
              />
              <View className="ml-3">
                <Text className="text-[16px] font-semibold">{storeName}</Text>
                <View className="bg-green-100 rounded-full px-2 py-[2px] self-start mt-1">
                  <Text className="text-primary text-[12px] font-medium">
                    Online
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity>
              <EllipsisVertical size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Chat List */}
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingVertical: 10 }}
            showsVerticalScrollIndicator={false}
          />

          {/* Bottom Section */}
          <View className="bg-white">
            {/* Attached Product Preview */}
            {showProductAttachment && (
              <View className="px-4 pt-3">
                <View className="flex-row items-center">
                  <ProductChatCard
                    product={attachedProduct}
                    variant="attachment"
                    showBuyButton={false}
                    showWishlist={false}
                  />
                  <TouchableOpacity
                    onPress={() => setShowProductAttachment(false)}
                    className="ml-2"
                  >
                    <X size={20} color="#999" />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Quick Replies */}
            <View className="flex-row px-4 py-3">
              {quickReplies.map((reply, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleQuickReply(reply)}
                  className="bg-gray-100 rounded-full px-3 py-2 mr-2"
                >
                  <Text className="text-[12px] text-gray-600">{reply}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Input Bar */}
            <View className="flex-row items-center px-4 pb-4">
              <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-2 mr-3">
                <TextInput
                  value={text}
                  onChangeText={setText}
                  placeholder="Type Message"
                  placeholderTextColor="#999"
                  className="flex-1 text-[14px]"
                  multiline
                  maxLength={500}
                />
                <TouchableOpacity className="ml-2">
                  <Paperclip size={20} color="#999" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={handleSend}
                className="bg-primary rounded-full p-3"
              >
                <SendHorizonal size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default ReplyMessage;
