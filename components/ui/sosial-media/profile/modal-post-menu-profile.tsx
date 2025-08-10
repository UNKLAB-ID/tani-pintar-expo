import DeleteIcons from '@/assets/icons/global/delete-icons';
import ShareGlobalIcons from '@/assets/icons/global/share-global-icons';
import BoockmarkSave from '@/assets/icons/sosial-media/boockmark-save-icons';
import BoockmarkUnsave from '@/assets/icons/sosial-media/boockmark-unsave-icons';
import CopyLinkIcons from '@/assets/icons/sosial-media/copy-link-icons';
import EditBgImagesSosialMediaIcons from '@/assets/icons/sosial-media/edit-bg-images-profile-sosial-media-icons';
import GarisHorizotal from '@/assets/icons/sosial-media/garis-horizontal-icons';
import ReportIcons from '@/assets/icons/sosial-media/report-icons';
import api from '@/utils/api/api';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

interface ModalPostMenuProfileProps {
  modalPostMenu: boolean;
  setModalPostMenu: (value: boolean) => void;
  setModalShare: (value: boolean) => void;
  setModalDeletePost: (value: boolean) => void;
  typeQuery?: string;
  idParamsProfile?: string;
  idProfile?: string;
  idSlug?: string;
  statusSavePost: boolean;
  refrest: () => void;
}

const ModalPostMenuProfile: React.FC<ModalPostMenuProfileProps> = ({
  modalPostMenu,
  setModalPostMenu,
  setModalShare,
  setModalDeletePost,
  typeQuery,
  idSlug,
  statusSavePost,
  idParamsProfile,
  idProfile,
  refrest,
}) => {
  const mutationSave = useMutation({
    mutationFn: async () => {
      try {
        let res;
        if (statusSavePost) {
          res = await api.delete(`/social-media/posts/${idSlug}/unsave/`);
        } else {
          res = await api.post(`/social-media/posts/${idSlug}/save/`);
        }

        return res.data;
      } catch (error) {
        throw error;
      }
    },

    onSuccess: res => {
      console.log(res);
      refrest();
      setModalPostMenu(false);
    },

    onError: error => {
      console.log(error);
    },
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalPostMenu}
      statusBarTranslucent={true}
      onRequestClose={() => {
        setModalPostMenu(false);
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
          setModalPostMenu(false);
        }}
      />
      <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingHorizontal: 16,
            paddingVertical: 20,
            height:
              typeQuery === 'user' && idParamsProfile !== idProfile ? 250 : 289,
          }}
        >
          {/* Garis horizontal */}
          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <GarisHorizotal width={86} height={6} />
          </View>
          {typeQuery === 'profile' || idParamsProfile === idProfile ? (
            <View>
              <TouchableOpacity
                onPress={() => {
                  setModalPostMenu(false);
                }}
                className="flex-row items-center mb-4 border-b pb-4"
                style={{ borderBottomColor: '#E9E9E9', borderBottomWidth: 1 }}
              >
                <View
                  className="flex-row items-center justify-center mr-3"
                  style={{ width: 24, height: 24 }}
                >
                  <ShareGlobalIcons width={18} height={18} color="#525252" />
                </View>
                <Text
                  style={{ fontWeight: 400, fontSize: 14, color: '#525252' }}
                >
                  Share profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  mutationSave.mutate();
                }}
                className="flex-row items-center mb-4 border-b pb-4"
                style={{ borderBottomColor: '#E9E9E9', borderBottomWidth: 1 }}
              >
                <View className="flex-row items-center justify-center mr-3">
                  {statusSavePost ? (
                    <BoockmarkUnsave width={22} height={22} />
                  ) : (
                    <BoockmarkSave width={22} height={22} />
                  )}
                </View>
                <Text
                  style={{ fontWeight: 400, fontSize: 14, color: '#525252' }}
                >
                  {statusSavePost ? 'Unsaved' : 'Saved'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setModalPostMenu(false);
                  router.push(
                    `/sosial-media/create-post-media?typePost=update&idPost=${idSlug}`
                  );
                }}
                className="flex-row items-center mb-4 border-b pb-4"
                style={{ borderBottomColor: '#E9E9E9', borderBottomWidth: 1 }}
              >
                <View
                  className="flex-row items-center justify-center mr-3"
                  style={{ width: 24, height: 24 }}
                >
                  <EditBgImagesSosialMediaIcons
                    width={16}
                    height={16}
                    color={'#525252'}
                  />
                </View>
                <Text
                  style={{ fontWeight: 400, fontSize: 14, color: '#525252' }}
                >
                  Edit post
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setModalPostMenu(false);
                  setModalDeletePost(true);
                }}
                className="flex-row items-center mb-4 border-b pb-4"
                style={{ borderBottomColor: '#E9E9E9', borderBottomWidth: 1 }}
              >
                <View className="flex-row items-center justify-center mr-3">
                  <DeleteIcons width={20} height={24} color="#525252" />
                </View>
                <Text
                  style={{ fontWeight: 400, fontSize: 14, color: '#525252' }}
                >
                  Delete post
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity
                onPress={() => {
                  setModalPostMenu(false);
                  setModalShare(true);
                }}
                className="flex-row items-center justify-between mb-4 border-b pb-4"
                style={{ borderBottomColor: '#E9E9E9', borderBottomWidth: 1 }}
              >
                <Text
                  style={{ fontWeight: 400, fontSize: 14, color: '#525252' }}
                >
                  Copy link post
                </Text>
                <View
                  className="flex-row items-center justify-center"
                  style={{ width: 24, height: 24, marginRight: 9.5 }}
                >
                  <CopyLinkIcons width={20} height={20} color="#525252" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  mutationSave.mutate();
                }}
                className="flex-row items-center justify-between mb-4 border-b pb-4"
                style={{ borderBottomColor: '#E9E9E9', borderBottomWidth: 1 }}
              >
                <Text
                  style={{ fontWeight: 400, fontSize: 14, color: '#525252' }}
                >
                  {statusSavePost ? 'Unsave post' : ' Save post'}
                </Text>
                <View className="flex-row items-center justify-center mr-3">
                  {statusSavePost ? (
                    <BoockmarkUnsave width={22} height={22} />
                  ) : (
                    <BoockmarkSave width={22} height={22} />
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setModalPostMenu(false);
                }}
                className="flex-row items-center justify-between mb-4 border-b pb-4"
                style={{ borderBottomColor: '#E9E9E9', borderBottomWidth: 1 }}
              >
                <Text
                  style={{ fontWeight: 400, fontSize: 14, color: '#525252' }}
                >
                  Report
                </Text>
                <View
                  className="flex-row items-center justify-center mr-3"
                  style={{ width: 24, height: 24, paddingLeft: 4 }}
                >
                  <ReportIcons width={23} height={23} color={'#525252'} />
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalPostMenuProfile;
