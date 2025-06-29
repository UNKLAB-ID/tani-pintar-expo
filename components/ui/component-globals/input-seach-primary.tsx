import SearchIconPrimary from '@/assets/icons/global/search-icons';
import React from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import { Colors } from '@/constants/Colors';

interface InputSearchProps
  extends Pick<TextInputProps, 'value' | 'onChangeText' | 'placeholder'> {
  colorPlaceholder?: string;
  className?: string;
  error?: boolean;
  // onFocus?: () => void;
  // onBlur?: () => void;
  // onPress?: () => void;
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
  //   onFocus,
  //   onBlur,
  //   onPress,
  colorPlaceholder = Colors.color.border,
  rounded = 12,
  borderColor = Colors.color.border,
  coloricon = Colors.color.border,
  iconPosition = 'left',
  disable = true,
}) => {
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
        onChangeText={onChangeText}
        editable={disable}
        textAlignVertical='center'
      />
      {iconPosition === 'right' && (
        <SearchIconPrimary color={coloricon} style={{ marginLeft: 6 }} />
      )}
    </View>
  );
};

export default InputSearchPrimary;
