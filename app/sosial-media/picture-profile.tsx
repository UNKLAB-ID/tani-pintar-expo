import * as ImageManipulator from 'expo-image-manipulator';
import {
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BackIcons from '@/assets/icons/global/back-icons';
import EditBgImagesSosialMediaIcons from '@/assets/icons/sosial-media/edit-bg-images-profile-sosial-media-icons';
import RotasiImagesProfileIcons from '@/assets/icons/sosial-media/rotasi-images-profile-icons';
import ModalEditImagesProfile from '@/components/ui/sosial-media/profile/modal-edit-images-profile';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMediaSosial } from '@/store/sosial-media/sosial-media';
import ModalCancel from '@/components/ui/sosial-media/modal-cancel';

const PictureProfile = () => {
  const [modalImagesProfile, setModalImagesProfile] = useState<boolean>(false);
  const [showDiscardModal, setShowDiscardModal] = useState<boolean>(false);
  const { profileImage, setProfileImage } = useMediaSosial();
  const { type } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const handleDone = () => {
    console.log('Done button pressed');
  };

  const handleRotateAndSave = async () => {
    if (!profileImage?.uri) return;

    const rotated = await ImageManipulator.manipulateAsync(
      profileImage.uri,
      [{ rotate: 90 }],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
    );

    setProfileImage(rotated); // Simpan hasil rotate baru
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#000',
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <View
        className="px-4 flex-row items-center justify-between"
        style={{ marginTop: 20 }} // Tambahan untuk status bar spacing
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
          onPress={() => setModalImagesProfile(true)}
          className="flex-row items-center justify-center pt-3"
        >
          <EditBgImagesSosialMediaIcons width={20} height={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View
        className="flex-row justify-center items-center"
        style={{ flex: 1 }}
      >
        {profileImage?.uri ? (
          <Image
            source={{ uri: profileImage.uri }}
            style={{
              width: '100%',
              height: 400,
            }}
            resizeMode="contain"
            onError={e => console.log('Image failed to load:', e.nativeEvent)}
          />
        ) : (
          <Image
            source={require('@/assets/images/profile-default.png')}
            style={{
              width: '100%',
              height: 400,
            }}
            resizeMode="contain"
          />
        )}
      </View>

      <View
        className="flex-row items-center justify-between py-3"
        style={{ paddingBottom: 20, paddingHorizontal: 30 }}
      >
        <TouchableOpacity onPress={() => setShowDiscardModal(true)}>
          <Text style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>
            Cancel
          </Text>
        </TouchableOpacity>
        {
          type !== 'backgroundImages' && (
            <TouchableOpacity
              onPress={handleRotateAndSave}
              className="flex-row items-center"
            >
              <RotasiImagesProfileIcons width={26} height={26} />
            </TouchableOpacity>
          )
        }
        <TouchableOpacity>
          <Text style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>
            Done
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal Cancel Images Profile */}
      {showDiscardModal && (
        <ModalCancel
          setShowDiscardModal={setShowDiscardModal}
          desciption='You have unsaved changes. Do you want to discard them?'
          headerDescription=''
          textButtonLeft='Discard'
          textButtonRight='Cancel'
          path={"/sosial-media/profile-sosial-media?query=profile"}
        />
      )}

      {/* Modal Edit Images Profile */}
      {modalImagesProfile && (
        <ModalEditImagesProfile
          modalImagesProfile={modalImagesProfile}
          setModalImagesProfile={setModalImagesProfile}
        />
      )}
    </SafeAreaView>
  );
};

export default PictureProfile;
