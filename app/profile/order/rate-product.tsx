import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import BackIcons from '@/assets/icons/global/back-icons';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Star, X, CameraIcon, Video } from 'lucide-react-native';
import ModalLeaveReview from '@/components/ui/order/modal-leave-review';
import { useLocalSearchParams } from 'expo-router';
import DescriptionInput from '@/components/ui/component-globals/description-input';

const RateProduct = () => {
  const [modalLeave, setModalLeave] = useState(false);
  const [rating, setRating] = useState(0);
  const [reason, setReason] = useState<string | null>(null);
  const [experience, setExperience] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const { id } = useLocalSearchParams<{ id: string }>();
  const reasons = [
    'Product quality as expected',
    'Neat and safe packing',
    "Seller's less responsive",
    'Product does not match description/image',
  ];

  // buka galeri untuk pilih gambar
  const pickImage = async () => {
    if (photos.length >= 2) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) {
      setPhotos([...photos, result.assets[0].uri]);
    }
  };

  // buka galeri untuk pilih video
  const pickVideo = async () => {
    if (videos.length >= 2) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 0.7,
    });
    if (!result.canceled) {
      setVideos([...videos, result.assets[0].uri]);
    }
  };

  const removePhoto = (uri: string) => setPhotos(photos.filter(p => p !== uri));
  const removeVideo = (uri: string) => setVideos(videos.filter(v => v !== uri));

  const isFormFilled =
    rating > 0 ||
    reason !== null ||
    experience.length > 0 ||
    photos.length > 0 ||
    videos.length > 0;

  const handleBack = () => {
    if (isFormFilled) {
      setModalLeave(true); // tampilkan modal
    } else {
      router.back(); // langsung kembali
    }
  };

  const handlesubmit = () => {
    const payload = {
      rating,
      reason,
      experience,
      photos,
      videos,
      id,
    };

    console.log('Submit review dummy:', payload);

    router.push({
      pathname: './order', // relatif dari rate-product.tsx
      params: { tab: 'Completed' },
    });
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-[#f8f8f8]">
      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-gray-200 bg-white">
        <TouchableOpacity onPress={handleBack}>
          <BackIcons width={24} height={24} fill="#000" />
        </TouchableOpacity>
        <Text className="text-black text-[16px] font-bold ml-3">
          Rate Product
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        className="flex-1 mt-3"
      >
        {/* Produk */}
        <View className="flex-row items-center bg-white rounded-xl border-b border-gray-200 p-3">
          <Image
            source={require('@/assets/images/trash/image18.png')}
            className="w-16 h-16 rounded-md"
          />
          <View className="ml-3 flex-1">
            <Text className="text-black font-semibold text-[15px]">
              Simodis 100EC Insektisida Syngenta – 100ml
            </Text>
            <Text className="text-gray-500 text-sm mt-1">100ml</Text>
          </View>
        </View>

        {/* Rating */}
        <View className="bg-white rounded-xl p-4">
          <Text className="text-black font-medium mb-3">Rate Product</Text>
          <View className="flex-row">
            {[1, 2, 3, 4, 5].map(i => (
              <TouchableOpacity key={i} onPress={() => setRating(i)}>
                <Star
                  size={28}
                  color={i <= rating ? '#FFD700' : '#D1D5DB'}
                  fill={i <= rating ? '#FFD700' : 'none'}
                  className="mr-2"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Upload Photo/Video */}
        <View className="bg-white rounded-xl p-4">
          <Text className="text-black font-medium mb-3">
            Add 2 photos and video
          </Text>

          <View className="flex-row">
            {/* Photo Upload */}
            <TouchableOpacity
              onPress={pickImage}
              className="flex-1 border border-dashed border-gray-300 rounded-xl p-6 items-center justify-center mr-2"
            >
              <CameraIcon size={24} color="#9CA3AF" />
              <Text className="text-gray-500">Photo ({photos.length}/2)</Text>
            </TouchableOpacity>

            {/* Video Upload */}
            <TouchableOpacity
              onPress={pickVideo}
              className="flex-1 border border-dashed border-gray-300 rounded-xl p-6 items-center justify-center ml-2"
            >
              <Video size={24} color="#9CA3AF" />
              <Text className="text-gray-500">Video ({videos.length}/2)</Text>
            </TouchableOpacity>
          </View>

          {/* Preview Photo */}
          {photos.length > 0 && (
            <View className="flex-row flex-wrap">
              {photos.map(uri => (
                <View key={uri} className="relative mr-2 mb-2">
                  <Image source={{ uri }} className="w-20 h-20 rounded-lg" />
                  <TouchableOpacity
                    onPress={() => removePhoto(uri)}
                    className="absolute -top-2 -right-2 bg-black/50 rounded-full p-1"
                  >
                    <X size={14} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* Preview Video */}
          {videos.length > 0 && (
            <View className="flex-row flex-wrap">
              {videos.map(uri => (
                <View
                  key={uri}
                  className="relative w-20 h-20 bg-black/10 rounded-lg items-center justify-center mr-2 mb-2"
                >
                  <Text className="text-xs text-gray-700">Video</Text>
                  <TouchableOpacity
                    onPress={() => removeVideo(uri)}
                    className="absolute -top-2 -right-2 bg-black/50 rounded-full p-1"
                  >
                    <X size={14} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Select Reason */}
        <View className="bg-white rounded-xl p-4">
          <Text className="text-black font-medium mb-3">Select reason</Text>
          <View className="flex-row flex-wrap justify-between">
            {reasons.map(item => (
              <TouchableOpacity
                key={item}
                onPress={() => setReason(item)}
                className={`mb-3 px-3 py-3 rounded-lg border items-center justify-center w-[48%] ${
                  reason === item
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-300 bg-white'
                }`}
              >
                <Text
                  className={`text-sm text-center ${
                    reason === item ? 'text-green-700' : 'text-gray-600'
                  }`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Experience */}
        <DescriptionInput value={experience} onChangeText={setExperience} />
      </ScrollView>
      {/* Submit */}
      <View className="bg-white p-2 ">
        <TouchableOpacity
          onPress={handlesubmit}
          className="bg-green-600 py-2 rounded-xl mb-2"
        >
          <Text className="text-white text-center font-semibold text-[16px]">
            Submit
          </Text>
        </TouchableOpacity>
      </View>
      <ModalLeaveReview
        visible={modalLeave}
        onClose={() => setModalLeave(false)}
        onSubmit={() => {
          setModalLeave(false);
          router.back();
        }}
      />
    </SafeAreaView>
  );
};

export default RateProduct;
