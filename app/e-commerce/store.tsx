import React, { useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
// components
import InputSearchPrimary from '@/components/ui/component-globals/input-seach-primary';
import TabNavigation from '@/components/ui/e-commerce/detail/tabs-navigation';
import ProductTab from '@/components/ui/e-commerce/detail/product-tab';
import CategoryTab from '@/components/ui/e-commerce/detail/category-tab';
import RatingTab from '@/components/ui/e-commerce/detail/rating-tab';
import ModalStore from '@/components/ui/e-commerce/detail/modal-store';
import ModalShareLink from '@/components/ui/component-globals/modal-share-link';

// icons
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Star, MapPin, StarIcon, ShoppingBag } from 'lucide-react-native';
import CartIcons from '@/assets/icons/e-commerce/cart-icons';
import BackIcons from '@/assets/icons/global/back-icons';
import AddressIcon from '@/assets/icons/global/address-icon';

const StoreScreen = () => {
  const [activeTab, setActiveTab] = useState('product');
  const [isFollowing, setIsFollowing] = useState(false);
  const [showModalStore, setShowModalStore] = useState(false);
  const [showModalShare, setShowModalShare] = useState(false);

  const tabs = [
    { id: 'product', icon: AddressIcon, label: 'Product' },
    { id: 'category', icon: ShoppingBag, label: 'Category' },
    { id: 'rating', icon: StarIcon, label: 'Rating' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'product':
        return <ProductTab />;
      case 'category':
        return <CategoryTab />;
      case 'rating':
        return <RatingTab />;
      default:
        return <ProductTab />;
    }
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#d7fce8"
        translucent={false}
      />
      <SafeAreaView
        edges={['top', 'bottom', 'left', 'right']}
        className="flex-1 bg-[#d7fce8]"
      >
        <View className="px-5 py-3 pb-4 bg-[#d7fce8] ">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity onPress={() => router.back()}>
              <BackIcons width={24} height={24} />
            </TouchableOpacity>
            <View className="w-[276px] mx-3 relative">
              <InputSearchPrimary
                placeholder="Search on H&L Official"
                className="px-[12px] bg-white border-[#DEDEDE]"
                coloricon="#000"
              />

              {/* Overlay Touchable di atas input */}
              <TouchableOpacity
                onPress={() => router.push('/e-commerce/search')}
                className="absolute inset-0"
                activeOpacity={1}
              />
            </View>
            <View className="flex-row">
              <TouchableOpacity onPress={() => router.push('/e-commerce/cart')}>
                <CartIcons width={28} height={28} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowModalStore(true)}
                className="mr-[9px]"
              >
                <Icon name="more-vert" size={28} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="flex-row px-4 pb-4 bg-[#d7fce8] items-center">
          <Image
            source={require('@/assets/images/trash/image25.png')}
            className="w-[56px] h-[56px] rounded-full"
            resizeMode="cover"
          />

          {/* Info Toko */}
          <View className="ml-4 flex-1">
            {/* Nama Toko */}
            <Text className="text-[16px] font-semibold text-black">
              H&L Official
            </Text>

            {/* Rating & Followers */}
            <View className="flex-row items-center mt-1">
              <Star size={14} color="#F2C94C" fill="#F2C94C" />
              <Text className="ml-1 text-[12px] text-black">4.6</Text>
              <Text className="ml-1 text-[12px] text-[#BCBCBC]">(500)</Text>
              <Text className="ml-2 text-[12px] font-semibold text-black">
                • 2.0k Followers
              </Text>
            </View>

            {/* Status & Lokasi */}
            <View className="flex-row items-center mt-1">
              <Text className="text-[12px] text-[#BCBCBC]">Offline</Text>
              <Text className="mx-1 text-[#BCBCBC]">|</Text>
              <MapPin size={12} color="#BCBCBC" />
              <Text className="ml-1 text-[12px] text-[#BCBCBC]">
                Kota Tangerang
              </Text>
            </View>
          </View>

          {/* Tombol Actions */}
          <View className="mr-4 space-y-2">
            <TouchableOpacity
              onPress={() => setIsFollowing(!isFollowing)}
              className={`my-2 px-7 py-2 rounded-xl w-[105px] justify-center items-center ${
                isFollowing ? ' border border-green-600' : 'bg-green-600'
              }`}
            >
              <Text
                className={`text-[12px] font-semibold text-center ${
                  isFollowing ? 'text-green-600' : 'text-white'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="border bg-white items-center border-[#DEDEDE] px-7 py-2 rounded-xl w-[105px] justify-center">
              <Text className="text-[12px] font-semibold text-black text-center">
                Chat
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tab Navigation */}
        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={tabs}
        />

        {/* Tab Content */}
        {renderTabContent()}

        <ModalStore
          visible={showModalStore}
          onClose={() => setShowModalStore(false)}
          onOpenShare={() => setShowModalShare(true)}
          onOpenReport={() => {
            setShowModalStore(false);
            router.push('/e-commerce/detail/report-store');
          }}
        />
        {/* Modal Share Link */}
        <ModalShareLink
          visible={showModalShare}
          onClose={() => setShowModalShare(false)}
          link="https://tani-pintar.com/store/hl-official"
          title="Share Store"
        />
      </SafeAreaView>
    </>
  );
};

export default StoreScreen;
