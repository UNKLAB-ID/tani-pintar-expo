import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import { formatPrice } from '@/utils/format-currency/currency';

interface ModalCheckoutProps {
  isVisible: boolean;
  onConfirm: () => void;
  totalItems: number;
  subtotal: number;
  platformFee?: number;
  onClose?: () => void; // opsional jika ingin bisa ditutup manual
}

const { width } = Dimensions.get('window');

const ModalCheckout: React.FC<ModalCheckoutProps> = ({
  isVisible,
  onConfirm,
  totalItems,
  subtotal,
  platformFee = 1000,
  onClose,
}) => {
  const total = subtotal + platformFee;

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.container}>
          <View style={styles.inner}>
            <View>
              <Text style={styles.label}>Subtotal + Fee</Text>
              <Text style={styles.total}>{formatPrice(total)}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={onConfirm}>
              <Text style={styles.buttonText}>Checkout ({totalItems})</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  container: {
    width: width,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
    elevation: 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  inner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#7d7d7d',
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  button: {
    backgroundColor: '#0AAD55',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default ModalCheckout;
