import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import CardProductVendor from "./card-product-vendor";
import SearchInput from "../component-globals/search-input";
import { Filter } from "lucide-react-native";

const dummyProducts = [
    {
        id: 1,
        productName: "Pupuk Organik Premium",
        price: "Rp24.192",
        stock: 150,
        status: 'active' as const,
        condition: 'new' as const,
        imageUrl: require("../../../assets/images/trash/image18.png"),
        rating: 4.8,
    },
    {
        id: 2,
        productName: "Bibit Padi Unggul Sangat BAgus Cerah Murah dan Berkualitas",
        price: "Rp45.000",
        stock: 0,
        status: 'active' as const,
        condition: 'new' as const,
        imageUrl: require("../../../assets/images/trash/image18.png"),
        rating: 5.0,
    },
    {
        id: 3,
        productName: "Pestisida Organik",
        price: "Rp32.500",
        stock: 75,
        status: 'inactive' as const,
        condition: 'new' as const,
        imageUrl: require("../../../assets/images/trash/image18.png"),
        rating: 4.5,
    },
    {
        id: 4,
        productName: "Alat Semprot Manual",
        price: "Rp120.000",
        stock: 25,
        status: 'active' as const,
        condition: 'used' as const,
        imageUrl: require("../../../assets/images/trash/image18.png"),
        rating: 4.2,
    },
    {
        id: 5,
        productName: "Pupuk NPK Subsidi",
        price: "Rp85.000",
        stock: 200,
        status: 'active' as const,
        condition: 'new' as const,
        imageUrl: require("../../../assets/images/trash/image18.png"),
        rating: 4.9,
    },
    {
        id: 6,
        productName: "Bibit Jagung Hibrida",
        price: "Rp38.000",
        stock: 0,
        status: 'inactive' as const,
        condition: 'new' as const,
        imageUrl: require("../../../assets/images/trash/image18.png"),
        rating: 4.6,
    },
];
const ListProduc = () => {
    const [searchValue, setSearchValue] = useState("");
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <SearchInput
                placeholder="Cari produk apa"
                value={searchValue}
                onChangeText={setSearchValue}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12, }}>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 6,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderWidth: 1,
                    borderRadius: 8,
                    borderColor: "#C8C8C8"
                }}>
                    <Filter size={16} color="#6F6F6F" />
                    <Text style={{
                        fontSize: 12,
                        color: "#6F6F6F"
                    }}>
                        Filter
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderWidth: 1,
                    borderRadius: 8,
                    borderColor: "#C8C8C8"
                }}>
                    <Text style={{
                        fontSize: 12,
                        color: "#6F6F6F"
                    }}>
                        Aktif (0)
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderWidth: 1,
                    borderRadius: 8,
                    borderColor: "#C8C8C8"
                }}>
                    <Text style={{
                        fontSize: 12,
                        color: "#6F6F6F"
                    }}>
                        Nonaktif (4)
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <Text style={{
                    fontSize: 12,
                    color: "#333333",
                    marginBottom: 12,
                }}>
                    {dummyProducts.length} Produk
                </Text>

                <Text style={{
                    fontSize: 12,
                    color: "#169953",
                    marginBottom: 12,
                }}>
                    Pilih Semua
                </Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                {dummyProducts.map((product) => (
                    <View key={product.id} style={{ width: '48%' }}>
                        <CardProductVendor
                            productName={product.productName}
                            price={product.price}
                            stock={product.stock}
                            status={product.status}
                            condition={product.condition}
                            imageUrl={product.imageUrl}
                            rating={product.rating}
                            onEdit={() => console.log('Edit product:', product.id)}
                        />
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

export default ListProduc;