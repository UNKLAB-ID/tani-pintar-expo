import { Text, View, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import CustomTextInput from "../../component-globals/input-text";
import { Controller, useForm } from "react-hook-form";
import ImagePickerInput from "../../component-globals/input-images";
import React, { useEffect } from "react";
import ArrowRightIcons from "@/assets/icons/e-commerce/arrow-right-icons";
import LatLongPinAddressIcon from "@/assets/icons/global/lat-long-pin-address-icon";
import { router } from "expo-router";
import { useUserLocation } from "@/store/location/location";
import api from "@/utils/api/api";
import { useMutation } from "@tanstack/react-query";
import { useRegisterRoleStore } from "@/store/auth/register-role";

interface ComponentFormIndividuChangeRoleProps {
    toggleButton: boolean;
    setToggleModalAddress: (visible: boolean) => void;
}

const ComponentFormIndividuChangeRole: React.FC<ComponentFormIndividuChangeRoleProps> = ({
    toggleButton,
    setToggleModalAddress,
}) => {
    const { latAddress, longAddress } = useUserLocation();
    const { setField, resetForm, ...vendorData } = useRegisterRoleStore()
    const {
        control,
        handleSubmit,
        watch,
        setError,
        reset,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: vendorData,
        mode: "onChange",
    });

    const allValues = watch();
    const isFormEmpty = Object.values(allValues).every((v) => !v);

    const isFileAsset = (val: any): val is { uri: string; fileName?: string; mimeType?: string } => {
        return val && typeof val === "object" && "uri" in val;
    };

    console.log("vendorData", vendorData.city, vendorData.district, vendorData.province);

    const mutate = useMutation({
        mutationFn: async (data: any) => {
            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== "") {
                    if (isFileAsset(value)) {
                        formData.append(key, {
                            uri: value.uri,
                            name: value.fileName || `${key}.jpg`,
                            type: value.mimeType || "image/jpeg",
                        } as any);
                    } else {
                        formData.append(key, value as any); // langsung masukin apa adanya
                    }
                }
            });

            return api.post("/vendors/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        },

        onSuccess: (res, variables) => {
            if (res.success) {
                router.replace(`/otp?back=register&phone=${variables.phone_number}`);
            } else if (res.error) {
                Object.keys(res.error).forEach((field) => {
                    setError(field as keyof typeof errors, {
                        type: "server",
                        message: res.error[field][0], // ambil pesan error pertama
                    });
                });
            } else {
                Alert.alert("Register Failed", res.message);
            }
        },

        onError: (error: any) => {
            Alert.alert(
                "Registration Failed",
                error.message || "Terjadi error saat registrasi."
            );
        },
    });

    const handleRegsiterSumbit = (data: any) => {

        mutate.mutate(data);
    }

    // useEffect(() => {
    //     reset(vendorData);
    // }, [vendorData, reset]);


    return (
        <View>
            {/* Nama Lengkap */}
            <Controller
                control={control}
                name="name"
                rules={{ required: "Name is required" }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomTextInput
                        label="Nama Lengkap"
                        placeholder="Masukkan nama lengkap"
                        type="default"
                        value={value}
                        onChangeText={(text) => {
                            onChange(text);           // update ke useForm
                            setField("name", text);   // update ke zustand
                        }}
                        error={!!error}
                        fontWheight={"600"}
                        fontSize={14}
                        required="*"
                    />
                )}
            />

            {/* Nomor HP */}
            <Controller
                control={control}
                name="phone_number"
                rules={{ required: "Phone number required" }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <View style={{ marginTop: 16 }}>
                        <CustomTextInput
                            label="Nomor Handphone"
                            placeholder="Contoh: 081234567890"
                            type="phone-pad"
                            value={value}
                            onChangeText={(text) => {
                                onChange(text);           // update ke useForm
                                setField("phone_number", text);   // update ke zustand
                            }}
                            error={!!error}
                            fontWheight={"600"}
                            fontSize={14}
                            required="*"
                        />
                    </View>
                )}
            />

            {/* Upload KTP */}
            <Controller
                control={control}
                name="id_card_photo"
                rules={{ required: "KTP photo is required" }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <View style={{ marginTop: 16 }}>
                        <ImagePickerInput
                            value={value}
                            onChange={(image: ImagePicker.ImagePickerAsset) => {
                                onChange(image)
                                setField("id_card_photo", image)
                            }}
                            label="Unggah KTP"
                            required="*"
                            error={!!error}
                            placeholder="Unggah File"
                        />
                    </View>
                )}
            />

            {/* Nama Toko */}
            <Controller
                control={control}
                name="business_name"
                rules={{ required: "Nama toko is required" }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <View style={{ marginTop: 16 }}>
                        <CustomTextInput
                            label="Nama Toko"
                            placeholder="Masukkan nama toko kamu"
                            type="default"
                            value={value}
                            onChangeText={(text) => {
                                onChange(text);           // update ke useForm
                                setField("business_name", text);   // update ke zustand
                            }}
                            error={!!error}
                            fontWheight={"600"}
                            fontSize={14}
                            required="*"
                        />
                    </View>
                )}
            />

            {/* Logo Toko */}
            <Controller
                control={control}
                name="logo"
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <View style={{ marginTop: 16 }}>
                        <ImagePickerInput
                            value={value}
                            onChange={(image: ImagePicker.ImagePickerAsset) => {
                                onChange(image)
                                setField("logo", image)
                            }}
                            label="Logo Toko"
                            placeholder="Unggah File"
                            error={!!error}
                        />
                    </View>
                )}
            />

            {/* Alamat Toko */}
            <Controller
                control={control}
                name="address"
                rules={{ required: "Address is required" }}
                render={({ fieldState: { error } }) => (
                    <>
                        <Text style={{ fontSize: 14, fontWeight: "600", marginTop: 16 }}>
                            Alamat Toko<Text style={{ color: "#FF0808" }}>*</Text>
                        </Text>
                        <TouchableOpacity
                            style={{
                                borderWidth: 1,
                                borderColor: error
                                    ? "#FF0808" // merah kalau error
                                    : vendorData.province_name && vendorData.city_name && vendorData.district_name
                                        ? "#169953" // hijau kalau datanya ada
                                        : "#AAAAAA", // abu2 default
                                borderRadius: 12,
                                paddingVertical: 10.8,
                                paddingHorizontal: 20,
                                marginTop: 8,
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                            onPress={() => setToggleModalAddress(true)}
                        >
                            <Text style={{ color: vendorData.province_name && vendorData.city_name && vendorData.district_name ? "#000" : "#AAAAAA" }}>
                                {vendorData.province_name && vendorData.city_name && vendorData.district_name
                                    ? `${vendorData.province_name}, ${vendorData.city_name}, ${vendorData.district_name}`
                                    : "Pilih Provinsi, Kota, Kecamatan, Kelurahan"}
                            </Text>
                            <ArrowRightIcons width={18} height={18} />
                        </TouchableOpacity>
                    </>
                )}
            />

            {/* Pin Lokasi */}
            <Controller
                control={control}
                name="latitude"
                render={() => (
                    <>
                        <Text style={{ fontSize: 14, fontWeight: "600", marginTop: 16 }}>
                            Pin Alamat<Text style={{ color: "#FF0808" }}>*</Text>
                        </Text>
                        <TouchableOpacity
                            style={{
                                borderWidth: 2,
                                borderColor: latAddress && longAddress ? "#169953" : "#C8C8C8",
                                borderRadius: 21,
                                paddingVertical: 10.8,
                                paddingHorizontal: 20,
                                marginTop: 8,
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            onPress={() => router.push("/profile/pin-lat-long-address")}
                        >
                            <LatLongPinAddressIcon
                                width={20}
                                height={20}
                                color={latAddress && longAddress ? "#169953" : "#C8C8C8"}
                            />
                            <Text style={{ marginLeft: 8 }}>
                                {latAddress && longAddress
                                    ? `Lat: ${latAddress}, Long: ${longAddress}`
                                    : "Pin Lokasi Alamat Kamu"}
                            </Text>
                        </TouchableOpacity>
                    </>
                )}
            />

            {/* Detail Alamat */}
            <Controller
                control={control}
                name="address_detail"
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <View style={{ marginTop: 16 }}>
                        <CustomTextInput
                            label="Detail Alamat"
                            placeholder="Contoh: Perumahan A, Blok A"
                            type="default"
                            value={value}
                            onChangeText={onChange}
                            error={!!error}
                            fontWheight={"600"}
                            fontSize={14}
                        />
                    </View>
                )}
            />

            {/* Kode Pos */}
            <Controller
                control={control}
                name="postal_code"
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <View style={{ marginTop: 16 }}>
                        <CustomTextInput
                            label="Kode Pos"
                            placeholder="Masukkan Kode Pos"
                            type="numeric"
                            value={value}
                            onChangeText={(text) => {
                                onChange(text);           // update ke useForm
                                setField("postal_code", text);   // update ke zustand
                            }}
                            error={!!error}
                            fontWheight={"600"}
                            fontSize={14}
                        />
                    </View>
                )}
            />

            {/* NPWP kalau toggle */}
            {toggleButton && (
                <>
                    <Controller
                        control={control}
                        name="npwp"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <View style={{ marginTop: 16 }}>
                                <CustomTextInput
                                    label="NPWP Perusahaan"
                                    placeholder="Masukkan nomor NPWP"
                                    type="default"
                                    value={value}
                                    onChangeText={onChange}
                                    error={!!error}
                                    fontWheight={"600"}
                                    fontSize={14}
                                />
                            </View>
                        )}
                    />
                    <Controller
                        control={control}
                        name="business_nib"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <View style={{ marginTop: 16 }}>
                                <ImagePickerInput
                                    value={value}
                                    onChange={(image: ImagePicker.ImagePickerAsset) => onChange(image)}
                                    label="Unggah NPWP"
                                    placeholder="Unggah File"
                                    error={!!error}
                                />
                            </View>
                        )}
                    />
                </>
            )}

            {/* Tombol submit */}
            <TouchableOpacity
                disabled={!isValid || isFormEmpty}
                onPress={handleSubmit(handleRegsiterSumbit)}
                style={{
                    backgroundColor: !isValid || isFormEmpty ? "#F4F4F4" : "#169953",
                    paddingVertical: 14,
                    borderRadius: 12,
                    marginBottom: 30,
                    marginTop: 20,
                }}
            >
                <Text
                    style={{
                        color: !isValid || isFormEmpty ? "#AAAAAA" : "#FFFFFF",
                        textAlign: "center",
                        fontWeight: "600",
                        fontSize: 16,
                    }}
                >
                    Selesai
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default ComponentFormIndividuChangeRole;
