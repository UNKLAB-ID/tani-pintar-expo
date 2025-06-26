import BlockScriner from '@/components/ui/sosial-media/modal-block';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import ModalSettingSriner from './modal-setting';
import ModalHidenPost from './modal-hiden-post';
import ModalComentars from './modal-comentars';
import RenderPostCard from './render-post-card';

interface CardSosialMediaProps {
  data: any[];
  setData: (data: any[]) => void;
}

const CardSosialMedia: React.FC<CardSosialMediaProps> = ({ data, setData }) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalBlock, setModalBlock] = useState(false);
  const [modalComment, setModalComment] = useState(false);
  const [id, setId] = useState<string>('');
  const [slugComent, setSlugComment] = useState('');
  const [index, setIndex] = useState(0);
  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);

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
    </View>
  );
};

export default CardSosialMedia;
