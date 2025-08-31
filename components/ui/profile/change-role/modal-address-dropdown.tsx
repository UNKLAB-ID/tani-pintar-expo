import BackIcons from "@/assets/icons/global/back-icons";
import GarisHorizotal from "@/assets/icons/sosial-media/garis-horizontal-icons"
import React from "react";
import { Modal, View, Text, TouchableOpacity, FlatList } from "react-native"
import SearchInput from "../../component-globals/search-input";
import { useInfiniteQuery } from "@tanstack/react-query";
import api from "@/utils/api/api";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRegisterRoleStore } from "@/store/auth/register-role";

interface ModalAddressDropdownProps {
    modalAddress: boolean;
    setModalAddress: (visible: boolean) => void;
}

const ModalAddressDropdown: React.FC<ModalAddressDropdownProps> = ({ modalAddress, setModalAddress }) => {
    const [typeAddress, setTypeAddress] = React.useState<string>('provinsi');
    const { setField, ...vendorData } = useRegisterRoleStore()
    const insets = useSafeAreaInsets();

    const onChangeText = (text: string) => {
        if (typeAddress === 'provinsi') {
            setField("province_name", text);
        } else if (typeAddress === 'kota') {
            setField("city_name", text);
        } else if (typeAddress === 'kecamatan') {
            setField("district_name", text);
        }
    };

    // helper generic
    const fetchAddress = async ({ pageParam, queryKey }: any) => {
        const [, typeAddress, provinsi, kota, kecamatan, idProvinsi, idKota, idKecamatan] = queryKey;
        let url = "";

        if (pageParam) {
            url = pageParam; // kalau ada next page
        } else {
            if (typeAddress === "provinsi") {
                url = `/location/provinces/?search=${provinsi}`;
            } else if (typeAddress === "kota") {
                if (!idProvinsi) return { results: [] };
                url = `/location/cities/?province__id=${idProvinsi}&search=${kota}`;
            } else if (typeAddress === "kecamatan") {
                if (!idKota) return { results: [] };
                url = `/location/districts/?regency_id=${idKota}&search=${kecamatan}`;
            } else if (typeAddress === "negara") {
                url = `/location/countries/?search=${provinsi}`;
            }
        }

        const res = await api.get(url);
        return res.data;
    };

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
        useInfiniteQuery({
            queryKey: ["address", typeAddress, vendorData.province_name, vendorData.city_name, vendorData.district_name, vendorData.province, vendorData.city, vendorData.district],
            queryFn: fetchAddress,
            initialPageParam: null,
            getNextPageParam: (lastPage) => {
                // kalau ada format pagination (next), ambil itu
                if (lastPage?.next) {
                    // buang domain (http://...) biar cuma path
                    return lastPage.next.replace(/^https?:\/\/[^/]+/, "");
                }
                return undefined;
            },
            enabled: modalAddress,
        });

    const hasValue = vendorData.province_name || vendorData.city || vendorData.district_name;

    return (
        <Modal
            visible={modalAddress}
            transparent
            animationType="slide"
            statusBarTranslucent={true}
            onRequestClose={() => setModalAddress(false)}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                }}
            >
                <TouchableOpacity
                    style={{ flex: 1 }}
                    activeOpacity={1}
                    onPressOut={() => setModalAddress(false)}
                />
                <View
                    className="px-4"
                    style={{
                        backgroundColor: '#fff',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        height: 480,
                    }}
                >
                    <View
                        style={{ alignItems: 'center', marginBottom: 20, marginTop: 20 }}
                    >
                        <GarisHorizotal width={86} height={6} />
                    </View>
                    <View className="flex-row items-center justify-between mb-4">
                        <TouchableOpacity
                            className="mr-2"
                            onPress={() => setModalAddress(false)}
                            style={{ paddingVertical: 8 }}
                        >
                            <BackIcons width={17.42} height={14.88} />
                        </TouchableOpacity>
                        <Text className="text-center font-semibold text-[18px]">{typeAddress === 'provinsi'
                            ? 'Provinsi'
                            : typeAddress === 'kota'
                                ? 'Kabupaten/Kota'
                                : 'Kecamatan'
                        }</Text>
                        <TouchableOpacity
                            className="ml-2"
                            disabled={!hasValue}
                            onPress={() => {
                                setField("province_name", "");
                                setField("city_name", "");
                                setField("district_name", "");
                                setTypeAddress('provinsi');
                                setField("province", 0)
                                setField("city", 0)
                                setField("district", 1)
                            }}
                            style={{ paddingVertical: 8 }}
                        >
                            <Text style={{ color: hasValue ? "red" : "#8D8D8D" }}>
                                Reset
                            </Text>
                        </TouchableOpacity>

                    </View>
                    <View
                        style={{
                            marginBottom: insets.bottom + 180,
                        }}
                    >
                        <SearchInput
                            value={
                                typeAddress === 'provinsi'
                                    ? vendorData.province_name
                                    : typeAddress === 'kota'
                                        ? vendorData.city_name
                                        : vendorData.district_name
                            }
                            onChangeText={(text) => onChangeText(text)}
                            placeholder={`Cari ${typeAddress === 'provinsi'
                                ? 'Provinsi'
                                : typeAddress === 'kota'
                                    ? 'Kabupaten/Kota'
                                    : 'Kecamatan'
                                }`}
                        />


                        <View className="flex-row items-center justify-between">
                            {['provinsi', 'kota', 'kecamatan'].map((item) => (
                                <TouchableOpacity
                                    key={item}
                                    className="items-center py-2"
                                    onPress={() => setTypeAddress(item)}
                                >
                                    {
                                        item === "kota" ? (
                                            <Text
                                                className="font-semibold"
                                                style={{ color: typeAddress === item ? '#169953' : 'black' }}
                                            >
                                                Pilih Kab/{item.charAt(0).toUpperCase() + item.slice(1)}
                                            </Text>
                                        ) : (
                                            <Text
                                                className="font-semibold"
                                                style={{ color: typeAddress === item ? '#169953' : 'black' }}
                                            >
                                                Pilih {item.charAt(0).toUpperCase() + item.slice(1)}
                                            </Text>
                                        )
                                    }

                                </TouchableOpacity>
                            ))}
                        </View>
                        <FlatList
                            data={
                                data?.pages.flatMap((page) =>
                                    page?.results ? page.results : Array.isArray(page) ? page : []
                                ) || []
                            }
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    className="py-3 border-b border-gray-200"
                                    onPress={() => {
                                        if (typeAddress === "provinsi") {
                                            setField("province_name", item.name)
                                            setField("province", item.id)

                                            // reset kota & kecamatan
                                            setField("city_name", "")
                                            setField("city", 0)
                                            setField("district_name", "")
                                            setField("district", 1)
                                            setTypeAddress("kota");
                                        } else if (typeAddress === "kota") {
                                            setField("city_name", item.name)
                                            setField("city", item.id)

                                            // reset kecamatan
                                            setField("district_name", "")
                                            setField("district", 1)
                                            setTypeAddress("kecamatan");
                                        } else if (typeAddress === "kecamatan") {
                                            setField("district_name", item.name)
                                            setField("district", item.id)
                                            setModalAddress(false);
                                        }
                                    }}
                                >
                                    <Text className="text-base">{item.name}</Text>
                                </TouchableOpacity>
                            )}
                            onEndReached={() => {
                                if (hasNextPage && !isFetchingNextPage) {
                                    fetchNextPage();
                                }
                            }}
                            onEndReachedThreshold={0.5}
                            ListFooterComponent={() =>
                                isFetchingNextPage ? (
                                    <View className="py-4 items-center">
                                        <Text>Loading more...</Text>
                                    </View>
                                ) : null
                            }
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalAddressDropdown