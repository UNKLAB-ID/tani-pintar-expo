import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { router } from 'expo-router';
import { transactionHistoryResponse } from '@/assets/data/transaksi';
import { useTranslate } from '@/i18n';

//icons
import PDAMicon from '@/assets/icons/payment/pdam-icon';
import DataPackageIcon from '@/assets/icons/payment/data-package-icon';
import PLNicon from '@/assets/icons/payment/pln-icon';
import PhoneIcon from '@/assets/icons/payment/phone-icon';
import PoutingIcon from '@/assets/icons/payment/pouting-icon';
import BackIcons from '@/assets/icons/global/back-icons';
import NotificationIcons from '@/assets/icons/global/notification-icons';
import TopUpMenuIcon from '@/assets/icons/payment/topup-menu-icon';
import SendMoneyIcon from '@/assets/icons/payment/send-money-icon';
import WithDrawIcon from '@/assets/icons/payment/withdraw-icon';
import HistoryIcon from '@/assets/icons/payment/history-icon';
import CashbackIcon from '@/assets/icons/payment/cashback-icon';
import WalletPay from '@/assets/icons/payment/wallet-tanipay-icon';
import InfoAmountIcont from '@/assets/icons/payment/info-amount-icon';
//components
import ModalCashback from '@/components/ui/payment/modal-cashback';
import TransferHistory from '@/components/ui/payment/card-transfer-history';

const screenHeight = Dimensions.get('window').height;

const TaniPay = () => {
  const t = useTranslate();
  const [isShowModal, setShowModal] = useState(false);

  const STATUSBAR_HEIGHT =
    Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 44; // iOS notch-safe

  const historyToShow = transactionHistoryResponse.data.slice(0, 4);
  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <SafeAreaView
        edges={['top']}
        style={{ flex: 1, backgroundColor: '#fff' }}
      >
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          <View className="flex-row p-4 bg-primary items-center">
            <TouchableOpacity onPress={() => router.push('/profile')}>
              <BackIcons width={24} height={24} color="#fff" />
            </TouchableOpacity>
            <Text className="text-white text-[16px] font-semibold ml-3">
              {t('taniPay')}
            </Text>
            <View className="flex-1" />
            <NotificationIcons width={24} height={24} />
          </View>
          <View
            className="bg-primary px-4 pt-4 flex-row items-stretch justify-between"
            style={{ paddingBottom: 55 }}
          >
            {/* TaniPay Box */}
            <View className="w-[45%] bg-white rounded-xl  px-4 py-3 items-center justify-center">
              <View className="flex-row items-center mb-1">
                <WalletPay width={24} height={24} />
                <Text className="ml-1 text-[16px] font-medium">
                  {t('taniPay')}
                </Text>
              </View>
              <Text className="text-[16px] font-semibold text-center text-black">
                Rp100.000
              </Text>
            </View>

            {/* Garis Pemisah */}
            <View className="w-[1px] bg-[#3D3D3D] mx-[1%]" />

            {/* CashBack Box */}
            <TouchableOpacity
              onPress={() => setShowModal(true)}
              className="w-[45%] bg-white rounded-xl px-4 py-3 items-center justify-center"
            >
              {/* Title */}
              <View className="flex-row items-center mb-1">
                <CashbackIcon width={24} height={24} />
                <Text className="ml-1 text-[16px] font-medium">
                  {t('cashback')}
                </Text>
              </View>

              {/* Amount + Info Icon in one row */}
              <View className="flex-row items-center justify-center">
                <Text className="text-[16px] font-semibold text-black">
                  Rp50.000
                </Text>
                <InfoAmountIcont
                  width={12}
                  height={12}
                  style={{ marginLeft: 4, marginTop: -4 }}
                />
              </View>
            </TouchableOpacity>
          </View>
          {/* Main Menu Overlapping */}
          <View className="px-4 -mt-12 z-10">
            <View className="flex-row justify-around rounded-xl bg-white p-4 shadow-md">
              <TouchableOpacity
                onPress={() => router.push('/payment/topup/topup')}
                className="items-center"
              >
                <TopUpMenuIcon width={32} height={32} />
                <Text className="mt-1 text-xs">{t('topUp')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push('/payment/sendmoney/send-money')}
                className="items-center"
              >
                <SendMoneyIcon width={32} height={32} />
                <Text className="mt-1 text-xs">{t('transfer')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push('/payment/withdraw/withdraw')}
                className="items-center"
              >
                <WithDrawIcon width={32} height={32} />
                <Text className="mt-1 text-xs">{t('receive')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push('/payment/history/history')}
                className="items-center"
              >
                <HistoryIcon width={32} height={32} />
                <Text className="mt-1 text-xs">{t('orderHistory')}</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Other Menu */}
          <View className="relative px-4 mt-6 ">
            <Text className="font-semibold mb-2">Other Menu</Text>
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => router.push('/payment/topup/pulsa')}
                className="items-center"
              >
                <View
                  className="items-center w-[70px] py-2 bg-white "
                  style={{
                    borderWidth: 1,
                    borderColor: '#E5E5E5',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 4,
                    elevation: 1,
                  }}
                >
                  <PhoneIcon width={28} height={28} />
                </View>
                <Text className="text-center mt-1 text-xs">Pulsa</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push('/payment/topup/pln')}
                className="items-center"
              >
                <View
                  className="items-center w-[70px] py-2 bg-white "
                  style={{
                    borderWidth: 1,
                    borderColor: '#E5E5E5',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 4,
                    elevation: 1,
                  }}
                >
                  <PLNicon width={24} height={24} />
                </View>
                <Text className="text-center mt-1 text-xs">
                  PLN Electricity
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="items-center">
                <View
                  className="items-center w-[70px] py-2 bg-white "
                  style={{
                    borderWidth: 1,
                    borderColor: '#E5E5E5',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 4,
                    elevation: 1,
                  }}
                >
                  <PDAMicon width={24} height={24} />
                </View>
                <Text className="text-center mt-1 text-xs">PDAM Water</Text>
              </TouchableOpacity>

              <TouchableOpacity className="items-center">
                <View
                  className="items-center w-[70px] py-2 bg-white "
                  style={{
                    borderWidth: 1,
                    borderColor: '#E5E5E5',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 4,
                    elevation: 1,
                  }}
                >
                  <DataPackageIcon width={24} height={24} />
                </View>
                <Text className="text-center mt-1 text-xs">Data Package</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Promo Banner */}
          <View className="p-4">
            <Text className="text-[14px] font-semibold">Promo</Text>
            <View className="mt-3">
              <Image
                source={require('@/assets/images/trash/Banner.png')}
                className="w-full h-[100px] rounded-lg"
                resizeMode="cover"
              />
            </View>
          </View>

          {/* Transaction History */}
          <View className="px-4">
            <View className="flex-row justify-between mb-2">
              <Text className="text-[14px] font-semibold">
                {t('orderHistory')}
              </Text>
              <TouchableOpacity>
                <Text className="text-[12px] text-[#6F6F6F] font-medium">
                  {t('seeAll')}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              className="bg-white p-4"
              style={{
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#E5E5E5',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 4,
                elevation: 1,
                minHeight: screenHeight * 0.25,
              }}
            >
              {historyToShow.length === 0 ? (
                <View className=" flex-1 justify-center items-center">
                  <PoutingIcon width={24} height={24} />
                  <Text style={{ marginTop: 8, color: '#999' }}>
                    {t('noData')}
                  </Text>
                </View>
              ) : (
                historyToShow.map(item => (
                  <TransferHistory
                    key={item.id}
                    type={item.type}
                    title={item.title}
                    amount={item.amount}
                    date={item.date}
                    description={item.description}
                    status={item.status}
                    onPress={() => console.log('Klik:', item.title)}
                  />
                ))
              )}
            </View>
          </View>

          <ModalCashback
            visible={isShowModal}
            onClose={() => setShowModal(false)}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default TaniPay;
