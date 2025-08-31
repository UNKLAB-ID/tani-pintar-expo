import { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Check } from 'lucide-react-native';
// components
import { TransferHeader } from '@/components/ui/payment/transfer-header';
import ModalWithdraw from '@/components/ui/payment/modal-withdraw';

const WithdrawScreen = () => {
  const [selected, setSelected] = useState<(typeof options)[0] | null>(null);
  const [showModal, setShowModal] = useState(false);

  const options = [
    {
      id: 'indomaret',
      name: 'Indomaret',
      image: require('@/assets/images/payment/indomaret.png'),
    },
    {
      id: 'alfamart',
      name: 'Alfamart',
      image: require('@/assets/images/payment/alfamart.png'),
    },
  ];

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
        {/* Header */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          <TransferHeader
            title="Withdraw To"
            subtitle="Select cash withdrawal"
            onBack={() => router.back()}
          />
        </View>

        {/* Options */}
        <View className="p-4 bg-white mx-4 rounded-xl" style={{ top: 150 }}>
          {options.map((opt, idx) => (
            <TouchableOpacity
              key={opt.id}
              className={`flex-row items-center p-4 ${idx !== options.length - 1 ? 'border-b border-gray-200' : ''}`}
              onPress={() => setSelected(opt)}
            >
              <Image
                source={opt.image}
                style={{ width: 40, height: 40, resizeMode: 'contain' }}
              />
              <Text className="text-[14px] font-medium ml-3 flex-1">
                {opt.name}
              </Text>

              {/* checklist kalau dipilih */}
              {selected?.id === opt.id && (
                <View className="p-1 rounded-md bg-primary">
                  <Check size={20} color="#fff" strokeWidth={3} />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Button */}
        <View className="absolute bg-white bottom-5  w-full p-4">
          <TouchableOpacity
            disabled={!selected}
            onPress={() => setShowModal(true)}
            className={`py-4 rounded-lg ${selected ? 'bg-green-600' : 'bg-gray-300'}`}
          >
            <Text className="text-white text-center font-semibold">
              Confirmation
            </Text>
          </TouchableOpacity>
        </View>
        <ModalWithdraw
          visible={showModal}
          onClose={() => router.back()}
          onConfirm={() => {
            if (!selected) return;
            setShowModal(false);
            console.log('DEBUG withdraw data:', {
              id: selected.id,
              name: selected.name,
              image: selected.image,
              resolvedImage: Image.resolveAssetSource(selected.image)?.uri,
            });

            router.push({
              pathname: '/payment/withdraw/withdraw-to-outlet',

              params: {
                id: selected.id,
                name: selected.name,
                image: Image.resolveAssetSource(selected.image).uri, // kirim uri agar bisa ditampilkan
              },
            });
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default WithdrawScreen;
