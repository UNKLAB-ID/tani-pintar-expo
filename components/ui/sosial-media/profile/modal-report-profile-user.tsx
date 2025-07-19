import BackIcons from '@/assets/icons/global/back-icons';
import GarisHorizotal from '@/assets/icons/sosial-media/garis-horizontal-icons';
import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

interface ModalAboutProfileUserProps {
  modalProfileUser: boolean;
  setModalProfileUser: (valer: boolean) => void;
  setModalReport: (value: boolean) => void;
  setModalReportType: (value: boolean) => void;
  setTextModalReportType: (value: string) => void;
}

const ModalReportProfileUser: React.FC<ModalAboutProfileUserProps> = ({
  modalProfileUser,
  setModalProfileUser,
  setModalReport,
  setModalReportType,
  setTextModalReportType,
}) => {
  const data = [
    {
      id: 1,
      text: 'Fake identity',
    },
    {
      id: 2,
      text: 'Harassment or threats',
    },
    {
      id: 3,
      text: 'Adult or harmful content',
    },
    {
      id: 4,
      text: 'Spread of fake news',
    },
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalProfileUser}
      statusBarTranslucent={true}
      onRequestClose={() => {
        setModalProfileUser(false);
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
          setModalProfileUser(false);
        }}
      />
      <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingVertical: 20,
            height: 450, // Adjust height based on typeQuery
          }}
        >
          {/* Garis horizontal */}
          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <GarisHorizotal width={86} height={6} />
          </View>
          <View
            className="flex-row items-center justify-between"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#E9E9E9',
              paddingHorizontal: 16,
              paddingBottom: 10,
            }}
          >
            <TouchableOpacity
              className="flex-row items-center justify-center"
              style={{ width: 25 }}
              onPress={() => {
                setModalProfileUser(false);
                setModalReport(true);
              }}
            >
              <BackIcons width={17.42} height={14.88} />
            </TouchableOpacity>
            <View style={{ width: 100 }}>
              <Text
                style={{ fontSize: 16, fontWeight: '600', textAlign: 'center' }}
              >
                Report
              </Text>
            </View>
            <View
              className="flex-row items-center justify-center"
              style={{ width: 25 }}
            ></View>
          </View>
          <View style={{ paddingHorizontal: 16 }}>
            <View style={{ paddingTop: 20 }}>
              <Text className="font-semibold">
                What is your reason for wanting to report this profile?
              </Text>
              <Text style={{ color: '#AAAAAA', marginVertical: 10 }}>
                Please select the reason that best fits your report.
              </Text>
            </View>
            {data.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    paddingVertical: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: '#E9E9E9',
                  }}
                  onPress={() => {
                    setModalReportType(true);
                    setModalProfileUser(false);
                    setTextModalReportType(item.text);
                  }}
                >
                  <Text style={{ fontWeight: 400 }}>{item.text}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalReportProfileUser;
