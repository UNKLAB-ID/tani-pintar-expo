import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Check } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

interface ReportFormProps {
  reason: string;
  description: string;
  setDescription: (text: string) => void;
  files: string[];
  setFiles: (files: string[]) => void;
}

const MAX_DESCRIPTION = 320;
const MAX_FILES = 5;

const ReportForm: React.FC<ReportFormProps> = ({
  reason,
  description,
  setDescription,
  files,
  setFiles,
}) => {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0.7,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      if (files.length < MAX_FILES) {
        setFiles([...files, result.assets[0].uri]);
      }
    }
  };

  return (
    <ScrollView className="flex-1 px-4">
      {/* Reason */}
      <View className="flex-row items-center justify-between rounded-md py-2 mt-4">
        <Text className="text-[14px] text-black flex-1">{reason}</Text>
        <View className="w-5 h-5 rounded  bg-primary items-center justify-center">
          <Check size={14} color="white" />
        </View>
      </View>

      {/* Description */}
      <View className="flex-row justify-between items-center mt-6 mb-2">
        <Text className="text-[14px] font-medium text-black">
          Report Description <Text className="text-red-500">*</Text>
        </Text>
        <Text className="text-[12px] text-gray-500">
          {description.length} / {MAX_DESCRIPTION}
        </Text>
      </View>

      <View className="border border-gray-300 rounded-md">
        <TextInput
          value={description}
          onChangeText={setDescription}
          multiline
          maxLength={MAX_DESCRIPTION}
          placeholder="Explain your reasons for reporting this store."
          textAlignVertical="top" // teks dimulai dari atas
          style={{
            padding: 12,
            fontSize: 14,
            color: '#000',
            minHeight: 150, // bikin kotak lebih besar
          }}
        />
      </View>

      {/* Upload Proof */}
      <Text className="text-[14px] font-medium text-black mt-6 mb-2">
        Upload proof <Text className="text-red-500">*</Text>
      </Text>
      <Text className="text-[12px] text-gray-500 mb-2">
        Please upload a photo or video.
      </Text>

      <View className="flex-row flex-wrap gap-2">
        {files.map((file, index) => (
          <View key={index} className="relative">
            <Image source={{ uri: file }} className="w-20 h-20 rounded-md" />

            {/* Tombol X untuk hapus */}
            <TouchableOpacity
              onPress={() => {
                const updatedFiles = files.filter((_, i) => i !== index);
                setFiles(updatedFiles);
              }}
              className="absolute bg-red-500 rounded-full w-5 h-5 items-center justify-center"
              style={{ top: 1, right: 1 }}
            >
              <Text className="text-white text-[10px] font-bold">X</Text>
            </TouchableOpacity>
          </View>
        ))}

        {files.length < MAX_FILES && (
          <TouchableOpacity
            onPress={pickImage}
            className="w-20 h-20 border-2 border-dashed border-green-400 items-center justify-center rounded-md"
          >
            <Text className="text-green-600 text-xl ">+</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text className="text-[12px] text-gray-500 mt-1">
        {files.length} / {MAX_FILES}
      </Text>
    </ScrollView>
  );
};

export default ReportForm;
