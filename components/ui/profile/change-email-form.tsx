import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

type ChangeEmailFormProps = {
  onSubmit: (email: string) => void;
};

const ChangeEmailForm: React.FC<ChangeEmailFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');

  return (
    <View className="flex-1 px-5 py-4">
      <Text className="text-[14px] text-[#8D8D8D]">
        Make sure your email is active!
      </Text>
      <View className="mt-4">
        <Text className="text-[14px] font-semibold my-2">New Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your new email"
          placeholderTextColor="#B0B0B0"
          keyboardType="email-address"
          autoCapitalize="none"
          className="border border-[#D9D9D9] rounded-lg px-4 py-3 text-[14px] text-[#1F1F1F]"
        />
      </View>
      <View className="mt-6">
        <TouchableOpacity
          onPress={() => onSubmit(email)}
          className="bg-primary rounded-xl py-3"
        >
          <Text className="text-white text-center text-[16px] font-semibold">
            Verify your new email
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangeEmailForm;
