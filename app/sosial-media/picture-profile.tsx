import BackIcons from '@/assets/icons/global/back-icons';
import EditBgImagesSosialMediaIcons from '@/assets/icons/sosial-media/edit-bg-images-profile-sosial-media-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const PictureProfile = () => {
  const [image, setImage] = useState<any>();
  const [modalEdit, setModalEdit] = useState<boolean>(false);

  return (
    <View style={{ backgroundColor: '#000', height: '100%' }}>
      <View
        className="px-4 flex-row items-center justify-between"
        style={{ marginTop: 50 }}
      >
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() =>
              router.replace('/sosial-media/profile-sosial-media?query=profile')
            }
          >
            <BackIcons size={20} color="#fff" />
          </TouchableOpacity>
          <Text
            className="text-white font-semibold ml-2"
            style={{ fontSize: 16 }}
          >
            Profile Photo
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setModalEdit(true)}
          className="lex-row items-center justify-center pt-3"
        >
          <EditBgImagesSosialMediaIcons width={20} height={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <View
        className="flex-row justify-center items-center"
        style={{ height: 750 }}
      >
        <Image
          source={require('../../assets/images/profile-default.png')}
          style={{
            width: '100%',
          }}
        />
      </View>
    </View>
  );
};

export default PictureProfile;
