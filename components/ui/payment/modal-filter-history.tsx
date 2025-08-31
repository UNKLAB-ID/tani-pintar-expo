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
import { Calendar as RNCalendar } from 'react-native-calendars';

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
  const [fromDate, setFromDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  ); // format "YYYY-MM-DD"
  const [toDate, setToDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [showPicker, setShowPicker] = useState<'from' | 'to' | null>(null);

  const handleReset = () => {
    setSelectedTimeSpan(null);
    setSelectedCategory('all');
    const today = new Date().toISOString().split('T')[0];
    setFromDate(today);
    setToDate(today);
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
                onPress={() => setShowPicker('from')}
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
                    {formatDate(new Date(fromDate))}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setShowPicker('to')}
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
                    {formatDate(new Date(toDate))}
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

      {/* Calendar modal */}
      {showPicker && (
        <Modal transparent visible animationType="fade">
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                margin: 20,
                backgroundColor: 'white',
                borderRadius: 12,
                padding: 10,
              }}
            >
              <RNCalendar
                current={fromDate} // string "2025-08-31"
                onDayPress={day => {
                  if (showPicker === 'from') {
                    setFromDate(day.dateString); // hasil: "2025-08-31"
                  } else {
                    setToDate(day.dateString);
                  }
                  setShowPicker(null);
                }}
                markedDates={{
                  [fromDate]: { selected: true, selectedColor: '#16A34A' },
                  [toDate]: { selected: true, selectedColor: '#16A34A' },
                }}
                // 🔽 ini yang hilangin jam GMT
                renderHeader={date => (
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      textAlign: 'center',
                      paddingVertical: 8,
                    }}
                  >
                    {new Date(date).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </Text>
                )}
              />

              <TouchableOpacity
                style={{
                  marginTop: 10,
                  padding: 12,
                  borderRadius: 8,
                  backgroundColor: '#16A34A',
                }}
                onPress={() => setShowPicker(null)}
              >
                <Text style={{ color: '#fff', textAlign: 'center' }}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </Modal>
  );
};

export default ModelFilterHistory;
