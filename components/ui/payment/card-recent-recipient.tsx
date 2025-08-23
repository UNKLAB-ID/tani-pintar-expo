import { View, Text } from 'react-native';

type CardRecentRecipientProps = {
  initials: string;
  name: string;
  account: string;
  onPress?: () => void;
};

const CardRecentRecipient: React.FC<CardRecentRecipientProps> = ({
  initials,
  name,
  account,
  onPress,
}) => {
  const maskName = (fullName: string) => {
    return fullName
      .split(' ')
      .map(word => word[0] + '*'.repeat(word.length - 1))
      .join(' ');
  };

  const formatAccount = (acc: string) => {
    const match = acc.match(/([A-Za-z ]+)(\d+)/);
    if (!match) return acc;

    const [, text, number] = match;
    const maskedNumber = '*' + number.slice(1);

    return `${text}${maskedNumber}`;
  };
  return (
    <View className="bg-white rounded-xl items-center" style={{ padding: 20 }}>
      <View
        className="mt-2 p-4"
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          borderWidth: 1,
          borderColor: '#000',
        }}
      >
        <Text className="text-[20px] font-semibold text-center">
          {initials}
        </Text>
      </View>
      <Text className="mt-3 text-[14px] font-semibold text-center">
        {maskName(name)}
      </Text>
      <Text className="text-[12px] text-center text-[#6F6F6F]">
        {formatAccount(account)}
      </Text>
    </View>
  );
};
export default CardRecentRecipient;
