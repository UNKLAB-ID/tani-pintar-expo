import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import { X } from 'lucide-react-native';
import SearchIconPrimary from '@/assets/icons/global/search-icons';
import RectangleIcon from '@/assets/icons/global/rectangle-icon';
import { useState } from 'react';
import { ImageSourcePropType } from 'react-native';
import SearchInput from '../component-globals/search-input';

interface ListItem {
  id: number;
  name: string;
  logo: ImageSourcePropType;
}

interface ModalListProps {
  visible: boolean;
  onClose: () => void;
  data: ListItem[];
  title?: string;
  onSelectItem: (item: ListItem) => void;
}

const ModalList: React.FC<ModalListProps> = ({
  visible,
  onClose,
  data,
  title = 'List',
  onSelectItem,
}) => {
  const [search, setSearch] = useState('');

  const filteredItems = (data ?? []).filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
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
            maxHeight: '80%',
          }}
        >
          <View className="mx-3 items-center">
            <RectangleIcon width={84} height={4} />
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
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#1F1F1F',
              }}
            >
              {title}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <X size={20} color="#1F1F1F" />
            </TouchableOpacity>
          </View>

          {/* Search input */}
          <SearchInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search bank name here"
          />

          <ScrollView
            showsVerticalScrollIndicator={false}
            className="border border-[#C8C8C8] p-4 rounded-xl"
          >
            {filteredItems.map(item => (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  onSelectItem(item);
                  onClose();
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: '#E5E5E5',
                }}
              >
                <Image
                  source={item.logo}
                  style={{ width: 32, height: 32, borderRadius: 16 }}
                  resizeMode="cover"
                />
                <Text
                  style={{ marginLeft: 12, fontSize: 14, color: '#1F1F1F' }}
                >
                  Bank {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ModalList;
