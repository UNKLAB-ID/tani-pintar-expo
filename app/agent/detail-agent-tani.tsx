import BintangIcons from '@/assets/icons/agent/bintang-icons';
import BackIcons from '@/assets/icons/global/back-icons';
import MessageIcons from '@/assets/icons/global/message-icons';
import PointIcons from '@/assets/icons/sosial-media/point-icons';
import CustomButton from '@/components/ui/component-globals/button-primary';
import { router, useLocalSearchParams } from 'expo-router';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DetailAgentTani = () => {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: 16,
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom + 80,
        }}
      >
        <View className="flex-row items-center mb-4">
          <TouchableOpacity
            className="mr-3"
            onPress={() => router.replace('/(tabs)/export')}
          >
            <BackIcons size={20} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: '600', color: '#1F1F1F' }}>
            Detail
          </Text>
        </View>
        <View>
          <Image
            source={require('../../assets/images/trash/unsplash_9P4sDPBry0M.png')}
            style={{
              width: '100%',
              height: 160,
              borderRadius: 8,
            }}
            resizeMode="cover"
          />
          <View className="flex-row items-center justify-between my-4">
            <Text style={{ fontSize: 18, fontWeight: 600 }}>
              Bawang Merah Super
            </Text>
            <Text style={{ fontSize: 12, fontWeight: 600, color: '#8D8D8D' }}>
              Seleria
            </Text>
          </View>
          <View className="flex-row items-center">
            <Image
              source={require('../../assets/images/profile-default.png')}
              className="w-[40px] h-[40px] rounded-full"
              style={{ marginLeft: -6 }}
            />
            <View className="ml-2">
              <Text style={{ fontSize: 12, fontWeight: 600 }}>
                PT Taniverse Tbk
              </Text>
              <View className="flex-row items-center">
                <Text style={{ color: '#AAAAAA' }}>Jakarta</Text>
                <PointIcons
                  width={6}
                  height={6}
                  style={{ marginHorizontal: 5 }}
                />
                <View className="flex-row items-center">
                  <BintangIcons width={12} height={12} />
                  <Text
                    style={{
                      color: '#FCB72E',
                      marginLeft: 5,
                    }}
                  >
                    4.5
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderTopWidth: 1,
              paddingVertical: 15,
              borderColor: '#E0E0E0',
              marginVertical: 15,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: 400,
                color: '#BCBCBC',
                marginBottom: 9,
              }}
            >
              Jumlah Kebutuhan
            </Text>
            <Text style={{ fontSize: 14, fontWeight: 700, color: '#525252' }}>
              10 Ton
            </Text>
          </View>
          <Text style={{ color: '#BCBCBC', textAlign: 'justify' }}>
            Bawang merah super adalah bawang berkualitas tinggi yang dipilih
            secara selektif berdasarkan ukuran, kebersihan, dan kesegaran. Umbi
            memiliki ukuran seragam dengan diameter berkisar antara 2,5 hingga 4
            cm, berbobot rata-rata 10–20 gram per butir. Kulitnya kering
            sempurna dan berwarna merah cerah mengilap, tanpa bercak hitam atau
            kerusakan fisik. Bawang ini memiliki bentuk bulat atau lonjong yang
            konsisten, dengan aroma tajam khas bawang merah segar.
          </Text>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: insets.bottom + 5,
          left: 16,
          right: 16,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          className="border-2 border-[#169953] w-[40px] h-[40px] flex-row justify-center items-center"
          style={{ borderRadius: 12, marginRight: 10 }}
        >
          <MessageIcons width={25} height={25} color={'#169953'} />
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <CustomButton
            title="Ajukan"
            onPress={() =>
              router.push(`/agent/konfirmasi-penawaran-tani?id=${id}`)
            }
            className="py-[11px]"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailAgentTani;
