import BackIcons from '@/assets/icons/global/back-icons';
import { router } from 'expo-router';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Search } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NewsScreen = () => {
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-4 py-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcons width={24} height={24} fill="#000" />
        </TouchableOpacity>
        <Text className="text-[16px] font-semibold ml-2">News</Text>
      </View>
      <View className="p-5 justify-center items-center">
        <View className="flex-row items-center bg-white px-4 rounded-full w-full h-[40px]  border border-[#BCBCBC]">
          <TextInput
            placeholder="Find the latest news..."
            placeholderTextColor="#BCBCBC"
            className="ml-2 text-base text-black"
          />
          <View className="flex-1" />
          <Search size={20} color="#BCBCBC" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewsScreen;
