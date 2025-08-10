import BackIcons from '@/assets/icons/global/back-icons';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

const instructions = {
  ATM: [
    'Masukkan Kartu ATM BCA & PIN.',
    'Pilih menu Transaksi Lainnya > Transfer > ke Rek BCA Virtual Account.',
    'Masukkan kode perusahaan untuk TaniShop (123) dan nomor HP kamu (Contoh: 12308937190229).',
    'Periksa halaman konfirmasi: Nomor VA, Nama, Produk, dan Total Tagihan.',
    'Masukkan jumlah transfer sesuai tagihan.',
    'Ikuti instruksi untuk selesaikan pembayaran.',
    'Simpan bukti transaksi.',
  ],
  'M-Banking': [
    'Login ke aplikasi m-BCA.',
    'Pilih m-Transfer > BCA Virtual Account.',
    'Masukkan Nomor Virtual Account: 12308937190229.',
    'Periksa detail pembayaran dan klik OK.',
    'Masukkan PIN m-BCA.',
    'Simpan bukti transaksi.',
  ],
  'I-Banking': [
    'Login ke KlikBCA.',
    'Pilih Transfer Dana > Transfer ke BCA Virtual Account.',
    'Masukkan Nomor Virtual Account: 12308937190229.',
    'Cek detail pembayaran, klik Lanjutkan.',
    'Masukkan KeyBCA response, lalu klik Kirim.',
    'Simpan bukti transaksi.',
  ],
};

const tabs = ['ATM', 'M-Banking', 'I-Banking'];

const PaymentNow = () => {
  const [activeTab, setActiveTab] = useState<'ATM' | 'M-Banking' | 'I-Banking'>(
    'ATM'
  );

  return (
    <SafeAreaView edges={['top']} className="flex-1 ">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white">
        <TouchableOpacity onPress={() => router.back()} className="z-10">
          <BackIcons width={24} height={24} fill="#000" />
        </TouchableOpacity>
        <Text className="absolute left-1/2 -translate-x-1/2 text-[16px] font-bold">
          Payment
        </Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Bank Info */}
        <View className="mt-3 p-4 bg-white">
          <View className="flex-row items-center">
            <Image
              source={require('@/assets/images/payment/bank/bca.png')}
              style={{ width: 48, height: 32 }}
            />
            <View className="ml-3">
              <Text className="font-semibold text-base">Bank BCA</Text>
              <Text className="text-sm text-gray-400">Virtual Account</Text>
            </View>
          </View>

          {/* Virtual Account Number */}
          <View className="mt-4">
            <Text className="text-xs text-gray-500">Nomor Virtual Account</Text>
            <View className="flex-row items-center justify-between mt-1">
              <Text className="text-[16px] font-semibold text-green-600">
                12308937190229
              </Text>
              <TouchableOpacity className="border border-gray-300 px-3 py-1 rounded">
                <Text className="text-sm text-green-600 font-medium">Copy</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Amount Paid */}
          <View className="mt-4">
            <Text className="text-xs text-gray-500">Amount Paid</Text>
            <View className="flex-row items-center justify-between mt-1">
              <Text className="text-[16px] font-semibold text-black">
                Rp16.000
              </Text>
              <TouchableOpacity className="border border-gray-300 px-3 py-1 rounded">
                <Text className="text-sm text-green-600 font-medium">Copy</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Payment Limit */}
          <View className="mt-4 flex-row justify-between items-center">
            <Text className="text-sm font-medium text-black">
              Payment Limit
            </Text>
            <Text className="text-sm text-red-500 font-medium">01:00:00</Text>
          </View>

          {/* Tab Navigation */}
          <View className="mt-5 flex-row border-b border-gray-200">
            {tabs.map(tab => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab as typeof activeTab)}
                className="mr-6 pb-2"
              >
                <Text
                  className={`text-sm font-medium ${
                    activeTab === tab
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-400'
                  }`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Payment Instructions */}
        <View className=" bg-white p-4">
          <Text className="font-semibold text-[16px] mb-2">
            Payment Instructions
          </Text>
          <View className="space-y-2">
            {instructions[activeTab].map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  marginTop: 4,
                }}
              >
                <Text
                  className="align-center  text-center mr-1"
                  style={{
                    width: 24,
                    fontSize: 14,
                    fontWeight: '600',
                    borderWidth: 1,
                    borderColor: '#DEDEDE',
                    borderRadius: 99,
                    backgroundColor: '#DEDEDE',
                  }}
                >
                  {index + 1}.
                </Text>
                <Text style={{ flex: 1, fontSize: 14 }}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentNow;
