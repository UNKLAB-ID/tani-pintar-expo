import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  Platform,
} from 'react-native';
import { Calendar, Check } from 'lucide-react-native';
import RectangleIcon from '@/assets/icons/global/rectangle-icon';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

interface ModelFilterHistoryProps {
  visible: boolean;
  onClose: () => void;
  onApply?: (data: any) => void;
  onReset?: () => void;
}

const ModelFilterHistory: React.FC<ModelFilterHistoryProps> = ({
  visible,
  onClose,
  onApply,
  onReset,
}) => {
  const [selectedTimeSpan, setSelectedTimeSpan] = useState<
    'last7days' | 'thismonth' | null
  >(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // state date picker
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState<{ mode: 'from' | 'to' | null }>({
    mode: null,
  });

  const handleReset = () => {
    setSelectedTimeSpan(null);
    setSelectedCategory('All');
    setFromDate(new Date());
    setToDate(new Date());
    onReset?.();
  };

  const categories = [
    'all',
    'payment',
    'refund',
    'topup',
    'transfer',
    'receive',
  ];

  const Checkbox = ({
    label,
    value,
    selected,
    onSelect,
  }: {
    label: string;
    value: 'last7days' | 'thismonth';
    selected: string | null;
    onSelect: (value: 'last7days' | 'thismonth') => void;
  }) => (
    <TouchableOpacity
      onPress={() => onSelect(value)}
      activeOpacity={0.7}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
      }}
    >
      <View
        style={{
          width: 22,
          height: 22,
          borderRadius: 6,
          borderWidth: 2,
          borderColor: selected === value ? '#16A34A' : '#9ca3af',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: selected === value ? '#16A34A' : 'transparent',
        }}
      >
        {selected === value && <Check size={16} color="white" />}
      </View>
      <Text style={{ marginLeft: 10, fontSize: 16, color: '#1F1F1F' }}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const formatDate = (date: Date) => {
    return date.toDateString(); // misal: "Mon Aug 30 2025"
  };

  return (
    <Modal transparent animationType="slide" visible={visible}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}
      >
        <Pressable style={{ flexGrow: 1 }} onPress={onClose} />

        <View
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
          }}
        >
          <View className="p-4 items-center">
            <RectangleIcon width={86} height={4} />
          </View>

          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 16,
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1F1F1F' }}>
              Transaction Status
            </Text>

            <TouchableOpacity onPress={handleReset} className="flex-row">
              <Text className="text-[#787878]">Reset </Text>
            </TouchableOpacity>
          </View>

          {/* Time span */}
          <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 12 }}>
            Time span
          </Text>
          <View style={{ padding: 16 }}>
            <Checkbox
              label="Last 7 days"
              value="last7days"
              selected={selectedTimeSpan}
              onSelect={setSelectedTimeSpan}
            />
            <Checkbox
              label="This month"
              value="thismonth"
              selected={selectedTimeSpan}
              onSelect={setSelectedTimeSpan}
            />
          </View>

          {/* Date */}
          <View style={{ marginVertical: 20 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 12 }}>
              Date
            </Text>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <TouchableOpacity
                onPress={() => setShowPicker({ mode: 'from' })}
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: 10,
                  backgroundColor: '#f8f8f8',
                  marginRight: 8,
                }}
              >
                <Text>From</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 4,
                  }}
                >
                  <Calendar size={16} color="#888" />
                  <Text style={{ fontSize: 12, color: '#888', marginLeft: 6 }}>
                    {formatDate(fromDate)}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setShowPicker({ mode: 'to' })}
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: 10,
                  backgroundColor: '#f8f8f8',
                  marginLeft: 8,
                }}
              >
                <Text>To</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',

                    marginTop: 4,
                  }}
                >
                  <Calendar size={16} color="#888" />
                  <Text style={{ fontSize: 12, color: '#888', marginLeft: 6 }}>
                    {formatDate(toDate)}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Category */}
          <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 12 }}>
            Category
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <TouchableOpacity
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: selectedCategory === cat ? '#169953' : '#AAAAAA',
                  backgroundColor:
                    selectedCategory === cat ? '#D7FCE8' : '#fff',
                  marginRight: 8,
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{
                    color: selectedCategory === cat ? '#169953' : '#AAAAAA',
                    textTransform: 'capitalize', // biar tulisan tetap rapih (All, Payment, dst)
                  }}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Apply button */}
          <TouchableOpacity
            onPress={() => {
              onApply?.({
                timeSpan: selectedTimeSpan,
                category: selectedCategory,
                fromDate,
                toDate,
              });
              onClose();
            }}
            style={{
              backgroundColor: '#16A34A',
              paddingVertical: 14,
              borderRadius: 12,
              marginTop: 24,
            }}
          >
            <Text
              style={{ textAlign: 'center', color: '#fff', fontWeight: '600' }}
            >
              APPLY
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* DateTime Picker */}
      {showPicker.mode && (
        <DateTimePicker
          value={showPicker.mode === 'from' ? fromDate : toDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              if (showPicker.mode === 'from') {
                setFromDate(selectedDate);
              } else {
                setToDate(selectedDate);
              }
            }
            setShowPicker({ mode: null });
          }}
        />
      )}
    </Modal>
  );
};

export default ModelFilterHistory;
