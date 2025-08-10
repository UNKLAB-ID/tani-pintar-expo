import BackIcons from '@/assets/icons/global/back-icons';
import PoinVertialIcons from '@/assets/icons/sosial-media/poin-vertical-icons';
import CustomButton from '@/components/ui/component-globals/button-primary';
import CustomButtonSecundary from '@/components/ui/component-globals/button-secundary';
import InputSearchPrimary from '@/components/ui/component-globals/input-seach-primary';
import api from '@/utils/api/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FollowScreen = () => {
  const [search, setSearch] = useState<string>('');
  const insets = useSafeAreaInsets();
  const { type_follow, user_id } = useLocalSearchParams();

  const feactFollow = async () => {
    let response;

    if (type_follow === 'Followers') {
      response = await api.get(`/accounts/users/${user_id}/followers/`);
    } else {
      response = await api.get(`/accounts/users/${user_id}/following/`);
    }

    return response;
  };

  const { data, refetch, error, isLoading } = useQuery({
    queryKey: ['follow_list', search],
    queryFn: feactFollow,
    refetchOnWindowFocus: true,
  });

  const mutationFollowBack = useMutation({
    mutationFn: async (data: { user_id: number }) => {
      const res = await api.post(`/accounts/users/${data.user_id}/follow/`);
      return res;
    },

    onSuccess(data) {
      if (data.success) {
        refetch();
      } else if (data.error) {
        Alert.alert('Gagal', data.error || 'Tidak dapat mengikuti pengguna.');
      }
    },

    onError: (error: any) => {
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        'Terjadi kesalahan saat mencoba mengikuti pengguna. Silakan coba lagi nanti.';

      Alert.alert('Terjadi Kesalahan', errorMsg);
    },
  });

  console.log(data?.data.results);

  return (
    <SafeAreaView
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
      <View
        className="flex-row items-center px-4 py-4"
        style={{
          borderBottomColor: '#D3D3D3',
          borderBottomWidth: 1,
          backgroundColor: '#fff',
        }}
      >
        <TouchableOpacity className="mr-3" onPress={() => router.back()}>
          <BackIcons size={20} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: '600', color: '#1F1F1F' }}>
          {type_follow}
        </Text>
      </View>
      <View className="px-4 py-4">
        <InputSearchPrimary
          coloricon="#000"
          className="px-[12px] h-[39px]"
          onChangeText={setSearch}
        />
      </View>
      <ScrollView className="px-4">
        <Text style={{ fontSize: 16, fontWeight: 600 }}>All {type_follow}</Text>
        {data?.data.results.map((item: any, index: number) => (
          <View
            key={index}
            className="flex-row items-center justify-between py-3"
          >
            <View className="flex-row items-center">
              <Image
                source={
                  item.profile_picture_url
                    ? {
                        uri: item.profile_picture_url,
                      }
                    : require('../../assets/images/profile-default.png')
                }
                className="w-[40px] h-[40px] rounded-full"
                style={{ marginLeft: -6 }}
              />
              <View className="ml-2">
                <Text style={{ fontSize: 16, fontWeight: 600 }}>
                  {item.full_name}
                </Text>
                <Text style={{ fontSize: 12, color: '#525252' }}>
                  {item.farmer_community}
                </Text>
              </View>
            </View>
            <View
              className="flex-row items-center"
              style={{ alignItems: 'center' }}
            >
              {item.is_followed_by_me ? (
                <View
                  style={{
                    width: 118,
                    marginRight: 15,
                    justifyContent: 'center',
                  }}
                >
                  <CustomButtonSecundary
                    title="Message"
                    onPress={() => console.log('tes')}
                    className="py-[7px]"
                    color="#000"
                  />
                </View>
              ) : (
                <View
                  style={{
                    width: 118,
                    marginRight: 15,
                    justifyContent: 'center',
                  }}
                >
                  <CustomButton
                    title="Follow back"
                    onPress={() =>
                      mutationFollowBack.mutate({ user_id: item.user.id })
                    }
                    className="py-[7px]"
                  />
                </View>
              )}
              <TouchableOpacity>
                <PoinVertialIcons width={23} height={23} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FollowScreen;
