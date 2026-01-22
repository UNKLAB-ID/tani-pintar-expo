import {
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
//icons
import BackIcons from '@/assets/icons/global/back-icons';
import LocationIcons from '@/assets/icons/e-commerce/locations-icons';
import ChevronRight from '@/assets/icons/e-commerce/chevronright-icons';
//components
import VoucherCard from '@/components/ui/e-commerce/checkout/voucher-card';
import ShippingOptionCard from '@/components/ui/e-commerce/checkout/card-shipping-options';
import { useEcommerceStore } from '@/store/e-commerce/ecommerce';
import NoteTriggerButton from '@/components/ui/e-commerce/checkout/note-trigger-button';

type Address = {
  id: number;
  name: string;
  phone: string;
  address: string;
  isPrimary: boolean;
};

export interface Product {
  id: number;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: any;
  seller: {
    id: string;
    name: string;
    image: any;
    bio: string;
  };
}

type ShippingOption = {
  id: number;
  label: string;
  cost: number;
  eta: string;
  insuranceIncluded: boolean;
};

type Voucher = {
  id: number;
  label: string;
  code: string;
  discountAmount: number;
  isApplied: boolean;
};

type PaymentMethod = {
  id: number;
  bankName: string;
  icon: any;
  isSelected: boolean;
};

type PaymentSummary = {
  itemsTotal: number;
  shippingFee: number;
  platformFee: number;
  grandTotal: number;
};

export const addresses: Address[] = [
  {
    id: 1,
    name: 'Maman',
    phone: '0812-888-999',
    address:
      'Jl. Pangeran Diponegoro No.12, RT.1/RW.4, Menteng, Kota Jakarta Pusat, DKI Jakarta',
    isPrimary: true,
  },
];

export const products: Product[] = [
  {
    id: 101,
    name: 'INSEKTISIDA GRACIA 103 EC – Perlindungan Optimal',
    variant: '100 ml',
    price: 269000,
    quantity: 1,
    image: require('@/assets/images/trash/image18.png'),

    seller: {
      id: 'mudiafarmer',
      name: 'Mudia Farmer',
      image: require('@/assets/images/trash/image18.png'),
      bio: 'Petani modern dari Malang yang fokus pada pertanian ramah lingkungan.',
    },
  },
];

export const shippingOptions: ShippingOption[] = [
  {
    id: 1,
    label: 'Standard',
    cost: 20000,
    eta: 'Tomorrow - 28 April',
    insuranceIncluded: true,
  },
  {
    id: 2,
    label: 'Express',
    cost: 40000,
    eta: 'Today - 27 April',
    insuranceIncluded: true,
  },
];

export const vouchers: Voucher[] = [
  {
    id: 1,
    label: 'Use voucher / promo code',
    code: '',
    discountAmount: 0,
    isApplied: false,
  },
];

export const paymentMethods: PaymentMethod[] = [
  {
    id: 1,
    bankName: 'BCA Virtual Account',
    icon: require('@/assets/images/payment/bank/bca.png'),
    isSelected: true,
  },
];

export const paymentSummary: PaymentSummary = {
  itemsTotal: 269000,
  shippingFee: 20000,
  platformFee: 1000,
  grandTotal: 290000,
};

const CheckoutScreen = () => {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [_shippingOption, setShippingOption] = useState<ShippingOption | null>(
    null
  );
  const [voucher, setVoucher] = useState<Voucher | null>(null);
  const [summary, setSummary] = useState<PaymentSummary | null>(null);
  const [note, setNote] = useState<string>('');
  const { selectedPayment } = useEcommerceStore();

  const { shippingVoucher, discountVoucher, selectedShipping } =
    useEcommerceStore();

  useEffect(() => {
    setSelectedAddress(addresses[0]);
    setSelectedProduct(products[0]);
    setShippingOption(shippingOptions[0]);
    setVoucher(vouchers[0]);

    // Hitung total awal + diskon dari voucher
    let shippingFee = shippingOptions[0].cost;
    let itemsTotal = products[0].price;
    let platformFee = 1000;

    if (shippingVoucher) {
      shippingFee = Math.max(shippingFee - shippingVoucher.value, 0);
    }

    let discountAmount = 0;
    if (discountVoucher) {
      discountAmount = discountVoucher.value; // Atur sesuai logika voucher diskon kamu
    }

    const grandTotal = Math.max(
      itemsTotal + shippingFee + platformFee - discountAmount,
      0
    );

    setSummary({
      itemsTotal,
      shippingFee,
      platformFee,
      grandTotal,
    });
  }, [shippingVoucher, discountVoucher]);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={false}
      />
      <SafeAreaView
        edges={['top', 'right', 'left']}
        className="bg-[#F8F8F8] flex-1 "
      >
        {/* Header */}
        <View className="relative flex-row bg-white items-center p-4">
          <TouchableOpacity onPress={() => router.back()}>
            <BackIcons width={24} height={24} />
          </TouchableOpacity>
          <View className="flex-1 items-center -ml-6">
            <Text className="font-semibold text-[18px]">Checkout</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 10, flexGrow: 1 }}>
          {/* Shipping Address */}
          {selectedAddress && (
            <View className="bg-white mt-3 px-4 py-3 rounded-md mx-3">
              <Text className="text-[16px] text-[#1f1f1f] font-semibold mb-2">
                Shipping Address
              </Text>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center space-x-1 mb-1">
                  <LocationIcons width={24} height={24} />
                  <Text className="text-[16px] font-semibold text-[#1f1f1f]">
                    {selectedAddress.name} {''}
                  </Text>
                  <Text className="text-[13px] text-[#BCBCBC]">
                    | {selectedAddress.phone}
                  </Text>
                </View>
                <ChevronRight color="#BCBCBC" />
              </View>
              <Text numberOfLines={1} className="text-[12px] text-[#BCBCBC]">
                {selectedAddress.address.split(' ').slice(0, 8).join(' ') +
                  '...'}
              </Text>
            </View>
          )}

          {/* Product Info */}
          {selectedProduct && (
            <View className="bg-white mt-3 px-4 py-3 rounded-md mx-3">
              <View className="flex-row items-center space-x-3 mb-2 ">
                <Image
                  source={selectedProduct.seller.image}
                  className="w-6 h-6 rounded-full"
                  resizeMode="contain"
                />
                <Text className="text-[14px] font-semibold text-[#1F1F1F] ml-2">
                  {selectedProduct.seller.name}
                </Text>
              </View>

              <View className="flex-row space-x-3 items-center">
                <Image
                  source={selectedProduct.image}
                  className="w-20 h-20 rounded-md"
                />
                <View className="flex-1 ml-2">
                  <Text className="text-[13px] font-semibold text-[#1F1F1F]">
                    {selectedProduct.name}
                  </Text>
                  <Text className="text-[12px] text-[#9E9E9E]">
                    {selectedProduct.variant}
                  </Text>
                  <Text className="text-[14px] text-[#1F1F1F] mt-1 font-bold">
                    Rp{selectedProduct.price.toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>
          )}

          <ShippingOptionCard
            onPress={() => router.push('/e-commerce/checkout/shipping-options')}
          />

          {/* Note */}
          <View className="bg-white px-4 py-3 rounded-md mx-3">
            <NoteTriggerButton value={note} onChange={setNote} />
          </View>

          {/* Voucher Tani */}
          {voucher && <VoucherCard />}

          {/* Payment Method */}
          {selectedPayment && (
            <View className="bg-white mt-3 px-4 py-3 rounded-md mx-3">
              <View className="flex-row justify-between items-center pb-3 border-b border-[#E5E5E5] mb-3">
                <Text className="text-[14px] font-semibold text-[#1F1F1F]">
                  Payment Method
                </Text>
                <TouchableOpacity
                  onPress={() => router.push('/e-commerce/checkout/payment')}
                >
                  <Text className="text-[13px] text-[#00A86B] font-medium">
                    See all
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="flex-row items-center space-x-2">
                <Image
                  source={selectedPayment.logo}
                  resizeMode="contain"
                  className="w-[40px] h-[28px]"
                />
                <View className="ml-3">
                  <Text className="text-[14px] text-[#1F1F1F] font-semibold">
                    {selectedPayment.label}
                  </Text>
                  {selectedPayment.description && (
                    <Text className="text-[12px] text-[#9E9E9E]">
                      {selectedPayment.description}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          )}

          {/* Payment Details */}
          {summary && (
            <View className="bg-white mt-3 mb-3 px-4 py-3 rounded-md mx-3">
              <Text className="text-[14px] font-semibold mb-3 text-[#1F1F1F]">
                Payment Details
              </Text>
              <View className="flex-row justify-between mb-1">
                <Text className="text-[14px] text-[#9E9E9E]">
                  Total price (1 products)
                </Text>
                <Text className="text-[14px] text-[#1F1F1F]">
                  {' '}
                  Rp{summary.itemsTotal.toLocaleString()}
                </Text>
              </View>
              <View className="flex-row justify-between mb-1 items-center">
                <Text className="text-[14px] text-[#9E9E9E]">Shipping fee</Text>
                <View className="flex-row items-center space-x-1">
                  {shippingVoucher &&
                  selectedShipping?.discountCost !== undefined ? (
                    <>
                      <Text className="text-[14px] text-[#9E9E9E] mr-2 line-through">
                        Rp{selectedShipping.discountCost.toLocaleString()}
                      </Text>
                      <Text className="text-[14px] text-[#00A86B] font-semibold">
                        Rp{selectedShipping.cost.toLocaleString()}
                      </Text>
                    </>
                  ) : (
                    <Text className="text-[14px] text-[#1F1F1F] font-semibold">
                      Rp{summary.shippingFee.toLocaleString()}
                    </Text>
                  )}
                </View>
              </View>

              <View className="flex-row justify-between">
                <Text className="text-[14px] text-[#9E9E9E]">Platform fee</Text>
                <Text className="text-[14px] text-[#1F1F1F]">
                  Rp{summary.platformFee.toLocaleString()}
                </Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Total & Pay Button */}
        {summary && summary.grandTotal > 0 && (
          <SafeAreaView
            edges={['bottom']}
            className="bg-white rounded-t-2xl"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 10,
            }}
          >
            <View className="flex-row justify-between items-center px-4 py-3">
              <View>
                <Text className="text-[14px] text-[#9E9E9E]">Total Bill</Text>
                <Text className="text-[14px] text-[#00A86B] font-semibold">
                  Rp{summary.grandTotal.toLocaleString()}
                </Text>
              </View>
              <TouchableOpacity
                className="bg-[#00A86B] px-6 py-2 rounded-xl"
                onPress={() => router.push('/e-commerce/checkout/success')}
              >
                <Text className="text-white font-semibold text-[14px]">
                  Pay Now
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
      </SafeAreaView>
    </>
  );
};

export default CheckoutScreen;
