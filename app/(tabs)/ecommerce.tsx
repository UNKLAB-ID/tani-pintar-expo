import { View, Text, TextInput, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
        <SafeAreaView className="flex-1 bg-white">
            <FlatList
                ListHeaderComponent={
                    <View className="p-4">
                        {/* Search Bar */}
                        <TextInput
                            className="bg-gray-200 p-3 rounded-lg mt-2 border border-gray-300"
                            placeholder="Find what you needed..."
                        />

                        {/* Flash Sale */}
                        <Text className="text-lg font-bold mt-4">
                            Flash Sale
                        </Text>
                        <FlatList
                            horizontal
                            data={products}
                            keyExtractor={(item) => item.id}
                            showsHorizontalScrollIndicator={false}
                            nestedScrollEnabled={true}
                            renderItem={({ item }) => (
                                <View className="m-2 p-2 bg-white shadow-lg rounded-lg w-36">
                                    <Image
                                        source={{ uri: item.image }}
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
                numColumns={2}
                renderItem={({ item }) => (
                    <View className="m-2 p-2 w-44 bg-white shadow-md rounded-lg">
                        <Image
                            source={{ uri: item.image }}
                            className="w-full h-28 rounded-md"
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
            />
        </SafeAreaView>
    );
};

export default EcommerceScreen;
