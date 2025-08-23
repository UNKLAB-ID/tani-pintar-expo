import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

type InstructionTabs =
  | 'ATM'
  | 'M.Banking'
  | 'I.Banking'
  | 'Kantor Pos'
  | 'Aplikasi Pospay';

interface PaymentInstruction {
  [key: string]: string[];
}

interface PaymentInstructions {
  [key: string]: PaymentInstruction;
}

interface PaymentInstructionsTabsProps {
  bankId: string;
}

export default function PaymentInstructionsTabs({
  bankId,
}: PaymentInstructionsTabsProps) {
  const [activeTab, setActiveTab] = useState<InstructionTabs>('ATM');

  const paymentInstructions: PaymentInstructions = {
    bca: {
      ATM: [
        'Insert BCA ATM Card and PIN.',
        'Select Pay / Buy.',
        'Select the Other Transactions -> Other -> Multi Payment menu.',
        'Input company code 123 and select Correct.',
        'Input Virtual Account Number 123085156178064 and select Correct.',
        'Input the desired TaniPay top up amount Min. Top Up Rp10.000.',
        'Check the information on the screen. Make sure the Merchant is TaniPay and your username. If correct, press 1 and select Yes.',
        'Check the confirmation screen and select Yes.',
        'If the balance has not entered TaniPay, please wait a maximum of 1 x 24 hours.',
      ],
      'M.Banking': [
        'Enter the BCA Mobile application. Select TopUp, then select E-Wallet.',
        'Select TaniPay Service Provider, and enter the Virtual Account Number 123085156178064, then select Continue.',
        'Input the desired TaniPay top up amount Min. Top Up Rp10.000.',
        'Check the information on the screen. Make sure the Merchant is TaniPay and your username. If correct, input your PIN and select OK',
        'Masukkan jumlah top up minimal Rp10.000.',
        'If the balance has not entered TaniPay, please wait a maximum of 1 x 24 hours.',
      ],
      'I.Banking': [
        'Select Pay -> Multi Payment',
        'Select From Account: Your Account and Service Provider: TaniPay, then click Continue',
        'Enter Virtual Account Number 123085156178064 and select Continue.',
        'Input the desired TaniPay top up amount Min. Top Up Rp10.000.',
        'Check the information on the screen. Make sure the Merchant is TaniPay and your username. If correct, check the bill and click Continue.',
        'Input your Token PIN and click Submit.',
        'If the balance has not entered TaniPay, please wait a maximum of 1 x 24 hours.',
      ],
    },

    bri: {
      ATM: [
        'Insert BRI ATM Card and PIN.',
        'Select Pay / Buy.',
        'Select the Other Transactions -> Other -> Multi Payment menu.',
        'Input company code 123 and select Correct.',
        'Input Virtual Account Number 123085156178064 and select Correct.',
        'Input the desired TaniPay top up amount Min. Top Up Rp10.000.',
        'Check the information on the screen. Make sure the Merchant is TaniPay and your username. If correct, press 1 and select Yes.',
        'Check the confirmation screen and select Yes.',
        'If the balance has not entered TaniPay, please wait a maximum of 1 x 24 hours.',
      ],
      'M.Banking': [
        'Enter the BRI Mobile application. Select TopUp, then select E-Wallet.',
        'Select TaniPay Service Provider, and enter the Virtual Account Number 123085156178064, then select Continue.',
        'Input the desired TaniPay top up amount Min. Top Up Rp10.000.',
        'Check the information on the screen. Make sure the Merchant is TaniPay and your username. If correct, input your PIN and select OK',
        'Masukkan jumlah top up minimal Rp10.000.',
        'If the balance has not entered TaniPay, please wait a maximum of 1 x 24 hours.',
      ],
      'I.Banking': [
        'Select Pay -> Multi Payment',
        'Select From Account: Your Account and Service Provider: TaniPay, then click Continue',
        'Enter Virtual Account Number 123085156178064 and select Continue.',
        'Input the desired TaniPay top up amount Min. Top Up Rp10.000.',
        'Check the information on the screen. Make sure the Merchant is TaniPay and your username. If correct, check the bill and click Continue.',
        'Input your Token PIN and click Submit.',
        'If the balance has not entered TaniPay, please wait a maximum of 1 x 24 hours.',
      ],
    },
    bsi: {
      ATM: [
        'Insert BSI ATM Card and PIN.',
        'Select Pay / Buy.',
        'Select the Other Transactions -> Other -> Multi Payment menu.',
        'Input company code 123 and select Correct.',
        'Input Virtual Account Number 123085156178064 and select Correct.',
        'Input the desired TaniPay top up amount Min. Top Up Rp10.000.',
        'Check the information on the screen. Make sure the Merchant is TaniPay and your username. If correct, press 1 and select Yes.',
        'Check the confirmation screen and select Yes.',
        'If the balance has not entered TaniPay, please wait a maximum of 1 x 24 hours.',
      ],
      'M.Banking': [
        'Enter the BSI Mobile application. Select TopUp, then select E-Wallet.',
        'Select TaniPay Service Provider, and enter the Virtual Account Number 123085156178064, then select Continue.',
        'Input the desired TaniPay top up amount Min. Top Up Rp10.000.',
        'Check the information on the screen. Make sure the Merchant is TaniPay and your username. If correct, input your PIN and select OK',
        'Masukkan jumlah top up minimal Rp10.000.',
        'If the balance has not entered TaniPay, please wait a maximum of 1 x 24 hours.',
      ],
      'I.Banking': [
        'Select Pay -> Multi Payment',
        'Select From Account: Your Account and Service Provider: TaniPay, then click Continue',
        'Enter Virtual Account Number 123085156178064 and select Continue.',
        'Input the desired TaniPay top up amount Min. Top Up Rp10.000.',
        'Check the information on the screen. Make sure the Merchant is TaniPay and your username. If correct, check the bill and click Continue.',
        'Input your Token PIN and click Submit.',
        'If the balance has not entered TaniPay, please wait a maximum of 1 x 24 hours.',
      ],
    },

    btn: {
      ATM: [
        'Insert Mandiri ATM Card and PIN.',
        'Select Pay / Buy.',
        'Select the Other Transactions -> Other -> Multi Payment menu.',
        'Input company code 123 and select Correct.',
        'Input Virtual Account Number 123085156178064 and select Correct.',
        'Input the desired TaniPay top up amount Min. Top Up Rp10.000.',
        'Check the information on the screen. Make sure the Merchant is TaniPay and your username. If correct, press 1 and select Yes.',
        'Check the confirmation screen and select Yes.',
        'If the balance has not entered TaniPay, please wait a maximum of 1 x 24 hours.',
      ],
      'M.Banking': [
        'Enter the btn Mobile application. Select TopUp, then select E-Wallet.',
        'Select TaniPay Service Provider, and enter the Virtual Account Number 123085156178064, then select Continue.',
        'Input the desired TaniPay top up amount Min. Top Up Rp10.000.',
        'Check the information on the screen. Make sure the Merchant is TaniPay and your username. If correct, input your PIN and select OK',
        'Masukkan jumlah top up minimal Rp10.000.',
        'If the balance has not entered TaniPay, please wait a maximum of 1 x 24 hours.',
      ],
      'I.Banking': [
        'Select Pay -> Multi Payment',
        'Select From Account: Your Account and Service Provider: TaniPay, then click Continue',
        'Enter Virtual Account Number 123085156178064 and select Continue.',
        'Input the desired TaniPay top up amount Min. Top Up Rp10.000.',
        'Check the information on the screen. Make sure the Merchant is TaniPay and your username. If correct, check the bill and click Continue.',
        'Input your Token PIN and click Submit.',
        'If the balance has not entered TaniPay, please wait a maximum of 1 x 24 hours.',
      ],
    },

    mandiri: {
      ATM: [
        'Insert Mandiri ATM Card and PIN.',
        'Select Pay / Buy.',
        'Select the Other Transactions -> Other -> Multi Payment menu.',
        'Input company code 123 and select Correct.',
        'Input Virtual Account Number 123085156178064 and select Correct.',
        'Input the desired TaniPay top up amount Min. Top Up Rp10.000.',
        'Check the information on the screen. Make sure the Merchant is TaniPay and your username. If correct, press 1 and select Yes.',
        'Check the confirmation screen and select Yes.',
        'If the balance has not entered TaniPay, please wait a maximum of 1 x 24 hours.',
      ],
      'M.Banking': [
        'Enter the Mandiri Mobile application. Select TopUp, then select E-Wallet.',
        'Select TaniPay Service Provider, and enter the Virtual Account Number 123085156178064, then select Continue.',
        'Input the desired TaniPay top up amount Min. Top Up Rp10.000.',
        'Check the information on the screen. Make sure the Merchant is TaniPay and your username. If correct, input your PIN and select OK',
        'Masukkan jumlah top up minimal Rp10.000.',
        'If the balance has not entered TaniPay, please wait a maximum of 1 x 24 hours.',
      ],
      'I.Banking': [
        'Select Pay -> Multi Payment',
        'Select From Account: Your Account and Service Provider: TaniPay, then click Continue',
        'Enter Virtual Account Number 123085156178064 and select Continue.',
        'Input the desired TaniPay top up amount Min. Top Up Rp10.000.',
        'Check the information on the screen. Make sure the Merchant is TaniPay and your username. If correct, check the bill and click Continue.',
        'Input your Token PIN and click Submit.',
        'If the balance has not entered TaniPay, please wait a maximum of 1 x 24 hours.',
      ],
    },

    alfamart: {
      Offline: [
        'Visit the nearest Alfamart/Alfamidi/Dan+Dan store.',
        'Tell the cashier to top up TaniPay.',
        'Please provide the mobile phone number you use to top up TaniPay.',
        'Tell me the amount of TaniPay you want. (Select Rp10.000, Rp50.000, Rp100.000, Rp200.000, Rp300.000, Rp400.000, Rp500.000).',
        'The cashier will top up your TaniPay account balance.',
        'Make sure your TaniPay has increased. Please keep proof of payment as collateral in case further verification is required.',
        'If the balance has not entered TaniPay, please wait a maximum of 1 x 24 hours.',
      ],
    },

    indomaret: {
      Offline: [
        'Visit the nearest Indomaret store.',
        'Tell the cashier to top up TaniPay.',
        'Please provide the mobile phone number you use to top up TaniPay.',
        'Tell me the amount of TaniPay you want. (Select Rp10.000, Rp50.000, Rp100.000, Rp200.000, Rp300.000, Rp400.000, Rp500.000).',
        'The cashier will top up your TaniPay account balance.',
        'Make sure your TaniPay has increased. Please keep proof of payment as collateral in case further verification is required.',
        'If the balance has not entered TaniPay, please wait a maximum of 1 x 24 hours.',
      ],
    },

    kantorpos: {
      'Kantor Pos': [
        'Go to the nearest Post Office.',
        'Tell the counter officer that you will top up your TaniPay balance.',
        'Please provide the mobile phone number that matches the TaniPay account you wish to top up.',
        'Tell me the amount of TaniPay you want. (Select Rp10.000, Rp50.000, Rp100.000, Rp200.000, Rp300.000, Rp400.000, Rp500.000).',
        'The counter officer will top up your TaniPay account balance',
        'Make sure your TaniPay has increased. Please keep proof of payment as collateral in case further verification is required.',
        'If the balance has not entered TaniPay, please wait a maximum of 1 x 24 hours.',
      ],
      'Aplikasi Pospay': [
        'Log in to Pospay, select the e-wallet and e-money menu',
        'Select Top Up e-wallet, select TaniPay',
        'Select Nominal, then enter the destination mobile number registered with TaniPay',
        'Pay for top-up transactions at TaniPay',
        'If successful, a notification will appear on the Tani Verse application on your cellphone.',
        'If the balance has not entered TaniPay, please wait a maximum of 1 x 24 hours.',
      ],
    },
  };
  const instructions = paymentInstructions[bankId] ?? [];

  const isMerchant = bankId === 'alfamart' || bankId === 'indomaret';
  const isKantorPos = bankId === 'kantorpos';

  return (
    <View className="bg-white mt-4">
      <Text className="text-[16px] font-semibold text-[#1F1F1F]">
        Payment Instructions
      </Text>
      {/* Tabs */}
      {!isMerchant && !isKantorPos && (
        <View className="flex-row border-b border-gray-200">
          {Object.keys(instructions).map(tab => (
            <TouchableOpacity
              key={tab}
              className={`flex-1 items-center py-2 ${
                activeTab === tab ? 'border-b-2 border-green-500' : ''
              }`}
              onPress={() => setActiveTab(tab as InstructionTabs)}
            >
              <Text
                className={`text-[14px] font-medium ${
                  activeTab === tab ? 'text-green-600' : 'text-gray-500'
                }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Tabs khusus Kantor Pos */}
      {isKantorPos && (
        <View className="flex-row border-b border-gray-200">
          {Object.keys(instructions).map(tab => (
            <TouchableOpacity
              key={tab}
              className={`flex-1 items-center py-2 ${
                activeTab === tab ? 'border-b-2 border-green-500' : ''
              }`}
              onPress={() => setActiveTab(tab as InstructionTabs)}
            >
              <Text
                className={`text-[14px] font-medium ${
                  activeTab === tab ? 'text-green-600' : 'text-gray-500'
                }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Content */}
      <View className="mt-3">
        <ScrollView
          style={{ maxHeight: 300 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 8 }}
        >
          {isMerchant &&
            instructions.Offline?.map((step, index) => (
              <View key={index} className="flex-row mb-2">
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: '#DEDEDE',
                    backgroundColor: '#DEDEDE',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 8,
                  }}
                >
                  <Text className="text-[#1F1F1F] font-semibold text-[12px]">
                    {index + 1}
                  </Text>
                </View>
                <Text className="flex-1 text-[13px] text-gray-700">{step}</Text>
              </View>
            ))}

          {!isMerchant &&
            !isKantorPos &&
            instructions[activeTab]?.map((step, index) => (
              <View key={index} className="flex-row mb-2 items-center">
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: '#DEDEDE',
                    backgroundColor: '#DEDEDE',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 8,
                  }}
                >
                  <Text className="text-[#1F1F1F] font-semibold text-[12px]">
                    {index + 1}
                  </Text>
                </View>
                <Text className="flex-1 text-[13px] text-gray-700">{step}</Text>
              </View>
            ))}

          {isKantorPos &&
            instructions[activeTab]?.map((step, index) => (
              <View key={index} className="flex-row mb-2">
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: '#DEDEDE',
                    backgroundColor: '#DEDEDE',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 8,
                  }}
                >
                  <Text className="text-[#1F1F1F] font-semibold text-[12px]">
                    {index + 1}
                  </Text>
                </View>
                <Text className="flex-1 text-[13px] text-gray-700">{step}</Text>
              </View>
            ))}
        </ScrollView>
      </View>
    </View>
  );
}
