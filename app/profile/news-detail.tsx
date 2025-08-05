import Share2Icons from '@/assets/icons/e-commerce/share-detail-icons';
import BackIcons from '@/assets/icons/global/back-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { View, Text, Image, ScrollView } from 'react-native';

const dummyData = [
  {
    id: 1,
    title:
      'Pemerintah Ubah Alur Distribusi Pupuk Bersubsidi untuk Tingkatkan Efisiensi Distribusi',
    content:
      'Ini adalah konten dummy untuk berita tentang pupuk subsidi. Detail isi berita bisa kamu lengkapi nanti sesuai kebutuhan.',
    image: require('../../assets/images/trash/image.png'),
    source: 'Tani Pintar',
    time: '13/11/2024',
  },
  {
    id: 2,
    title:
      'Siap Jadi Petani Milenial, Pakar Umsida Beberkan 13 Teknologi yang Bisa Diaplikasikan',
    content:
      'Ini adalah konten dummy mengenai teknologi petani milenial. Isi lengkap bisa disesuaikan.',
    image: require('../../assets/images/trash/image2.png'),
    source: 'Tani Pintar',
    time: '13/11/2024',
  },
  {
    id: 3,
    title:
      'Berikan Pelatihan dan Insentif Bulanan, Begini Cara Daftar Petani Milenial 2024',
    content:
      'Konten ini menjelaskan proses dan insentif untuk petani milenial. Tambahkan info aktual jika tersedia.',
    image: require('../../assets/images/trash/image3.png'),
    source: 'Tani Pintar',
    time: '13/11/2024',
  },
  {
    id: 4,
    title: 'Kapolres Lhokseumawe Minta Petani Tak Alih Fungsi Lahan Pertanian',
    content: `KBRN, Lhokseumawe – Kapolres Lhokseumawe AKBP Henki Ismanto, S.I.K. berpesan kepada para petani agar tidak mengalihkan fungsi lahan pertanian. Pesan tersebut disampaikan saat kegiatan panennya pada seluas 8 hektare yang berlangsung di areal persawahan tadah hujan Dusun Kudeu Dua, Desa Blang Crum, Kota Lhokseumawe, Selasa (12/11/2024) pagi.

Kegiatan ini merupakan bagian dari upaya mendukung Program Prioritas 100 Hari Presiden RI untuk ketahanan pangan nasional.

Di hadapan para petani dan tokoh masyarakat, Kapolres Lhokseumawe AKBP Henki Ismanto, S.I.K. menegaskan pentingnya menjaga lahan pertanian sebagai sumber ketahanan pangan, khususnya di Lhokseumawe.

"Konversi lahan pertanian dapat mengancam produktivitas pangan selanjutnya. Dengan menjaga keberlangsungannya di areal kita, sangat mendukung ketahanan pangan di daerah dan mendukung kesejahteraan petani," ujarnya.

Lebih lanjut, Kapolres berharap seluruh petani dapat berkomitmen menjaga lahan mereka agar senantiasa produktif demi kesejahteraan bagi generasi mendatang.

Kami berharap petani tidak tergoda untuk mengalihkan fungsi lahan, demi masa depan ketahanan pangan yang lebih baik,” katanya.

Sementara itu, Keuchik Blang Crum, Ismail Puteh, berencana membentuk Qanun Gampong atau peraturan desa untuk mengatur penggunaan status lahan agar petani tidak menyalahgunakannya.

“Kami ingin menjaga lahan pertanian ini agar generasi mendatang juga dapat menikmatinya sebagai sumber pangan lokal,” kata Ismail.

Di beberapa daerah, alih fungsi lahan pertanian ke sektor lain masih terus terjadi, meski sudah ada undang-undang yang melarangnya.`,
    image: require('../../assets/images/trash/Image5.png'),
    source: 'Tani Pintar',
    time: '2 Hours Ago',
  },
  {
    id: 5,
    title:
      'Petani Besar Aceh Dapat Pasokan Air Bergilir untuk Cegah Gagal Panen',
    content:
      'Berita ini membahas tentang manajemen irigasi untuk petani Aceh. Data isi bisa diperluas jika tersedia.',
    image: require('../../assets/images/trash/Image1.png'),
    source: 'Tani Pintar',
    time: '13/11/2024',
  },
  {
    id: 6,
    title:
      'Wujudkan Ketahanan Pangan, BMKG Diminta Aktif Berikan Informasi ke Petani',
    content:
      'BMKG didorong untuk aktif memberikan informasi cuaca dan iklim pada petani. Konten ini masih dummy.',
    image: require('../../assets/images/trash/Image4.png'),
    source: 'Tani Pintar',
    time: '13/11/2024',
  },
];

const NewsDetail = () => {
  const { id } = useLocalSearchParams();
  const parsedId = Array.isArray(id)
    ? parseInt(id[0], 10)
    : parseInt(id as string, 10);

  const news = dummyData.find(item => item.id === parsedId);

  if (!news) {
    return (
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center px-4 py-4 border-b border-gray-200">
          <TouchableOpacity onPress={() => router.back()}>
            <BackIcons width={24} height={24} fill="#000" />
          </TouchableOpacity>
          <Text className="text-[16px] font-semibold ml-2">Back</Text>
        </View>

        {/* Error Message */}
        <View className="flex-1 items-center justify-center p-5">
          <Text className="text-lg font-medium text-red-500 text-center">
            Berita dengan ID {id} tidak ditemukan.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcons width={24} height={24} fill="#000" />
        </TouchableOpacity>
        <Text className="text-[16px] font-semibold ml-2">News</Text>
        <TouchableOpacity>
          <Share2Icons width={24} height={24} fill="#000" />
        </TouchableOpacity>
      </View>
      <View className="px-4 pt-6">
        {/* Header */}
        <Text className="text-[18px] font-semibold text-black mb-1">
          {news.title}
        </Text>

        {/* Meta */}
        <View className="flex-row items-center mb-4 space-x-2">
          <Text className="text-sm text-gray-500">{news.source}</Text>
          <Text className="text-sm text-gray-400 mx-3">•</Text>
          <Text className="text-sm text-gray-500">{news.time}</Text>
        </View>

        {/* Image */}
        <Image
          source={news.image}
          className="w-full h-48 rounded-xl mb-4"
          resizeMode="cover"
        />

        {/* Content */}
        <Text className="text-[14px] leading-6 text-gray-800 whitespace-pre-line">
          {news.content}
        </Text>
      </View>
    </ScrollView>
  );
};

export default NewsDetail;
