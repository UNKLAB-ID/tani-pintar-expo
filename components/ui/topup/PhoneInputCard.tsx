import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import TelkomselIcon from '@/assets/icons/global/telkomsel-icon';
import IndosatIcon from '@/assets/icons/global/isat-icon';
import XlIcon from '@/assets/icons/global/xl-icon';
import TelephoneIcon from '@/assets/icons/profile/telephone-icons';
import { OperatorKey } from '@/utils/detect-operator/detectOperator';
import React from 'react';

/* ================= ICON ================= */

const OperatorIcon = ({ operator }: { operator: OperatorKey }) => {
  switch (operator) {
    case 'TELKOMSEL':
      return <TelkomselIcon width={18} height={18} />;
    case 'INDOSAT':
      return <IndosatIcon width={18} height={18} />;
    case 'XL':
      return <XlIcon width={18} height={18} />;
    default:
      return null;
  }
};

/* ================= PROPS ================= */

type Props = {
  value: string;
  label: string;
  placeholder: string;
  keyboardType?: 'number-pad' | 'default';
  operator?: OperatorKey | null; // 🔥 INI KUNCI
  rightIcon?: React.ReactNode; // PLN / custom
  showClear?: boolean;
  errorText?: string;
  onChange: (value: string) => void;
  onClear?: () => void;
};

/* ================= COMPONENT ================= */

export default function PhoneInputCard({
  value,
  label,
  placeholder,
  keyboardType = 'number-pad',
  operator,
  rightIcon,
  showClear,
  errorText,
  onChange,
  onClear,
}: Props) {
  const showOperatorIcon = value.length > 0 && operator;

  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputRow}>
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor="#BDBDBD"
          keyboardType={keyboardType}
          style={styles.input}
        />

        <View style={styles.rightBox}>
          {/* ICON */}
          {showOperatorIcon ? (
            <OperatorIcon operator={operator} />
          ) : (
            (rightIcon ?? <TelephoneIcon width={18} height={18} />)
          )}

          {/* CLEAR */}
          {showClear && onClear && (
            <TouchableOpacity onPress={onClear} style={styles.clearButton}>
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {errorText && <Text style={styles.error}>{errorText}</Text>}
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  label: {
    fontSize: 13,
    color: '#169953',
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  rightBox: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 56,
    justifyContent: 'flex-end',
  },
  clearButton: {
    marginLeft: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  error: {
    marginTop: 6,
    fontSize: 12,
    color: '#E53935',
  },
});
