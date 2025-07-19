import GarisHorizotal from '@/assets/icons/sosial-media/garis-horizontal-icons';
import React from 'react';
import { Modal, Text, View, TouchableOpacity } from 'react-native';

interface ModalReportProfileProps {
  modalReport: boolean;
  setModalReport: (value: boolean) => void;
  setModalReportPost: (value: boolean) => void;
  setModalReportProfile: (value: boolean) => void;
}

const ModalReportProfile: React.FC<ModalReportProfileProps> = ({
  modalReport,
  setModalReportProfile,
  setModalReport,
  setModalReportPost,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalReport}
      statusBarTranslucent={true}
      onRequestClose={() => {
        setModalReport(false);
      }}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'flex-end',
        }}
        activeOpacity={1}
        onPressOut={() => {
          setModalReport(false);
        }}
      />
      <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingVertical: 20,
            height: 370, // Adjust height based on typeQuery
          }}
        >
          {/* Garis horizontal */}
          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <GarisHorizotal width={86} height={6} />
          </View>
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#E9E9E9' }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                marginBottom: 10,
                textAlign: 'center',
              }}
            >
              Report
            </Text>
          </View>
          <View style={{ paddingHorizontal: 16 }}>
            <View
              style={{
                paddingVertical: 20,
                borderBottomWidth: 1,
                borderBottomColor: '#E9E9E9',
              }}
            >
              <Text className="font-semibold" style={{ fontSize: 14 }}>
                What is your reason for reporting this profile?
              </Text>
              <Text style={{ color: '#AAAAAA', paddingVertical: 10 }}>
                Your report will remain anonymous, except in cases of
                intellectual property rights violations. In case of emergency,
                contact your local emergency services immediately for
                assistance.
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setModalReport(false);
                  setModalReportPost(true);
                }}
              >
                <Text>A specific post </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                paddingVertical: 20,
                borderBottomWidth: 1,
                borderBottomColor: '#E9E9E9',
              }}
              onPress={() => {
                setModalReport(false);
                setModalReportProfile(true);
              }}
            >
              <Text>Something about this profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalReportProfile;
