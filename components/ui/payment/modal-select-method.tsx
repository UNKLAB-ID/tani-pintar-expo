import { View, Text, Modal, TouchableOpacity, Pressable } from 'react-native';
import { X } from 'lucide-react-native';
import RectangleIcon from '@/assets/icons/global/rectangle-icon';
import WalletSendMoneyIcon from '@/assets/icons/payment/wallet-sendmoney-icon';
import { formatPrice } from '@/utils/format-currency/currency';
import { router } from 'expo-router';

interface ModalSelectMethodProps {
  visible: boolean;
  onClose: () => void;
  balance: number;
  amount: number;
  onPress?: () => void;
  onSelect?: (method: string) => void;
}
const ModalSelectMethod: React.FC<ModalSelectMethodProps> = ({
  visible,
  onClose,
  balance,
  amount,
  onPress,
  onSelect,
}) => {
  const isInsufficient = amount > 0 && balance < amount;
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
            backgroundColor: '#f8f8f8',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
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
              marginBottom: 16,
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: '#1F1F1F',
              }}
            >
              Select Methods
            </Text>

            <TouchableOpacity onPress={onClose}>
              <X size={20} color="#1F1F1F" />
            </TouchableOpacity>
          </View>
          <Text className="text-[14px] font-medium ">Available methods</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: '#fff',

              marginTop: 12,
              borderRadius: 12,
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOpacity: 0.05,
              shadowRadius: 6,
              elevation: 2,
            }}
            onPress={() => onSelect?.('TaniPay')}
          >
            {/* Icon */}
            <WalletSendMoneyIcon width={32} height={32} />

            {/* Info */}
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text
                style={{ fontSize: 16, fontWeight: '600', color: '#1F1F1F' }}
              >
                TaniPay
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: isInsufficient ? '#6F6F6F' : '#166553',
                  marginTop: 4,
                }}
              >
                {isInsufficient
                  ? `Low balance:${formatPrice(balance)}`
                  : `Balance: ${formatPrice(balance)}`}
              </Text>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: '#E6F9F0',
                paddingHorizontal: 16,
                paddingVertical: 6,
                borderRadius: 20,
              }}
              onPress={() => {
                onClose();
                router.push('/payment/send-money-topup'); // langsung ke halaman top up
              }}
            >
              <Text style={{ color: '#16A34A', fontWeight: '600' }}>
                Top up
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalSelectMethod;
