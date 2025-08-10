import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FC, useState } from 'react';
import type { ImageSourcePropType } from 'react-native';
import { formatPrice } from '@/utils/format-currency/currency';
import MessageIcons from '@/assets/icons/global/message-icons';
import RecomendationCard from '../e-commerce/card-recomendation';
import ModalOrderCancel from './modal-order-cancel';
import { formatShortDate } from '@/utils/format-date/date';

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
    estimate: '1-2 hari',
    idOrder: 'INV-FSN-001',
    totalItems: 1,
    orderDate: '2025-08-06',
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
    estimate: '2-4 hari',
    idOrder: 'INV-TECH-002',
    totalItems: 2,
    orderDate: '2025-08-05',
  },
];

const ProcessingTab: FC = () => {
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
                  style={{
                    borderWidth: 1,
                    borderColor: '#FEF1D5',
                    backgroundColor: '#FEF1D5',
                    borderRadius: 16,
                  }}
                  className=" px-3 py-1"
                >
                  <Text
                    className="text-[14px] font-semibold"
                    style={{ color: '#664A12' }}
                  >
                    Process
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
                Item Estimate
              </Text>
              <Text className="text-[16px] font-semiblod text-primary">
                {formatShortDate(String(order.orderDate))}
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
            <TouchableOpacity
              className="border border-primary p-2 w-[151px] rounded-xl"
              style={{ width: 171, height: 40 }}
            >
              <Text className="text-primary text-center font-semibold text-[16px]">
                Chat Seller
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled
              className="  p-2 rounded-xl"
              style={{
                width: 171,
                backgroundColor: '#B3B3B3',
                borderWidth: 1,
                borderColor: '#B3B3B3',
              }}
            >
              <Text className="text-white text-center font-semibold text-[16px]">
                Order Receive
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
    </ScrollView>
  );
};

export default ProcessingTab;
