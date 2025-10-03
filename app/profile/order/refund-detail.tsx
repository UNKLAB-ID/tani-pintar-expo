import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import BackIcons from '@/assets/icons/global/back-icons';
import DescriptionInput from '@/components/ui/component-globals/description-input';
import ModalSelectSolution from '@/components/ui/order/modal-select-solution';
import { useState } from 'react';
import { CameraIcon, Video, X, ChevronDownIcon } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import ModalSelectProblem from '@/components/ui/order/modal-select-problem';
import ModalEstimateSolution from '@/components/ui/order/modal-estimate-refund';

const refundData = [
  { id: '1', title: 'Price 1 item', amount: 152000 },
  { id: '2', title: 'Shipping refund', amount: 0 },
  { id: '3', title: 'Platform fee refund', amount: 1000 },
  { id: '4', title: 'Others Refund', amount: 0 },
  { id: '5', title: 'Others Refund', amount: 153000 },
];

const RefundDetail = () => {
  const { issue } = useLocalSearchParams(); // ambil issue dari params
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [selectedSolutionVisible, setSelectedSolutionVisible] = useState(false);
  const [selectedProblemVisible, setSelectedProblemVisible] = useState(false);
  const [modalEstimateVisible, setModalEstimateVisible] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);
  const [solution, setSolution] = useState<string | null>(null);
  const pickImage = async () => {
    if (photos.length >= 6) return;
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
    if (videos.length >= 6) return;
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
  const handleSubmit = () => {
    const payload = {
      problem: problem ?? issue,
      solution,
      description,
      photos,
      videos,
      totalReturn: 152000, // contoh hardcoded dulu
    };

    console.log('DATA TERKIRIM:', payload);
    setTimeout(() => {
      router.push({
        pathname: '/profile/order/order',
        params: { tab: 'Refund' }, // pakai params jika ingin langsung ke tab tertentu
      });
    }, 500);
  };

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      className="bg-[#f8f8f8] flex-1"
    >
      {/* Header */}
      <View className="flex-row items-center p-4 bg-white border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcons width={24} height={24} fill="#000" />
        </TouchableOpacity>
        <Text className="text-black text-[16px] font-bold ml-3">
          Order Return / Refund
        </Text>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView className="py-4">
          {/* Produk yang mau di-return */}
          <View className="bg-white p-4 flex-row gap-x-3 items-center">
            <Image
              source={require('@/assets/images/trash/image18.png')}
              className="w-14 h-14 rounded-md"
            />
            <View className="flex-1">
              <Text className="text-black font-semibold">
                Simodis 100EC Insektisida
              </Text>
              <Text className="text-[#5A5A5A] text-[13px]">100ml</Text>
              <Text className="text-black font-bold mt-1">Rp152.000</Text>
            </View>
          </View>

          {/* Selected Issue */}
          <TouchableOpacity
            onPress={() => setSelectedProblemVisible(true)}
            className="bg-white p-4 mt-2"
          >
            <Text className="text-black font-semibold">Selected Problem</Text>
            <Text className="text-[#5A5A5A] mt-1">{problem ?? issue}</Text>
          </TouchableOpacity>

          {/* Select Solution */}
          <View className="bg-white p-4 mt-2">
            <Text className="text-black font-semibold mb-2">
              What solution do you want?
            </Text>
            <TouchableOpacity
              onPress={() => setSelectedSolutionVisible(true)}
              className="border border-gray-300 rounded-xl p-3 flex-row"
            >
              <Text className="text-[#5A5A5A]">
                {solution ? solution : 'Select Solution'}
              </Text>
              <View className="flex-1" />
              <ChevronDownIcon />
            </TouchableOpacity>
          </View>

          {/* Description */}
          <View className="mt-2">
            <DescriptionInput
              value={description}
              onChangeText={setDescription}
              label="Describe your problem (min. 25 characters)"
              placeholder="Describe the problem with your order in detail."
              maxLength={50}
              minHeight={150}
            />
          </View>

          {/* Upload Photo/Video */}

          <View className="bg-white mt-2 p-4">
            <Text className="text-black font-medium mb-3">
              Add photos and video *
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="flex-row"
            >
              {/* Photos */}
              {photos.map(uri => (
                <View key={uri} className="relative mr-2">
                  <Image source={{ uri }} className="w-20 h-20 rounded-lg" />
                  <TouchableOpacity
                    onPress={() => removePhoto(uri)}
                    className="absolute -top-2 -right-2 bg-black/50 rounded-full p-1"
                  >
                    <X size={14} color="white" />
                  </TouchableOpacity>
                </View>
              ))}

              {/* Videos */}
              {videos.map(uri => (
                <View key={uri} className="relative mr-2">
                  {/* Thumbnail video (bisa pakai gambar default atau snapshot yang kamu tentukan) */}
                  <Image
                    source={{ uri: uri }} // kalau memang ada thumbnail image uri
                    className="w-20 h-20 rounded-lg bg-black/20"
                  />

                  {/* Ikon Play di tengah */}
                  <View className="absolute inset-0 items-center justify-center">
                    <Video size={28} color="white" />
                  </View>

                  {/* Tombol remove */}
                  <TouchableOpacity
                    onPress={() => removeVideo(uri)}
                    className="absolute -top-2 -right-2 bg-black/50 rounded-full p-1"
                  >
                    <X size={14} color="white" />
                  </TouchableOpacity>
                </View>
              ))}

              {/* Add Photo Button */}
              {photos.length < 6 && (
                <TouchableOpacity
                  onPress={pickImage}
                  className="w-20 h-20 border border-dashed border-gray-300 rounded-lg items-center justify-center mr-2"
                >
                  <CameraIcon size={20} color="#9CA3AF" />
                  <Text className="text-xs text-gray-500">
                    {photos.length}/6
                  </Text>
                </TouchableOpacity>
              )}

              {/* Add Video Button */}
              {videos.length < 1 && (
                <TouchableOpacity
                  onPress={pickVideo}
                  className="w-20 h-20 border border-dashed border-gray-300 rounded-lg items-center justify-center"
                >
                  <Video size={20} color="#9CA3AF" />
                  <Text className="text-xs text-gray-500">
                    {videos.length}/1
                  </Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
        </ScrollView>
        {/* Submit Button */}
        <View className="bg-white p-4 border-t border-gray-200">
          <View className="flex-row items-center justify-between">
            {/* Total Return */}
            <TouchableOpacity onPress={() => setModalEstimateVisible(true)}>
              <Text className="text-gray-600 text-sm">Total Return</Text>
              <Text className="text-black font-semibold mt-1">Rp152.000</Text>
            </TouchableOpacity>

            {/* Submit Button */}
            <TouchableOpacity
              disabled={
                description.length < 25 ||
                !problem ||
                !solution ||
                photos.length === 0
              }
              className={`px-5 py-3 rounded-xl ${
                description.length < 25 ||
                !problem ||
                !solution ||
                photos.length === 0
                  ? 'bg-gray-300'
                  : 'bg-primary'
              }`}
              onPress={handleSubmit}
            >
              <Text className="text-white font-semibold">
                Submit a Return/Refund
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      <ModalSelectSolution
        visible={selectedSolutionVisible}
        onClose={() => setSelectedSolutionVisible(false)} // ✅ bisa ditutup
        onConfirm={solution => {
          setSolution(selectedSolutionVisible ? solution : null);
          console.log('Selected solution:', solution);
          setSelectedSolutionVisible(false);
        }}
      />
      <ModalSelectProblem
        visible={selectedProblemVisible}
        onClose={() => setSelectedProblemVisible(false)} // ✅ bisa ditutup
        onConfirm={(problem: string) => {
          setProblem(problem); // simpan problem ke state
          console.log('Selected problem:', problem);
          setSelectedProblemVisible(false);
        }}
      />
      <ModalEstimateSolution
        visible={modalEstimateVisible}
        onClose={() => setModalEstimateVisible(false)}
        refundItems={refundData}
      />
    </SafeAreaView>
  );
};

export default RefundDetail;
