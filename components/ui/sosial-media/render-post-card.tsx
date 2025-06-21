import React, { useRef } from 'react';
import { Image, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import LoveIcons from '@/assets/icons/global/love-icons';
import PointThreeHorizontal from '@/assets/icons/global/point-three-horizontal';
import KomentarIcons from '@/assets/icons/sosial-media/komentar-icons';
import PointIcons from '@/assets/icons/sosial-media/point-icons';
import ShereIcons from '@/assets/icons/sosial-media/shere-icons';

interface UserProfile {
  full_name: string;
}

interface User {
  profile: UserProfile;
}

interface ImageItem {
  image: string;
}

interface PostItem {
  id: number;
  user: User;
  content: string;
  slug: string;
  images: ImageItem[];
  likes_count: number;
  comments_count: number;
  shared_count: number;
}

interface RenderPostCardProps {
  item: PostItem;
  index: number;
  containerWidth: number;
  setContainerWidth: (width: number) => void;
  activeIndexes: number[];
  setActiveIndexes: React.Dispatch<React.SetStateAction<number[]>>;
  setId: (id: string) => void;
  setIndex: (index: number) => void;
  setModalVisible: (visible: boolean) => void;
  setSlugComment: (slug: string) => void;
  setModalComment: (visible: boolean) => void;
}

const RenderPostCard: React.FC<RenderPostCardProps> = ({
  item,
  index,
  containerWidth,
  setContainerWidth,
  activeIndexes,
  setActiveIndexes,
  setId,
  setIndex,
  setModalVisible,
  setSlugComment,
  setModalComment,
}) => {
  const scrollRef = useRef(null);

  const handleScroll = (event: any) => {
    const slide = Math.round(
      event.nativeEvent.contentOffset.x / containerWidth
    );
    setActiveIndexes((prev: number[]) => {
      const updated = [...prev];
      updated[index] = slide;
      return updated;
    });
  };

  return (
    <View>
      {/* Header */}
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center">
          <Image
            source={require('../../../assets/images/Image-success-otp.png')}
            className="w-[40px] h-[40px] rounded-full"
          />
          <View className="ml-3 flex-row items-center">
            <Text className="text-[16px] font-semibold text-text-primary">
              {item.user.profile.full_name.length > 170
                ? `${item.user.profile.full_name.slice(0, 170)}...`
                : item.user.profile.full_name}
            </Text>
            <PointIcons width={6} height={6} style={{ marginHorizontal: 5 }} />
            <Text className="text-[14px] text-text-secondary">1 hour ago</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            setId(item.slug);
            setIndex(index);
            setModalVisible(true);
          }}
        >
          <PointThreeHorizontal width={24} height={24} />
        </TouchableOpacity>
      </View>

      {/* Caption */}
      <View className="mb-2">
        <Text className="text-[#1F1F1F] text-[14px]">{item.content}</Text>
      </View>

      {/* Image Slider */}
      {item.images.length > 0 && (
        <View
          className="relative mb-3"
          onLayout={event => {
            const width = event.nativeEvent.layout.width;
            setContainerWidth(width);
          }}
        >
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {item.images.map((img: any, imgIndex: number) => (
              <Image
                key={imgIndex}
                source={{ uri: img.image }}
                style={{
                  borderRadius: 12,
                  width: containerWidth,
                  height: containerWidth,
                }}
              />
            ))}
          </ScrollView>

          <View
            style={{
              width: 34,
              top: 10,
              right: 10,
              position: 'absolute',
              backgroundColor: '#000',
              borderRadius: 100,
            }}
          >
            <Text className="text-white text-xs text-center py-1">
              {activeIndexes[index] + 1}/{item.images.length}
            </Text>
          </View>
        </View>
      )}

      {/* Action Button */}
      <View className="flex-row items-center">
        <View
          className="flex-row items-center justify-between"
          style={{ width: 49 }}
        >
          <TouchableOpacity>
            <LoveIcons width={18} height={18} color={'#434343'} />
          </TouchableOpacity>
          <Text className="text-[14px] text-[#434343] ml-2">
            {item.likes_count === 0
              ? `${item.likes_count}`
              : `${item.likes_count}K`}
          </Text>
        </View>
        <TouchableOpacity
          className="flex-row items-center justify-between"
          style={{ width: 49, marginHorizontal: 30 }}
          onPress={() => {
            setModalComment(true);
            setSlugComment(item.slug);
          }}
        >
          <KomentarIcons width={18} height={18} color={'#434343'} />
          <Text className="text-[14px] text-[#434343] ml-2">
            {item.comments_count === 0
              ? `${item.comments_count}`
              : `${item.comments_count}K`}
          </Text>
        </TouchableOpacity>
        <View
          className="flex-row items-center justify-between"
          style={{ width: 49 }}
        >
          <TouchableOpacity>
            <ShereIcons width={18} height={18} color={'#434343'} />
          </TouchableOpacity>
          <Text className="text-[14px] text-[#434343] ml-2">
            {item.shared_count === 0
              ? `${item.shared_count}`
              : `${item.shared_count}K`}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RenderPostCard;
