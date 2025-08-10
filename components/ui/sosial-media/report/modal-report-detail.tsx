import BackIcons from '@/assets/icons/global/back-icons';
import GarisHorizotal from '@/assets/icons/sosial-media/garis-horizontal-icons';
import React from 'react';
import { Modal, View, TouchableOpacity, Text } from 'react-native';
import CustomButton from '../../component-globals/button-primary';

interface ModalReportDetailProps {
  modalReportDetail: boolean;
  setModalReportDetail: (value: boolean) => void;
  setModalBack: (value: boolean) => void;
  setModalReportVerify: (value: boolean) => void;
  reportDetailType?: string;
  reportDetailTypeContent?: any;
  setReportDetailType: (value: string) => void;
}

const ModalReportDetail: React.FC<ModalReportDetailProps> = ({
  modalReportDetail,
  setModalReportDetail,
  reportDetailType,
  setModalBack,
  setModalReportVerify,
  setReportDetailType,
  reportDetailTypeContent,
}) => {
  return (
    <Modal
      visible={modalReportDetail}
      transparent
      animationType="slide"
      statusBarTranslucent={true}
      onRequestClose={() => setModalReportDetail(false)}
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
          onPressOut={() => setModalReportDetail(false)}
        />
        <View
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 525,
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
                setModalBack(true);
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
          <View
            style={{
              paddingHorizontal: 16,
              paddingTop: 20,
              height: 420,
            }}
          >
            <Text
              style={{ fontSize: 16, fontWeight: 600, textAlign: 'center' }}
            >{`You're will submit this report`}</Text>
            <Text
              style={{
                fontSize: 12,
                marginTop: 10,
                marginBottom: 20,
                textAlign: 'center',
              }}
            >
              Our content removal policy is based on our{' '}
              <Text style={{ color: '#0D5C32' }}>Community Standards</Text>. You
              can review or modify your report details below.
            </Text>
            <Text style={{ fontSize: 14, fontWeight: 600 }}>
              Report details
            </Text>
            <View style={{ marginVertical: 20 }}>
              <Text style={{ fontSize: 14, fontWeight: 400 }}>
                What is your reason for reporting this post?
              </Text>
              <Text style={{ fontSize: 14, fontWeight: 400, color: '#6F6F6F' }}>
                {reportDetailTypeContent.textHeader}
              </Text>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 14, fontWeight: 400 }}>
                What makes you feel like this is bullying or unwanted contact?
              </Text>
              <Text style={{ fontSize: 14, fontWeight: 400, color: '#6F6F6F' }}>
                {reportDetailTypeContent.textContent}
              </Text>
            </View>
            {(reportDetailType === 'Yes' || reportDetailType === 'No') && (
              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 14, fontWeight: 400 }}>
                  How old are you under 18?
                </Text>
                <Text
                  style={{ fontSize: 14, fontWeight: 400, color: '#6F6F6F' }}
                >
                  {reportDetailType}
                </Text>
              </View>
            )}

            <View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                paddingTop: 20,
                paddingHorizontal: 16,
                paddingBottom: 20,
                backgroundColor: '#fff',
              }}
            >
              <CustomButton
                title="Submit"
                className="py-[10px]"
                onPress={() => {
                  setReportDetailType('');
                  setModalReportDetail(false);
                  setModalReportVerify(true);
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalReportDetail;
