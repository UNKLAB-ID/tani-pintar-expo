import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FC, useState } from 'react';
import type { ImageSourcePropType } from 'react-native';
import { formatPrice } from '@/utils/format-currency/currency';
import MessageIcons from '@/assets/icons/global/message-icons';
import RecomendationCard from '../e-commerce/card-recomendation';
import ModalOrderCancel from './modal-order-cancel';
import { router } from 'expo-router';

type Order = {
  id: number;
  storeName: string;
  storeImage: ImageSourcePropType;
  image: ImageSourcePropType;
  productName: string;
  variant: string;
  price: number;
  amountPaid: number;
  idOrder: string;
  totalItems: number;
};

const orders: Order[] = [
  {
    id: 1,
    storeName: 'Fashion Store',
    storeImage: require('../../../assets/images/trash/bottle.png'),
    image: require('../../../assets/images/trash/image25.png'),
    productName:
      'BELI 3 GRATIS 1 PUPUK BUAH BOOSTER BUAH BOOSTER 76 HORMON PEMBUNGAAN DAN PEMBUAHAN',
    variant: '',
    price: 150000,
    amountPaid: 150000,
    idOrder: 'INV-FSN-001',
    totalItems: 1,
  },
  {
    id: 2,
    storeName: 'Tech Shop',
    storeImage: require('../../../assets/images/trash/Image1.png'),
    image: require('../../../assets/images/trash/image25.png'),
    productName: 'Simodis 100EC Insektisida Syngenta - 100ml ',
    variant: 'Black Edition',
    price: 350000,
    amountPaid: 350000,
    idOrder: 'INV-TECH-002',
    totalItems: 2,
  },
];

const PayTab: FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleCancel = () => {
    // logika cancel order bisa di sini
    console.log('Order canceled');
    setModalVisible(false);
  };
  if (orders.length === 0) {
    return (
      <View className="items-center justify-center">
        <Image
          source={require('@/assets/images/Combination.png')}
          className="w-60 h-60"
          resizeMode="contain"
        />
        <Text className="text-gray-400 mt-3">Tidak ada pesanan</Text>
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 150 }}
    >
      {orders.map((order, index) => (
        <View key={order.id} className=" bg-white p-4  shadow-sm">
          <View className="flex-row items-center mb-2">
            <Image
              source={order.storeImage}
              className="w-6 h-6 rounded-full mr-3"
              resizeMode="cover"
            />
            <Text className="font-semibold text-black">
              {order.storeName || 'no store'}
            </Text>
          </View>

          <View className="flex-row">
            <Image
              source={order.image}
              className="w-[100px] h-[100px] rounded-md mr-3"
              resizeMode="cover"
            />
            <View className="flex-1 justify-between my-3">
              <View className="flex-row">
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  className="font-semibold text-black text-[16px]"
                >
                  {order.productName.length > 17
                    ? `${order.productName.substring(0, 17)}...`
                    : order.productName}
                </Text>
                <View className="flex-1" />
                <View
                  className=" px-3 py-1 "
                  style={{
                    borderWidth: 1,
                    borderRadius: 12,
                    borderColor: '#CC0606',
                    backgroundColor: '#CC0606',
                  }}
                >
                  <Text className="text-[14px] font-semibold text-white">
                    Not Paid
                  </Text>
                </View>
              </View>

              <Text className="text-[14px] text-[#B3B3B3]">
                {order.variant || 'No Variant'}
              </Text>
              <Text className="mt-1 font-bold text-black">
                {formatPrice(Number(order.price))}
              </Text>
            </View>
          </View>

          <View className="mt-3 space-y-1">
            <View className="flex-row justify-between">
              <Text className="text-[16px] font-semiblod text-[#6F6F6F]">
                Amount Paid
              </Text>
              <Text className="text-[16px] font-semiblod text-[#1F1F1F]">
                {formatPrice(Number(order.amountPaid))}
              </Text>
            </View>

            <View className="flex-row justify-between my-1">
              <Text className="text-[16px] font-semiblod text-[#6F6F6F]">
                ID Order
              </Text>
              <Text className="text-[16px] font-semiblod text-[#1F1F1F]">
                {order.idOrder}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-[16px] font-semiblod text-[#6F6F6F]">
                Total Items
              </Text>
              <Text className="text-[16px] font-semiblod text-[#1F1F1F]">
                {order.totalItems}
              </Text>
            </View>
          </View>

          <View className="flex-row  items-center gap-x-3 mt-4 px-2">
            <TouchableOpacity className="border border-[#C8C8C8] p-2 rounded-xl">
              <MessageIcons width={24} height={24} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              className="border border-primary p-2 w-[151px] rounded-xl"
              style={{ width: 151, height: 40 }}
            >
              <Text className="text-primary text-center font-semibold text-[16px]">
                Cancel Purchase
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/profile/order/payment-now')}
              className="bg-primary just p-2 rounded-xl"
              style={{ width: 151 }}
            >
              <Text className="text-white text-center font-semibold text-[16px]">
                Pay Now
              </Text>
            </TouchableOpacity>
          </View>
          {index !== orders.length - 1 && (
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: '#ccc',
                borderStyle: 'dashed',
                paddingBottom: 20,
              }}
            />
          )}
        </View>
      ))}
      {/* <View className="mt-3">
        <RecomendationCard />
      </View> */}

      <ModalOrderCancel
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onCancel={handleCancel}
      />
    </ScrollView>
  );
};

export default PayTab;
