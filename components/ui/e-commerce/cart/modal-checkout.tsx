import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { formatPrice } from '@/utils/format-currency/currency';

interface ModalCheckoutProps {
  isVisible: boolean;
  onConfirm: () => void;
  totalItems: number;
  subtotal: number;
  platformFee?: number;
}

const { width } = Dimensions.get('window');

const ModalCheckout: React.FC<ModalCheckoutProps> = ({
  isVisible,
  onConfirm,
  totalItems,
  subtotal,
  platformFee = 1000,
}) => {
  if (!isVisible) return null;

  const total = subtotal + platformFee;

  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: width,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    zIndex: 99,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
    elevation: 10,
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
