import HidenPostIcons from '@/assets/icons/sosial-media/hiden-post-icons';
import ReportIcons from '@/assets/icons/sosial-media/report-icons';
import UndoPostIcons from '@/assets/icons/sosial-media/undo-post-icons';
import { Colors } from '@/constants/Colors';
import React from 'react';
import { Image , Text, TouchableOpacity, View } from 'react-native';


interface ModalHidenPostProps {
  setHidenPost: () => void;
}

const ModalHidenPost: React.FC<ModalHidenPostProps> = ({ setHidenPost }) => {
  return (
    <View
      className="px-5 py-4"
      style={{
        flex: 1,
        justifyContent: 'flex-end',
      }}
    >
      <View
        style={{
          borderBottomColor: '#C8C8C8',
          borderBottomWidth: 1,
          paddingBottom: 10,
        }}
      >
        <View className="flex-row mb-1">
          <HidenPostIcons
            width={22.01}
            height={20.16}
            color={Colors.color.primary}
          />
          <Text className="text-[14px] text-center text-text-secondary ml-3">
            Hidden
          </Text>
        </View>
        <Text className="text-[16px] font-semibold text-text-primary">
          Hide posts for more relevant feeds.
        </Text>
      </View>
      <View className="py-4">
        <View className="flex-row ">
          <Image
            source={require('../../../assets/images/Image-success-otp.png')}
            className="mb-5"
            style={{ width: 28, height: 28, borderRadius: 100 }}
          />
          <Text
            className="text-center text-[14px] ml-3 items-center"
            style={{ fontWeight: 500 }}
          >
            Do not show Natasya Julio for 14 days
          </Text>
        </View>
        <TouchableOpacity className="flex-row items-center mb-4">
          <ReportIcons width={22} height={22} color={'#1F1F1F'} />
          <Text
            className="text-[14px] text-text-primary ml-3"
            style={{ fontWeight: 500 }}
          >
            Report post
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center"
          onPress={setHidenPost}
        >
          <UndoPostIcons width={22} height={22} color={'#1F1F1F'} />
          <Text
            className="text-[14px] text-text-primary ml-3"
            style={{ fontWeight: 500 }}
          >
            Undo post
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModalHidenPost;
