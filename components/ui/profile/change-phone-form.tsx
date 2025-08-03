import WhatsAppIcon from '@/assets/icons/profile/whatsapp-icon';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

type ChangePhoneFormProps = {
  onSubmit: (phone: string) => void;
};

const ChangePhoneForm: React.FC<ChangePhoneFormProps> = ({ onSubmit }) => {
  const [phoneSuffix, setPhoneSuffix] = useState('');

  const handleChange = (text: string) => {
    // Hanya izinkan angka tanpa spasi, maksimal 13 digit setelah +62
    const numericOnly = text.replace(/[^0-9]/g, '');
    setPhoneSuffix(numericOnly.slice(0, 13));
  };

  const fullPhone = `+62${phoneSuffix}`;

  return (
    <View className="flex-1 px-5 py-2">
      <Text className="text-[14px] text-[#8D8D8D]">
        Make sure your phone number is active!
      </Text>

      <View className="mt-3">
        <Text className="text-[14px] font-semibold my-2">Old Phone Number</Text>

        <View className="flex-row items-center space-x-2">
          <View
            className="px-3 py-3 border border-[#D9D9D9] bg-[#F5F5F5]"
            style={{
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
              borderRightWidth: 0,
            }}
          >
            <Text className="text-[14px] text-[#1F1F1F] font-semibold">
              +62
            </Text>
          </View>

          {/* Input nomornya */}
          <Text
            className="flex-1 border border-[#D9D9D9] py-3 text-[14px] text-[#1F1F1F] bg-[#FAFAFA]"
            style={{
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
              borderLeftWidth: 0,
            }}
          >
            81247662703
          </Text>
        </View>
      </View>

      <View className="mt-1">
        <Text className="text-[14px] font-semibold my-2">
          Input your new phone number here
        </Text>
        <View className="flex-row items-center ">
          <View
            className="px-3 py-3 border border-[#D9D9D9] bg-[#F5F5F5]"
            style={{
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
              borderRightWidth: 0,
            }}
          >
            <Text className="text-[14px] text-[#1F1F1F] font-semibold">
              +62
            </Text>
          </View>
          <TextInput
            value={phoneSuffix}
            onChangeText={handleChange}
            placeholder="Enter your new phone"
            placeholderTextColor="#B0B0B0"
            keyboardType="number-pad"
            autoCapitalize="none"
            className="flex-1  py-3 text-[14px] text-[#1F1F1F]"
            style={{
              borderColor: '#D9D9D9',
              borderWidth: 1,
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
              borderLeftWidth: 0,
            }}
            maxLength={13}
          />
        </View>
      </View>
      <View className="mt-6">
        <TouchableOpacity
          onPress={() => onSubmit(fullPhone)}
          disabled={phoneSuffix.length < 9} // Validasi minimal panjang nomor
          className={`flex-row justify-center items-center rounded-xl py-3 ${
            phoneSuffix.length < 13 ? 'bg-primary' : 'bg-primary'
          }`}
        >
          <WhatsAppIcon width={24} height={24} />
          <Text className="text-white text-center text-[14px] font-semibold ">
            Verify your new phone number
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangePhoneForm;
