import { View, Text } from 'react-native';
import VoucherIcons from '@/assets/icons/global/voucher-icons';
import Wallet2Icons from '@/assets/icons/global/wallet2-icons';
import WalletIcons from '@/assets/icons/global/wallet-icons';

const WalletVoucherSection = () => {
  return (
    <View className="px-5 mt-5">
      <View className="flex-row w-full bg-[#F0F0F0] justify-between rounded-xl py-4 px-4">
        {/* TaniPay */}
        <View className="w-1/3 items-start">
          <View className="flex-row items-center mb-1 mt-1">
            <WalletIcons width={16} height={16} />
            <Text className="text-[12px] font-medium text-black ml-1">
              TaniPay
            </Text>
          </View>
          <Text className="text-[12px] font-bold text-black">Rp20.000</Text>
          <Text className="text-[10px] text-gray-500">Topup minimum...</Text>
        </View>

        {/* TaniPinjam */}
        <View className="w-1/3">
          <View className="flex-row items-center mb-1 mt-1">
            <Wallet2Icons width={16} height={16} />
            <Text className="text-[12px] font-medium text-black ml-1">
              TaniPinjam
            </Text>
          </View>
          <Text className="text-[12px] font-bold text-[#28a745]">
            ActivateNow
          </Text>
          <Text className="text-[10px] text-gray-500">Limit up to Rp20...</Text>
        </View>

        {/* Voucher */}
        <View className="w-1/3">
          <View className="flex-row items-center mb-1 mt-1">
            <VoucherIcons width={16} height={16} />
            <Text className="text-[12px] font-medium text-black ml-1">
              Voucher
            </Text>
          </View>
          <Text className="text-[12px] font-bold text-black">
            Voucher Discount
          </Text>
          <Text className="text-[10px] text-[#28a745]">
            Free Delivery Service
          </Text>
        </View>
      </View>
    </View>
  );
};

export default WalletVoucherSection;
