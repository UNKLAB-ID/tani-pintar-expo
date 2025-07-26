import BackIcons from '@/assets/icons/global/back-icons';
import GarisHorizotal from '@/assets/icons/sosial-media/garis-horizontal-icons';
import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

interface ModalAgreeReportSosialMediaProps {
  modalAgreeReportSosialMedia: boolean;
  dataAgreeList: any;
  setModalAgreeReportSosialMedia: (value: boolean) => void;
  setModalReportTypeContentSosialMedia: (value: boolean) => void;
  setModalReportDetail: (value: boolean) => void;
  setReportDetailType: (value: string) => void;
  serReportDetailBackType: (value: string) => void;
  setReportDetailTypeContent: (value: any) => void;
}

const ModalAgreeReportSosialMedia: React.FC<
  ModalAgreeReportSosialMediaProps
> = ({
  modalAgreeReportSosialMedia,
  dataAgreeList,
  setModalAgreeReportSosialMedia,
  setModalReportTypeContentSosialMedia,
  setModalReportDetail,
  setReportDetailType,
  serReportDetailBackType,
  setReportDetailTypeContent,
}) => {
  return (
    <Modal
      visible={modalAgreeReportSosialMedia}
      transparent
      animationType="slide"
      statusBarTranslucent={true}
      onRequestClose={() => setModalAgreeReportSosialMedia(false)}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPressOut={() => setModalAgreeReportSosialMedia(false)}
        />
        <View
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 500,
          }}
        >
          <View
            style={{ alignItems: 'center', marginBottom: 15, marginTop: 20 }}
          >
            <GarisHorizotal width={86} height={6} />
          </View>
          <View
            className="flex-row items-center justify-between"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#E9E9E9',
              paddingBottom: 5,
              paddingHorizontal: 16,
            }}
          >
            <TouchableOpacity
              className="flex-row items-center justify-center"
              style={{ width: 25 }}
              onPress={() => {
                setModalAgreeReportSosialMedia(false);
                setModalReportTypeContentSosialMedia(true);
              }}
            >
              <BackIcons width={17.42} height={14.88} />
            </TouchableOpacity>
            <View style={{ width: 'auto' }}>
              <Text
                style={{ fontSize: 18, fontWeight: 600, textAlign: 'center' }}
              >
                Report
              </Text>
            </View>
            <View
              className="flex-row items-center justify-center"
              style={{ width: 25 }}
            />
          </View>
          <View style={{ paddingHorizontal: 16 }}>
            <Text
              style={{
                marginTop: 20,
                marginBottom: 10,
                fontSize: 16,
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              {dataAgreeList.textHeader}
            </Text>
            {dataAgreeList.data.map((item: any, index: number) => {
              return (
                <TouchableOpacity
                  style={{ paddingVertical: 10 }}
                  key={index}
                  onPress={() => {
                    setReportDetailType(String(item.text));
                    setModalAgreeReportSosialMedia(false);
                    serReportDetailBackType('Children');
                    setModalReportDetail(true);
                    setReportDetailTypeContent({
                      textHeader: 'Bullying or unwanted contact',
                      textContent:
                        'Distribution of nude images without permission',
                    });
                  }}
                >
                  <Text>{item.text}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAgreeReportSosialMedia;
