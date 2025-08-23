import SearchIconPrimary from '@/assets/icons/global/search-icons';
import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface SearchInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Enter name ',
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <SearchIconPrimary width={24} height={24} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#AAAAAA"
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#C8C8C8',
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },
});

export default SearchInput;
