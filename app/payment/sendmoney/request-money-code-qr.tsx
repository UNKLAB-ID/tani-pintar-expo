import QrisIcon from '@/assets/icons/payment/qris-icon';
import ModalShareLink from '@/components/ui/component-globals/modal-share-link';
import { TransferHeader } from '@/components/ui/payment/transfer-header';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RequestMoneyCodeQr = () => {
  const [amount, setAmount] = useState('');
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <SafeAreaView
        edges={['top', 'bottom']}
        style={{ flex: 1, backgroundColor: '#f8f8f8' }}
      >
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          <TransferHeader
            title="Request Money"
            subtitle="Request your friends for money"
            onBack={() => router.back()}
          />
        </View>

        <View
          style={{
            flexGrow: 1,
            paddingTop: 170,
            paddingBottom: 20,
          }}
        >
          {/* Card */}
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 16,
              paddingVertical: 20,
              paddingHorizontal: 16,
              width: '90%',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 4,
              elevation: 2,
              justifyContent: 'center',
              alignSelf: 'center',
            }}
          >
            {/* Logo Overlap */}
            <View
              style={{
                position: 'absolute',
                top: -20,
                alignSelf: 'center',
              }}
            >
              <Image
                source={require('@/assets/images/trash/tanipayicon.png')}
                style={{ resizeMode: 'contain' }}
              />
            </View>

            {/* Nama & Nomor */}
            <View style={{ marginTop: 24, alignItems: 'center' }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#000' }}>
                Mambaus Baus
              </Text>
              <Text style={{ fontSize: 14, color: '#555' }}>
                (+62)877****000
              </Text>
            </View>

            {/* QR Code */}
            <View style={{ marginVertical: 20, alignItems: 'center' }}>
              <Image
                source={require('@/assets/images/trash/code-qr.png')}
                style={{ width: 160, height: 160 }}
              />
            </View>

            {/* Amount */}
            <View
              style={{
                borderWidth: 1,
                borderColor: '#E5E5E5',
                borderRadius: 8,
                paddingVertical: 12,
                marginBottom: 16,
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#000' }}>
                Rp 50.000
              </Text>
            </View>

            {/* Date & Time */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}
            >
              <Text style={{ fontSize: 12, color: '#555' }}>Date</Text>
              <Text style={{ fontSize: 12, color: '#555' }}>Time</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 12,
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: '800', color: '#AAAAAA' }}
              >
                15 / 07 / 2025
              </Text>
              <Text
                style={{ fontSize: 16, fontWeight: '600', color: '#AAAAAA' }}
              >
                08:00
              </Text>
            </View>

            {/* Expired Timer */}
            <Text
              style={{
                fontSize: 12,
                color: '#000',
                marginBottom: 12,
              }}
            >
              QR kadaluwarsa dalam{' '}
              <Text style={{ color: '#169953', fontWeight: '600' }}>05:00</Text>
            </Text>

            {/* Instruksi QRIS */}
            <View
              style={{
                backgroundColor: '#E8F9F0',
                padding: 10,
                borderRadius: 6,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <QrisIcon width={32} height={12} />
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 12,
                  color: '#333',
                  flex: 1,
                }}
              >
                Tunjukkan kode QRIS ini untuk menerima uang
              </Text>
            </View>
          </View>
        </View>
        <View className="items-center bg-white p-3 rounded-xl">
          <TouchableOpacity
            className="rounded-xl w-full py-3 px-4 bg-primary"
            onPress={() => setShowModal(true)}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text className="text-[14px] font-semibold text-white">
                Share QR Code
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <ModalShareLink visible={showModal} onClose={() => router.back()} />
      </SafeAreaView>
    </>
  );
};

export default RequestMoneyCodeQr;
