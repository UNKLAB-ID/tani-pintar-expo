import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  TextInput,
  FlatList,
} from 'react-native';
import { X } from 'lucide-react-native';

interface SelectedLocation {
  province: string;
  city: string;
  district: string;
  subdistrict: string;
}

interface ModalLocationPickerProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (data: SelectedLocation) => void;
}

const dummyData = {
  provinces: ['Jawa Timur', 'DKI Jakarta'],
  cities: {
    'Jawa Timur': ['Surabaya', 'Malang', 'Kediri'],
    'DKI Jakarta': ['Jakarta Pusat', 'Jakarta Selatan'],
  } as { [key: string]: string[] },
  districts: {
    Surabaya: ['Tegalsari', 'Rungkut'],
    Malang: ['Klojen', 'Lowokwaru'],
    Kediri: ['Mojoroto', 'Pesantren'],
    'Jakarta Pusat': ['Menteng', 'Tanah Abang'],
    'Jakarta Selatan': ['Tebet', 'Pasar Minggu'],
  } as { [key: string]: string[] },
  subdistricts: {
    Tegalsari: ['Kampung Dalem', 'Kedungdoro'],
    Rungkut: ['Medokan', 'Wonorejo'],
    Menteng: ['Menteng Atas', 'Menteng Bawah'],
  } as { [key: string]: string[] },
};

const ModalLocationPicker: React.FC<ModalLocationPickerProps> = ({
  visible,
  onClose,
  onSelect,
}) => {
  const [step, setStep] = useState<
    'province' | 'city' | 'district' | 'subdistrict'
  >('province');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<SelectedLocation>({
    province: '',
    city: '',
    district: '',
    subdistrict: '',
  });

  const reset = () => {
    setStep('province');
    setSelected({ province: '', city: '', district: '', subdistrict: '' });
    setSearch('');
  };

  const handleSelect = (item: string) => {
    if (step === 'province') {
      setSelected({ province: item, city: '', district: '', subdistrict: '' });
      setStep('city');
    } else if (step === 'city') {
      setSelected(prev => ({
        ...prev,
        city: item,
        district: '',
        subdistrict: '',
      }));
      setStep('district');
    } else if (step === 'district') {
      setSelected(prev => ({ ...prev, district: item, subdistrict: '' }));
      setStep('subdistrict');
    } else if (step === 'subdistrict') {
      const final = { ...selected, subdistrict: item };
      onSelect(final);
      onClose();
      reset();
    }
    setSearch('');
  };

  const getList = (): string[] => {
    switch (step) {
      case 'province':
        return dummyData.provinces;
      case 'city':
        return dummyData.cities[selected.province] || [];
      case 'district':
        return dummyData.districts[selected.city] || [];
      case 'subdistrict':
        return dummyData.subdistricts[selected.district] || [];
      default:
        return [];
    }
  };

  const filteredList = getList().filter(item =>
    item.toLowerCase().includes(search.toLowerCase())
  );

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
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
            maxHeight: '85%',
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <TouchableOpacity onPress={onClose}>
              <X size={20} color="#1F1F1F" />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#1F1F1F',
                marginLeft: 12,
              }}
            >
              Pilih {step}
            </Text>
            <View style={{ flex: 1 }} />
            <TouchableOpacity onPress={reset}>
              <Text style={{ color: '#F87171' }}>Reset</Text>
            </TouchableOpacity>
          </View>

          {/* Breadcrumb */}
          <View
            style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 }}
          >
            {selected.province ? (
              <Text style={{ color: '#3B82F6', marginRight: 8 }}>
                {selected.province}
              </Text>
            ) : null}
            {selected.city ? (
              <Text style={{ color: '#3B82F6', marginRight: 8 }}>
                {selected.city}
              </Text>
            ) : null}
            {selected.district ? (
              <Text style={{ color: '#3B82F6', marginRight: 8 }}>
                {selected.district}
              </Text>
            ) : null}
          </View>

          {/* Search */}
          <TextInput
            placeholder={`Cari ${step}`}
            value={search}
            onChangeText={setSearch}
            style={{
              borderWidth: 1,
              borderColor: '#E5E7EB',
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 8,
              marginBottom: 10,
              fontSize: 14,
            }}
          />

          {/* List */}
          <FlatList
            data={filteredList}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelect(item)}
                style={{
                  paddingVertical: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: '#F3F4F6',
                }}
              >
                <Text style={{ fontSize: 14, color: '#1F2937' }}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalLocationPicker;
