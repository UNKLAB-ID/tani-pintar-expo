import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  ScrollView,
} from 'react-native';
import BankSendMoneyIcon from '@/assets/icons/payment/bank-sendmoney-icon';
import BackIcons from '@/assets/icons/global/back-icons';
import ModalBankList from './modal-bank-list';
import { bankList, storeList } from '@/assets/data/listStore';
import { Icon } from 'lucide-react-native';
import ModalPaymentInstruction from './modal-payment-instruction';

interface ListItem {
  id: number;
  name: string;
  logo: ImageSourcePropType;
}

interface PaymentMethodSectionProps {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ width?: number; height?: number }>;
  data: ListItem[];
  onSelectItem?: (bank: string) => void;
  type: 'bank' | 'store';
}

const PaymentMethodSection: React.FC<PaymentMethodSectionProps> = ({
  title,
  subtitle,
  icon: Icon,
  data,
  type,
  onSelectItem,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ListItem | null>(null);
  const [showInstructionModal, setShowInstructionModal] = useState(false);

  const MAX_VISIBLE_ICONS = 4;
  const visibleIcons = (data ?? []).slice(0, MAX_VISIBLE_ICONS);
  const hiddenCount = Math.max(data.length - visibleIcons.length, 0);

  const handleSelectItem = (item: ListItem) => {
    setSelectedItem(item);
    setShowModal(false);
    setShowInstructionModal(true);
    if (onSelectItem) {
      onSelectItem(item.name);
    }
  };

  const modalData = type === 'bank' ? bankList : storeList;

  return (
    <View className="shadow-md bg-white p-4 rounded-xl mt-4">
      <View className="flex flex-col">
        <View className=" mb-2">
          <Icon width={24} height={24} />
          <Text className="text-[16px] font-semibold py-1">{title}</Text>
        </View>
        <Text className="text-[12px] text-[#B3B3B3]">{subtitle}</Text>
        <View className="flex-row items-center mt-3">
          <View className="flex-row flex-1 flex-wrap pb-2">
            {visibleIcons.map((bank, idx) => (
              <TouchableOpacity
                key={idx}
                className="border mr-2 bg-white border-[#E9E9E9] px-1 py-2 rounded-xl"
                onPress={() => handleSelectItem(bank)}
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 1,
                }}
              >
                <Image
                  source={bank.logo}
                  style={{ width: 30, height: 21, resizeMode: 'contain' }}
                />
              </TouchableOpacity>
            ))}
          </View>
          {hiddenCount > 0 && (
            <TouchableOpacity
              className="items-center justify-center mr-4 px-2 border border-[#E9E9E9] bg-white rounded-xl flex-row"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 1,
              }}
              onPress={() => setShowModal(true)}
            >
              <Text className="text-[12px] mx-2">View {hiddenCount} more</Text>
              <BackIcons
                width={24}
                height={24}
                color="#169953"
                direction="right"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* Modal list (kalau klik "View more") */}
      <ModalBankList
        visible={showModal}
        onClose={() => setShowModal(false)}
        data={modalData}
        onSelectItem={handleSelectItem}
      />

      {/* Modal instruksi */}
      <ModalPaymentInstruction
        visible={showInstructionModal}
        onClose={() => setShowInstructionModal(false)}
        item={selectedItem}
      />
    </View>
  );
};

export default PaymentMethodSection;
