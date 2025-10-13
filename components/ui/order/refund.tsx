import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FC, useState } from 'react';
import type { ImageSourcePropType } from 'react-native';
import RecomendationCard from '../e-commerce/card-recomendation';
import { formatPrice } from '@/utils/format-currency/currency';

import ModalShipped from './modal-shipped';

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
  estimate: string;
  totalItems: number;
  orderDate: string;
  deliveryStatus: string;
  accepted: boolean;
};

const orders: Order[] = [
  {
    id: 1,
    storeName: 'Fashion Store',
    storeImage: require('../../../assets/images/trash/bottle.png'),
    image: require('../../../assets/images/trash/image25.png'),
    productName: 'BELI 3 GRATIS 1 PUPUK BUAH BOOSTER...',
    variant: '',
    price: 150000,
    amountPaid: 150000,
    estimate: '1-2 hari',
    idOrder: 'INV-FSN-001',
    totalItems: 1,
    orderDate: '2025-08-06',
    deliveryStatus: 'Request Return / Refund',
    accepted: false,
  },
];

const RefundTab: FC = () => {
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
            <View className="flex-1" />
            <View
              className="px-3 py-1 "
              style={{
                backgroundColor: order.accepted ? '#dbfddb' : '#fef1d5',
                borderRadius: 12,
                borderWidth: 1,
                borderColor: order.accepted ? '#dbfddb' : '#fef1d5',
              }}
            >
              <Text
                className="text-[14px] font-semibold"
                style={{ color: order.accepted ? '#169953' : '#664a12' }}
              >
                {order.deliveryStatus === 'Request Return / Refund'
                  ? 'Request Return / Refund'
                  : ''}
              </Text>
            </View>
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

          <View className="flex-row  items-center mt-4 px-2">
            <TouchableOpacity className="border-2 border-[#C8C8C8] p-2 rounded-xl w-full">
              <Text className=" text-center font-semibold text-[16px]">
                {order.accepted ? 'View Details' : 'Request Canceled'}
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
      <View className="mt-3">
        <RecomendationCard />
      </View>

      <ModalShipped
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onCancel={handleCancel}
      />
    </ScrollView>
  );
};

export default RefundTab;
