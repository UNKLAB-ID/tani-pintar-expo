import BackIcons from '@/assets/icons/global/back-icons';
import CloseIcons from '@/assets/icons/global/close-icons';
import GarisHorizotal from '@/assets/icons/sosial-media/garis-horizontal-icons';
import React from 'react';
import { Modal, TouchableOpacity, View, Text } from 'react-native';
import CustomButton from '../../component-globals/button-primary';

interface ModalReportContenProps {
  data: any[];
  textHeader: string;
  modalReportConten: boolean;
  setModalReportConten: (value: boolean) => void;
  setModalReportType: (value: boolean) => void;
  setModalReportVerify: (Value: boolean) => void;
}

const ModalReportConten: React.FC<ModalReportContenProps> = ({
  data,
  textHeader,
  modalReportConten,
  setModalReportConten,
  setModalReportType,
  setModalReportVerify,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalReportConten}
      statusBarTranslucent={true}
      onRequestClose={() => {
        setModalReportConten(false);
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
          setModalReportConten(false);
        }}
      />
      <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingVertical: 20,
            height: 580, // Adjust height based on typeQuery
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
                setModalReportConten(false);
                setModalReportType(true);
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

          {/* Content */}
          <View style={{ paddingHorizontal: 16, paddingVertical: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>
              {textHeader}
            </Text>
            <Text
              style={{ marginVertical: 12 }}
            >{`We don’t allow the following:`}</Text>
            {data.map(item => (
              <View
                key={item.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  gap: 10,
                  marginVertical: 6,
                }}
              >
                <CloseIcons width={16} height={16} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14 }}>{item.text}</Text>
                </View>
              </View>
            ))}
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              paddingHorizontal: 16,
              paddingTop: 10,
              paddingBottom: 60,
              backgroundColor: '#fff',
            }}
          >
            <CustomButton
              title="Submit"
              className="py-[10px]"
              onPress={() => {
                setModalReportConten(false);
                setModalReportVerify(true);
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalReportConten;
