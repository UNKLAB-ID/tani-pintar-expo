import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import { X } from 'lucide-react-native';
import { formatPrice } from '@/utils/format-currency/currency';
import WarningIcon from '@/assets/icons/profile/warning-icons';

interface RefundItem {
  id: string;
  title: string;
  amount: number;
}

interface ModalEstimateSolutionProps {
  visible: boolean;
  onClose: () => void;
  refundItems: RefundItem[];
}

const ModalEstimateSolution = ({
  visible,
  onClose,
  refundItems,
}: ModalEstimateSolutionProps) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Pressable style={{ flexGrow: 1, width: '100%' }} onPress={onClose} />

        <View
          style={{
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingVertical: 16,
            width: '100%',
            maxHeight: '70%',
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 16,
              paddingHorizontal: 16,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#1F1F1F',
                textAlign: 'center',
                flex: 1,
              }}
            >
              Estimated Refund
            </Text>
            <TouchableOpacity onPress={onClose}>
              <X size={20} color="#1F1F1F" />
            </TouchableOpacity>
          </View>

          {/* Refund List */}
          <ScrollView
            style={{ paddingHorizontal: 16 }}
            showsVerticalScrollIndicator={false}
          >
            {refundItems.slice(0, refundItems.length - 1).map(item => (
              <View
                key={item.id}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 6,
                }}
              >
                <Text style={{ fontSize: 14, color: '#7D7D7D' }}>
                  {item.title}
                </Text>
                <Text style={{ fontSize: 14, color: '#7D7D7D' }}>
                  {formatPrice(item.amount)}
                </Text>
              </View>
            ))}

            {/* Total Refund (item terakhir di array) */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 6,
                borderTopWidth: 1,
                borderTopColor: '#E9E9E9',
                marginTop: 8,
              }}
            >
              <Text
                style={{ fontSize: 14, fontWeight: '600', color: '#1F1F1F' }}
              >
                {refundItems[refundItems.length - 1].title}
              </Text>
              <Text
                style={{ fontSize: 14, fontWeight: '600', color: '#1F1F1F' }}
              >
                {formatPrice(refundItems[refundItems.length - 1].amount)}
              </Text>
            </View>

            {/* Note */}
            <View
              style={{
                marginTop: 12,
                padding: 12,
                backgroundColor: '#FFF8EA',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#CA9325',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              {/* Warning Icon */}
              <WarningIcon width={22} height={22} style={{ marginRight: 8 }} />
              <Text style={{ fontSize: 12, flex: 1 }}>
                The total refund amount may change based on requests from the
                seller or other related parties.
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ModalEstimateSolution;
