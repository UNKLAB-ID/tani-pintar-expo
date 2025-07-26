import BlockScriner from '@/components/ui/sosial-media/modal-block';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import ModalSettingSriner from './modal-setting';
import ModalHidenPost from './modal-hiden-post';
import ModalComentars from './modal-comentars';
import RenderPostCard from './render-post-card';
import ModalPostMenuProfile from './profile/modal-post-menu-profile';
import ModalShare from './modal-share';
import { useMediaSosial } from '@/store/sosial-media/sosial-media';
import ModalReportMenuSosialMedia from './report/modal-report-menu-sosial-media';
import ModalReportVerify from './report/modal-report-verify';
import ModalRepiortTypeContentSosialMedia from './report/modal-report-type-content-sosial-media';
import ModalAgreeReportSosialMedia from './report/modal-report-agree-sosial-media';
import ModalReportDetail from './report/modal-report-detail';
import ModalReportSuccess from './report/modal-report-success';

interface CardSosialMediaProps {
  data: any[];
  setData: (data: any[]) => void;
  typeQuery?: string;
}

const CardSosialMedia: React.FC<CardSosialMediaProps> = ({
  data,
  setData,
  typeQuery,
}) => {
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalBlock, setModalBlock] = useState<boolean>(false);
  const [modalComment, setModalComment] = useState<boolean>(false);
  const [modalMenuPostProfile, setModalMenuPostProfile] = useState<boolean>(false);
  const [modalReportMenuSosialMedia, setModalReportMenuSosialMedia] = useState<boolean>(false)
  const [modalShare, setModalShare] = useState<boolean>(false);
  const [modalReportVerify, setModalReportVerify] = useState<boolean>(false)
  const [modalReportContenTypeSosialMedia, setModalReportContenTypeSosialMedia] = useState<boolean>(false)
  const [modalReportAgreeList, setModalReportAgreeList] = useState<boolean>(false)
  const [modalReportdetail, setModalReportDetail] = useState<boolean>(false)
  const [modalReportSuccess, setModalReportSuccess] = useState<boolean>(false)
  const [dataReportTypeContent, setDataReportTypeContent] = useState<any>()
  const [dataAgreeList, setDataAgreeList] = useState<any>()
  const [id, setId] = useState<string>('');
  const [slugComent, setSlugComment] = useState<string>('');
  const [reportDetailType, setReportDetailType] = useState<string>("")
  const [reportDetailBacktype, setReportDetailBackType] = useState<string>("")
  const [reportDetailTypeContent, setReportDetailTypeContent] = useState<any>()
  const [index, setIndex] = useState<number>(0);
  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);
  const { setModalDeletePost } = useMediaSosial();

  useEffect(() => {
    setActiveIndexes(Array(data.length).fill(0));
  }, [data]);

  const hidePost = (indexToHide: number, id: string, hiden: boolean) => {
    const updated = [...data];
    updated[indexToHide].hidenPost = hiden;
    setData(updated);
  };

  const setModalBack = (value: boolean) => {
    if (reportDetailBacktype === "Header List") {
      setReportDetailType("")
      setModalReportDetail(false)
      setModalReportContenTypeSosialMedia(value)
    } else {
      setReportDetailType("")
      setModalReportDetail(false)
      setModalReportAgreeList(value)
    }
  }

  console.log("Cobak Tes ======>", reportDetailTypeContent)

  return (
    <View style={{ flex: 1 }}>
      {data.map((item, index) => (
        <View
          key={`${item.id}-${index}`}
          style={{ marginVertical: 3 }}
          className="bg-white px-5 py-4"
        >
          {item.hidenPost ? (
            <ModalHidenPost
              setHidenPost={() => {
                const updated = [...data];
                updated[index].hidenPost = false;
                setData(updated);
              }}
            />
          ) : (
            <RenderPostCard
              item={item}
              index={index}
              containerWidth={containerWidth}
              setContainerWidth={setContainerWidth}
              activeIndexes={activeIndexes}
              setActiveIndexes={setActiveIndexes}
              setId={setId}
              setIndex={setIndex}
              setModalVisible={setModalVisible}
              setSlugComment={setSlugComment}
              setModalComment={setModalComment}
              setModalShare={setModalShare}
              setModalPostMenu={setModalMenuPostProfile}
            />
          )}
        </View>
      ))}

      {/* Modal */}
      {modalVisible && (
        <ModalSettingSriner
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setModalBlock={setModalBlock}
          setModalHidenPost={() => hidePost(index, id, true)}
          setModalReportMenuSosialMedia={setModalReportMenuSosialMedia}
        />
      )}

      {modalBlock && (
        <BlockScriner modalBlock={modalBlock} setModalBlock={setModalBlock} />
      )}

      {modalComment && (
        <ModalComentars
          modalCommentVisible={modalComment}
          setModalCommentVisible={setModalComment}
          id={slugComent}
        />
      )}

      {modalMenuPostProfile && (
        <ModalPostMenuProfile
          modalPostMenu={modalMenuPostProfile}
          setModalPostMenu={setModalMenuPostProfile}
          setModalShare={() => setModalShare(true)}
          setModalDeletePost={setModalDeletePost}
          typeQuery={typeQuery}
        />
      )}

      {modalShare && (
        <ModalShare modalShare={modalShare} setModalShare={setModalShare} />
      )}

      {
        modalReportMenuSosialMedia && (
          <ModalReportMenuSosialMedia
            modalReportMenuSosialMedia={modalReportMenuSosialMedia}
            setDataReportTypeContent={setDataReportTypeContent}
            setModalReportMenuSosialMedia={setModalReportMenuSosialMedia}
            setIndexMenuReportSosialMedia={setModalReportVerify}
            setModalReportTypeContentSosialMedia={setModalReportContenTypeSosialMedia}
          />
        )
      }

      {
        modalReportVerify && (
          <ModalReportVerify
            modalReportVerify={modalReportVerify}
            setModalReportVerify={setModalReportVerify}
            setModalReportSuccess={setModalReportSuccess}
          />
        )
      }

      {
        modalReportContenTypeSosialMedia && (
          <ModalRepiortTypeContentSosialMedia
            setReportDetailTypeContent={setReportDetailTypeContent}
            modalReportTypeContentSosialMedia={modalReportContenTypeSosialMedia}
            dataReportTypeContentSosialMedia={dataReportTypeContent}
            setModalReportTypeContentSosialMedia={setModalReportContenTypeSosialMedia}
            setDataAgreeList={setDataAgreeList}
            setModalReportMenuSosialMedia={setModalReportMenuSosialMedia}
            setModalReportAgreeList={setModalReportAgreeList}
            setModalReportDetail={setModalReportDetail}
            serReportDetailBackType={setReportDetailBackType}
          />
        )
      }

      {
        modalReportAgreeList && (
          <ModalAgreeReportSosialMedia
            modalAgreeReportSosialMedia={modalReportAgreeList}
            setModalAgreeReportSosialMedia={setModalReportAgreeList}
            dataAgreeList={dataAgreeList}
            setModalReportTypeContentSosialMedia={setModalReportContenTypeSosialMedia}
            setModalReportDetail={setModalReportDetail}
            setReportDetailType={setReportDetailType}
            serReportDetailBackType={setReportDetailBackType}
          setReportDetailTypeContent={setReportDetailTypeContent}
          />
        )
      }

      {
        modalReportdetail && (
          <ModalReportDetail
            modalReportDetail={modalReportdetail}
            setModalReportVerify={setModalReportVerify}
            setModalReportDetail={setModalReportDetail}
            setModalBack={setModalBack}
            setReportDetailType={setReportDetailType}
            reportDetailType={reportDetailType}
            reportDetailTypeContent={reportDetailTypeContent}
          />
        )
      }

      {
        modalReportSuccess && (
          <ModalReportSuccess
            modalReportSuccess={modalReportSuccess}
            setModalReportSuccess={setModalReportSuccess}
          />
        )
      }
    </View>
  );
};

export default CardSosialMedia;
