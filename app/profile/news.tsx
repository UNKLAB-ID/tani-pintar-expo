import BackIcons from '@/assets/icons/global/back-icons';
import { router } from 'expo-router';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import { Search } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

const newsList = [
  {
    id: 1,
    category: 'Fertilizer',
    title:
      'Pemerintah Ubah Alur Distribusi Pupuk Bersubsidi untuk Tingkatkan Efisiensi Distribusi',
    image: require('../../assets/images/trash/image.png'),
    source: 'Tani Pintar',
    date: '13/11/2024',
  },
  {
    id: 2,
    category: 'Millennial Farmers',
    title:
      'Siap Jadi Petani Milenial, Pakar Umsida Beberkan 13 Teknologi yang Bisa Diaplikasikan',
    image: require('../../assets/images/trash/image2.png'),
    source: 'Tani Pintar',
    date: '13/11/2024',
  },
  {
    id: 3,
    category: 'Millennial Farmers',
    title:
      'Berikan Pelatihan dan Insentif Bulanan, Begini Cara Daftar Petani Milenial 2024',
    image: require('../../assets/images/trash/image3.png'),
    source: 'Tani Pintar',
    date: '13/11/2024',
  },
  {
    id: 4,
    category: 'Police',
    title: 'Kapolres Lhokseumawe Minta Petani Tak Alih Fungsi Lahan Pertanian',
    image: require('../../assets/images/trash/Image5.png'),
    source: 'Tani Pintar',
    date: '13/11/2024',
  },
  {
    id: 5,
    category: 'Farmers',
    title:
      'Petani Besar Aceh Dapat Pasokan Air Bergilir untuk Cegah Gagal Panen',
    image: require('../../assets/images/trash/Image1.png'),
    source: 'Tani Pintar',
    date: '13/11/2024',
  },
  {
    id: 6,
    category: 'Political',
    title:
      'Wujudkan Ketahanan Pangan, BMKG Diminta Aktif Berikan Informasi ke Petani',
    image: require('../../assets/images/trash/Image4.png'),
    source: 'Tani Pintar',
    date: '13/11/2024',
  },
];

const NewsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNews = newsList.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-4 py-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcons width={24} height={24} fill="#000" />
        </TouchableOpacity>
        <Text className="text-[16px] font-semibold ml-2">News</Text>
      </View>

      {/* Search */}
      <View className="p-5 justify-center items-center">
        <View className="flex-row items-center bg-white px-4 rounded-full w-full h-[40px] border border-[#BCBCBC]">
          <TextInput
            placeholder="Find the latest news..."
            placeholderTextColor="#BCBCBC"
            className="ml-2 text-base text-black flex-1"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
          <Search size={20} color="#BCBCBC" />
        </View>
      </View>

      {/* News List */}
      <ScrollView className="bg-white px-5">
        {filteredNews.map(item => (
          <TouchableOpacity
            key={item.id}
            className="flex-row pb-4"
            onPress={() =>
              router.push({
                pathname: '/profile/news-detail',
                params: { id: item.id },
              })
            }
          >
            <Image
              source={item.image}
              resizeMode="cover"
              className="w-[120px] h-[100px] rounded-xl"
            />
            <View className="flex-1 ml-3">
              <Text className="text-[12px] text-[#BCBCBC] mt-1">
                {item.category}
              </Text>
              <Text className="text-[14px] font-semibold leading-5 mt-1">
                {item.title}
              </Text>
              <Text className="text-[12px] text-[#BCBCBC] mt-2">
                {item.source} | {item.date}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        {filteredNews.length === 0 && (
          <Text className="text-center text-[#999] mt-10">
            Tidak ditemukan berita dengan kata: "{searchQuery}"
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewsScreen;
