import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { router } from 'expo-router';
// icons
import RectangleIcon from '@/assets/icons/global/rectangle-icon';
import WalletSendMoneyIcon from '@/assets/icons/payment/wallet-sendmoney-icon';

interface ModalConfirmationWithdrawProps {
  visible: boolean;
  onClose: () => void;
}
const ModalConfirmationWithdraw: React.FC<ModalConfirmationWithdrawProps> = ({
  visible,
  onClose,
}) => {
  return (
    <Modal transparent animationType="slide" visible={visible}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}
      >
        <Pressable style={{ flexGrow: 1 }} onPress={onClose} />

        <View
          style={{
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingBottom: 20,
            paddingHorizontal: 16,
          }}
        >
          <View className="p-4 items-center">
            <RectangleIcon width={86} height={4} />
          </View>
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: '#f4f4f4',
              paddingBottom: 12,
              marginBottom: 16,
              marginHorizontal: -16,
              paddingHorizontal: 16,
            }}
          >
            <TouchableOpacity onPress={onClose}>
              <ChevronLeft width={20} height={20} color="#1F1F1F" />
            </TouchableOpacity>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                fontSize: 16,
                fontWeight: '600',
                color: '#1F1F1F',
                marginRight: 24,
              }}
            >
              Confirmation
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-[16px] font-semibold text-[#1F1F1F]">
              Rp 50.000
            </Text>

            <View className="flex-row items-center justify-between w-full mt-5 px-4 border-b pb-2 border-[#E5E5E5]">
              <Text className="text-[14px] text-[#6F6F6F] font-medium">
                Cash withdraw
              </Text>

              <View className="flex-row items-center ">
                <Image
                  source={require('@/assets/images/payment/indomaret.png')}
                  resizeMode="contain"
                  style={{ width: 50, height: 30, marginRight: 6 }}
                />
                <Text className="text-[14px] font-medium">Indomaret</Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between w-full mt-5 px-4 border-b pb-2 border-[#E5E5E5]">
              <Text className="text-[14px] text-[#6F6F6F] font-medium">
                Cash Withdraw Amount
              </Text>

              <View className="flex-row items-center">
                <Text className="text-[14px] font-medium">Rp50.000</Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between w-full mt-5 px-4 border-b pb-2 border-[#E5E5E5]">
              <Text className="text-[14px] text-[#6F6F6F] font-medium">
                Cash withdraw fee
              </Text>

              <View className="flex-row items-center">
                <Text className="text-[14px] font-medium">Rp2.000</Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between w-full mt-5 px-4">
              <Text className="text-[14px] text-[#6F6F6F] font-medium">
                From
              </Text>

              <View className="flex-row items-center">
                <Text className="text-[14px] font-medium mx-3">TaniPay</Text>
                <WalletSendMoneyIcon width={20} height={20} />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View className="items-center bg-white p-3 rounded-xl">
        <TouchableOpacity
          onPress={() => router.push('/payment/withdraw/cash-withdraw')}
          className="bg-primary p-4 rounded-xl w-full items-center"
        >
          <Text className="text-white text-[14px]">Confirmation</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalConfirmationWithdraw;
