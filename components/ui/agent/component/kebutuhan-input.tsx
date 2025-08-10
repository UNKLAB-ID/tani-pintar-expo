import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

type Props = {
  label: string;
  unitOptions: string[];
  value: number | string;
  unit: string;
  onChangeValue: (val: string) => void;
  onChangeUnit: (val: string) => void;
  errorJumlah?: string;
  errorUnit?: string;
};

const KebutuhanInput: React.FC<Props> = ({
  label,
  unitOptions,
  value,
  unit,
  onChangeValue,
  onChangeUnit,
  errorJumlah,
  errorUnit,
}) => {
  const [open, setOpen] = useState(false);

  const selectedUnit = unit || unitOptions[0];

  return (
    <View style={{ marginBottom: 16, zIndex: 2000 }}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.container,
          { borderColor: errorJumlah || errorUnit ? '#FF0808' : '#000' },
        ]}
      >
        <DropDownPicker
          open={open}
          setOpen={setOpen}
          value={selectedUnit}
          items={unitOptions.map(opt => ({ label: opt, value: opt }))}
          setValue={callback => onChangeUnit(callback(selectedUnit))}
          listMode="SCROLLVIEW"
          style={{
            borderWidth: 0, // hilangkan border
            borderRadius: 8,
          }}
          containerStyle={{ width: 80 }}
          dropDownContainerStyle={{
            zIndex: 1000, // penting!
            elevation: 1000, // Android
            position: 'absolute',
          }}
          zIndex={1000} // iOS
          zIndexInverse={1000} // Android
        />

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(value)}
          onChangeText={onChangeValue}
          placeholder="0"
        />
      </View>

      {/* Tampilkan error masing-masing */}
      {/* {errorUnit && (
                <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>{errorUnit}</Text>
            )}
            {errorJumlah && (
                <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>{errorJumlah}</Text>
            )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
  },
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    overflow: 'visible',
  },
  input: {
    marginVertical: 2,
    fontSize: 14,
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default KebutuhanInput;
