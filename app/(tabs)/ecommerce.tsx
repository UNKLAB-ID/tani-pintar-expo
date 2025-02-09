import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
} from "react-native";

const products = [
    {
        id: "1",
        name: "Product 1",
        price: "$10",
        image: "https://via.placeholder.com/150",
    },
    {
        id: "2",
        name: "Product 2",
        price: "$20",
        image: "https://via.placeholder.com/150",
    },
    {
        id: "3",
        name: "Product 3",
        price: "$30",
        image: "https://via.placeholder.com/150",
    },
];

const EcommerceScreen = () => {
    const renderItem = ({
        item,
    }: {
        item: { id: string; name: string; price: string; image: string };
    }) => (
        <TouchableOpacity style={styles.productContainer}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ecommerce Screen</Text>
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    list: {
        paddingBottom: 16,
    },
    productContainer: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        alignItems: "center",
    },
    productImage: {
        width: 150,
        height: 150,
        marginBottom: 8,
    },
    productName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    productPrice: {
        fontSize: 16,
        color: "#888",
    },
});

export default EcommerceScreen;
