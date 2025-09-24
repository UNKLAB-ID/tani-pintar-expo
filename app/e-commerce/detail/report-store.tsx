import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import BackIcons from '@/assets/icons/global/back-icons';
import ReportReasonList from '@/components/ui/e-commerce/detail/report-reason-list';
import ReportForm from '@/components/ui/e-commerce/detail/report-form';

const reasons = [
  'Product Category Mismatch',
  'Selling Prohibited or Dangerous Goods',
  'Taniverse System Abuse',
  'Item Not Shipped or Fictitious',
  'Product Does Not Match Image/Description',
  'Offensive or Inappropriate Chat',
  'Store Violates Platform Rules',
  'Store Inactive or Unresponsive',
  'Spreading False Information / Hoaxes',
  'Redirecting Transactions Outside the Application',
  'Store Contains Sensitive Content',
  'Spam or Excessive Promotion',
];

const CardReport = () => {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<string[]>([]);

  const handleSubmit = () => {
    const data = { reason: selectedReason, description, files };
    console.log('Report submitted:', data);
    router.back();
  };

  const isFormValid =
    !!selectedReason && description.trim().length > 0 && files.length > 0;

  return (
    <SafeAreaView className="flex-1 bg-[#f8f8f8]">
      {/* Header */}
      <View className="p-4 border-b bg-white border-gray-200 flex-row items-center">
        <TouchableOpacity
          onPress={() => {
            if (selectedReason) setSelectedReason(null);
            else router.back();
          }}
        >
          <BackIcons width={24} height={24} />
        </TouchableOpacity>
        <Text className="text-[16px] font-semibold text-black ml-3">
          Report Shop
        </Text>
      </View>

      {/* Body */}
      <View className="flex-1 bg-white">
        {!selectedReason ? (
          <ReportReasonList reasons={reasons} onSelect={setSelectedReason} />
        ) : (
          <ReportForm
            reason={selectedReason}
            description={description}
            setDescription={setDescription}
            files={files}
            setFiles={setFiles}
          />
        )}
      </View>

      {/* Submit Button di luar (tetap di bawah) */}
      <View className="px-4 py-3 border-t border-gray-200 bg-white">
        <TouchableOpacity
          disabled={!isFormValid}
          onPress={handleSubmit}
          className={`w-full py-3 rounded-lg ${
            isFormValid ? 'bg-green-600' : 'bg-gray-200'
          }`}
        >
          <Text
            className={`text-center text-[14px] font-semibold ${
              isFormValid ? 'text-white' : 'text-gray-400'
            }`}
          >
            Submit Report
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CardReport;
