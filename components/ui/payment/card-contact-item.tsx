import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import WalletPay from '@/assets/icons/payment/wallet-tanipay-icon';
import DanaIcon from '@/assets/icons/payment/dana-icon';
import LinkAjaIcon from '@/assets/icons/payment/linkaja-icon';

interface ContactItemProps {
  name: string;
  phone: string;
  image?: ImageSourcePropType;
  initials?: string;
  walletType?: 'tanipay' | 'dana' | 'linkaja';
  onPress: () => void;
}
const getWalletIcon = (type: string | undefined) => {
  switch (type) {
    case 'dana':
      return <DanaIcon width={16} height={16} />;
    case 'linkaja':
      return <LinkAjaIcon width={16} height={16} />;
    default:
      return <WalletPay width={16} height={16} />;
  }
};
const ContactItem: React.FC<ContactItemProps> = ({
  name,
  phone,
  image,
  initials,
  onPress,
  walletType = 'tanipay',
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center py-3 border-b border-[#E9E9E9]"
    >
      {/* Avatar */}
      {image ? (
        <Image
          source={image}
          style={{ width: 38, height: 38, borderRadius: 4 }}
          resizeMode="cover"
        />
      ) : (
        <View
          className=" rounded-full bg-white items-center justify-center"
          style={{ width: 38, height: 38, elevation: 1 }}
        >
          <Text className="font-semibold text-gray-700">{initials}</Text>
        </View>
      )}

      {/* Info */}
      <View className="flex-1 ml-3 my-2">
        <View className="flex-row">
          <Text className="font-medium text-[14px] mr-3">{name}</Text>
          {getWalletIcon(walletType)}
        </View>
        <Text className="text-gray-500 text-[12px]">(+62) {phone}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ContactItem;
