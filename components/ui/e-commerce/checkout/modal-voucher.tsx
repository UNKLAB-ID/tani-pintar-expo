import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import { Clock } from 'lucide-react-native';
import BackIcons from '@/assets/icons/global/back-icons';

interface VoucherItem {
  id: string;
  title: string;
  description: string;
  deadline: string;
  value: number;
  type: 'shipping' | 'discount';
}

interface ModalVoucherProps {
  vouchers: VoucherItem[];
  selectedVoucherIds: {
    shipping: string | null;
    discount: string | null;
  };
  onSelect: (voucher: VoucherItem) => void;
  onCancel: (voucher: VoucherItem) => void;
  visible: boolean;
  onClose: () => void;
}

const ModalVoucher: React.FC<ModalVoucherProps> = ({
  vouchers,
  selectedVoucherIds,
  onSelect,
  onCancel,
  visible,
  onClose,
}) => {
  const [showMore, setShowMore] = useState({
    shipping: false,
    discount: false,
  });

  const renderVoucherList = (type: 'shipping' | 'discount') => {
    const filtered = vouchers.filter(v => v.type === type);
    const displayVouchers = showMore[type] ? filtered : filtered.slice(0, 2);

    return (
      <View className="mb-6">
        <Text className="text-base font-semibold mb-2 capitalize text-black">
          {type === 'shipping' ? 'Shipping Voucher' : 'Discount Voucher'}
        </Text>

        {displayVouchers.map(voucher => {
          const isSelected = selectedVoucherIds[type] === voucher.id;

          return (
            <View
              key={voucher.id}
              className="bg-white border border-[#E0E0E0] rounded-xl p-4 mb-3"
            >
              <Text className="text-base font-semibold mb-1">
                {voucher.title}
              </Text>
              <Text className="text-[12px] text-[#7A7A7A] mb-3">
                {voucher.description}
              </Text>

              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <Clock size={14} color="#7A7A7A" />
                  <Text className="text-[12px] text-[#7A7A7A] ml-1">
                    Ends on {voucher.deadline}
                  </Text>
                </View>

                {isSelected ? (
                  <TouchableOpacity
                    className="border border-red-500 bg-red-100 px-4 py-2 rounded-2xl"
                    onPress={() => onCancel(voucher)}
                  >
                    <Text className="text-red-600 text-sm">Cancel</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    className="bg-[#00A86B] px-4 py-2 rounded-2xl"
                    onPress={() => onSelect(voucher)}
                  >
                    <Text className="text-white text-sm">Use</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}

        {filtered.length > 2 && !showMore[type] && (
          <TouchableOpacity
            onPress={() => setShowMore(prev => ({ ...prev, [type]: true }))}
            className="mt-1"
          >
            <Text className="text-[14px] text-[#00A86B] font-semibold text-center">
              See More {type === 'shipping' ? 'Shipping' : 'Discount'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0.25)',
        }}
      >
        <View
          className="bg-white w-full p-5 max-h-[80%]"
          style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
        >
          <View className="w-12 h-1.5 bg-gray-300 rounded-full self-center mb-3" />
          <View className="flex-row items-center p-4 mb-2">
            <Pressable onPress={onClose}>
              <BackIcons width={24} height={24} />
            </Pressable>

            <Text className="text-lg font-semibold ml-4">Pilih Voucher</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="px-2">
            {renderVoucherList('shipping')}
            {renderVoucherList('discount')}
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  );
};

export default ModalVoucher;
