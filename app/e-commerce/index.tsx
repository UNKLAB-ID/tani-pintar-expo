import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRef, useState, useEffect } from "react";

import InputSearchPrimary from "@/components/ui/component-globals/input-seach-primary";
import MessageIcons from "@/assets/icons/global/message-icons";
import CartIcons from "@/assets/icons/e-commerce/cart-icons";
import LocationIcons from "@/assets/icons/e-commerce/locations-icons";
import ArrowRightIcons from "@/assets/icons/e-commerce/arrow-right-icons";
import CustomButton from "@/components/ui/component-globals/button-primary";
import WalletIcons from "@/assets/icons/global/wallet-icons";
import Wallet2Icons from "@/assets/icons/global/wallet2-icons";
import VoucherIcons from "@/assets/icons/global/voucher-icons";
import TopUpIcons from "@/assets/icons/e-commerce/topup-icons";
import FlashSaleCard from "@/components/ui/e-commerce/card-flashsale";

const { width } = Dimensions.get("window");

const realBanners = [
  {
    id: 1,
    title: "Year-End Sale",
    subtitle: "Up to 50%",
    image: require("@/assets/images/bottle.png"),
  },
  {
    id: 2,
    title: "Flash Deal",
    subtitle: "Only Today",
    image: require("@/assets/images/bottle.png"),
  },
  {
    id: 3,
    title: "Jual Murah",
    subtitle: "Only Today",
    image: require("@/assets/images/bottle.png"),
  },
];

const banners = [
  realBanners[realBanners.length - 1],
  ...realBanners,
  realBanners[0],
];

const EcommerceIndex = () => {
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [timeLeftMs, setTimeLeftMs] = useState(3600 * 1000);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (timeLeftMs <= 0) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeftMs((prev) => {
        if (prev <= 100) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 100;
      });
    }, 100);

    return () => clearInterval(intervalRef.current);
  }, []);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 100); // 0-9 mili-detik

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);

    let realIndex = index - 1;
    if (index === 0) realIndex = realBanners.length - 1;
    else if (index === banners.length - 1) realIndex = 0;
    setActiveIndex(realIndex);
  };

  useEffect(() => {
    if (currentIndex === banners.length - 1) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index: 1, animated: false });
        setCurrentIndex(1);
      }, 300);
    } else if (currentIndex === 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: banners.length - 2,
          animated: false,
        });
        setCurrentIndex(banners.length - 2);
      }, 300);
    }
  }, [currentIndex]);

  return (
    <SafeAreaView className="flex-1 w-full bg-white">
      {/* Header */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-white px-5 py-4 ">
          <View className="flex-row items-center justify-between">
            <View className="w-[276px]">
              <InputSearchPrimary
                placeholder="Find what you’re looking for..."
                className="px-[12px]"
                coloricon="#000"
              />
            </View>
            <View className="flex-row">
              <View className="mr-[9]">
                <MessageIcons width={28} height={28} />
              </View>
              <CartIcons width={28} height={28} />
            </View>
          </View>
        </View>

        {/* Location */}
        <View className="px-5">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <LocationIcons width={25} height={25} color="#28a745" />
              <Text className="ml-2 text-sm font-bold">
                <Text className="text-[#8e8e8e]">Ship to </Text>
                <Text className="text-[#2b2b2b]">
                  Jl. Pangeran Diponegoro,...
                </Text>
              </Text>
            </View>
            <ArrowRightIcons width={18} height={18} />
          </View>
        </View>

        {/* Banner Slider */}
        <View className="mt-4 ">
          <FlatList
            ref={flatListRef}
            data={banners}
            keyExtractor={(_, i) => i.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScrollEnd}
            initialScrollIndex={1}
            getItemLayout={(_, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            renderItem={({ item }) => (
              <View style={{ width, paddingHorizontal: 20 }}>
                <View className="w-full h-[120px] rounded-2xl overflow-hidden bg-black flex-row justify-between items-center px-4">
                  {/* Images */}
                  <View className="flex-row items-end space-x-[-4px] px-[19px]">
                    <Image
                      source={item.image}
                      className="w-[36px] h-[78px]"
                      resizeMode="contain"
                    />
                    <Image
                      source={item.image}
                      className="w-[44px] h-[95px]"
                      resizeMode="contain"
                    />
                    <Image
                      source={item.image}
                      className="w-[36px] h-[78px]"
                      resizeMode="contain"
                    />
                  </View>
                  {/* Text & Button */}
                  <View className="items-center justify-center px-[19px]">
                    <Text className="text-white text-base font-bold text-center">
                      {item.title}
                    </Text>
                    <Text className="text-[#cfcfcf] text-sm text-center">
                      {item.subtitle}
                    </Text>
                    <CustomButton
                      title="Shop Now"
                      textClassName="font-extralight text-[11.9px]"
                      className="rounded-full px-4 py-[3px] mt-2"
                    />
                  </View>
                </View>
              </View>
            )}
          />

          {/* Dot Indicator */}
          <View className="flex-row justify-center mt-2">
            {realBanners.map((_, index) => (
              <View
                key={index}
                className={`mx-[2px] rounded-full ${
                  index === activeIndex
                    ? "bg-[#28a745] w-[20px]"
                    : "bg-[#dcdcdc] w-[8px]"
                } h-[8px]`}
              />
            ))}
          </View>
        </View>

        {/* Tani Pays */}
        <View className="flex-row bg-[#F0F0F0] rounded-2xl px-5 py-4 mx-5 mt-5 space-x-4">
          <View className="w-1/3 items-start">
            <View className="flex-row items-center mb-1">
              <WalletIcons width={18} height={18} className="mr-2" />
              <Text className="text-sm font-medium text-black">TaniPay</Text>
            </View>
            <Text className="text-sm font-bold text-black">Rp20.000</Text>
            <Text
              className="text-xs text-gray-500"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Topup minimum...
            </Text>
          </View>

          <View className="w-1/3 items-start">
            <View className="flex-row items-center mb-1">
              <Wallet2Icons width={18} height={18} className="mr-2" />
              <Text className="text-sm font-medium text-black">TaniPinjam</Text>
            </View>
            <Text className="text-sm font-bold text-[#28a745]">
              ActivateNow
            </Text>
            <Text
              className="text-xs text-gray-500"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Limit up to Rp20...
            </Text>
          </View>

          <View className="w-1/3 items-start">
            <View className="flex-row items-center mb-1">
              <VoucherIcons width={18} height={18} className="mr-2" />
              <Text className="text-sm font-medium text-black">Voucher</Text>
            </View>
            <Text className="text-sm font-bold text-black">
              Voucher Discount
            </Text>
            <Text
              className="text-xs text-[#28a745]"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Free Delivery Service
            </Text>
          </View>
        </View>

        {/* Kategori Utama */}
        <View className="mt-6 px-5 ">
          <View className="flex-row justify-between items-center space-x-4">
            <View className="items-center flex-1">
              <View className="bg-[#f9f9f9] p-4 rounded-full shadow-sm mb-1">
                <TopUpIcons width={28} height={28} />
              </View>
              <Text className="text-xs font-medium text-center leading-4">
                Top Up{"\n"}& Bayar
              </Text>
            </View>

            <View className="items-center flex-1">
              <View className="bg-[#f9f9f9] p-4 rounded-full shadow-sm mb-1">
                <TopUpIcons width={28} height={28} />
              </View>
              <Text className="text-xs font-medium text-center leading-4">
                Alat{"\n"}Penyemprot
              </Text>
            </View>

            <View className="items-center flex-1">
              <View className="bg-[#f9f9f9] p-4 rounded-full shadow-sm mb-1">
                <TopUpIcons width={28} height={28} />
              </View>
              <Text className="text-xs font-medium text-center leading-4">
                Obat{"\n"}Herbal
              </Text>
            </View>

            <View className="items-center flex-1">
              <View className="bg-[#f9f9f9] p-4 rounded-full shadow-sm mb-1">
                <TopUpIcons width={28} height={28} />
              </View>
              <Text className="text-xs font-medium text-center leading-4">
                Jenis{"\n"}Sayuran
              </Text>
            </View>
          </View>
        </View>

        {/* card */}

        <View className="mt-6 px-5">
          {/* Header Flash Sale */}
          <View className="flex-row justify-between items-center mb-4">
            <View className="flex-row items-center">
              <Text className="font-bold text-green-600 text-[17px]">
                Flash Sale
              </Text>
              <View
                style={{
                  marginLeft: 12,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 20,
                  borderColor: "rgba(255, 0, 0, 0.3)",
                  backgroundColor: "rgba(255, 0, 0, 0.1)",
                }}
              >
                <Text
                  style={{
                    color: "red",
                    fontWeight: "600",
                    fontSize: 14,
                  }}
                >
                  {formatTime(timeLeftMs)}
                </Text>
              </View>
            </View>
            <TouchableOpacity>
              <View className="flex-row items-center">
                <Text
                  className="text-sm"
                  style={{ color: "#525252", marginLeft: 150 }}
                >
                  See All
                </Text>
                <ArrowRightIcons width={20} height={20} stroke="#525252" />
              </View>
            </TouchableOpacity>
          </View>

          {/* List Produk: Scroll Horizontal */}
          <FlatList
            data={[
              {
                id: 1,
                name: "Pupuk Organik Cair",
                price: "Rp25.000",
                originalPrice: "Rp35.000",
                image: require("@/assets/images/bottle.png"),
                sold: 250,
                total: 2000,
                discount: "29%",
              },
              {
                id: 2,
                name: "Benih Sayur Kangkung",
                price: "Rp10.000",
                originalPrice: "Rp15.000",
                image: require("@/assets/images/bottle.png"),
                sold: 250,
                total: 500,
                discount: "33%",
              },
              {
                id: 3,
                name: "Alat Semprot Mini",
                price: "Rp70.000",
                originalPrice: "Rp90.000",
                image: require("@/assets/images/bottle.png"),
                sold: 250,
                total: 1100,
                discount: "22%",
              },
              {
                id: 4,
                name: "Alat Mini",
                price: "Rp70.000",
                originalPrice: "Rp90.000",
                image: require("@/assets/images/bottle.png"),
                sold: 250,
                total: 1100,
                discount: "22%",
              },
            ]}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View className="mr-2">
                <FlashSaleCard
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  sold={item.sold}
                  total={item.total}
                  discount={item.discount}
                />
              </View>
            )}
          />
        </View>
        <View>
          <View className="mx-5">
            <Text className="text-[16px] font-bold">For You!</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EcommerceIndex;
