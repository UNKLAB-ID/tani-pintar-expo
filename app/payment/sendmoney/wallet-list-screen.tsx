import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { TransferHeader } from '@/components/ui/payment/transfer-header';
import DanaIcon from '@/assets/icons/payment/dana-icon';
import LinkAjaIcon from '@/assets/icons/payment/linkaja-icon';

const WALLETS = [
  { name: 'DANA', icon: <DanaIcon width={32} height={32} />, type: 'dana' },
  {
    name: 'LinkAja',
    icon: <LinkAjaIcon width={32} height={32} />,
    type: 'linkaja',
  },
];

const WalletListScreen = () => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          <TransferHeader
            title="E-Wallet Transfer"
            subtitle="Select the e-wallet you want to transfer to"
            onBack={() => router.back()}
          />
        </View>

        <View className="p-4 bg-white mx-4 rounded-xl" style={{ top: 150 }}>
          {WALLETS.map(wallet => (
            <TouchableOpacity
              key={wallet.type}
              className="flex-row items-center p-4 border-b border-gray-200 bg-white"
              onPress={() =>
                router.push({
                  pathname: '/payment/sendmoney/e-wallet',
                  params: { walletType: wallet.type, walletName: wallet.name },
                })
              }
            >
              <View className="mr-3">{wallet.icon}</View>
              <Text className="text-[14px] font-medium">{wallet.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </>
  );
};

export default WalletListScreen;
