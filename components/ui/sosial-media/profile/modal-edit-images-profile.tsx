import CloseIcons from '@/assets/icons/global/close-icons';
import DeleteIcons from '@/assets/icons/global/delete-icons';
import CameraIcons from '@/assets/icons/sosial-media/camera-icons';
import GarisHorizotal from '@/assets/icons/sosial-media/garis-horizontal-icons';
import PictureIcons from '@/assets/icons/sosial-media/picture-icons';
import React from 'react';
import { Alert, Modal, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams } from 'expo-router';
import { useMediaSosial } from '@/store/sosial-media/sosial-media';

interface ModalEditImagesProfileProps {
  modalImagesProfile: boolean;
  setModalImagesProfile: (visible: boolean) => void;
}

const ModalEditImagesProfile: React.FC<ModalEditImagesProfileProps> = ({
  modalImagesProfile,
  setModalImagesProfile,
}) => {
  const { type } = useLocalSearchParams();
  const { setProfileImage } = useMediaSosial();

  const handleDelete = () => {
    setProfileImage?.(null);
    setModalImagesProfile(false);
  };

  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission required',
        'Please grant access to your gallery.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: type === 'backgroundImages' ? [3, 1] : [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage?.(result.assets[0]);
      setModalImagesProfile(false);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission required',
        'Please grant camera access to continue.'
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: type === 'backgroundImages' ? [3, 1] : [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage?.(result.assets[0]); // karena kamu hanya ambil satu gambar
      setModalImagesProfile(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalImagesProfile}
      statusBarTranslucent={true}
      onRequestClose={() => {
        setModalImagesProfile(false);
        setProfileImage(null);
      }}
    >
      {/* Background hitam transparan */}
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'flex-end',
        }}
        activeOpacity={1}
        onPressOut={() => {
          setModalImagesProfile(false);
          setProfileImage?.(null);
        }}
      />

      {/* Konten modal */}
      <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingHorizontal: 16,
            paddingVertical: 20,
            height: 290,
          }}
        >
          {/* Garis horizontal */}
          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <GarisHorizotal width={86} height={6} />
          </View>

          {/* Tombol Close dan Judul */}
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => {
                setModalImagesProfile(false);
                setProfileImage(null);
              }}
              className="flex-row items-center justify-center"
              style={{ width: 25, height: 25, marginEnd: 12 }}
            >
              <CloseIcons width={15} height={15} />
            </TouchableOpacity>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              Edit Profile Photo
            </Text>
          </View>

          {/* Spasi */}
          <View style={{ height: 30 }} />

          {/* Tombol "Take a photo" */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={takePhoto}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 4,
                backgroundColor: '#F4F4F4',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CameraIcons width={24} height={24} color="#525252" />
            </View>
            <Text style={{ fontSize: 14, color: '#525252', marginLeft: 12 }}>
              Take a photo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 12,
            }}
            onPress={pickImages}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 4,
                backgroundColor: '#F4F4F4',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PictureIcons width={24} height={24} color="#525252" />
            </View>
            <Text style={{ fontSize: 14, color: '#525252', marginLeft: 12 }}>
              Upload from gallery
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={handleDelete}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 4,
                backgroundColor: '#F4F4F4',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <DeleteIcons width={20} height={24} />
            </View>
            <Text style={{ fontSize: 14, color: '#525252', marginLeft: 12 }}>
              Delete profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalEditImagesProfile;
