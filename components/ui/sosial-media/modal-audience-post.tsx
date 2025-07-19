import BackIcons from '@/assets/icons/global/back-icons';
import FriendsUserIcons from '@/assets/icons/sosial-media/frieds-user-icons';
import GarisHorizotal from '@/assets/icons/sosial-media/garis-horizontal-icons';
import PrivacyIcons from '@/assets/icons/sosial-media/privacy-icons';
import PublicIcons from '@/assets/icons/sosial-media/publick-icons';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

interface ModalAudiencePostProps {
  modalAudience: boolean;
  textAudience: string;
  setModalAudience: (visible: boolean) => void;
  setTextAudience: (value: string) => void;
}

const ModalAudiencePost: React.FC<ModalAudiencePostProps> = ({
  modalAudience,
  setModalAudience,
  setTextAudience,
  textAudience,
}) => {
  const data = [
    {
      option: 'Public',
      label: 'Anyone on or off TaniVerse',
      icons: <PublicIcons width={20} height={20} />,
    },
    {
      option: 'Friends',
      label: 'Your friends on TaniVerse',
      icons: <FriendsUserIcons width={20} height={20} />,
    },
    {
      option: 'Privacy',
      label: 'Privacy only me',
      icons: <PrivacyIcons width={20} height={20} />,
    },
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalAudience}
      statusBarTranslucent={true}
      onRequestClose={() => setModalAudience(false)}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'flex-end',
        }}
        activeOpacity={1}
        onPressOut={() => setModalAudience(false)}
      />

      <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View
          className="py-5 px-4"
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 430,
          }}
        >
          <View style={{ alignItems: 'center', marginVertical: 10 }}>
            <GarisHorizotal width={86} height={6} />
          </View>
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => setModalAudience(false)}>
              <BackIcons size={19} />
            </TouchableOpacity>
            <Text className="font-semibold ml-2" style={{ fontSize: 16 }}>
              Audience
            </Text>
          </View>
          <View className="pt-4">
            <Text
              style={{ color: '#6F6F6F', fontSize: 14 }}
              className="font-semibold mb-1"
            >
              who can see your post?
            </Text>
            <Text style={{ color: '#6F6F6F', fontSize: 12 }}>
              Set your privacy and decide who can see your posts! You can choose
              a specific audience, from friends, the public, or even just
              certain people. Your posts also have the chance to appear on Home,
              Profile, search results, and Messenger
            </Text>
          </View>
          <Text
            style={{ color: '#6F6F6F', fontSize: 14 }}
            className="font-semibold mt-3"
          >
            Choose Audience
          </Text>
          <View>
            {data.map(option => (
              <TouchableOpacity
                key={option.option}
                onPress={() => {
                  setTextAudience(option.option);
                  setModalAudience(false);
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 6,
                }}
              >
                <View
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#169953',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                  }}
                >
                  {textAudience === option.option && (
                    <View
                      style={{
                        height: 10,
                        width: 10,
                        borderRadius: 5,
                        backgroundColor: '#169953',
                      }}
                    />
                  )}
                </View>
                <View>{option.icons}</View>
                <View className="ml-2">
                  <Text
                    style={{ fontSize: 14, fontWeight: 600, color: '#6F6F6F' }}
                  >
                    {option.option}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#6F6F6F' }}>
                    {option.label}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAudiencePost;
