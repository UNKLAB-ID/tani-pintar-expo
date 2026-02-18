import BackIcons from "@/assets/icons/global/back-icons";
import FormProductVendor, { ProductFormData } from "@/components/ui/vendor/form-product-vendor";
import { router } from "expo-router";
import { SafeAreaView, View, Text, StatusBar, Platform, ScrollView, TouchableOpacity } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";

const CreateProduct = () => {
    const insets = useSafeAreaInsets();
    const form = useForm<ProductFormData>({
        defaultValues: {
            id_card_file: null,
            productName: '',
            price: 0,
            stock: 0,
            description: '',
            category: '',
            condition: 'new',
        }
    });

    const { handleSubmit, formState: { errors } } = form;

    const onSubmit = (data: ProductFormData) => {
        console.log('Form Data:', data);
        // Handle form submission here
    };

    return (
        <>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <SafeAreaView style={{
                flex: 1, backgroundColor: '#FFFFFF',
                paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                paddingBottom: insets.bottom,
            }} >

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
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 12,
                            }}>
                                <TouchableOpacity
                                    onPress={() => router.back()}
                                    style={{ padding: 4 }}
                                >
                                    <BackIcons width={20} height={20} />
                                </TouchableOpacity>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: '400',
                                    color: "#525252",
                                }}>
                                    Tambah Produk Baru
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Form Content */}
                    <View style={{ flex: 1, paddingHorizontal: 10 }}>
                        <FormProductVendor form={form} />
                    </View>

                    {/* Submit Button */}
                    <View style={{ padding: 16, marginBottom: 20 }}>
                        <TouchableOpacity
                            onPress={handleSubmit(onSubmit)}
                            style={{
                                backgroundColor: '#169953',
                                paddingVertical: 14,
                                borderRadius: 8,
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{
                                color: '#fff',
                                fontSize: 16,
                                fontWeight: '600',
                            }}>
                                Simpan Produk
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default CreateProduct;