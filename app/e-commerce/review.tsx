import CartIcons from '@/assets/icons/e-commerce/cart-icons';
import BackIcons from '@/assets/icons/global/back-icons';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
//icons
import StarIcons from '@/assets/icons/e-commerce/stars-icons';
import ChevronDownIcon from '@/assets/icons/e-commerce/chevrondown-icons';
import PointThreeHorizontal from '@/assets/icons/global/point-three-horizontal';

const user = [
  {
    id: '1',
    name: 'Michella Jessica',
    image: 'https://images.pexels.com/photos/3683152/pexels-photo-3683152.jpeg',
  },
  {
    id: '2',
    name: 'Dimas Ardiansyah',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
  },
  {
    id: '3',
    name: 'Larasati Putri',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
  },
  {
    id: '4',
    name: 'Agus Firmansyah',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
  },
];

const storeName = 'H&L Official';

const message = [
  {
    id: '1',
    userId: '1',
    text: 'Obat ini sangat ampuh untuk tanaman saya dan sellernya pun ramah. terima kasih',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    reply: 'Terima kasih kembali Kak Michella! Senang bisa membantu. 😊',
    replyDate: '2025-06-21T08:00:00Z',
    rating: 5,
    date: '2025-06-10T14:23:00Z',
  },
  {
    id: '2',
    userId: '2',
    text: 'Pengiriman cepat dan produk sesuai deskripsi. Good job seller!',
    rating: 4,
    date: '2025-01-12T08:15:00Z',
  },
  {
    id: '3',
    userId: '3',
    text: 'Saya pakai produk ini seminggu dan hasilnya memuaskan.',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    reply: 'Terima kasih atas kepercayaannya, Kak Larasati!',
    replyDate: '2025-06-21T08:00:00Z',
    rating: 3,
    date: '2025-04-15T11:45:00Z',
  },
  {
    id: '4',
    userId: '4',
    text: 'Kualitas oke, cuma pengemasan agak kurang rapi. Tapi masih layak beli.',
    rating: 2,
    date: '2024-06-20T09:00:00Z',
  },
];

const timeAgo = (dateString: string) => {
  const now = new Date();
  const past = new Date(dateString);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count > 0) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
};

const Reviews = () => {
  const [expandedReplies, setExpandedReplies] = useState<
    Record<string, boolean>
  >({});

  interface User {
    id: string;
    name: string;
    image: string;
  }

  interface Message {
    id: string;
    userId: string;
    text: string;
    image?: string;
    reply?: string;
    replyDate?: string;
    rating: number;
    date: string;
  }

  type ExpandedReplies = Record<string, boolean>;

  const toggleReply = (id: string) => {
    setExpandedReplies((prev: ExpandedReplies) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  interface Reviewer {
    id: string;
    name: string;
    image: string;
  }

  interface ReviewMessage {
    id: string;
    userId: string;
    text: string;
    image?: string;
    reply?: string;
    replyDate?: string;
    rating: number;
    date: string;
  }

  const renderReview = (msg: ReviewMessage): React.ReactElement => {
    const reviewer: Reviewer | undefined = user.find(
      (u: Reviewer) => u.id === msg.userId
    );
    const showReply: boolean = expandedReplies[msg.id];
    return (
      <View key={msg.id} className="bg-white px-5  py-4 rounded-md mt-2">
        {/* Header */}
        <View className="flex-row items-center ">
          <View
            className="flex-row items-center "
            style={{
              height: 36,
              width: 358,
              position: 'relative',
              paddingRight: 40,
            }}
          >
            <Image
              source={{ uri: reviewer?.image }}
              className="w-[32px] h-[32px] rounded-full mr-3"
              onError={(error: unknown) =>
                console.warn('Failed to load user avatar:', error)
              }
            />
            <View className="flex-1">
              <Text className="text-[14px] font-semibold">
                {reviewer?.name}
              </Text>
              <Text className="text-[12px] text-[#999999]">
                {timeAgo(msg.date)}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              width: 40,
              height: 40,
              position: 'absolute',
              left: 330,
              top: '50%',
              transform: [{ translateY: -12 }],
              padding: 8,
            }}
          >
            <PointThreeHorizontal />
          </TouchableOpacity>
        </View>

        {/* Star Rating */}
        <View className="flex-row mb-2 mt-4">
          {Array.from({ length: 5 }).map((_, i: number) => (
            <StarIcons
              key={i}
              width={16}
              height={16}
              style={{ marginRight: 4, opacity: i < msg.rating ? 1 : 0.3 }}
            />
          ))}
        </View>

        {/* Images */}
        {msg.image && (
          <View className="flex-row mb-2" style={{ gap: 8 }}>
            <Image
              source={{ uri: msg.image }}
              className="w-[80px] h-[80px] rounded-md"
            />
          </View>
        )}

        {/* Comment */}
        <Text className="text-[14px] text-[#5E5E5E] leading-[20px]">
          {msg.text}
        </Text>

        {/* See Reply */}
        {msg.reply && (
          <>
            <TouchableOpacity
              className="flex-row items-center justify-end mt-3"
              onPress={() => toggleReply(msg.id)}
            >
              <Text className="text-[14px] font-semibold text-black mr-1">
                {showReply ? 'Close Reply' : 'See Reply'}
              </Text>
              <ChevronDownIcon
                width={12}
                height={12}
                style={{
                  transform: [{ rotate: showReply ? '180deg' : '0deg' }],
                }}
              />
            </TouchableOpacity>

            {showReply && (
              <View className="mt-3 bg-[#F7F7F7] rounded-md p-3">
                <View className="flex-row items-center ">
                  <Text className="text-[13px] text-[#646161] font-semibold mb-1">
                    {storeName}
                  </Text>
                  <View className="rounded-3xl mx-2  bg-[#D7FCE8] w-[55px] h-[24px] items-center justify-center ">
                    <Text className="text-[14px] text-[#169953] font-semibold  mb-1">
                      Seller
                    </Text>
                  </View>

                  <Text className="text-[12px] text-[#646161]">
                    {timeAgo(msg.replyDate || msg.date)}
                  </Text>
                </View>

                <Text className="text-[14px] text-[#4B4B4B] leading-[20px]">
                  {msg.reply}
                </Text>
              </View>
            )}
          </>
        )}
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
      <SafeAreaView
        style={{ flex: 1, backgroundColor: '#f8f8f8' }}
        edges={['top', 'left', 'right']}
      >
        {/* Header */}
        <View className="flex-row items-center px-5 py-5 bg-white">
          <TouchableOpacity onPress={() => router.back()}>
            <BackIcons width={20} height={20} />
          </TouchableOpacity>
          <Text className="text-start text-[20px] font-bold ml-5">Reviews</Text>
          <CartIcons
            width={24}
            height={24}
            style={{ position: 'absolute', right: 20, marginTop: 3 }}
          />
        </View>

        {/* Body */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 15 }}
        >
          {/* Summary */}
          <View className="flex-row items-center bg-white px-5 py-4 mt-1">
            <StarIcons width={24} height={24} />
            <Text className="text-[20px] font-bold ml-2">4.7</Text>
            <Text className="text-[16px] ml-1 text-[#BCBCBC]">/5.0</Text>
            <Text className="ml-6 mb-2 text-[14px] font-semibold text-[#1F1F1F]">
              80% of Buyers are satisfied
            </Text>
          </View>
          <View
            className="flex-row items-center bg-white -mt-4"
            style={{ paddingLeft: 131 }}
          >
            <Text className="text-[13px] text-[#999999]">70 Rating</Text>
            <Text className="mx-2 text-[#999999]">•</Text>
            <Text className="text-[13px] text-[#999999]">30 Review</Text>
          </View>

          {/* Filter Tabs */}
          <View className="flex-row px-5 py-4 bg-white">
            <TouchableOpacity
              className="bg-[#F2F2F2] px-4 py-2 mr-4 rounded-full"
              style={{ height: 32 }}
            >
              <Text className="text-[14px] text-black">Photo & Video</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#F2F2F2] px-4 py-2 rounded-full flex-row items-center"
              style={{ height: 32 }}
            >
              <Text className="text-[14px] text-black mr-1">Rating</Text>
              <ChevronDownIcon
                width={16}
                height={16}
                style={{ marginLeft: 8, marginTop: 10 }}
              />
            </TouchableOpacity>
          </View>

          {/* Dynamic Reviews */}
          {message.map(renderReview)}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Reviews;
