import BlockScriner from '@/components/ui/sosial-media/modal-block';
import LoveIcons from '@/assets/icons/global/love-icons';
import PointThreeHorizontal from '@/assets/icons/global/point-three-horizontal';
import KomentarIcons from '@/assets/icons/sosial-media/komentar-icons';
import PointIcons from '@/assets/icons/sosial-media/point-icons';
import ShereIcons from '@/assets/icons/sosial-media/shere-icons';
import React, { useRef, useState } from 'react';
import { TouchableOpacity , Text , Image, View, ScrollView } from 'react-native';


import ModalSettingSriner from './modal-setting';
import ModalHidenPost from './modal-hiden-post';

interface CardSosialMediaProps {
  data: any[];
  setData: (data: any[]) => void;
}

const CardSosialMedia: React.FC<CardSosialMediaProps> = ({ data, setData }) => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalBlock, setModalBlock] = useState(false);
  const [id, setId] = useState(0);
  const [index, setIndex] = useState(0);

  const handleScroll = (event: any) => {
    const slide = Math.round(
      event.nativeEvent.contentOffset.x / containerWidth
    );
    setActiveIndex(slide);
  };

  const hidePost = (indexToHide: number, id: number, hiden: boolean) => {
    const updated = [...data];
    updated[indexToHide].hidenPost = hiden;
    setData(updated);
  };

  return (
    <View>
      {data.map((value: any, index: number) => {
        return (
          <View
            key={index}
            style={{ marginVertical: 3 }}
            className="bg-white px-5 py-4"
          >
            {value.hidenPost ? (
              <View>
                <ModalHidenPost
                  setHidenPost={() => {
                    hidePost(index, value.id, false);
                  }}
                />
              </View>
            ) : (
              <View>
                {/* Header */}
                <View className="flex-row items-center justify-between mb-2">
                  <View className="flex-row items-center">
                    <Image
                      source={require('../../../assets/images/Image-success-otp.png')}
                      className="w-[40px] h-[40px] rounded-full"
                    />
                    <View className="ml-3 flex-row items-center">
                      <Text className="text-[16px] font-semibold text-text-primary">
                        {value.name.length > 170
                          ? `${value.name.slice(0, 170)}...`
                          : value.name}
                      </Text>
                      <PointIcons
                        width={6}
                        height={6}
                        style={{ marginHorizontal: 5 }}
                      />
                      <Text className="text-[14px] text-text-secondary">
                        1 hour ago
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setId(value.id);
                      setIndex(index);
                      setModalVisible(true);
                    }}
                  >
                    <PointThreeHorizontal width={24} height={24} />
                  </TouchableOpacity>
                </View>

                {/* Caption */}
                <View className="mb-2">
                  <Text className="text-[#1F1F1F] text-[14px]">
                    {value.text}
                  </Text>
                </View>

                {/* Image Slider */}
                {value.data.length > 0 && (
                  <View
                    className="relative mb-3"
                    onLayout={event => {
                      const width = event.nativeEvent.layout.width;
                      setContainerWidth(width);
                    }}
                  >
                    <ScrollView
                      ref={scrollRef}
                      horizontal
                      pagingEnabled
                      showsHorizontalScrollIndicator={false}
                      onScroll={handleScroll}
                      scrollEventThrottle={16}
                    >
                      {value.data.map((item: any, index: number) => (
                        <Image
                          key={index}
                          source={item.images}
                          style={{
                            borderRadius: 12,
                            width: containerWidth,
                          }}
                        />
                      ))}
                    </ScrollView>

                    {/* Indicator */}
                    <View
                      style={{
                        width: 34,
                        top: 10,
                        right: 10,
                        position: 'absolute',
                        backgroundColor: '#000',
                        borderRadius: 100,
                      }}
                    >
                      <Text className="text-white text-xs text-center py-1">
                        {activeIndex + 1}/{value.data.length}
                      </Text>
                    </View>
                  </View>
                )}
                <View className="flex-row items-center">
                  <View
                    className="flex-row items-center justify-between"
                    style={{ width: 49 }}
                  >
                    <TouchableOpacity>
                      <LoveIcons width={18} height={18} color={'#434343'} />
                    </TouchableOpacity>
                    <Text className="text-[14px] text-[#434343] ml-2">
                      5.5K
                    </Text>
                  </View>
                  <View
                    className="flex-row items-center justify-between"
                    style={{ width: 49, marginHorizontal: 30 }}
                  >
                    <TouchableOpacity>
                      <KomentarIcons width={18} height={18} color={'#434343'} />
                    </TouchableOpacity>
                    <Text className="text-[14px] text-[#434343] ml-2">
                      5.5K
                    </Text>
                  </View>
                  <View
                    className="flex-row items-center justify-between"
                    style={{ width: 49 }}
                  >
                    <TouchableOpacity>
                      <ShereIcons width={18} height={18} color={'#434343'} />
                    </TouchableOpacity>
                    <Text className="text-[14px] text-[#434343] ml-2">
                      5.5K
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        );
      })}
      {/* 🔥 Tampilkan Modal */}
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
    </View>
  );
};

export default CardSosialMedia;
