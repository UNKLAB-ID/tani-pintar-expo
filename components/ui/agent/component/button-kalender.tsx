import KalenderIconsAgent from '@/assets/icons/agent/kalender-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ButtonKalenderAgentProps {
  forms: any;
  value: string;
  nameForms: string;
  setToggleKalender: (value: boolean) => void;
  setNameForm: (value: string) => void;
  isDisable: boolean;
}

const formatDateID = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const ButtonKalenderAgent: React.FC<ButtonKalenderAgentProps> = ({
  value,
  setToggleKalender,
  forms,
  nameForms,
  setNameForm,
  isDisable,
}) => {
  const error = forms.formState.errors[nameForms]?.message;
  const formattedValue = formatDateID(value);

  return (
    <View>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: error ? '#FF0808' : '#000',
          borderRadius: 12,
          padding: 12,
        }}
        disabled={isDisable}
        onPress={() => {
          setNameForm(nameForms);
          setToggleKalender(true);
        }}
      >
        <View className="flex-row justify-between items-center">
          <Text
            style={{
              fontWeight: 500,
              color: formattedValue ? '#525252' : '#C8C8C8',
            }}
          >
            {formattedValue || 'Tanggal Awal'}
          </Text>
          <KalenderIconsAgent width={24} height={24} />
        </View>
      </TouchableOpacity>

      {/* {error && (
                <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                    {String(error)}
                </Text>
            )} */}
    </View>
  );
};

export default ButtonKalenderAgent;
