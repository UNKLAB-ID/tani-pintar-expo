import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Check } from 'lucide-react-native';

interface ReportReasonListProps {
  reasons: string[];
  onSelect: (reason: string) => void;
  selectedReason?: string | null;
}

const ReportReasonList: React.FC<ReportReasonListProps> = ({
  reasons,
  onSelect,
  selectedReason,
}) => {
  return (
    <FlatList
      data={reasons}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => {
        const isSelected = selectedReason === item;
        return (
          <TouchableOpacity
            onPress={() => onSelect(item)}
            className="flex-row items-center justify-between px-4 py-4 border-b border-gray-200"
          >
            <Text className="text-[14px] text-black">{item}</Text>
            <View
              className={`w-5 h-5 rounded-md items-center justify-center ${
                isSelected ? 'bg-primary' : 'border border-gray-300'
              }`}
            >
              {isSelected && <Check size={14} color="#fff" strokeWidth={3} />}
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default ReportReasonList;
