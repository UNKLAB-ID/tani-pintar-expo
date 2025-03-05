import React from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    Image,
    FlatList,
} from "react-native";
import "nativewind";

const products = [
    {
        id: "1",
        name: "Simodis 100EC",
        price: "Rp152.000",
        discount: "5%",
        image: "https://via.placeholder.com/100",
    },
    {
        id: "2",
        name: "Insektisida",
        price: "Rp32.200",
        discount: "8%",
        image: "https://via.placeholder.com/100",
    },
    {
        id: "3",
        name: "Bottle Sprayer",
        price: "Rp23.000",
        discount: "6%",
        image: "https://via.placeholder.com/100",
    },
];

const recommended = [
    {
        id: "4",
        name: "INSEKTISIDA GRACIA",
        price: "Rp269.000",
        image: "https://via.placeholder.com/150",
    },
    {
        id: "5",
        name: "H&L Sprayer Manual",
        price: "Rp36.000",
        discount: "20%",
        image: "https://via.placeholder.com/150",
    },
];

const EcommerceScreen = () => {
    return (
        <ScrollView className="flex-1 bg-white">
            {/* Search Bar */}
            <View className="p-4 flex-row items-center">
                <TextInput
                    className="flex-1 bg-gray-200 p-3 rounded-lg"
                    placeholder="Find what you needed..."
                />
            </View>

            {/* Flash Sale */}
            <View className="p-4">
                <Text className="text-lg font-bold">Flash Sale</Text>
                <FlatList
                    horizontal
                    data={products}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View className="m-2 p-2 bg-white shadow-md rounded-lg">
                            <Image
                                source={{ uri: item.image }}
                                className="w-24 h-24"
                            />
                            <Text className="text-sm font-bold">
                                {item.name}
                            </Text>
                            <Text className="text-red-500">
                                {item.discount} OFF
                            </Text>
                            <Text className="text-green-500">{item.price}</Text>
                        </View>
                    )}
                />
            </View>

            {/* For You */}
            <View className="p-4">
                <Text className="text-lg font-bold">For You</Text>
                <FlatList
                    numColumns={2}
                    data={recommended}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View className="m-2 p-2 w-40 bg-white shadow-md rounded-lg">
                            <Image
                                source={{ uri: item.image }}
                                className="w-full h-24"
                            />
                            <Text className="text-sm font-bold">
                                {item.name}
                            </Text>
                            {item.discount && (
                                <Text className="text-red-500">
                                    {item.discount} OFF
                                </Text>
                            )}
                            <Text className="text-green-500">{item.price}</Text>
                        </View>
                    )}
                />
            </View>
        </ScrollView>
    );
};

export default EcommerceScreen;
