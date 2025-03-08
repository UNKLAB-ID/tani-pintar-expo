import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const products = [
    {
        id: "1",
        name: "Simodis 100EC",
        price: "Rp152.000",
        discount: "5%",
    },
    {
        id: "2",
        name: "Insektisida",
        price: "Rp32.200",
        discount: "8%",
    },
    {
        id: "3",
        name: "Bottle Sprayer",
        price: "Rp23.000",
        discount: "6%",
    },
];

const recommended = Array.from({ length: 20 }, (_, index) => ({
    id: (index + 4).toString(),
    name: `Product ${index + 1}`,
    price: `Rp${(Math.random() * 100000).toFixed(0)}`,
    discount:
        Math.random() > 0.5 ? `${Math.floor(Math.random() * 30) + 5}%` : null,
    image: `https://picsum.photos/100/100?random=${index + 1}`,
}));

const categories = [
    {
        id: "1",
        name: "Agriculture",
        icon: "leaf-outline",
    },
    {
        id: "2",
        name: "Tools",
        icon: "hammer-outline",
    },
    {
        id: "3",
        name: "Fertilizers",
        icon: "flask-outline",
    },
    {
        id: "4",
        name: "Seeds",
        icon: "seed-outline",
    },
    {
        id: "5",
        name: "Pesticides",
        icon: "bug-outline",
    },
];

const EcommerceScreen = () => {
    const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

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
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-2 bg-white shadow-md">
                <TextInput
                    className="flex-1 bg-gray-200 p-3 rounded-lg border border-gray-300"
                    placeholder="Find what you needed..."
                />
                <View className="flex-row ml-2">
                    <TouchableOpacity className="mr-2">
                        <Ionicons
                            name="chatbubble-outline"
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="cart-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Main Content */}
            <FlatList
                ListHeaderComponent={
                    <View className="p-4">
                        {/* Banner */}
                        <View className="bg-green-600 p-4 rounded-lg mb-4">
                            <Text className="text-white text-lg font-bold">
                                Year-End Sale
                            </Text>
                            <Text className="text-white">Up to 50% off</Text>
                            <TouchableOpacity className="mt-2 bg-white p-2 rounded-lg">
                                <Text className="text-green-600 font-bold">
                                    Shop Now
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Categories */}
                        <View className="flex-row justify-between items-center mt-4">
                            <Text className="text-lg font-bold">
                                Categories
                            </Text>
                            <TouchableOpacity>
                                <Text className="text-green-600 font-semibold">
                                    More Categories →
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            horizontal
                            data={categories}
                            keyExtractor={(item) => item.id}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <View className="m-2 p-2 bg-white shadow-lg rounded-lg items-center w-20">
                                    <Ionicons
                                        name={item.icon}
                                        size={32}
                                        color="black"
                                    />
                                    <Text className="text-xs font-bold mt-2 text-center">
                                        {item.name}
                                    </Text>
                                </View>
                            )}
                        />

                        {/* Flash Sale */}
                        <View className="flex-row justify-between items-center mt-4">
                            <View className="flex-row items-center">
                                <Text className="text-lg font-bold">
                                    Flash Sale
                                </Text>
                                <View className="bg-red-600 p-1 rounded-lg ml-2">
                                    <Text className="text-white font-bold">
                                        {formatTime(timeLeft)}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity className="ml-2">
                                <Text className="text-gray-600 font-semibold">
                                    See All
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            horizontal
                            data={products}
                            keyExtractor={(item) => item.id}
                            showsHorizontalScrollIndicator={false}
                            nestedScrollEnabled={true}
                            renderItem={({ item, index }) => (
                                <View className="m-2 p-2 bg-white shadow-lg rounded-lg w-36">
                                    <Image
                                        source={{
                                            uri: `https://picsum.photos/100/100?random=${index}`,
                                        }}
                                        className="w-28 h-28 rounded-md"
                                    />
                                    <Text className="text-sm font-bold mt-2">
                                        {item.name}
                                    </Text>
                                    <Text className="text-red-500 font-semibold">
                                        {item.discount} OFF
                                    </Text>
                                    <Text className="text-green-600 font-bold">
                                        {item.price}
                                    </Text>
                                </View>
                            )}
                        />

                        {/* For You */}
                        <Text className="text-lg font-bold mt-4">For You</Text>
                    </View>
                }
                data={recommended}
                keyExtractor={(item) => item.id}
                numColumns={2} // 2 kolom per baris
                columnWrapperStyle={{
                    justifyContent: "space-between",
                    paddingHorizontal: 6, // Diperkecil dari 8 agar lebih rapat
                    gap: 6, // Menambahkan gap kecil untuk memperkecil jarak antar card
                }}
                renderItem={({ item }) => (
                    <View className="p-2 w-[48%] bg-white shadow-md rounded-lg">
                        <Image
                            source={{ uri: item.image }}
                            className="w-full h-40 rounded-md"
                        />
                        <Text className="text-sm font-bold mt-2">
                            {item.name}
                        </Text>
                        {item.discount && (
                            <Text className="text-red-500 font-semibold">
                                {item.discount} OFF
                            </Text>
                        )}
                        <Text className="text-green-600 font-bold">
                            {item.price}
                        </Text>
                    </View>
                )}
                ListFooterComponent={
                    <View className="p-4">
                        <Text className="text-center text-gray-500">
                            End of Results
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

export default EcommerceScreen;
