import SearchIconPrimary from '@/assets/icons/global/search-icons';
import React, { useEffect, useState } from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import { Colors } from '@/constants/Colors';

interface InputSearchProps
  extends Pick<TextInputProps, 'value' | 'onChangeText' | 'placeholder'> {
  colorPlaceholder?: string;
  className?: string;
  error?: boolean;
  rounded?: number;
  borderColor?: string;
  coloricon?: string;
  iconPosition?: 'left' | 'right';
  disable?: boolean;
}

const InputSearchPrimary: React.FC<InputSearchProps> = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  className = '',
  error = false,
  colorPlaceholder = Colors.color.border,
  rounded = 12,
  borderColor = Colors.color.border,
  coloricon = Colors.color.border,
  iconPosition = 'left',
  disable = true,
}) => {
  const [inputValue, setInputValue] = useState<string>(value ?? '');

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue.length >= 3 && onChangeText) {
        onChangeText(inputValue);
      } else if (inputValue.trim().length === 0) {
        onChangeText?.(''); // kalau kosong, kirim kosong juga
      }
    }, 300);

    return () => clearTimeout(handler); // cleanup debounce
  }, [inputValue]);

  return (
    <View
      className={`flex-row items-center border ${className}`}
      style={{
        borderRadius: rounded,
        borderWidth: 1,
        borderColor: borderColor,
      }}
    >
      {iconPosition === 'left' && <SearchIconPrimary color={coloricon} />}

      <TextInput
        className="ml-2 flex-1 text-text-primary"
        placeholder={placeholder}
        placeholderTextColor={colorPlaceholder}
        value={value}
        onChangeText={setInputValue}
        editable={disable}
        textAlignVertical="center"
      />
      {iconPosition === 'right' && (
        <SearchIconPrimary color={coloricon} style={{ marginLeft: 6 }} />
      )}
    </View>
  );
};

export default InputSearchPrimary;
