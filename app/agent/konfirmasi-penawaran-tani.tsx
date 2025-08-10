import BintangIcons from '@/assets/icons/agent/bintang-icons';
import BackIcons from '@/assets/icons/global/back-icons';
import PointIcons from '@/assets/icons/sosial-media/point-icons';
import KonfirmasiPenawaranTaniForm from '@/components/ui/agent/konfirmasita-penawaran-form-tani';
import ModalKalenderTani from '@/components/ui/agent/modal/modal-kalender-tani';
import ModalSuccessTani from '@/components/ui/agent/modal/modal-success-tani';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type FormValues = {
  start_date: string;
  end_date: string;
  address: any;
  jumlah_kebutuhan: number;
  parameter_kebutuhan: string; // contoh: "Kg", "Ton", dll
  description: string;
};

const KonfirmasiPenawaranTani = () => {
  const [toggleKalender, setToggleKalender] = useState<boolean>(false);
  const [toggleSuccess, setToggleSuccess] = useState<boolean>(false);
  const [nameForm, setNameForm] = useState<string>('');
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const forms = useForm<FormValues>({
    defaultValues: {
      start_date: '',
      end_date: '',
      address: null, // bisa diisi objek nanti
      jumlah_kebutuhan: 0,
      parameter_kebutuhan: 'Kg',
      description: '',
    },
    mode: 'all',
  });

  return (
    <SafeAreaView
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 10,
            paddingHorizontal: 14,
          }}
        >
          <View className="flex-row items-center mb-4">
            <TouchableOpacity
              className="mr-3"
              onPress={() => router.replace('/agent/detail-agent-tani')}
            >
              <BackIcons size={20} />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: '600', color: '#1F1F1F' }}>
              Konfirmasi Penawaran
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: 8,
              // Shadow untuk iOS
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.12, // 1F = sekitar 12% opacity
              shadowRadius: 4,
              // Shadow untuk Android
              elevation: 4,
              marginHorizontal: 2,
            }}
          >
            <View className="flex-row justify-between py-4">
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
              <Text style={{ color: '#AAAAAA' }}>1 Hari yang lalu</Text>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderTopWidth: 1,
                paddingVertical: 10,
                borderColor: '#E0E0E0',
              }}
            >
              <View className="flex-row items-center justify-between mb-2">
                <Text style={{ fontSize: 14, fontWeight: 600 }}>
                  Bawang Merah Super
                </Text>
                <Text
                  style={{ fontSize: 14, fontWeight: 600, color: '#525252' }}
                >
                  10 Ton
                </Text>
              </View>
              <Text
                style={{
                  textAlign: 'justify',
                  color: '#7A7A7A',
                }}
              >
                Bawang merah super adalah bawang berkualitas tinggi yang dipilih
                secara selektif berdasarkan ukuran, kebersihan, dan ke
              </Text>
            </View>
            <Text
              style={{
                marginTop: 10,
                marginBottom: 4,
                color: '#169953',
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              Rp 25.000.000
            </Text>
          </View>
          <View className="mt-10">
            <KonfirmasiPenawaranTaniForm
              setToggleKalender={setToggleKalender}
              forms={forms}
              setNameForm={setNameForm}
              setToggleSuccess={setToggleSuccess}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {toggleKalender && (
        <ModalKalenderTani
          forms={forms}
          modalKalender={toggleKalender}
          setModalkalender={setToggleKalender}
          nameForm={nameForm}
        />
      )}

      {toggleSuccess && (
        <ModalSuccessTani
          setModalSuccess={setToggleSuccess}
          modalSuccess={toggleSuccess}
        />
      )}
    </SafeAreaView>
  );
};

export default KonfirmasiPenawaranTani;
