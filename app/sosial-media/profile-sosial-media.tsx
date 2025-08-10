import BackIcons from '@/assets/icons/global/back-icons';
import PointThreeHorizontal from '@/assets/icons/global/point-three-horizontal';
import EditBgImagesSosialMediaIcons from '@/assets/icons/sosial-media/edit-bg-images-profile-sosial-media-icons';
import MenuProfileIcons from '@/assets/icons/sosial-media/menu-profile-icons';
import PointIcons from '@/assets/icons/sosial-media/point-icons';
import CustomButton from '@/components/ui/component-globals/button-primary';
import CustomButtonSecundary from '@/components/ui/component-globals/button-secundary';
import InputSearchPrimary from '@/components/ui/component-globals/input-seach-primary';
import CardSosialMedia from '@/components/ui/sosial-media/card-sosial-media';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useProfile } from '@/hooks/useProfile';
import { useMediaSosial } from '@/store/sosial-media/sosial-media';
import api from '@/utils/api/api';
import { useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  View,
  TouchableOpacity,
  StatusBar,
  Text,
  ScrollView,
} from 'react-native';
import ModalUserMenuProfile from '@/components/ui/sosial-media/profile/modal-menu-user-profile';
import BlockScriner from '@/components/ui/sosial-media/modal-block';
import ModalShare from '@/components/ui/sosial-media/modal-share';
import ModalDeletePost from '@/components/ui/sosial-media/profile/modal-delete-post-profile';
import ModalAboutProfileUser from '@/components/ui/sosial-media/profile/modal-about-profile-user';
import ModalReportProfile from '@/components/ui/sosial-media/profile/modal-report-profile';
import ModalReportPost from '@/components/ui/sosial-media/profile/modal-report-post';
import ModalReportProfileUser from '@/components/ui/sosial-media/profile/modal-report-profile-user';
import ModalReportType from '@/components/ui/sosial-media/report/modal-report-type';
import ModalReportConten from '@/components/ui/sosial-media/report/modal-report-conten';
import ModalReportVerify from '@/components/ui/sosial-media/report/modal-report-verify';
import ModalReportSuccess from '@/components/ui/sosial-media/report/modal-report-success';

const ProfileSosialMedia = () => {
  const [dataPosts, setDataPosts] = useState<any[]>([]);
  const [dataProfile, setDataProfile] = useState<any>({});
  const [modalUserMenu, setModalUserMenu] = useState<boolean>(false);
  const [modalBlock, setModalBlock] = useState<boolean>(false);
  const [modalReport, setModalReport] = useState<boolean>(false);
  const [modalShare, setModalShare] = useState<boolean>(false);
  const [modalCopyLink, setModalCopyLink] = useState<boolean>(false);
  const [modalAboutThisProfile, setModalAboutThisProfile] =
    useState<boolean>(false);
  const [modalReportPost, setModalReportPost] = useState<boolean>(false);
  const [modalReportProfile, setModalReportProfie] = useState<boolean>(false);
  const [modalreportType, setModalReportType] = useState<boolean>(false);
  const [modalReportConten, setModalReportConten] = useState<boolean>(false);
  const [modalReportVerify, setModalReportVerify] = useState<boolean>(false);
  const [modalReportSuccess, setModalReportSuccess] = useState<boolean>(false);
  const [textModalReportType, setTextModalReportType] = useState<string>('');
  const [textModalContenHeader, setModalContenHeader] = useState<string>('');
  const [dataModalReportConten, setDataModalReportConten] = useState<any[]>([]);
  const [idUser, setIduser] = useState<string>('');

  const { profileImage, modalDeletePost, setModalDeletePost } =
    useMediaSosial();
  const { query, id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const fetchProfileById = async () => {
    const response = await api.get(`/accounts/profile/${id}/`);
    return response.data;
  };

  const {
    data: profileById,
    isLoading: loadingById,
    error: errorById,
  } = useQuery({
    queryKey: ['profileById', id],
    queryFn: fetchProfileById,
    enabled: !!id,
    refetchOnWindowFocus: true,
  });

  const {
    data: profile,
    isError: errorUser,
    isLoading: lodingUser,
  } = useProfile();

  useEffect(() => {
    if (query === 'profile' && !id) {
      console.log(profile?.user.id);
      setIduser(String(profile?.user.id));
      setDataProfile(profile);
    } else if (query === 'user' && id) {
      console.log(profileById?.id);
      setIduser(String(profileById?.user.id));
      setDataProfile(profileById);
    }
  }, [profile, profileById]);

  const fetchPostsList = async () => {
    const response = await api.get(`/social-media/posts/?user_id=${idUser}`);
    return response.data;
  };

  const {
    data: postsList,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['postsList', idUser],
    queryFn: fetchPostsList,
    refetchOnWindowFocus: false,
    enabled: !!idUser,
  });

  useEffect(() => {
    setDataPosts(postsList?.results || []);
  }, [postsList]);

  useEffect(() => {
    if (idUser) {
      refetch();
    }
  }, [idUser]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#f7f7f7',
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar
        backgroundColor="#FFFFFF" // background putih
        barStyle="dark-content" // ikon hitam
        translucent={false}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Bagian header */}
        <View
          className="px-4 flex-row items-center justify-between"
          style={{ backgroundColor: '#fff', paddingTop: 10 }}
        >
          <TouchableOpacity onPress={() => router.replace('/(tabs)/sosmed')}>
            <BackIcons size={20} />
          </TouchableOpacity>
          <View className="w-[302px]">
            <InputSearchPrimary
              coloricon="#000"
              placeholder="Find what you’re looking for..."
              className="px-[12px] h-[39px]"
              disable={false}
              value={dataProfile?.full_name}
            />
          </View>
          <MenuProfileIcons width={25} height={25} />
        </View>

        {/* Background dan Foto Profil */}
        <View className="pt-3 w-full relative bg-white">
          <Image
            source={require('../../assets/images/trash/bg-profile.png')}
            style={{ height: 130, width: '100%' }}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 90,
              left: 0,
              right: 0,
              alignItems: 'center',
              zIndex: 10,
            }}
            onPress={() => router.push('/sosial-media/picture-profile')}
            disabled={query !== 'profile'}
          >
            <Image
              source={
                profileImage
                  ? {
                      uri: profileImage.uri,
                    }
                  : dataProfile?.profile_picture_url
                    ? {
                        uri: dataProfile.profile_picture_url,
                      }
                    : require('../../assets/images/profile-default.png')
              }
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,
              }}
            />
          </TouchableOpacity>
          {query === 'profile' && (
            <TouchableOpacity
              className="bg-white rounded-full flex-row items-center justify-center"
              style={{
                width: 36,
                height: 36,
                position: 'absolute',
                top: 2,
                right: 30,
                zIndex: 20,
                transform: [{ translateX: 18 }, { translateY: 18 }],
              }}
              onPress={() =>
                router.push(
                  '/sosial-media/picture-profile?type=backgroundImages'
                )
              }
            >
              <EditBgImagesSosialMediaIcons
                width={16}
                height={16}
                color={'#127A42'}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Info user */}
        <View style={{ paddingTop: 40, backgroundColor: '#fff' }}>
          <Text
            className="text-center font-semibold"
            style={{ fontSize: 18, marginTop: 15 }}
          >
            {dataProfile?.full_name}
          </Text>
          <View className="flex-row justify-center items-center my-2">
            <Text className="text-primary font-semibold mr-2">
              {dataProfile?.followers_count} followers
            </Text>
            <PointIcons width={6} height={6} />
            <Text className="text-primary font-semibold ml-2">
              {dataProfile?.following_count} following
            </Text>
          </View>
          <Text className="text-center">
            Surabaya - Jakarta✨ | Petani Indonesia
          </Text>
          <Text className="text-center mt-2" style={{ color: '#1F1F1F' }}>
            Komunitas Pertanian Surabaya
          </Text>
          <Text className="text-center" style={{ color: '#AAAAAA' }}>
            Surabaya, Indonesia
          </Text>
        </View>

        {/* Button dan About */}
        <View className="px-4 py-4 flex-row justify-between items-center bg-white">
          {query === 'profile' ? (
            <View style={{ width: 310 }}>
              <CustomButton
                title="Edit profile"
                onPress={() =>
                  router.push('/sosial-media/update-biodata-profile')
                }
                className="py-[9px]"
              />
            </View>
          ) : (
            <View
              style={{ width: 310 }}
              className="flex-row justify-between items-center"
            >
              <View style={{ width: 149 }}>
                <CustomButton
                  title="Follow"
                  onPress={() => console.log('tes')}
                  className="py-[9px]"
                />
              </View>
              <View style={{ width: 149 }}>
                <CustomButtonSecundary
                  title="Message"
                  onPress={() => console.log('tes')}
                  className="py-[9px]"
                />
              </View>
            </View>
          )}
          <TouchableOpacity
            className="border rounded-full flex-row items-center justify-center"
            style={{ width: 39, height: 39, borderColor: '#525252' }}
          >
            <PointThreeHorizontal
              width={24}
              height={24}
              onPress={() => setModalUserMenu(true)}
            />
          </TouchableOpacity>
        </View>

        <View className="px-4 py-3 bg-white my-2">
          <View className="flex-row items-center justify-between mb-3">
            <Text
              className="font-semibold"
              style={{ fontSize: 16, color: '#1F1F1F' }}
            >
              About
            </Text>
            {query === 'profile' && (
              <TouchableOpacity
                className="flex-row items-center justify-center"
                onPress={() => router.push('/sosial-media/edit-about')}
              >
                <EditBgImagesSosialMediaIcons
                  width={16}
                  height={16}
                  color={'#525252'}
                />
              </TouchableOpacity>
            )}
          </View>
          <Text style={{ fontSize: 14, color: '#525252' }}>
            saya adalah petani yang sudah berkecimplung selama 11 tahun dan saya
            senang dengan pekerjaan saya ini. Semoga pertanian di Indonesia
            semakin maju dan berkembang. gasken bos!!
          </Text>
        </View>

        {query === 'profile' && (
          <View
            className="flex-row justify-between items-center bg-white px-4 pt-3"
            style={{ marginBottom: -3 }}
          >
            <Text className="font-semibold" style={{ fontSize: 16 }}>
              Post
            </Text>
            <View style={{ width: 100 }}>
              <CustomButtonSecundary
                title="Write a post"
                onPress={() => router.push('/sosial-media/create-post-media')}
                className="py-[8px]"
                rounded={15}
              />
            </View>
          </View>
        )}

        {/* List Posts */}
        <View style={{ paddingBottom: 1 }}>
          {dataPosts.map((item, index) => (
            <CardSosialMedia
              key={`${item.id}-${index}`}
              data={[item]}
              setData={updated => {
                const newList = [...dataPosts];
                newList[index] = updated[0];
                setDataPosts(newList);
              }}
              refresData={refetch}
              typeQuery={query === 'profile' ? 'profile' : 'user'}
            />
          ))}
        </View>
      </ScrollView>

      {/* Modal User Menu */}
      {modalUserMenu && (
        <ModalUserMenuProfile
          modalUserMenu={modalUserMenu}
          setModalUserMenu={setModalUserMenu}
          setModalAboutThisProfile={setModalAboutThisProfile}
          setModalBlock={setModalBlock}
          setModalReport={setModalReport}
          setModalShare={setModalShare}
          setModalCopyLink={setModalCopyLink}
          typeQuery={String(query)}
        />
      )}

      {modalBlock && (
        <BlockScriner modalBlock={modalBlock} setModalBlock={setModalBlock} />
      )}

      {modalShare && (
        <ModalShare modalShare={modalShare} setModalShare={setModalShare} />
      )}

      {modalDeletePost && (
        <ModalDeletePost
          refrest={refetch}
          setModalDeletePost={setModalDeletePost}
        />
      )}

      {modalAboutThisProfile && (
        <ModalAboutProfileUser
          modalAboutProfile={modalAboutThisProfile}
          setModalAboutProfile={setModalAboutThisProfile}
        />
      )}

      {modalReport && (
        <ModalReportProfile
          modalReport={modalReport}
          setModalReport={setModalReport}
          setModalReportPost={setModalReportPost}
          setModalReportProfile={setModalReportProfie}
        />
      )}

      {modalReportPost && (
        <ModalReportPost
          data={postsList.results}
          modalReportPost={modalReportPost}
          setModalReportPost={setModalReportPost}
          setModalReport={setModalReport}
        />
      )}

      {modalReportProfile && (
        <ModalReportProfileUser
          modalProfileUser={modalReportProfile}
          setModalProfileUser={setModalReportProfie}
          setTextModalReportType={setTextModalReportType}
          setModalReportType={setModalReportType}
          setModalReport={setModalReport}
        />
      )}

      {modalreportType && (
        <ModalReportType
          setModalReportProfie={setModalReportProfie}
          modalReportType={modalreportType}
          textModalReportType={textModalReportType}
          setModalReportType={setModalReportType}
          setModalReportConten={setModalReportConten}
          setDataModalReportConten={setDataModalReportConten}
          setModalContenHeader={setModalContenHeader}
        />
      )}

      {modalReportConten && (
        <ModalReportConten
          data={dataModalReportConten}
          textHeader={textModalContenHeader}
          modalReportConten={modalReportConten}
          setModalReportConten={setModalReportConten}
          setModalReportType={setModalReportType}
          setModalReportVerify={setModalReportVerify}
        />
      )}

      {modalReportVerify && (
        <ModalReportVerify
          modalReportVerify={modalReportVerify}
          setModalReportSuccess={setModalReportSuccess}
          setModalReportVerify={setModalReportVerify}
        />
      )}

      {modalReportSuccess && (
        <ModalReportSuccess
          modalReportSuccess={modalReportSuccess}
          setModalReportSuccess={setModalReportSuccess}
        />
      )}
    </SafeAreaView>
  );
};

export default ProfileSosialMedia;
