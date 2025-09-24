import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import api from '@/utils/api/api';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
//icons
import { Ionicons, Entypo } from '@expo/vector-icons';
import RateIcons from '@/assets/icons/e-commerce/rate-icon';
import ExpressDeliveryIcon from '@/assets/icons/e-commerce/express-delivery-icon';
import DeliveryBoxIcon from '@/assets/icons/e-commerce/delivery-box-icon';
import WalletIcon from '@/assets/icons/e-commerce/wallet-icon';
import HandCoinIcon from '@/assets/icons/e-commerce/hand-coin-icon';
import WalletBalanceIcon from '@/assets/icons/e-commerce/wallet-balance-icon';
import VoucherBalanceIcon from '@/assets/icons/e-commerce/voucher-balance-icon';
import LoveIcons from '@/assets/icons/global/love-icons';
import NotifcationIcons from '@/assets/icons/global/notification-icons';
import BookIcon from '@/assets/icons/profile/book-icons';
import WordIcon from '@/assets/icons/global/word-icon';
import AddressIcon from '@/assets/icons/global/address-icon';
import ChangeUserIcon from '@/assets/icons/e-commerce/change-user-icon';
import TermInfoIcon from '@/assets/icons/e-commerce/term-info-icon';
import PrivacyPolicyIcon from '@/assets/icons/profile/privacy-policy-icon';
import AboutUsIcon from '@/assets/icons/profile/about-icon';
import SettingProfileIcon from '@/assets/icons/profile/setting-profile-icon';
//components
import ChangeUserModal from '@/components/ui/profile/modal-change-user';

type ProfileResponse = {
  full_name: string;
  email: string;
  profile_picture_url?: string;
};

const fetchProfileById = async (): Promise<ProfileResponse> => {
  const res = await api.get('/accounts/profile');
  return res.data;
};

const ProfileScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const {
    data: dataProfile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfileById,
  });
  if (!dataProfile) return null;

  return (
    <View>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView className=" bg-[#5AD598] flex-1" edges={['top']}>
          {/* Header */}
          <View className="bg-[#5AD598] pb-6 px-5 mt-8">
            <View className="flex-row items-center">
              <Image
                source={
                  profileImage
                    ? { uri: profileImage }
                    : dataProfile?.profile_picture_url
                      ? { uri: dataProfile.profile_picture_url }
                      : require('@/assets/images/profile-default.png')
                }
                className="w-16 h-16 rounded-full mr-4"
              />
              <View>
                <Text className="text-white text-lg font-bold">
                  {dataProfile?.full_name ?? 'Guest'}
                </Text>
                <Text className="text-white text-sm">{dataProfile?.email}</Text>
              </View>
              <TouchableOpacity
                className="ml-auto"
                onPress={() => router.push('/profile/edit-profile')}
              >
                <SettingProfileIcon width={24} height={24} />
              </TouchableOpacity>
            </View>
          </View>

          <View
            className="px-5 py-4  bg-white "
            style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
          >
            <Text className="text-[14px] font-semibold mb-5 text-[#525252]">
              Transactions
            </Text>
            <View className="flex-row justify-between px-10">
              <TouchableOpacity
                onPress={() => router.push('/profile/order/order?tab=Pay')}
                className="items-center  min-h-[64px]"
              >
                <WalletIcon width={24} height={24} />
                <Text className="text-[14px] font-medium mt-2 text-center text-[#525252]">
                  Pay
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  router.push('/profile/order/order?tab=Processing')
                }
                className="items-center min-h-[64px]"
              >
                <DeliveryBoxIcon width={24} height={24} />
                <Text className="text-[14px] font-medium mt-2 text-center text-[#525252]">
                  Process
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push('/profile/order/order?tab=Shipped')}
                className="items-center  min-h-[64px]"
              >
                <ExpressDeliveryIcon width={32} height={32} />
                <Text className="text-[14px] font-medium text-center text-[#525252]">
                  Sent
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="items-center  min-h-[64px]">
                <RateIcons width={24} height={24} />
                <Text className="text-[14px] font-medium mt-2 text-center text-[#525252]">
                  Rate
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="bg-[#fbfbfb]">
            {/* Balance & Vouchers */}
            <View className="flex-row justify-around py-4 my-3 bg-white ">
              <TouchableOpacity className="items-center">
                <HandCoinIcon width={24} height={24} />
                <Text className="text-xs text-[#3A9B7A] font-semibold mt-1">
                  Activate Now
                </Text>
                <Text className="text-xs mt-1">TaniPinjam</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push('/profile/voucer/voucer')}
                className="items-center"
                style={{
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderColor: '#E0E0E0',
                  paddingHorizontal: 40,
                }}
              >
                <VoucherBalanceIcon width={24} height={24} />
                <Text className="text-xs font-semibold">Voucher</Text>
                <Text className="text-xs mt-1">10+Voucher</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push('/payment/payment')}
                className="items-center"
              >
                <WalletBalanceIcon width={24} height={24} />
                <Text className="text-xs text-[#3A9B7A] font-semibold mt-1">
                  Activate Now
                </Text>
                <Text className="text-xs mt-1">TaniPay</Text>
              </TouchableOpacity>
            </View>

            {/* Account Section */}
            <View className="px-5 py-3 bg-white">
              <Text className="text-[14px] font-semibold mb-3 text-[#6F6F6F]">
                Account
              </Text>
              <TouchableOpacity
                onPress={() => router.push('/profile/address/address')}
                className="flex-row items-center justify-between py-3 border-b border-gray-200"
              >
                <View className="flex-row items-center">
                  <AddressIcon width={20} height={20} />
                  <Text className="ml-3 text-sm">Address</Text>
                </View>
                <Entypo name="chevron-right" size={20} color="#6F6F6F" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  router.push('/profile/language');
                }}
                className="flex-row items-center justify-between py-3 border-b border-gray-200"
              >
                <View className="flex-row items-center">
                  <WordIcon width={20} height={20} />
                  <Text className="ml-3 text-sm">Laguage</Text>
                </View>
                <Entypo name="chevron-right" size={20} color="#6F6F6F" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push('/profile/news')}
                className="flex-row items-center justify-between py-3 border-b border-gray-200"
              >
                <View className="flex-row items-center">
                  <BookIcon width={20} height={20} />
                  <Text className="ml-3 text-sm">News</Text>
                </View>
                <Entypo name="chevron-right" size={20} color="#6F6F6F" />
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
                <View className="flex-row items-center">
                  <NotifcationIcons width={20} height={20} color="#6F6F6F" />
                  <Text className="ml-3 text-sm">Notification</Text>
                </View>
                <Entypo name="chevron-right" size={20} color="#6F6F6F" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push('/e-commerce/wishlist')}
                className="flex-row items-center justify-between py-3 "
              >
                <View className="flex-row items-center">
                  <LoveIcons width={20} height={20} color="#6F6F6F" />
                  <Text className="ml-3 text-sm">wishlist</Text>
                </View>
                <Entypo name="chevron-right" size={20} color="#6F6F6F" />
              </TouchableOpacity>
            </View>

            {/* Appearance Section */}
            <View className="px-5 py-3 bg-white my-3">
              <Text className="text-[14px] font-semibold mb-3 text-[#6F6F6F]">
                Appearance
              </Text>
              <TouchableOpacity
                onPress={() => router.push('/profile/mode-view')}
                className="flex-row items-center justify-between py-3"
              >
                <View className="flex-row items-center">
                  <Ionicons name="sunny-outline" size={20} color="#5A5A5A" />
                  <Text className="ml-3 text-sm">Mode View</Text>
                </View>
                <Entypo name="chevron-right" size={20} color="#6F6F6F" />
              </TouchableOpacity>
            </View>

            {/* Users */}
            <View className="px-5 py-3 mb-3 bg-white">
              <Text className="text-[14px] font-semibold mb-3 text-[#6F6F6F]">
                Users
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className="flex-row items-center justify-between py-3"
              >
                <View className="flex-row items-center">
                  <ChangeUserIcon width={20} height={20} />
                  <Text className="ml-3 text-sm">Change User</Text>
                </View>
                <Entypo name="chevron-right" size={20} color="#6F6F6F" />
              </TouchableOpacity>
            </View>

            {/* Other */}
            <View className="px-5 py-4 bg-white">
              <Text className="text-[14px] font-semibold mb-3 text-[#6F6F6F]">
                Other
              </Text>
              <TouchableOpacity
                onPress={() => router.push('/profile/other/term-condition')}
                className="flex-row items-center justify-between pt-3 pb-4 border-b border-gray-200"
              >
                <View className="flex-row items-center">
                  <TermInfoIcon width={20} height={20} />
                  <Text className="ml-3 text-sm">Terms and Conditions</Text>
                </View>
                <Entypo name="chevron-right" size={20} color="#6F6F6F" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push('/profile/other/privacy-policy')}
                className="flex-row items-center justify-between py-4 border-b border-gray-200"
              >
                <View className="flex-row items-center">
                  <PrivacyPolicyIcon width={20} height={20} />
                  <Text className="ml-3 text-sm">Privacy Policy</Text>
                </View>
                <Entypo name="chevron-right" size={20} color="#6F6F6F" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push('/profile/other/about-us')}
                className="flex-row items-center justify-between py-4"
              >
                <View className="flex-row items-center">
                  <AboutUsIcon width={20} height={20} />
                  <Text className="ml-3 text-sm">About Us</Text>
                </View>
                <Entypo name="chevron-right" size={20} color="#6F6F6F" />
              </TouchableOpacity>
            </View>
          </View>

          <ChangeUserModal
            visible={isModalVisible}
            onClose={() => setModalVisible(false)}
          />
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
