import BackIcons from '@/assets/icons/global/back-icons';
import GarisHorizotal from '@/assets/icons/sosial-media/garis-horizontal-icons';
import React from 'react';
import { Modal, View, TouchableOpacity, Text } from 'react-native';

interface ModalRepiortTypeContentSosialMediaProps {
  modalReportTypeContentSosialMedia: boolean;
  dataReportTypeContentSosialMedia: any;
  setModalReportTypeContentSosialMedia: (value: boolean) => void;
  setModalReportMenuSosialMedia: (vaue: boolean) => void;
  setModalReportAgreeList: (value: boolean) => void;
  setDataAgreeList: (value: any) => void;
  setModalReportDetail: (value: boolean) => void;
  setReportDetailTypeContent: (value: any) => void;
  serReportDetailBackType: (value: string) => void;
}

const ModalRepiortTypeContentSosialMedia: React.FC<
  ModalRepiortTypeContentSosialMediaProps
> = ({
  modalReportTypeContentSosialMedia,
  dataReportTypeContentSosialMedia,
  setModalReportTypeContentSosialMedia,
  setModalReportMenuSosialMedia,
  setDataAgreeList,
  setModalReportAgreeList,
  setModalReportDetail,
  setReportDetailTypeContent,
  serReportDetailBackType,
}) => {
  const toggleContenTypeReport = (id: number) => {
    let dataAgreeList: any;

    switch (id) {
      case 2:
        dataAgreeList = {
          id: 2,
          textHeader: 'How old are you under 18?',
          data: [
            { id: 1, text: 'Yes' },
            { id: 2, text: 'No' },
          ],
        };
        setModalReportTypeContentSosialMedia(false);
        setDataAgreeList(dataAgreeList);
        setModalReportAgreeList(true);
        break;
      case 4:
        dataAgreeList = {
          id: 4,
          textHeader: 'What kind of drugs?',
          data: [
            {
              id: 1,
              text: 'Highly addictive substances such as cocaine, heroin, and fentanyl.',
            },
            { id: 2, text: 'Prescription drugs' },
            { id: 3, text: 'Other drugs' },
          ],
        };
        setModalReportTypeContentSosialMedia(false);
        setDataAgreeList(dataAgreeList);
        setModalReportAgreeList(true);
        break;
      case 5:
        dataAgreeList = {
          id: 5,
          textHeader: 'How old are you under 18?',
          data: [
            { id: 1, text: 'Yes' },
            { id: 2, text: 'No' },
          ],
        };
        setModalReportTypeContentSosialMedia(false);
        setDataAgreeList(dataAgreeList);
        setModalReportAgreeList(true);
        break;
    }
  };

  return (
    <Modal
      visible={modalReportTypeContentSosialMedia}
      transparent
      animationType="slide"
      statusBarTranslucent={true}
      onRequestClose={() => setModalReportTypeContentSosialMedia(false)}
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
          onPressOut={() => setModalReportTypeContentSosialMedia(false)}
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
                setModalReportTypeContentSosialMedia(false);
                setModalReportMenuSosialMedia(true);
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
                fontSize: 16,
                fontWeight: 600,
                textAlign: 'center',
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              {dataReportTypeContentSosialMedia.textHeader}
            </Text>
            {dataReportTypeContentSosialMedia.data.map(
              (item: any, index: number) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{ paddingVertical: 10 }}
                    onPress={() => {
                      switch (dataReportTypeContentSosialMedia.id) {
                        case 2:
                          toggleContenTypeReport(2);
                          break;
                        case 3:
                          setReportDetailTypeContent({
                            textHeader:
                              'Suicide, self injury or eating disorders',
                            textContent: item.text,
                          });
                          serReportDetailBackType('Header List');
                          setModalReportTypeContentSosialMedia(false);
                          setModalReportDetail(true);
                          break;
                        case 4:
                          break;
                        case 9:
                          toggleContenTypeReport(4);
                          break;
                        case 5:
                          toggleContenTypeReport(5);
                          break;
                        case 7:
                          break;
                        case 8:
                          break;
                      }
                    }}
                  >
                    <Text>{item.text}</Text>
                  </TouchableOpacity>
                );
              }
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalRepiortTypeContentSosialMedia;
