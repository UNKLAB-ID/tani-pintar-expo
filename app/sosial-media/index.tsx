import MessageIcons from '@/assets/icons/global/message-icons';
import NotifcationIcons from '@/assets/icons/global/notification-icons';
import ButtonPlusIcons from '@/assets/icons/sosial-media/button-plus-icons';
import InputSearchPrimary from '@/components/ui/component-globals/input-seach-primary';
import CardSosialMedia from '@/components/ui/sosial-media/card-sosial-media';
import { useProfile } from '@/hooks/useProfile';
import api from '@/utils/api/api';
import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  FlatList,
} from 'react-native';

const SosialMediaIndex = () => {
  const [dataPosts, setDataPosts] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const { data: profile, isLoading: loading, isError } = useProfile();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 11) return 'Good Morning';
    if (hour >= 11 && hour < 15) return 'Good Afternoon';
    if (hour >= 15 && hour < 18) return 'Good Evening';
    return 'Good Night';
  };

  const fetchPostsList = async () => {
    const response = await api.get('/social-media/posts/');
    return response.data;
  };

  const {
    data: postsList,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['postsList'],
    queryFn: fetchPostsList,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setDataPosts(postsList?.results || []);
  }, [postsList]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch(); // 🚀 pakai react-query
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" translucent={false} />

      {/* HEADER: Absolute dan tetap di atas */}
      <View
        className="bg-white px-5 py-4"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10, // pastikan di atas list
          elevation: 10, // untuk Android
        }}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() =>
                router.push('/sosial-media/profile-sosial-media?query=profile')
              }
            >
              <Image
                source={profile?.profile_picture_url ? {
                  uri: profile.profile_picture_url
                }:require('../../assets/images/profile-default.png')}
                className="w-[40px] h-[40px] rounded-full"
                style={{marginLeft:-6}}
              />
            </TouchableOpacity>
            <View className="ml-3">
              <Text className="text-[12px] text-text-secondary">
                {getGreeting()},
              </Text>
              <Text className="text-[16px] font-semibold text-text-primary">
                {profile?.full_name}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between" style={{marginRight:-1}}>
            <TouchableOpacity className="rounded-full bg-primary h-[32px] w-[32px] items-center justify-center">
              <MessageIcons width={18} height={18} color={'#fff'} />
            </TouchableOpacity>
            <TouchableOpacity className="rounded-full bg-primary h-[32px] w-[32px] items-center justify-center ml-2">
              <NotifcationIcons width={18} height={18} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search & Create */}
        <View className="flex-row items-center justify-between mt-3">
          <View className="w-[302px]">
            <InputSearchPrimary
              coloricon="#000"
              placeholder="Find what you’re looking for..."
              className="px-[12px] h-[39px]"
            />
          </View>
          <TouchableOpacity
            onPress={() => router.push('/sosial-media/create-post-media')}
          >
            <ButtonPlusIcons />
          </TouchableOpacity>
        </View>
      </View>

      {/* FLATLIST */}
      <FlatList
        data={dataPosts}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item, index }) => (
          <CardSosialMedia
            data={[item]}
            setData={updated => {
              const newList = [...dataPosts];
              newList[index] = updated[0];
              setDataPosts(newList);
            }}
          />
        )}
        // Beri padding atas sesuai tinggi header
        contentContainerStyle={{ paddingTop: 120, paddingBottom: 5 }}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={10}
        removeClippedSubviews
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
};

export default SosialMediaIndex;
