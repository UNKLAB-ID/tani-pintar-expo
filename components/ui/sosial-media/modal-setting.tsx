import React from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import GarisHorizotal from '@/assets/icons/sosial-media/garis-horizontal-icons';
import CustomButtonSosialMedia from './button-internal-sosial-media';
import BoockmarkSave from '@/assets/icons/sosial-media/boockmark-save-icons';
import BoockmarkUnsave from '@/assets/icons/sosial-media/boockmark-unsave-icons';
import HidenPostIcons from '@/assets/icons/sosial-media/hiden-post-icons';
import ReportIcons from '@/assets/icons/sosial-media/report-icons';
import BlockIcons from '@/assets/icons/sosial-media/block-icons';
import CopyLinkIcons from '@/assets/icons/sosial-media/copy-link-icons';
import NotInterestedIcons from '@/assets/icons/sosial-media/not-interested';

interface ModalSettingSrinerProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  setModalBlock: (visible: boolean) => void;
  setModalHidenPost: (visible: boolean) => void;
}

const ModalSettingSriner: React.FC<ModalSettingSrinerProps> = ({
  modalVisible,
  setModalVisible,
  setModalBlock,
  setModalHidenPost,
}) => {
  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="slide"
      statusBarTranslucent={true}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'flex-end',
        }}
        activeOpacity={1}
        onPressOut={() => setModalVisible(false)}
      >
      </TouchableOpacity>
      <View style={{ backgroundColor: 'rgba(0,0,0,0.5)',}}>
        <View
          className="px-4"
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 350,
          }}
        >
          <View
            style={{ alignItems: 'center', marginBottom: 20, marginTop: 20 }}
          >
            <GarisHorizotal width={86} height={6} />
          </View>

          <View className="flex-row items-center justify-between mb-5">
            <CustomButtonSosialMedia
              title={modalVisible ? 'Save' : 'Unsave'}
              onPress={() => setModalVisible(false)}
              borderColor="#AAA"
              textColor="#000"
              widht={173}
              icon={
                modalVisible ? (
                  <BoockmarkSave width={22} height={22} />
                ) : (
                  <BoockmarkUnsave width={22} height={22} />
                )
              }
            />
            <CustomButtonSosialMedia
              title="Hide Post"
              onPress={() => {
                setModalVisible(false);
                setModalHidenPost(true);
              }}
              borderColor="#AAA"
              textColor="#000"
              widht={173}
              icon={
                <HidenPostIcons
                  width={22.01}
                  height={20.16}
                  color={'#1F1F1F'}
                />
              }
            />
          </View>
          <View className="flex-row items-center justify-between mb-5">
            <CustomButtonSosialMedia
              title="Copy Link"
              onPress={() => setModalVisible(false)}
              borderColor="#AAA"
              textColor="#000"
              widht={173}
              icon={<CopyLinkIcons width={20} height={20} />}
            />
            <CustomButtonSosialMedia
              title="Block"
              onPress={() => {
                setModalVisible(false);
                setModalBlock(true);
              }}
              borderColor="#AAA"
              textColor="#FF0808"
              widht={173}
              icon={<BlockIcons width={22} height={22} />}
            />
          </View>
          <CustomButtonSosialMedia
            title="Report"
            onPress={() => setModalVisible(false)}
            borderColor="#AAA"
            textColor="#FF0808"
            className="w-full"
            icon={<ReportIcons width={22} height={22} color={'#FF0808'} />}
          />
          <CustomButtonSosialMedia
            title="Not Interested"
            onPress={() => setModalVisible(false)}
            borderColor="#AAA"
            textColor="#000"
            className="w-full mt-5 mb-5"
            icon={<NotInterestedIcons width={32} height={32} />}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalSettingSriner;
