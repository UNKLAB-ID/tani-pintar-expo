import LoveIcons from '@/assets/icons/global/love-icons';
import GarisHorizotal from '@/assets/icons/sosial-media/garis-horizontal-icons';
import IconsComentars from '@/assets/icons/sosial-media/iconst-button-comentars';
import api from '@/utils/api/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  Modal,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import LoveActiveIcons from '@/assets/icons/global/love-active-icons';
import { formatWaktuSingkat } from '@/utils/services/sosial-media/format-waktu';

interface ModalComentarsProps {
  modalCommentVisible: boolean;
  setModalCommentVisible: (visible: boolean) => void;
  id?: string;
}

const ModalComentars: React.FC<ModalComentarsProps> = ({
  modalCommentVisible,
  setModalCommentVisible,
  id,
}) => {
  const [dataComentars, setDataComentars] = useState<any[]>([]);
  const [dataComentarChildern, setDataComentarChildern] = useState<any[]>([]);
  const [commentInput, setCommentInput] = useState<string>('');
  const [idComentar, setIdComentar] = useState<string>('');
  const [idComentarCildern, setIdComentarCildern] = useState<string>('');

  const feactDataComentarList = async () => {
    const response = await api.get(`/social-media/posts/${id}/comments`);
    return response.data;
  };

  const { data, refetch } = useQuery({
    queryKey: ['postComentarList'],
    queryFn: feactDataComentarList,
    refetchOnWindowFocus: true,
  });

  const feactDataComentarCildernList = async () => {
    const response = await api.get(
      `https://dev.api.taniverse.id/social-media/posts/${id}/comments/${idComentar}/replies/`
    );
    return response.data;
  };

  const {
    data: dataChildern,
    refetch: refetchChildern,
    isLoading: loadingChildern,
  } = useQuery({
    queryKey: ['postComentarChildernList', idComentar],
    queryFn: feactDataComentarCildernList,
    enabled: !!idComentar, // ✅ hanya fetch kalau idComentar ada
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    setDataComentars(data?.results || []);
  }, [data]);

  useEffect(() => {
    setDataComentarChildern(dataChildern?.results || []);
  }, [dataChildern]);

  useEffect(() => {
    if (idComentar) {
      refetchChildern();
    }
  }, [idComentar]);

  const mutation = useMutation({
    mutationFn: async (newComment: { content: string; parent?: string }) => {
      const response = await api.post(
        `/social-media/posts/${id}/comments/`,
        newComment
      );
      return response.data;
    },

    onSuccess: () => {
      setCommentInput('');
      setIdComentar('');
      refetch();
      refetchChildern();
    },

    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || 'Gagal mengirim komentar.';
      alert(errorMessage);
      console.error('Comment Error:', error);
    },
  });

  // Fungsi untuk memanggil mutation
  const createdComment = () => {
    if (!commentInput.trim()) return;

    const payload: { content: string; parent?: string } = {
      content: commentInput,
    };

    if (idComentarCildern !== '') {
      payload.parent = idComentarCildern;
    }

    mutation.mutate(payload);
  };

  const mutationLike = useMutation({
    mutationFn: async ({
      idLike,
      statusLike,
    }: {
      idLike: string;
      statusLike: boolean;
    }) => {
      let response;

      if (statusLike) {
        // Jika sudah like, maka hapus like
        response = await api.delete(
          `/social-media/posts/${id}/comments/${idLike}/unlike/`
        );
      } else {
        // Jika belum like, maka kirim like
        response = await api.post(
          `/social-media/posts/${id}/comments/${idLike}/like/`
        );
      }

      return response.data;
    },

    onSuccess: () => {
      setCommentInput('');
      refetch();
      refetchChildern();
    },

    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || 'Gagal mengirim like comentar.';
      alert(errorMessage);
      console.error('Comment Error:', error);
    },
  });

  const emojis = ['😀', '😂', '😍', '😎', '😭', '👍', '🎉', '🔥', '❤️'];

  return (
    <Modal
      visible={modalCommentVisible}
      transparent
      animationType="slide"
      onRequestClose={() => setModalCommentVisible(false)}
      // statusBarTranslucent={true}
    >
      <TouchableWithoutFeedback onPress={() => setModalCommentVisible(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }} />
      </TouchableWithoutFeedback>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'flex-end',
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        >
          <SafeAreaView
            style={{
              height: 700, // ✅ HANYA 600
              width: '100%',
              backgroundColor: '#fff',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            {/* HEADER / TITLE */}
            <View
              style={{ alignItems: 'center', marginTop: 12, marginBottom: 12 }}
            >
              <GarisHorizotal width={86} height={6} />
            </View>
            <Text
              style={{ fontSize: 18, textAlign: 'center', fontWeight: '600' }}
            >
              Comment
            </Text>

            {/* KOMENTAR */}
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ padding: 16, paddingBottom: 10 }}
              keyboardShouldPersistTaps="handled"
            >
              {dataComentars.length > 0 ? (
                dataComentars.map((value: any, index: number) => (
                  <View key={index}>
                    <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                      {/* Avatar dan isi komentar */}
                      <Image
                        source={require('../../../assets/images/profile-default.png')}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          marginRight: 10,
                        }}
                      />
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: '600' }}>
                          {value.user.profile?.full_name}
                        </Text>
                        <Text style={{ marginTop: 4 }}>{value.content}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 4 }}>
                          <Text style={{ color: '#999' }}>
                            {formatWaktuSingkat(value.created_at)}
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              setDataComentarChildern([]);
                              setIdComentar(String(value.id));
                              setIdComentarCildern(String(value.id));
                            }}
                          >
                            <Text
                              style={{
                                marginLeft: 8,
                                fontWeight: 'bold',
                                color: '#169953',
                              }}
                            >
                              Reply
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      {/* Like icon */}
                      <TouchableOpacity
                        onPress={() => {
                          console.log(value.has_replies);
                          if (value.id) {
                            mutationLike.mutate({
                              idLike: String(value.id),
                              statusLike: value.is_liked,
                            });
                          }
                        }}
                        style={{ alignItems: 'center', marginLeft: 8 }}
                      >
                        {value.is_liked ? (
                          <LoveActiveIcons width={18} height={18} />
                        ) : (
                          <LoveIcons width={18} height={18} color={'#434343'} />
                        )}
                        <Text>{value.likes_count}</Text>
                      </TouchableOpacity>
                    </View>
                    {/* BALASAN */}
                    {idComentar === String(value.id) && (
                      <View
                        style={{
                          paddingLeft: 50,
                          borderLeftWidth: 1,
                          borderColor: '#ccc',
                        }}
                      >
                        {loadingChildern ? (
                          // Skeleton 1 item dulu, bisa dikembangkan pakai library shimmer
                          <View
                            style={[{ flexDirection: 'row', marginTop: 12 }]}
                          >
                            <View
                              style={{
                                width: 32,
                                height: 32,
                                borderRadius: 16,
                                backgroundColor: '#ddd',
                                marginRight: 10,
                              }}
                            />
                            <View style={{ flex: 1 }}>
                              <View
                                style={{
                                  width: '40%',
                                  height: 12,
                                  backgroundColor: '#ddd',
                                  marginBottom: 6,
                                }}
                              />
                              <View
                                style={{
                                  width: '100%',
                                  height: 12,
                                  backgroundColor: '#ddd',
                                  marginBottom: 4,
                                }}
                              />
                              <View
                                style={{
                                  width: '60%',
                                  height: 10,
                                  backgroundColor: '#eee',
                                }}
                              />
                            </View>
                          </View>
                        ) : (
                          dataComentarChildern.map(
                            (reply: any, idx: number) => (
                              <View
                                key={idx}
                                style={{ flexDirection: 'row', marginTop: 12 }}
                              >
                                <Image
                                  source={require('../../../assets/images/profile-default.png')}
                                  style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 16,
                                    marginRight: 10,
                                  }}
                                />
                                <View style={{ flex: 1 }}>
                                  <Text style={{ fontWeight: '600' }}>
                                    {reply.user.profile?.full_name}
                                  </Text>
                                  <Text style={{ marginTop: 4 }}>
                                    {reply.content}
                                  </Text>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      marginTop: 4,
                                    }}
                                  >
                                    <Text style={{ color: '#999' }}>
                                      {formatWaktuSingkat(reply.created_at)}
                                    </Text>
                                    <TouchableOpacity
                                      onPress={() => {
                                        setIdComentarCildern(String(reply.id));
                                      }}
                                    >
                                      <Text
                                        style={{
                                          marginLeft: 8,
                                          fontWeight: 'bold',
                                          color: '#169953',
                                        }}
                                      >
                                        Reply
                                      </Text>
                                    </TouchableOpacity>
                                  </View>
                                </View>
                                <TouchableOpacity
                                  onPress={() => {
                                    mutationLike.mutate({
                                      idLike: String(reply.id),
                                      statusLike: reply.is_liked,
                                    });
                                  }}
                                  style={{
                                    alignItems: 'center',
                                    marginLeft: 8,
                                  }}
                                >
                                  {reply.is_liked ? (
                                    <LoveActiveIcons width={18} height={18} />
                                  ) : (
                                    <LoveIcons
                                      width={18}
                                      height={18}
                                      color={'#434343'}
                                    />
                                  )}
                                  <Text>{reply.likes_count}</Text>
                                </TouchableOpacity>
                              </View>
                            )
                          )
                        )}
                      </View>
                    )}
                  </View>
                ))
              ) : (
                <Text
                  style={{ textAlign: 'center', color: '#999', marginTop: 20 }}
                >
                  Belum ada komentar
                </Text>
              )}
            </ScrollView>

            {/* INPUT KOMENTAR */}
            <View
              style={{
                padding: 16,
                borderTopWidth: 1,
                borderColor: '#ccc',
                backgroundColor: '#fff',
              }}
            >
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginBottom: 16 }}
              >
                {emojis.map((emoji, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setCommentInput(prev => prev + emoji)}
                  >
                    <Text style={{ fontSize: 24, marginHorizontal: 8 }}>
                      {emoji}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <TextInput
                  value={commentInput}
                  onChangeText={setCommentInput}
                  placeholder="Wow, bagus sekali ya bunda-bunda"
                  style={{
                    flex: 1,
                    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
                    fontSize: 14,
                    marginRight: 10,
                  }}
                />
                <TouchableOpacity
                  onPress={createdComment}
                  className="rounded-full bg-primary items-center justify-center"
                  style={{ width: 36, height: 36 }}
                >
                  <IconsComentars width={16} height={16} />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default ModalComentars;
