import { View, Text, Image } from 'react-native';
import { ImageSourcePropType } from 'react-native';

type CardYourAccountProps = {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  bankLogo: ImageSourcePropType;
  onPress?: () => void;
};

const CardYourAccount: React.FC<CardYourAccountProps> = ({
  bankName,
  accountNumber,
  accountHolder,
  onPress,
  bankLogo,
}) => {
  return (
    <View className="flex-row items-center py-3 border-b border-gray-200">
      <Image
        source={bankLogo}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          marginRight: 12,
        }}
        resizeMode="cover"
      />
      <View className="flex-1">
        <Text className="text-[14px] font-semibold">
          {bankName}
          <Text className="text-[#6F6F6F] font-medium">{accountNumber}</Text>
        </Text>
        <Text className="text-[12px] text-gray-500">{accountHolder}</Text>
      </View>
    </View>
  );
};
export default CardYourAccount;
