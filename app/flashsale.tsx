import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const products = [
    {
        id: "1",
        name: "Pupuk Booster",
        price: "Rp16.000",
        originalPrice: "Rp25.000",
        discount: "36%",
        sold: 50,
    },
    {
        id: "2",
        name: "Bottle Sprayer",
        price: "Rp23.000",
        originalPrice: "Rp25.000",
        discount: "8%",
        sold: 16,
    },
    {
        id: "3",
        name: "Simodis 100EC",
        price: "IDR 152.000",
        originalPrice: "IDR 160.000",
        discount: "5%",
        sold: 250,
    },
    {
        id: "4",
        name: "Insektisida",
        price: "IDR 32.200",
        originalPrice: "IDR 35.000",
        discount: "8%",
        sold: 350,
    },
];

const categories = [
    "All Category",
    "Alat penyemprot",
    "Pupuk",
    "Obat hama",
    "Pestisida",
    "Benih",
    "Peralatan",
    "Lainnya",
];

const FlashSaleScreen = () => {
    const [timeLeft, setTimeLeft] = useState(86400); // 24 hours in seconds
    const [selectedCategory, setSelectedCategory] = useState("All Category");
    const router = useRouter();

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h}:${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Search Bar */}
            <View className="flex-row items-center px-4 py-2 bg-green-600">
                <TouchableOpacity onPress={() => router.push("/ecommerce")}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <TextInput
                    className="flex-1 bg-white p-3 rounded-lg ml-2"
                    placeholder="Search for discounted items"
                />
            </View>

            {/* Flash Sale Banner */}
            <View className="p-4 bg-gray-100">
                <View style={styles.bannerContainer}>
                    <Image
                        source={{ uri: "https://picsum.photos/800/400" }}
                        style={styles.bannerImage}
                    />
                    <View style={styles.bannerTextContainer}>
                        <Text style={styles.bannerTitle}>Flash Sale</Text>
                        <Text style={styles.bannerSubtitle}>
                            Sale up to 15% off
                        </Text>
                        <View style={styles.bannerDateContainer}>
                            <Ionicons
                                name="calendar-outline"
                                size={16}
                                color="white"
                            />
                            <Text style={styles.bannerDate}>20 - 25 Nov</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Countdown Timer */}
            <View className="flex-row items-center justify-between px-4 py-2 mb-2">
                <Text className="text-lg font-bold">Ended In</Text>
                <View className="bg-red-600 p-2 rounded-lg">
                    <Text className="text-white font-bold">
                        {formatTime(timeLeft)}
                    </Text>
                </View>
            </View>

            {/* Categories */}
            <FlatList
                horizontal
                data={categories}
                keyExtractor={(item) => item}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 8,
                    marginBottom: 8,
                }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        className={`px-9 py-1 rounded-full mr-2 border ${
                            selectedCategory === item
                                ? "bg-green-600 border-green-600"
                                : "bg-white border-gray-300"
                        }`}
                        onPress={() => setSelectedCategory(item)}
                        style={{ height: 30 }}
                    >
                        <Text
                            className={`text-sm font-semibold ${
                                selectedCategory === item
                                    ? "text-white"
                                    : "text-black"
                            }`}
                        >
                            {item}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            {/* Product List */}
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                    paddingHorizontal: 8,
                    paddingTop: 8,
                }}
                renderItem={({ item }) => (
                    <View className="flex-row items-center bg-white p-4 rounded-lg shadow-md mb-4">
                        <Image
                            source={{ uri: "https://picsum.photos/100/100" }}
                            className="w-20 h-20 rounded-md"
                        />
                        <View className="flex-1 ml-4">
                            <Text className="text-sm font-bold">
                                {item.name}
                            </Text>
                            <Text className="text-red-500 font-semibold">
                                {item.discount} OFF
                            </Text>
                            <Text className="text-green-600 font-bold">
                                {item.price}
                            </Text>
                            <Text className="text-gray-500 line-through">
                                {item.originalPrice}
                            </Text>
                            <Text className="text-gray-500">
                                {item.sold} Sold
                            </Text>
                        </View>
                        <TouchableOpacity className="bg-green-600 p-2 rounded-full">
                            <Text className="text-white">Buy</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    bannerContainer: {
        position: "relative",
        width: "100%",
        height: 200,
        borderRadius: 10,
        overflow: "hidden",
    },
    bannerImage: {
        width: "100%",
        height: "100%",
    },
    bannerTextContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    bannerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
    bannerSubtitle: {
        fontSize: 16,
        color: "white",
    },
    bannerDateContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    bannerDate: {
        fontSize: 14,
        color: "white",
        marginLeft: 4,
    },
});

export default FlashSaleScreen;
