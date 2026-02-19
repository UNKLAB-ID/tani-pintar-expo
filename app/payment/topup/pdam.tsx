import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { TransferHeader } from '@/components/ui/payment/transfer-header';
import { useState } from 'react';

export default function PDAMTopUp() {
  const [customerNumber, setCustomerNumber] = useState('');
  const isError = customerNumber.length > 0;

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <SafeAreaView style={{ flex: 1, backgroundColor: '#F6F6F6' }}>
        {/* HEADER */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          <TransferHeader
            title="PDAM Water"
            subtitle="You can pay your PDAM water bill here."
            onBack={() => router.back()}
          />
        </View>

        {/* CARD */}
        <View
          style={{
            backgroundColor: '#FFFFFF',
            marginHorizontal: 16,
            borderRadius: 16,
            padding: 16,
            shadowColor: '#000',
            shadowOpacity: 0.08,
            shadowRadius: 10,
            elevation: 4,
          }}
        >
          {/* Province */}
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: '#2E7D32',
              marginBottom: 6,
              marginTop: 12,
            }}
          >
            Province
          </Text>
          <TouchableOpacity
            style={{
              height: 48,
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: 10,
              justifyContent: 'center',
              paddingHorizontal: 12,
            }}
          >
            <Text
              style={{
                color: '#424242',
                fontSize: 14,
              }}
            >
              Banten
            </Text>
          </TouchableOpacity>

          {/* Region */}
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: '#2E7D32',
              marginBottom: 6,
              marginTop: 12,
            }}
          >
            Region
          </Text>
          <TouchableOpacity
            style={{
              height: 48,
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: 10,
              justifyContent: 'center',
              paddingHorizontal: 12,
            }}
          >
            <Text
              style={{
                color: '#424242',
                fontSize: 14,
              }}
            >
              Kota Tangerang
            </Text>
          </TouchableOpacity>

          {/* Customer Number */}
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: '#2E7D32',
              marginBottom: 6,
              marginTop: 12,
            }}
          >
            Customer Number
          </Text>
          <TextInput
            value={customerNumber}
            onChangeText={setCustomerNumber}
            placeholder="Input your customer number"
            keyboardType="number-pad"
            style={{
              height: 48,
              borderWidth: 1,
              borderColor: '#E0E0E0',
              borderRadius: 10,
              paddingHorizontal: 12,
              fontSize: 14,
            }}
          />

          {isError && (
            <Text
              style={{
                color: '#D32F2F',
                fontSize: 12,
                marginTop: 6,
              }}
            >
              *Customer number is not available
            </Text>
          )}

          {/* Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: '#4C9A5A',
              paddingVertical: 14,
              borderRadius: 12,
              marginTop: 16,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#FFF', fontWeight: '600', fontSize: 16 }}>
              View Bill
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}
