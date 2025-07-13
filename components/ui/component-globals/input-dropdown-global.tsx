// components/ui/component-globals/dropdown-list.tsx
import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DropdownListProps<T> {
  data: T[];
  placeholder?: string;
  onSelect: (item: T) => void;
  value: T | null;
  getLabel: (item: T) => string;
}

function DropdownList<T extends any>({
  data,
  placeholder = 'Search...',
  onSelect,
  value,
  getLabel,
}: DropdownListProps<T>) {
  const [search, setSearch] = useState('');
  const [showClear, setShowClear] = useState(false);

  const filteredData = data.filter(item =>
    getLabel(item).toLowerCase().includes(search.toLowerCase())
  );

  const handleClear = () => {
    setSearch('');
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeholder}
          value={search}
          onChangeText={text => {
            setSearch(text);
            setShowClear(text.length > 0);
          }}
          style={styles.input}
        />
        {showClear && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Ionicons name="close" size={16} color="#000" />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => onSelect(item)}>
            <Text style={styles.itemText}>{getLabel(item)}</Text>
          </TouchableOpacity>
        )}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: '#000',
  },
  clearButton: {
    padding: 4,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: '#EAEAEA',
  },
  itemText: {
    fontSize: 14,
    color: '#000',
  },
});

export default DropdownList;
