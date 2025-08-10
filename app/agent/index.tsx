import MenuHeaderListIcons from '@/assets/icons/agent/menu-header-list-icons';
import CardAgentTani from '@/components/ui/agent/card-agent-tani';
import InputSearchPrimary from '@/components/ui/component-globals/input-seach-primary';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AgentScreenIndex = () => {
  const [search, setSearch] = useState<string>('');
  const [toggleButton, setToggleButton] = useState<boolean>(true);
  const insets = useSafeAreaInsets();
  const { type_akses } = useLocalSearchParams()

  useEffect(() => {
    if (type_akses === "history") {
      setToggleButton(false)
    }
  }, [type_akses])

  const dataDummy = [
    {
      name_perusahaan: 'PT Taniverse Tbk',
      tangal: '1 Hari yang lalu',
      alamat: 'Jakarta',
      retting: 4.5,
      name_produk: 'Bawang Merah Super',
      kebutuhan: '10 Ton',
      desscription:
        'Bawang merah super adalah bawang berkualitas tinggi yang dipilih secara selektif berdasarkan ukuran, kebersihan, dan kes',
      harga: 'Rp 25.000.000',
    },
    {
      name_perusahaan: 'CV Agri Jaya',
      tangal: '2 Hari yang lalu',
      alamat: 'Bandung',
      retting: 4.7,
      name_produk: 'Cabai Rawit Hijau',
      kebutuhan: '5 Ton',
      desscription:
        'Cabai rawit hijau segar langsung dari petani lokal dengan rasa pedas yang khas.',
      harga: 'Rp 15.000.000',
    },
    {
      name_perusahaan: 'UD Tani Makmur',
      tangal: '3 Hari yang lalu',
      alamat: 'Semarang',
      retting: 4.6,
      name_produk: 'Jagung Manis',
      kebutuhan: '20 Ton',
      desscription:
        'Jagung manis berkualitas dengan kadar gula tinggi dan tekstur renyah.',
      harga: 'Rp 30.000.000',
    },
    {
      name_perusahaan: 'PT Sayur Segar',
      tangal: '4 Hari yang lalu',
      alamat: 'Surabaya',
      retting: 4.8,
      name_produk: 'Wortel Premium',
      kebutuhan: '8 Ton',
      desscription:
        'Wortel premium dengan warna oranye cerah dan bebas pestisida.',
      harga: 'Rp 18.000.000',
    },
    {
      name_perusahaan: 'CV Padi Makmur',
      tangal: '5 Hari yang lalu',
      alamat: 'Yogyakarta',
      retting: 4.9,
      name_produk: 'Beras Pandan Wangi',
      kebutuhan: '50 Ton',
      desscription:
        'Beras pandan wangi dengan aroma khas dan tekstur pulen saat dimasak.',
      harga: 'Rp 500.000.000',
    },
    {
      name_perusahaan: 'PT Hortikultura Nusantara',
      tangal: '6 Hari yang lalu',
      alamat: 'Medan',
      retting: 4.4,
      name_produk: 'Tomat Merah Segar',
      kebutuhan: '12 Ton',
      desscription:
        'Tomat merah segar pilihan untuk kebutuhan rumah tangga dan industri.',
      harga: 'Rp 22.000.000',
    },
    {
      name_perusahaan: 'UD Kebun Raya',
      tangal: '7 Hari yang lalu',
      alamat: 'Bali',
      retting: 4.3,
      name_produk: 'Kentang Granola',
      kebutuhan: '15 Ton',
      desscription: 'Kentang granola berkualitas ekspor dengan ukuran seragam.',
      harga: 'Rp 27.000.000',
    },
    {
      name_perusahaan: 'CV Tani Lestari',
      tangal: '8 Hari yang lalu',
      alamat: 'Makassar',
      retting: 4.5,
      name_produk: 'Bayam Hijau',
      kebutuhan: '3 Ton',
      desscription:
        'Bayam hijau segar kaya vitamin dan serat untuk kebutuhan konsumsi sehat.',
      harga: 'Rp 5.000.000',
    },
    {
      name_perusahaan: 'PT Agri Indo',
      tangal: '9 Hari yang lalu',
      alamat: 'Palembang',
      retting: 4.6,
      name_produk: 'Kacang Panjang',
      kebutuhan: '6 Ton',
      desscription:
        'Kacang panjang segar dengan tekstur renyah dan rasa manis alami.',
      harga: 'Rp 8.000.000',
    },
    {
      name_perusahaan: 'UD Panen Raya',
      tangal: '10 Hari yang lalu',
      alamat: 'Malang',
      retting: 4.7,
      name_produk: 'Brokoli Organik',
      kebutuhan: '4 Ton',
      desscription:
        'Brokoli organik bebas pestisida dengan kandungan nutrisi tinggi.',
      harga: 'Rp 12.000.000',
    },
  ];

  return (
    <SafeAreaView style={{ backgroundColor: '#fff', paddingHorizontal: 13 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View className="flex-row items-center justify-between w-full">
        <View className="flex-1 me-3">
          <InputSearchPrimary
            coloricon="#000"
            placeholder="Find what you’re looking for..."
            className="px-[12px] h-[39px]"
            onChangeText={setSearch}
          />
        </View>
        <MenuHeaderListIcons width={24} height={24} />
      </View>

      <View
        style={{
          backgroundColor: '#F2F2F2',
          borderWidth: 1,
          borderColor: '#EBEBEB',
          marginVertical: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 5,
          borderRadius: 44,
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 40,
            backgroundColor: toggleButton ? '#169953' : 'transparent',
            width: 177,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setToggleButton(true)}
        >
          <Text
            style={{
              fontWeight: 500,
              color: toggleButton ? '#FFF' : '#B3B3B3',
            }}
          >
            Explore
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 40,
            backgroundColor: toggleButton ? 'transparent' : '#169953',
            width: 177,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setToggleButton(false)}
        >
          <Text
            style={{
              fontWeight: 500,
              color: toggleButton ? '#B3B3B3' : '#FFF',
            }}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>
      {/* FlatList untuk data */}
      <FlatList
        data={dataDummy}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <CardAgentTani item={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 80,
          paddingTop: 1,
        }}
      />
    </SafeAreaView>
  );
};

export default AgentScreenIndex;
