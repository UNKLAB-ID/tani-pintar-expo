import BackIcons from '@/assets/icons/global/back-icons';
import GarisHorizotal from '@/assets/icons/sosial-media/garis-horizontal-icons';
import React from 'react';
import { Modal, TouchableOpacity, Text, View } from 'react-native';

interface ModalReportTypeProps {
  modalReportType: boolean;
  setModalReportType: (value: boolean) => void;
  setModalReportProfie: (value: boolean) => void;
  setModalReportConten: (value: boolean) => void;
  setDataModalReportConten: (value: any[]) => void;
  setModalContenHeader: (value: string) => void;
  textModalReportType: string;
}

const ModalReportType: React.FC<ModalReportTypeProps> = ({
  modalReportType,
  setModalReportType,
  setModalReportProfie,
  textModalReportType,
  setModalReportConten,
  setDataModalReportConten,
  setModalContenHeader,
}) => {
  const data = [
    {
      id: 1,
      text: 'Adult or explicit content',
    },
    {
      id: 2,
      text: 'Violence or harmful content',
    },
    {
      id: 3,
      text: 'Child exploitation or human trafficking',
    },
    {
      id: 4,
      text: 'Distribution of drugs or illegal substances',
    },
  ];

  const toggleContenReport = (id: number, text: string) => {
    let value: any[];
    if (id === 1) {
      value = [
        {
          id: 1,
          text: 'Displaying or promoting adult content that includes nudity or sexual activity.',
        },
        {
          id: 2,
          text: 'Uploading or promoting sexual exploitation, including abuse and human trafficking.',
        },
        {
          id: 3,
          text: 'Distributing explicit material that is inappropriate for all audiences.',
        },
        {
          id: 4,
          text: 'Promoting fetishes or sexual acts involving non-consensual individuals.',
        },
      ];
    } else if (id === 2) {
      value = [
        {
          id: 1,
          text: 'Showing or promoting acts of physical violence, including hitting, punching, or brutal assault.',
        },
        {
          id: 2,
          text: 'Posting or supporting threats, intimidation, or calls to commit acts of violence against individuals or groups.',
        },
        {
          id: 3,
          text: 'Promoting or normalizing dangerous activities, extreme challenges, or actions that could result in serious injury or death.',
        },
        {
          id: 4,
          text: 'Distributing content involving the use of weapons, armed violence, or acts of terrorism.',
        },
        {
          id: 5,
          text: 'Exploiting or depicting violence against children, animals, or vulnerable individuals.',
        },
      ];
    } else if (id === 3) {
      value = [
        {
          id: 1,
          text: 'Showing or promoting the exploitation of children, including forced labor, hanging, or coercion in any form.',
        },
        {
          id: 2,
          text: 'Uploading or supporting human trafficking activities, such as the conservation, transportation, or use of individuals for the purpose of exploitation.',
        },
        {
          id: 3,
          text: 'Promoting or normalizing the sexual exploitation of children in any form, including manipulation, coercion, or threats.',
        },
        {
          id: 4,
          text: 'Distributing content that contains the exploitation of children, including material that shows their exposure or insecurity.',
        },
        {
          id: 5,
          text: 'Using the platform to assist or facilitate human trafficking, including labor or sexual exploitation.',
        },
      ];
    } else {
      value = [
        {
          id: 1,
          text: 'Facilitating or promoting the sale and distribution of illegal drugs.',
        },
        {
          id: 2,
          text: 'Uploading content that encourages or normalizes the use of dangerous substances.',
        },
        {
          id: 3,
          text: 'Spreading misleading information about narcotics and addictive substances.',
        },
        {
          id: 4,
          text: 'Using the platform for transactions or consumption of illegal substances.',
        },
      ];
    }

    setModalReportType(false);
    setModalReportConten(true);
    setDataModalReportConten(value);
    setModalContenHeader(text);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalReportType}
      statusBarTranslucent={true}
      onRequestClose={() => setModalReportType(false)}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'flex-end',
        }}
        activeOpacity={1}
        onPressOut={() => setModalReportType(false)}
      />
      <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View
          className="py-5 px-4"
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingHorizontal: 16,
            height: 370,
          }}
        >
          <View style={{ alignItems: 'center', marginVertical: 10 }}>
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
                setModalReportType(false);
                setModalReportProfie(true);
              }}
            >
              <BackIcons width={17.42} height={14.88} />
            </TouchableOpacity>
            <View style={{ width: 'auto' }}>
              <Text
                style={{ fontSize: 16, fontWeight: '600', textAlign: 'center' }}
              >
                {textModalReportType}
              </Text>
            </View>
            <View
              className="flex-row items-center justify-center"
              style={{ width: 25 }}
            ></View>
          </View>
          <View>
            {data.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    paddingVertical: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: '#E9E9E9',
                  }}
                  onPress={() => toggleContenReport(item.id, item.text)}
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

export default ModalReportType;
