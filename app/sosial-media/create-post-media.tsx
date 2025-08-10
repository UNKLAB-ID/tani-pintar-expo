import CloseIcons from '@/assets/icons/global/close-icons';
import CameraIcons from '@/assets/icons/sosial-media/camera-icons';
import DownArrowDirectionIcons from '@/assets/icons/sosial-media/down-arrow-direction-icons';
import FriendsIcons from '@/assets/icons/sosial-media/friends-icons';
import GifIcons from '@/assets/icons/sosial-media/gif-icons';
import PictureIcons from '@/assets/icons/sosial-media/picture-icons';
import TagPeopleIcons from '@/assets/icons/sosial-media/tag-people-icons';
import ButtonPostMedia from '@/components/ui/sosial-media/button-post-media';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ModalAudiencePost from '@/components/ui/sosial-media/modal-audience-post';
import { useMutation, useQuery } from '@tanstack/react-query';
import api from '@/utils/api/api';
import { useProfile } from '@/hooks/useProfile';
import ModalCancel from '@/components/ui/sosial-media/modal-cancel';

const CreatePostMedia = () => {
  const [textInput, setTextInput] = useState<string>('');
  const [textAdience, setTextAudience] = useState<string>('public');
  const [modalAudience, setModalAudience] = useState<boolean>(false);
  const [modalCancel, setModalCancel] = useState<boolean>(false);
  const [images, setImages] = useState<any[]>([]);
  const [existingImages, setExistingImages] = useState<any[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);
  const { typePost, idPost } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const { data: profile, isLoading, isError } = useProfile();

  const pickImages = async (setImages: (images: any[]) => void) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages(result.assets);
    }
  };

  const feactDataPostDetail = async () => {
    const response = await api.get(`/social-media/posts/${idPost}`);
    console.log('📦 Response API detail:', response);
    return response.data;
  };

  const {
    data: dataPostDetail,
    refetch,
    isLoading: loadingDataPostDetail,
  } = useQuery({
    queryKey: ['dataPostDetail', idPost],
    queryFn: feactDataPostDetail,
    refetchOnWindowFocus: false,
    enabled: !!idPost,
  });

  useEffect(() => {
    if (dataPostDetail) {
      console.log(dataPostDetail);
      setTextInput(String(dataPostDetail.content));
      setTextAudience(String(dataPostDetail.privacy));
      setExistingImages(dataPostDetail.images ?? []);
    }
  }, [dataPostDetail]);

  const handleRemoveImage = (indexToRemove: number) => {
    setImages(prevImages =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleRemoveExistingImage = (idToRemove: number) => {
    setDeletedImageIds(prev => [...prev, idToRemove]);
    setExistingImages(prev => prev.filter(image => image.id !== idToRemove));
  };

  const takePhoto = async (setImages: (images: any[]) => void) => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Camera permission is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImages(result.assets); // langsung replace isi images
    }
  };

  const mutation = useMutation({
    mutationFn: async () => {
      try {
        const formData = new FormData();
        formData.append('content', textInput);
        formData.append('privacy', textAdience);

        images.forEach((image, index) => {
          const uriParts = image.uri.split('.');
          const fileType = uriParts[uriParts.length - 1];

          formData.append('images', {
            uri: image.uri,
            name: `image_${index}.${fileType}`,
            type: `image/${fileType}`,
          } as any);
        });

        if (deletedImageIds.length > 0) {
          deletedImageIds.forEach(id => {
            formData.append('delete_image_ids', String(id));
          });
        }

        let res;
        if (idPost) {
          res = await api.patch(`/social-media/posts/${idPost}/`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } else {
          res = await api.post('/social-media/posts/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        }

        console.log(res);
        return res;
      } catch (err) {
        throw err;
      }
    },

    onSuccess: res => {
      if (res.success) {
        router.replace(`/(tabs)/sosmed`);
      } else if (res?.error) {
        Alert.alert(
          'Gagal Posting',
          res.error || 'Terjadi kesalahan pada server'
        );
      }
    },

    onError: (error: any) => {
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        'Terjadi kesalahan saat mengirim postingan';

      Alert.alert('Error', errorMsg);
    },
  });

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <StatusBar
        barStyle="dark-content"
        translucent={false}
        backgroundColor="#fff"
      />
      <View className="flex-1 justify-between">
        {/* Scrollable Area */}
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 4,
            paddingBottom: 16,
          }}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <TouchableOpacity
                className="me-2 w-[24px] h-[24px] justify-center items-center"
                onPress={() => {
                  if (typePost === 'update') {
                    setModalCancel(true);
                  } else {
                    router.back();
                  }
                }}
              >
                <CloseIcons width={15} height={15} color="#1F1F1F" />
              </TouchableOpacity>
              <Text className="font-bold text-[16px]">
                {typePost === 'update' ? 'Update' : 'Creating'} a Post
              </Text>
            </View>
            <TouchableOpacity
              style={{
                height: 36,
                width: 65,
                backgroundColor:
                  textInput?.trim()?.length > 0 || images?.length > 0
                    ? '#D7FCE8'
                    : '#F4F4F4',
                borderRadius: 16,
              }}
              onPress={() => mutation.mutate()}
              disabled={!(textInput?.trim()?.length > 0 || images?.length > 0)}
              className="justify-center items-center"
            >
              <Text
                className="font-semibold text-[14px]"
                style={{
                  color:
                    textInput?.trim()?.length > 0 || images?.length > 0
                      ? '#169953'
                      : '#C8C8C8',
                }}
              >
                Post
              </Text>
            </TouchableOpacity>
          </View>

          {/* Profile */}
          <View className="py-3 flex-row items-center">
            <Image
              source={
                profile?.profile_picture_url
                  ? { uri: profile.profile_picture_url }
                  : require('../../assets/images/profile-default.png')
              }
              className="w-[48px] h-[48px] rounded-full"
            />
            <View className="ml-2">
              <Text className="font-semibold text-[14px]">
                {profile?.full_name}
              </Text>
              <TouchableOpacity
                onPress={() => setModalAudience(true)}
                className="flex-row justify-between items-center bg-[#D7FCE8] px-2 mt-1"
                style={{ width: 95, height: 25, borderRadius: 6 }}
              >
                <FriendsIcons width={12} height={12} />
                <Text className="text-primary font-semibold text-[12px]">
                  {textAdience}
                </Text>
                <DownArrowDirectionIcons width={10} height={7} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Text Input */}
          <View>
            <TextInput
              value={textInput}
              onChangeText={text => setTextInput(text)}
              placeholder="Write an exciting story today..."
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              className="text-[16px] text-black"
              style={{
                height:
                  images.length !== 0 || existingImages.length !== 0
                    ? 140
                    : 420,
                padding: 10,
              }}
            />
          </View>

          {(existingImages.length > 0 || images.length > 0) && (
            <ScrollView horizontal className="my-3">
              {/* Gambar dari backend */}
              {existingImages.map((img: any, index: number) => (
                <View
                  key={`existing-${img.id}-${index}`}
                  style={{
                    width: 303,
                    height: 309,
                    position: 'relative',
                    marginRight: 8,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => handleRemoveExistingImage(img.id)}
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: '#1F1F1FCC',
                      width: 25,
                      height: 25,
                      zIndex: 1,
                    }}
                    className="justify-center items-center rounded-full"
                  >
                    <CloseIcons width={15} height={15} color="#fff" />
                  </TouchableOpacity>
                  <Image
                    source={{ uri: img.image }}
                    style={{
                      width: 303,
                      height: 309,
                      borderRadius: 8,
                    }}
                  />
                </View>
              ))}

              {/* Gambar dari ImagePicker */}
              {images.map((img: any, index: number) => (
                <View
                  key={`new-${index}`}
                  style={{
                    width: 303,
                    height: 309,
                    position: 'relative',
                    marginRight: 8,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => handleRemoveImage(index)}
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: '#1F1F1FCC',
                      width: 25,
                      height: 25,
                      zIndex: 1,
                    }}
                    className="justify-center items-center rounded-full"
                  >
                    <CloseIcons width={15} height={15} color="#fff" />
                  </TouchableOpacity>
                  <Image
                    source={{ uri: img.uri }}
                    style={{
                      width: 303,
                      height: 309,
                      borderRadius: 8,
                    }}
                  />
                </View>
              ))}
            </ScrollView>
          )}
        </ScrollView>

        {/* Bottom Section */}
        <View
          style={{
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 10,
          }}
          className="px-4 py-5"
        >
          <Text className="font-semibold text-[16px] mb-5">
            Add to your post
          </Text>
          <View className="flex-row items-center justify-between">
            <ButtonPostMedia
              icon={<PictureIcons width={24} height={24} />}
              label="Photo / Video"
              onPress={() => pickImages(setImages)}
            />
            <ButtonPostMedia
              icon={<CameraIcons width={24} height={24} />}
              label="Camera"
              onPress={() => takePhoto(setImages)}
            />
          </View>
          <View className="flex-row items-center justify-between mt-4">
            <ButtonPostMedia
              icon={<TagPeopleIcons width={24} height={24} />}
              label="Tag people"
            />
            <ButtonPostMedia
              icon={<GifIcons width={28.25} height={28} />}
              label="GIF"
            />
          </View>
        </View>
      </View>

      {modalAudience && (
        <ModalAudiencePost
          modalAudience={modalAudience}
          setModalAudience={setModalAudience}
          setTextAudience={setTextAudience}
          textAudience={textAdience}
        />
      )}

      {modalCancel && (
        <ModalCancel
          setShowDiscardModal={setModalCancel}
          headerDescription="Discard edit"
          desciption="Wait! Your edits aren’t saved yet. Leaving now will discard all your changes—are you sure you want to continue?"
          textButtonLeft="Discard"
          textButtonRight="No, thanks"
          path="/sosial-media/profile-sosial-media?query=profile"
        />
      )}
    </SafeAreaView>
  );
};

export default CreatePostMedia;
