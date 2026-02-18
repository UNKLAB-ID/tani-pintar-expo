import ExclamtionMarkDashboardIcons from "@/assets/icons/dashboard/exclamation-mark-icons";
import { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import DropdownDashboard from "./dropdown-dashboard";

const AnalisisDashboard = () => {
    const [toggleView, setToggleView] = useState<'penjualan' | 'produk'>('penjualan');

    const dataProductViews = [
        { label: 'Produk dilihat', number: 0, percentage: 0 },
        { label: 'Produk terjual', number: 0, percentage: 0 },
    ];

    return (
        <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                marginTop: 8,
            }}>
                <Text style={{
                    fontWeight: "600",
                    fontSize: 14,
                    color: "#1F1F1F"
                }}>
                    Analisis toko dan produkmu
                </Text>
                <ExclamtionMarkDashboardIcons />
            </View>
            <Text style={{ fontSize: 12, color: "#6F6F6F" }}>Update Terakhir: 21 Maret 2025 (16.25 WIB)</Text>

            <View style={{
                marginTop: 16,
                padding: 16,
                backgroundColor: '#fff',
                borderRadius: 12,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 4,
            }}>
                <View>
                    <Text style={{
                        fontWeight: "600",
                        fontSize: 14,
                        lineHeight: 22,
                        color: "#1F1F1F"
                    }}>
                        Statistik tokomu
                    </Text>

                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: 12,
                        marginTop: 12,
                    }}>
                        {dataProductViews.map((item, index) => (
                            <View
                                style={{
                                    flex: 1,
                                    padding: 16,
                                    backgroundColor: '#fff',
                                    borderRadius: 12,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 8,
                                    elevation: 4,
                                    minWidth: '45%',
                                }}
                                key={index}
                            >
                                <Text style={{ fontSize: 12, color: '#6F6F6F' }}>{item.label}</Text>
                                <Text style={{ fontSize: 14, fontWeight: "700", marginVertical: 4 }}>{item.number}</Text>
                                <Text style={{ fontSize: 12 }}>
                                    <Text style={{ color: '#1F1F1F', fontWeight: "600" }}>{item.percentage}% </Text>
                                    <Text style={{ color: '#AAAAAA' }}>dari 7 hari terakhir</Text>
                                </Text>
                            </View>
                        ))}
                    </View>

                    <View
                        style={{
                            marginTop: 12,
                            flex: 1,
                            padding: 16,
                            backgroundColor: '#fff',
                            borderRadius: 12,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 0.1,
                            shadowRadius: 8,
                            elevation: 4,
                            minWidth: '45%',
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: 5,
                                borderRadius: 40,
                                backgroundColor: '#FFF',
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 0.1,
                                shadowRadius: 20,
                                elevation: 4,
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    backgroundColor: toggleView === 'penjualan' ? '#169953' : 'transparent',
                                    paddingVertical: 8,
                                    paddingHorizontal: 16,
                                    borderRadius: 40,
                                    width: '48%',
                                    alignItems: 'center',
                                }}
                                onPress={() => setToggleView('penjualan')}
                            >
                                <Text style={{ fontSize: 14, color: toggleView === 'penjualan' ? '#fff' : '#6F6F6F', fontWeight: "600" }}>Penjualan</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: toggleView === 'produk' ? '#169953' : 'transparent',
                                    paddingVertical: 8,
                                    paddingHorizontal: 16,
                                    borderRadius: 40,
                                    width: '48%',
                                    alignItems: 'center',
                                }}
                                onPress={() => setToggleView('produk')}
                            >
                                <Text style={{ fontSize: 14, color: toggleView === 'produk' ? '#fff' : '#6F6F6F', fontWeight: "600" }}>Produk</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={{ fontSize: 12, fontWeight: "500" }}>Statistik</Text>
                            <DropdownDashboard />
                        </View>

                        <View style={{ marginTop: 16, height: 150, backgroundColor: '#F5F5F5', borderRadius: 8 }}>

                        </View>
                    </View>
                </View>
            </View>
        </View >
    );
};

export default AnalisisDashboard;