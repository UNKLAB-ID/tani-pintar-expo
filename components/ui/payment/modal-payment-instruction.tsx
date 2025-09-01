import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import RectangleIcon from '@/assets/icons/global/rectangle-icon';
import { X } from 'lucide-react-native';

interface ModalPaymentInstructionProps {
  visible: boolean;
  onClose: () => void;
  item: { id: number; name: string; logo: any } | null;
}

const instructionsData: Record<
  string,
  Record<string, { normal: string; bold?: string; normal2?: string }[]>
> = {
  Mandiri: {
    ATM: [
      { normal: 'Insert your ATM card and enter your PIN.' },
      {
        normal: 'Select ',
        bold: 'BAYAR / BELI LAINNYA > Lainnya',
        normal2: ' select e-Commerce.',
      },
      { normal: 'Enter TaniVerse company code: ', bold: '123' },
      { normal: 'Enter your TaniVerse app registered phone number.' },
      { normal: 'Enter Topup amount.' },
      { normal: 'Follow the next instructions to complete topup.' },
    ],
    'M.Banking': [
      { normal: 'Login to ', bold: "Livin' by Mandiri Application." },
      {
        normal: 'Select ',
        bold: 'Bayar Buat Pembayaran Baru Multipayment',
        normal2: ' TaniPay.',
      },
      { normal: 'Enter your TaniVerse app registered phone number.' },
      { normal: 'Enter Topup amount.' },
      { normal: 'Follow the next instructions to complete topup.' },
    ],
    'I.Banking': [
      { normal: 'Login to ', bold: 'Mandiri Internet Banking.' },
      {
        normal: 'Select ',
        bold: 'BAYAR MULTI PAYMENT SERVICE PROVIDERS.',
      },
      {
        normal: 'Select ',
        bold: 'TaniVerse',
        normal2: ' from the drop down menu.',
      },
      { normal: 'Enter your TaniVerse app registered phone number.' },
      { normal: 'Enter Topup amount.' },
      { normal: 'Follow the next instructions to complete topup.' },
    ],
  },
  BCA: {
    ATM: [
      { normal: 'Insert your ATM card and enter your PIN.' },
      {
        normal: 'Select ',
        bold: 'Transaksi Lainnya > Pembayaran > Lainnya > Virtual Account',
      },
      { normal: 'Enter TaniVerse company code: ', bold: '456' },
      { normal: 'Enter your registered phone number.' },
      { normal: 'Enter Topup amount.' },
      { normal: 'Follow the next instructions to complete topup.' },
    ],
    'M.Banking': [
      { normal: 'Login to ', bold: 'BCA Mobile.' },
      {
        normal: 'Select ',
        bold: 'm-BCA > m-Payment > Others',
      },
      { normal: 'Enter TaniVerse company code: ', bold: '456' },
      { normal: 'Enter your registered phone number.' },
      { normal: 'Enter Topup amount.' },
      { normal: 'Follow the next instructions to complete topup.' },
    ],
    'I.Banking': [
      { normal: 'Login to ', bold: 'BCA Internet Banking.' },
      {
        normal: 'Select ',
        bold: 'BAYAR MULTI PAYMENT SERVICE PROVIDERS.',
      },
      {
        normal: 'Select ',
        bold: 'TaniVerse',
        normal2: ' from the drop down menu.',
      },
      { normal: 'Enter your registered phone number.' },
      { normal: 'Enter Topup amount.' },
      { normal: 'Follow the next instructions to complete topup.' },
    ],
  },
  BSI: {
    ATM: [
      { normal: 'Insert your ATM card and enter your PIN.' },
      {
        normal: 'Select ',
        bold: 'Transaksi Lainnya > Pembayaran > Lainnya > Virtual Account',
      },
      { normal: 'Enter TaniVerse company code: ', bold: '456' },
      { normal: 'Enter your registered phone number.' },
      { normal: 'Enter Topup amount.' },
      { normal: 'Follow the next instructions to complete topup.' },
    ],
    'M.Banking': [
      { normal: 'Login to ', bold: 'BCA Mobile.' },
      {
        normal: 'Select ',
        bold: 'm-BSI > m-Payment > Others',
      },
      { normal: 'Enter TaniVerse company code: ', bold: '456' },
      { normal: 'Enter your registered phone number.' },
      { normal: 'Enter Topup amount.' },
      { normal: 'Follow the next instructions to complete topup.' },
    ],
    'I.Banking': [
      { normal: 'Login to ', bold: 'BSI Internet Banking.' },
      {
        normal: 'Select ',
        bold: 'BAYAR MULTI PAYMENT SERVICE PROVIDERS.',
      },
      {
        normal: 'Select ',
        bold: 'TaniVerse',
        normal2: ' from the drop down menu.',
      },
      { normal: 'Enter your registered phone number.' },
      { normal: 'Enter Topup amount.' },
      { normal: 'Follow the next instructions to complete topup.' },
    ],
  },
  BRI: {
    ATM: [
      { normal: 'Insert your ATM card and enter your PIN.' },
      {
        normal: 'Select ',
        bold: 'Transaksi Lainnya > Pembayaran > Lainnya > Virtual Account',
      },
      { normal: 'Enter TaniVerse company code: ', bold: '456' },
      { normal: 'Enter your registered phone number.' },
      { normal: 'Enter Topup amount.' },
      { normal: 'Follow the next instructions to complete topup.' },
    ],
    'M.Banking': [
      { normal: 'Login to ', bold: 'BRI Mobile.' },
      {
        normal: 'Select ',
        bold: 'm-BRI > m-Payment > Others',
      },
      { normal: 'Enter TaniVerse company code: ', bold: '456' },
      { normal: 'Enter your registered phone number.' },
      { normal: 'Enter Topup amount.' },
      { normal: 'Follow the next instructions to complete topup.' },
    ],
    'I.Banking': [
      { normal: 'Login to ', bold: 'BTN Internet Banking.' },
      {
        normal: 'Select ',
        bold: 'BAYAR MULTI PAYMENT SERVICE PROVIDERS.',
      },
      {
        normal: 'Select ',
        bold: 'TaniVerse',
        normal2: ' from the drop down menu.',
      },
      { normal: 'Enter your registered phone number.' },
      { normal: 'Enter Topup amount.' },
      { normal: 'Follow the next instructions to complete topup.' },
    ],
  },
  BTN: {
    ATM: [
      { normal: 'Insert your ATM card and enter your PIN.' },
      {
        normal: 'Select ',
        bold: 'Transaksi Lainnya > Pembayaran > Lainnya > Virtual Account',
      },
      { normal: 'Enter TaniVerse company code: ', bold: '456' },
      { normal: 'Enter your registered phone number.' },
      { normal: 'Enter Topup amount.' },
      { normal: 'Follow the next instructions to complete topup.' },
    ],
    'M.Banking': [
      { normal: 'Login to ', bold: 'BCA Mobile.' },
      {
        normal: 'Select ',
        bold: 'm-BTN > m-Payment > Others',
      },
      { normal: 'Enter TaniVerse company code: ', bold: '456' },
      { normal: 'Enter your registered phone number.' },
      { normal: 'Enter Topup amount.' },
      { normal: 'Follow the next instructions to complete topup.' },
    ],
    'I.Banking': [
      { normal: 'Login to ', bold: 'BTN Internet Banking.' },
      {
        normal: 'Select ',
        bold: 'BAYAR MULTI PAYMENT SERVICE PROVIDERS.',
      },
      {
        normal: 'Select ',
        bold: 'TaniVerse',
        normal2: ' from the drop down menu.',
      },
      { normal: 'Enter your registered phone number.' },
      { normal: 'Enter Topup amount.' },
      { normal: 'Follow the next instructions to complete topup.' },
    ],
  },
  alfamart: {
    Outlet: [
      { normal: 'Visit the nearest ', bold: 'Alfamart cashier.' },
      { normal: 'Mention you want to top up ', bold: 'TaniVerse.' },
      { normal: 'Provide your registered phone number.' },
      { normal: 'Pay according to the top up amount.' },
      { normal: 'Keep the receipt as proof.' },
    ],
  },
  indomaret: {
    Outlet: [
      { normal: 'Visit the nearest ', bold: 'Indomaret cashier.' },
      { normal: 'Mention you want to top up ', bold: 'TaniVerse.' },
      { normal: 'Provide your registered phone number.' },
      { normal: 'Pay according to the top up amount.' },
      { normal: 'Keep the receipt as proof.' },
    ],
  },
};

const ModalPaymentInstruction: React.FC<ModalPaymentInstructionProps> = ({
  visible,
  onClose,
  item,
}) => {
  const [activeTab, setActiveTab] = useState<string>('ATM');
  const bankInstructions = item ? instructionsData[item.name] || {} : {};
  const tabs = Object.keys(bankInstructions);

  useEffect(() => {
    if (tabs.length > 0) {
      setActiveTab(tabs[0]);
    }
  }, [item]);

  if (!item) return null;
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
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
            maxHeight: '80%',
          }}
        >
          <View className="mx-3 items-center">
            <RectangleIcon width={84} height={4} />
          </View>

          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 16,
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={item.logo}
                style={{
                  width: 28,
                  height: 28,
                  marginRight: 8,

                  borderRadius: 29,
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#1F1F1F',
                }}
              >
                Choose a service
              </Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <X size={20} color="#1F1F1F" />
            </TouchableOpacity>
          </View>

          {/* Tabs */}
          <View
            className="border p-4 rounded-xl "
            style={{ borderColor: '#B3B3B3' }}
          >
            <View
              className="border-b "
              style={{
                flexDirection: 'row',
                marginBottom: 16,
                justifyContent: 'space-between',
                borderColor: '#B3B3B3',
              }}
            >
              {tabs.map(tab => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={{
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    borderBottomWidth: 2,
                    borderBottomColor:
                      activeTab === tab ? '#169953' : 'transparent',
                    marginRight: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: activeTab === tab ? '600' : '400',
                      color: activeTab === tab ? '#169953' : '#B3B3B3',
                    }}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Instructions */}
            <ScrollView>
              <View className="mb-3">
                <Text className="font-semibold text-[16px]">
                  Payment Instructions
                </Text>
              </View>
              {bankInstructions[activeTab]?.map((step, index) => (
                <View
                  key={index}
                  style={{ flexDirection: 'row', marginBottom: 10 }}
                >
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: '#DEDEDE',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 10,
                    }}
                  >
                    <Text style={{ fontSize: 12 }}>{index + 1}</Text>
                  </View>
                  <Text style={{ flex: 1, fontSize: 14, color: '#333' }}>
                    {/* teks biasa di depan */}
                    {typeof step === 'string' ? (
                      step
                    ) : (
                      <>
                        <Text>{step.normal}</Text>
                        {step.bold && (
                          <Text style={{ fontWeight: '700' }}>{step.bold}</Text>
                        )}
                        {'normal2' in step && step.normal2 ? (
                          <Text>{step.normal2}</Text>
                        ) : null}
                      </>
                    )}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalPaymentInstruction;
