import BackIcons from '@/assets/icons/global/back-icons';
import PointThreeHorizontal from '@/assets/icons/global/point-three-horizontal';
import EditBgImagesSosialMediaIcons from '@/assets/icons/sosial-media/edit-bg-images-profile-sosial-media-icons';
import MenuProfileIcons from '@/assets/icons/sosial-media/menu-profile-icons';
import PointIcons from '@/assets/icons/sosial-media/point-icons';
import CustomButton from '@/components/ui/component-globals/button-primary';
import CustomButtonSecundary from '@/components/ui/component-globals/button-secundary';
import InputSearchPrimary from '@/components/ui/component-globals/input-seach-primary';
import CardSosialMedia from '@/components/ui/sosial-media/card-sosial-media';
import api from '@/utils/api/api';
import { useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  View,
  TouchableOpacity,
  StatusBar,
  Text,
  ScrollView,
} from 'react-native';

const ProfileSosialMedia = () => {
  const [dataPosts, setDataPosts] = useState<any[]>([]);
  const { query } = useLocalSearchParams();

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

  return (
    <SafeAreaView
      className="mt-12"
      style={{ backgroundColor: '#f7f7f7', flex: 1 }}
    >
      <StatusBar barStyle="dark-content" translucent={false} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Bagian header */}
        <View
          className="px-4 flex-row items-center justify-between"
          style={{ backgroundColor: '#fff' }}
        >
          <TouchableOpacity onPress={() => router.replace('/(tabs)/sosmed')}>
            <BackIcons size={20} />
          </TouchableOpacity>
          <View className="w-[302px]">
            <InputSearchPrimary
              coloricon="#000"
              placeholder="Find what you’re looking for..."
              className="px-[12px] h-[39px]"
              disable={false}
            />
          </View>
          <MenuProfileIcons width={25} height={25} />
        </View>

        {/* Background dan Foto Profil */}
        <View className="pt-3 w-full relative bg-white">
          <Image
            source={require('../../assets/images/trash/bg-profile.png')}
            style={{ height: 130, width: '100%' }}
          />
          <View
            style={{
              position: 'absolute',
              top: 90,
              left: 0,
              right: 0,
              alignItems: 'center',
              zIndex: 10,
            }}
          >
            <Image
              source={require('../../assets/images/trash/image18.png')}
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,
              }}
            />
          </View>
          {query && (
            <TouchableOpacity
              className="bg-white rounded-full flex-row items-center justify-center"
              style={{
                width: 36,
                height: 36,
                position: 'absolute',
                top: 2,
                right: 30,
                zIndex: 20,
                transform: [{ translateX: 18 }, { translateY: 18 }],
              }}
            >
              <EditBgImagesSosialMediaIcons
                width={16}
                height={16}
                color={'#127A42'}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Info user */}
        <View style={{ paddingTop: 55, backgroundColor: '#fff' }}>
          <Text className="text-center font-semibold" style={{ fontSize: 18 }}>
            Mambaus Baus
          </Text>
          <View className="flex-row justify-center items-center my-2">
            <Text className="text-primary font-semibold mr-2">
              150 followers
            </Text>
            <PointIcons width={4} height={4} />
            <Text className="text-primary font-semibold ml-2">
              50 following
            </Text>
          </View>
          <Text className="text-center">
            Surabaya - Jakarta✨ | Petani Indonesia
          </Text>
          <Text className="text-center mt-2" style={{ color: '#1F1F1F' }}>
            Komunitas Pertanian Surabaya
          </Text>
          <Text className="text-center" style={{ color: '#AAAAAA' }}>
            Surabaya, Indonesia
          </Text>
        </View>

        {/* Button dan About */}
        <View className="px-4 py-4 flex-row justify-between items-center bg-white">
          {query ? (
            <View style={{ width: 310 }}>
              <CustomButton
                title="Edit profile"
                onPress={() => console.log('tes')}
                className="py-[9px]"
              />
            </View>
          ) : (
            <View
              style={{ width: 310 }}
              className="flex-row justify-between items-center"
            >
              <View style={{ width: 149 }}>
                <CustomButton
                  title="Follow"
                  onPress={() => console.log('tes')}
                  className="py-[9px]"
                />
              </View>
              <View style={{ width: 149 }}>
                <CustomButtonSecundary
                  title="Message"
                  onPress={() => console.log('tes')}
                  className="py-[9px]"
                />
              </View>
            </View>
          )}
          <TouchableOpacity
            className="border rounded-full flex-row items-center justify-center"
            style={{ width: 39, height: 39, borderColor: '#525252' }}
          >
            <PointThreeHorizontal width={24} height={24} />
          </TouchableOpacity>
        </View>

        <View className="px-4 py-3 bg-white my-2">
          <View className="flex-row items-center justify-between mb-3">
            <Text
              className="font-semibold"
              style={{ fontSize: 16, color: '#1F1F1F' }}
            >
              About
            </Text>
            {query && (
              <TouchableOpacity className="flex-row items-center justify-center">
                <EditBgImagesSosialMediaIcons
                  width={16}
                  height={16}
                  color={'#525252'}
                />
              </TouchableOpacity>
            )}
          </View>
          <Text style={{ fontSize: 14, color: '#525252' }}>
            saya adalah petani yang sudah berkecimplung selama 11 tahun dan saya
            senang dengan pekerjaan saya ini. Semoga pertanian di Indonesia
            semakin maju dan berkembang. gasken bos!!
          </Text>
        </View>

        {/* List Posts */}
        <View style={{ paddingBottom: 50 }}>
          {dataPosts.map((item, index) => (
            <CardSosialMedia
              key={`${item.id}-${index}`}
              data={[item]}
              setData={updated => {
                const newList = [...dataPosts];
                newList[index] = updated[0];
                setDataPosts(newList);
              }}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileSosialMedia;
