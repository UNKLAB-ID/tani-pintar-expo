import BackIcons from '@/assets/icons/global/back-icons';
import { router } from 'expo-router';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { Tag, Truck } from 'lucide-react-native';
import ChevronRight from '@/assets/icons/e-commerce/chevronright-icons';
import ModalVoucher from '@/components/ui/order/modal-voucher';

// VoucherCard Component
const VoucherCard = ({
  id,
  type,
  title,
  desc,
  minTransaction,
  amount,
  daysLeft,
}: {
  id: number;
  type: 'discount' | 'shipping';
  title: string;
  desc: string;
  minTransaction: number;
  amount: string;
  daysLeft: number;
}) => {
  const isDiscount = type === 'discount';

  return (
    <TouchableOpacity
      onPress={() => router.push(`/profile/voucer/detail-voucher?id=${id}`)}
      className="flex-row bg-white rounded-xl overflow-hidden mb-4 mx-4 border border-[#E6E6E6]"
    >
      {/* Left Tag */}
      <View
        className={`w-[40px] items-center justify-center ${
          isDiscount ? 'bg-primary' : 'bg-[#1E6AF2]'
        }`}
      >
        <Text className="text-white text-[10px] font-bold text-center rotate-[-90deg] w-[70px]">
          {isDiscount ? '%DISCOUNT' : 'SHIPPING'}
        </Text>
      </View>

      {/* Voucher Info */}
      <View className="flex-1 px-3 py-3">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-1">
            {isDiscount ? (
              <Tag size={14} color="#000" />
            ) : (
              <Truck size={14} color="#000" />
            )}
            <Text className="text-[13px] font-bold text-black ml-1">
              {title}
            </Text>
            <ChevronRight width={20} height={20} color="#169953" />
          </View>
        </View>
        <Text className="text-xs text-black mt-1">{desc}</Text>
        <Text className="text-[10px] text-[#E53935] mt-1 font-semibold">
          {daysLeft} DAYS LEFT
        </Text>
        <View className="border-t border-dashed border-[#BDBDBD] mt-2 pt-2 flex-row justify-between">
          <Text className="text-xs text-[#8E8E8E]">Min. Transaction</Text>
          <Text className="text-xs text-black font-bold">{`Rp${minTransaction.toLocaleString('id-ID')}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Main Screen
const VoucherScreen = () => {
  type VoucherType = 'discount' | 'shipping';
  interface Voucher {
    id: number;
    type: VoucherType;
    code: string;
    title: string;
    desc: string;
    minTransaction: number;
    amount: string;
    daysLeft: number;
  }
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalStatus, setModalStatus] = React.useState<'success' | 'error'>(
    'error'
  );
  const [promoCode, setPromoCode] = React.useState('');

  interface Voucher {
    id: number;
    code: string;
    type: 'discount' | 'shipping';
    title: string;
    desc: string;
    minTransaction: number;
    amount: string;
    daysLeft: number;
  }

  const vouchers: Voucher[] = [
    {
      id: 1,
      code: 'PROMO10',
      type: 'discount',
      title: 'Discount 10%',
      desc: 'Get 10% discount max. discount Rp20.000',
      minTransaction: 50000,
      amount: '10%',
      daysLeft: 5,
    },
    {
      id: 2,
      code: 'ONGKIR10K',
      type: 'shipping',
      title: 'Free Shipping',
      desc: 'Get free shipping with a max discount of Rp10,000',
      minTransaction: 10000,
      amount: 'Rp10.000',
      daysLeft: 5,
    },
    {
      id: 3,
      code: 'PROMO15',
      type: 'discount',
      title: 'Discount 15%',
      desc: 'Get 15% discount max. discount Rp25.000',
      minTransaction: 70000,
      amount: '15%',
      daysLeft: 5,
    },
    {
      id: 4,
      code: 'ONGKIRMERDEKA',
      type: 'shipping',
      title: 'Free Shipping',
      desc: 'Get free shipping with a max discount of Rp10,000',
      minTransaction: 10000,
      amount: 'Rp10.000',
      daysLeft: 5,
    },
  ];

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className="bg-white h-full">
      {/* Header */}
      <View
        className="flex-row items-center p-4"
        style={{ borderBottomWidth: 1, borderBottomColor: '#DEDEDE' }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcons width={24} height={24} fill="#000" />
        </TouchableOpacity>
        <Text className="text-black text-[16px] font-bold ml-3">Voucher</Text>
      </View>

      {/* Input Promo Code */}
      <View className="flex-row gap-2 px-4 pt-4 items-center">
        <View className="flex-1 flex-row items-center bg-white px-4 rounded-full h-[40px] border border-[#BCBCBC]">
          <TextInput
            placeholder="Input promo code"
            placeholderTextColor="#BCBCBC"
            className="text-base text-black flex-1"
            value={promoCode}
            onChangeText={setPromoCode}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            const found = vouchers.find(
              v => v.code.toLowerCase() === promoCode.trim().toLowerCase()
            );

            if (found) {
              setModalStatus('success');
              // bisa simpan voucher terpakai ke global state kalau perlu
            } else {
              setModalStatus('error');
            }

            setModalVisible(true);
          }}
          className="bg-primary px-4 py-[10px] rounded-xl"
        >
          <Text className="text-white font-semibold text-sm">Check Code</Text>
        </TouchableOpacity>
      </View>

      {/* Voucher List */}
      <ScrollView className="mt-4">
        {vouchers.map(voucher => (
          <VoucherCard key={voucher.id} {...voucher} />
        ))}

        {/* Show More */}
        <TouchableOpacity className="items-center my-3">
          <Text className="text-primary font-semibold">Show More</Text>
        </TouchableOpacity>
      </ScrollView>
      <ModalVoucher
        visible={modalVisible}
        status={modalStatus}
        onClose={() => setModalVisible(false)}
        onUseVoucher={() => {
          setModalVisible(false);
          // Simpan promo code valid di sini
        }}
      />
    </SafeAreaView>
  );
};

export default VoucherScreen;
