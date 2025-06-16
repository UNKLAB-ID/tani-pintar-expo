import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerAsset } from 'expo-image-picker';
import { Colors } from '@/constants/Colors';
import FileUpladIcons from '@/assets/icons/global/file-upload-icons';

type Props = {
  label?: string;
  value: ImagePickerAsset | null;
  onChange: (image: ImagePickerAsset) => void;
  className?: string;
  textClassName?: string;
  placeholder?: string;
  error?: boolean;
};

const ImagePickerInput: React.FC<Props> = ({
  label = 'Select Image',
  placeholder,
  value,
  onChange,
  className = '',
  textClassName = '',
  error = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const borderColor = error
    ? Colors.color.error
    : isFocused || value
      ? Colors.color.primary
      : Colors.color.border;

  const handlePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });

    if (!result.canceled) {
      onChange(result.assets[0]);
    }
  };

  return (
    <View>
      {label && (
        <Text className={`mb-2 text-lg text-black`} style={{ fontWeight: 500 }}>
          {label}
        </Text>
      )}
      <TouchableOpacity
        className={`w-full p-6 bg-white rounded-lg items-center justify-center ${className}`}
        style={[styles.input, { borderColor }, { height: 150 }]}
        onPress={handlePick}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        {value ? (
          <Image
            source={{ uri: value.uri }}
            style={{ width: '100%', height: '100%', borderRadius: 12 }}
            resizeMode="cover"
          />
        ) : (
          <View>
            <Text className="text-center">
              {' '}
              <FileUpladIcons width={28} height={28} color={'#AAAAAA'} />
            </Text>
            <Text
              className={`text-text-secondary text-lg ${textClassName}`}
              style={{ fontWeight: 500 }}
            >
              {placeholder}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 12,
    borderStyle: 'dashed',
  },
});

export default ImagePickerInput;
