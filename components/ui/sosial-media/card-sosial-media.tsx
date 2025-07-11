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

interface CardSosialMediaProps {
  data: any[];
  setData: (data: any[]) => void;
  typeQuery?: string;
}

const CardSosialMedia: React.FC<CardSosialMediaProps> = ({ data, setData, typeQuery }) => {
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalBlock, setModalBlock] = useState<boolean>(false);
  const [modalComment, setModalComment] = useState<boolean>(false);
  const [modalMenuPostProfile, setModalMenuPostProfile] = useState<boolean>(false);
  const [modalShare, setModalShare] = useState<boolean>(false);
  const [id, setId] = useState<string>('');
  const [slugComent, setSlugComment] = useState<string>('');
  const [index, setIndex] = useState<number>(0);
  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);
  const { setModalDeletePost } = useMediaSosial()

  useEffect(() => {
    setActiveIndexes(Array(data.length).fill(0));
  }, [data]);

  const hidePost = (indexToHide: number, id: string, hiden: boolean) => {
    const updated = [...data];
    updated[indexToHide].hidenPost = hiden;
    setData(updated);
  };

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
        <ModalShare
          modalShare={modalShare}
          setModalShare={setModalShare}
        />
      )}
    </View>
  );
};

export default CardSosialMedia;
