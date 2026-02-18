import PlusIcons from "@/assets/icons/sosial-media/plus-icons";
import { ScrollView, TouchableOpacity, View, SafeAreaView, StatusBar, Platform, BackHandler, Text, Dimensions } from "react-native";
import { Colors } from "@/constants/Colors";
import BackIcons from "@/assets/icons/global/back-icons";
import { router } from "expo-router";
import { EllipsisVertical } from "lucide-react-native";
import ListProduc from "@/components/ui/vendor/list-product";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ListProductVendor = () => {
    const insets = useSafeAreaInsets();

    return (
        <>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: Colors.color.background,
                paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                paddingBottom: insets.bottom,
            }}>
                <ScrollView
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <View style={{
                        padding: 10,
                        backgroundColor: '#fff',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 3,
                        elevation: 4,
                    }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 12,
                            }}>
                                <TouchableOpacity
                                    onPress={() => router.push('/(tabs)/ai')}
                                    style={{ padding: 4 }}
                                >
                                    <BackIcons width={20} height={20} />
                                </TouchableOpacity>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: '400',
                                    color: "#525252",
                                }}>
                                    Daftar Produk
                                </Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 12,
                            }}>
                                <TouchableOpacity onPress={() => router.push("/vendor/create-product")}>
                                    <PlusIcons width={24} height={24} />
                                </TouchableOpacity>
                                <TouchableOpacity >
                                    <EllipsisVertical />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={{ marginTop: 16, paddingHorizontal: 10, }}>
                        <ListProduc />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default ListProductVendor;