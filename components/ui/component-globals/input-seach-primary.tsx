import SearchIconPrimary from "@/assets/icons/search-icons";
import SearchIcon from "@/assets/icons/search-icons";
import React from "react";
import { View, TextInput, TextInputProps } from "react-native";
import { Colors } from "@/constants/Colors";

interface InputSearchProps extends Pick<TextInputProps, "value" | "onChangeText" | "placeholder"> {
    colorPlaceholder?: string;
    className?: string;
    error?: boolean;
    // onFocus?: () => void;
    // onBlur?: () => void;
    // onPress?: () => void;
    rounded?: number;
    borderColor?: string;
    coloricon?: string;
}

const InputSearchPrimary: React.FC<InputSearchProps> = ({
  value,
  onChangeText,
  placeholder = "Search...",
  className = "",
  error = false,
//   onFocus,
//   onBlur,
//   onPress,
  colorPlaceholder = Colors.color.border,
  rounded = 12,
 borderColor = Colors.color.border,
coloricon = Colors.color.border,
}) => {
  return (
    <View className={`flex-row items-center border ${className}`} style={{ borderRadius: rounded, borderWidth: 1, borderColor: borderColor }}>
   <SearchIconPrimary color={coloricon}/>
      <TextInput
        className="ml-2 flex-1 text-base text-gray-800"
        placeholder={placeholder}
        placeholderTextColor="#AAAAAA"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default InputSearchPrimary;
