import TelkomselIcon from '@/assets/icons/global/telkomsel-icon';
import IsatIcon from '@/assets/icons/global/isat-icon';
import XLIcon from '@/assets/icons/global/xl-icon';
import PaymentMethodSection from '@/components/ui/component-globals/payment-method-section';
import { TransferHeader } from '@/components/ui/payment/transfer-header';
import { useEcommerceStore } from '@/store/e-commerce/ecommerce';
import { router } from 'expo-router';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';

export default function PaymentPulsaScreen() {
  const insets = useSafeAreaInsets();
  const { selectedPayment, topUpData } = useEcommerceStore();
  const [autoPay, setAutoPay] = useState(false);

  useEffect(() => {
    if (!topUpData) router.back();
  }, [topUpData]);

  if (!topUpData) return null;

  const serviceFee = 1000;
  const totalPayment = topUpData.price + serviceFee;

  const card = {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  };

  const operatorIconStyle = { width: 100, height: 47 };

  const getOperatorIcon = () => {
    switch (topUpData.operator) {
      case 'TELKOMSEL':
        return <TelkomselIcon style={operatorIconStyle} />;
      case 'INDOSAT':
        return <IsatIcon style={operatorIconStyle} />;
      case 'XL':
        return <XLIcon style={operatorIconStyle} />;
      default:
        return null;
    }
  };

  const getOperatorName = () => {
    switch (topUpData.operator) {
      case 'TELKOMSEL':
        return 'Telkomsel';
      case 'INDOSAT':
        return 'Indosat';
      case 'XL':
        return 'XL';
      default:
        return '';
    }
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
        <TransferHeader
          title="Payment"
          subtitle="Please select your payment"
          onBack={() => router.back()}
        />

        {/* CONTENT */}
        <View
          style={{ marginTop: -28, paddingHorizontal: 16, paddingBottom: 140 }}
        >
          {/* PRODUCT CARD */}
          <View style={{ ...card, top: -30 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 10 }}>
              {topUpData.type === 'PULSA' ? 'Pulsa' : 'Data Packages'}
            </Text>

            <View style={{ flexDirection: 'row', gap: 12 }}>
              <View
                style={{ width: 100, height: 47, justifyContent: 'center' }}
              >
                {getOperatorIcon()}
              </View>

              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, fontWeight: '600' }}>
                  {getOperatorName()}
                </Text>

                <Text style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>
                  Phone number ({topUpData.phoneNumber})
                </Text>

                <Text style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>
                  {topUpData.type === 'PULSA'
                    ? `Pulsa Rp${topUpData.nominal.toLocaleString()}`
                    : topUpData.period}
                </Text>

                <Text style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>
                  Price (Rp{topUpData.price.toLocaleString()})
                </Text>
              </View>
            </View>

            {/* DIVIDER */}
            <View
              style={{
                height: 1,
                backgroundColor: '#eef2f7',
                marginVertical: 12,
              }}
            />

            {/* AUTOPAY */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setAutoPay(v => !v)}
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: 12,
              }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 6,
                  borderWidth: 1.5,
                  borderColor: autoPay ? '#16a34a' : '#d1d5db',
                  backgroundColor: autoPay ? '#16a34a' : '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 2,
                }}
              >
                {autoPay && (
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 14,
                      fontWeight: '700',
                      lineHeight: 16,
                    }}
                  >
                    ✓
                  </Text>
                )}
              </View>

              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, fontWeight: '500' }}>
                  Enable autopay for worry free experience
                </Text>
                <Text style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>
                  Automatically pay this transaction every 17th with your
                  preferred payment method.{' '}
                  <Text style={{ color: '#16a34a', fontWeight: '500' }}>
                    View Details
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* PROMO */}
          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              backgroundColor: '#E9FBF0',
              borderRadius: 14,
              padding: 16,
              marginBottom: 12,
              top: -20,
              shadowColor: '#16a34a',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.12,
              shadowRadius: 10,
              elevation: 3,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View>
              <Text style={{ fontSize: 14, fontWeight: '600' }}>
                Promo coupon successfully used!
              </Text>
              <Text style={{ fontSize: 13, color: '#15803d', marginTop: 2 }}>
                You save Rp8.000
              </Text>
            </View>
            <Text style={{ fontSize: 22, color: '#15803d' }}>›</Text>
          </TouchableOpacity>

          {/* PAYMENT METHOD */}
          <View
            style={{
              top: -20,
              backgroundColor: '#fff',
              borderRadius: 16,
              padding: 2,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
              elevation: 4,
            }}
          >
            <PaymentMethodSection
              payment={selectedPayment}
              onPressSeeAll={() => router.push('/payment/invoice')}
            />
          </View>

          {/* PAYMENT DETAILS */}
          <View style={card}>
            <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 10 }}>
              Payment Details
            </Text>

            {[
              ['Total price', `Rp${topUpData.price.toLocaleString()}`],
              ['Admin fee', 'Free'],
              ['Service fee', `Rp${serviceFee.toLocaleString()}`],
            ].map(([label, value], i) => (
              <View
                key={i}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 8,
                }}
              >
                <Text style={{ fontSize: 13, color: '#6b7280' }}>{label}</Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '500',
                    color: value === 'Free' ? '#16a34a' : '#000',
                  }}
                >
                  {value}
                </Text>
              </View>
            ))}

            <View
              style={{
                height: 1,
                backgroundColor: '#eef2f7',
                marginVertical: 12,
              }}
            />

            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={{ fontSize: 15, fontWeight: '600' }}>
                Total Payment
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '700' }}>
                Rp{totalPayment.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        {/* BOTTOM BAR */}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            padding: 16,
            paddingBottom: 16 + insets.bottom,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 10,
          }}
        >
          <View>
            <Text style={{ fontSize: 12, color: '#9ca3af' }}>
              Total Payment
            </Text>
            <Text style={{ fontSize: 16, fontWeight: '700' }}>
              Rp{totalPayment.toLocaleString()}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              backgroundColor: '#4f9d55',
              paddingVertical: 12,
              paddingHorizontal: 32,
              borderRadius: 24,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>
              Pay Now
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}
