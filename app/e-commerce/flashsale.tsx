import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

import ShareSquareIcons from "@/assets/icons/e-commerce/share-icons";
import InputSearchPrimary from "@/components/ui/component-globals/input-seach-primary";
import BackIcons from "@/assets/icons/global/back-icons";
import FlashSaleTabCard from "@/components/ui/e-commerce/flashsale/card-tab-flashsale";
import { router, useRouter } from "expo-router";

const realBanners = [
  {
    id: 1,
    image: require("@/assets/images/trash/Flash-Sale.png"),
  },
];

const dummyCategories = [
  { id: 0, name: "All Category" },
  { id: 1, name: "Alat penyemprot" },
  { id: 2, name: "Pupuk" },
  { id: 3, name: "Obat herbal" },
  { id: 4, name: "Sayuran" },
];

const dummyProducts = [
  {
    id: 1,
    name: "Pupuk Booster Anggur merah",
    discount: "36%",
    originalPrice: "Rp25.000",
    price: "Rp16.000",
    sold: 50,
    total: 100,
    image: require("@/assets/images/trash/image25.png"),
  },
  {
    id: 2,
    name: "Bottle Spray",
    discount: "8%",
    originalPrice: "Rp25.000",
    price: "Rp23.000",
    sold: 100,
    total: 1000,
    image: require("@/assets/images/trash/image18.png"),
  },
  {
    id: 3,
    name: "Simodis 100EC",
    discount: "5%",
    originalPrice: "Rp160.000",
    price: "Rp152.000",
    sold: 250,
    total: 250,
    image: require("@/assets/images/trash/image18.png"),
  },
  {
    id: 5,
    name: "Simodis 100EC",
    discount: "5%",
    originalPrice: "Rp160.000",
    price: "Rp152.000",
    sold: 250,
    total: 250,
    image: require("@/assets/images/trash/image18.png"),
  },
  {
    id: 4,
    name: "Simodis 100EC",
    discount: "5%",
    originalPrice: "Rp160.000",
    price: "Rp152.000",
    sold: 250,
    total: 250,
    image: require("@/assets/images/trash/image18.png"),
  },
];

const INITIAL_TIME = 60 * 60;

const handleBackHome = () => {
  router.push("/ecommerce");
};

const FlashSaleScreen = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(INITIAL_TIME);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          return INITIAL_TIME;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const mins = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <>
      <StatusBar className="bg-primary" barStyle="light-content" />
      <View className="flex-1">
        <SafeAreaView className="flex-1">
          <View className="px-5 py-3 pt-8 bg-primary flex-row items-center justify-center space-x-2">
            <TouchableOpacity onPress={handleBackHome} className="p-1 mt-4">
              <BackIcons width={24} height={24} color="#FFF" />
            </TouchableOpacity>
            <InputSearchPrimary
              coloricon="#AAA"
              placeholder="Search for discounted items"
              className="bg-white px-[12px] h-[40px] flex-1 rounded-md mt-3"
            />
            <TouchableOpacity className="p-2 mt-1">
              <ShareSquareIcons width={24} height={24} />
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
            className="bg-white  rounded-t-xl flex-1"
          >
            {/* Banner */}
            <Image
              source={realBanners[0].image}
              resizeMode="cover"
              className="w-full h-[136px] rounded-xl my-3"
            />

            {/* Title & Countdown */}
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-[16px] font-semibold text-black">
                Ended In
              </Text>
              <View className="bg-red-600 px-3 py-1 rounded-full">
                <Text className="text-white font-bold text-sm">
                  {formatTime(remainingTime)}
                </Text>
              </View>
            </View>

            {/* Categories */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-3"
              contentContainerStyle={{ paddingRight: 10 }}
            >
              {dummyCategories.map((cat, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setActiveIndex(cat.id)}
                  className={`h-[40px] p-16 px-5 py-1 rounded-full mr-2 border ${
                    activeIndex === cat.id
                      ? "bg-primary border-primary"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  <Text
                    className={`text-[12px] text-center font-bold mt-2 ${
                      activeIndex === cat.id ? "text-white" : "text-black"
                    }`}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Product List */}
            <FlatList
              data={dummyProducts}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View className="mb-4">
                  <FlashSaleTabCard
                    image={item.image}
                    name={item.name}
                    discount={item.discount}
                    price={item.price}
                    sold={item.sold}
                    total={item.total}
                    onPress={() => {}}
                  />
                </View>
              )}
            />
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
};

export default FlashSaleScreen;
