import { Text, View, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import CustomTextInput from "../../component-globals/input-text";
import { Controller, useForm } from "react-hook-form";
import ImagePickerInput from "../../component-globals/input-images";
import React from "react";
import ArrowRightIcons from "@/assets/icons/e-commerce/arrow-right-icons";
import LatLongPinAddressIcon from "@/assets/icons/global/lat-long-pin-address-icon";
import { router } from "expo-router";
import { useUserLocation } from "@/store/location/location";
import api from "@/utils/api/api";
import { useMutation } from "@tanstack/react-query";
import { useRegisterRoleStore } from "@/store/auth/register-role";
import AlertlatLongAddressIcons from "@/assets/icons/profile/alert-lat-long-address-icons";
import FileUpladIcons from "@/assets/icons/global/file-upload-icons";

interface ComponentFormIndividuChangeRoleProps {
    togglePerusahaanAtauIndividu: boolean;
    setToggleModalAddress: (visible: boolean) => void;
}

const ComponentFormIndividuChangeRole: React.FC<ComponentFormIndividuChangeRoleProps> = ({
    togglePerusahaanAtauIndividu,
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
        resetField,
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

    const mutate = useMutation({
        mutationFn: async (data: any) => {
            const formData = new FormData();

            // String fields
            if (data.vendor_type) formData.append("vendor_type", data.vendor_type); // 1
            if (data.phone_number) formData.append("phone_number", data.phone_number); // 2
            if (data.address) formData.append("address", data.address); // 3
            if (data.full_name) formData.append("full_name", data.full_name); // 4
            if (data.business_name) formData.append("business_name", data.business_name); // 5
            if (data.npwp) formData.append("npwp", data.npwp); // 6
            if (data.latitude) formData.append("latitude", data.latitude); // 7
            if (data.longitude) formData.append("longitude", data.longitude);
            if (data.address_detail) formData.append("address_detail", data.address_detail); // 8
            if (data.postal_code) formData.append("postal_code", data.postal_code); // 9
            if (data.name) formData.append("name", data.name); // 10

            // Number fields (ubah ke string biar aman di FormData)
            if (data.business_number) formData.append("business_number", String(data.business_number)); // 11
            if (data.province) formData.append("province", String(data.province)); // 12
            if (data.city) formData.append("city", String(data.city));  // 13
            if (data.district) formData.append("district", String(data.district)); // 14

            // File fields
            if (data.logo && isFileAsset(data.logo)) {
                formData.append("logo", {
                    uri: data.logo.uri,
                    name: data.logo.fileName || "logo.jpg",
                    type: data.logo.mimeType || "image/jpeg",
                } as any); // 15
            }

            if (data.id_card_photo && isFileAsset(data.id_card_photo)) {
                formData.append("id_card_photo", {
                    uri: data.id_card_photo.uri,
                    name: data.id_card_photo.fileName || "id_card_photo.jpg",
                    type: data.id_card_photo.mimeType || "image/jpeg",
                } as any); // 16
            }

            if (data.business_nib && isFileAsset(data.business_nib)) {
                formData.append("business_nib", {
                    uri: data.business_nib.uri,
                    name: data.business_nib.fileName || "business_nib.jpg",
                    type: data.business_nib.mimeType || "image/jpeg",
                } as any); // 17
            }

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

    return (
        <View>
            {/* Nama Lengkap */}
            <Controller
                control={control}
                name={"name"}
                rules={{ required: "Name is required" }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <CustomTextInput
                        label={togglePerusahaanAtauIndividu ? "Nama Badan Usaha" : "Nama Lengkap"}
                        placeholder={togglePerusahaanAtauIndividu ? "Masukkan nama badan usaha" : "Masukkan nama lengkap"}
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
                            label={togglePerusahaanAtauIndividu ? "Nomor Telepon Kantor" : "Nomor Handphone"}
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

            {/* Nomor Badan Usaha */}
            {
                togglePerusahaanAtauIndividu && (
                    <Controller
                        control={control}
                        name="business_number"
                        rules={{ required: "Nomor induk berusaha perusahaan required" }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <View style={{ marginTop: 16 }}>
                                <CustomTextInput
                                    label="Nomor Induk Berusaha Perusahaan"
                                    placeholder="Masukkan nomor induk berusaha perusahaan"
                                    type="phone-pad"
                                    value={String(value)}
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
                )
            }

            {
                togglePerusahaanAtauIndividu ? (
                    <Controller
                        control={control}
                        name="business_nib"
                        rules={{ required: "File business nib is required" }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <View style={{ marginTop: 16 }}>
                                <TouchableOpacity
                                    style={{
                                        borderWidth: 1,
                                        borderColor: "#ccc",
                                        padding: 12,
                                        borderRadius: 8,
                                        backgroundColor: "#f5f5f5",
                                    }}
                                    onPress={async () => {
                                        const result = await DocumentPicker.getDocumentAsync({
                                            type: "*/*", // bisa filter misal "application/pdf"
                                            copyToCacheDirectory: true,
                                        });

                                        if (!result.canceled) {
                                            const file = result.assets[0]; // ambil file pertama
                                            onChange(file); // simpan ke react-hook-form
                                        }
                                    }}
                                >
                                    <FileUpladIcons width={28} height={28} color={'#AAAAAA'} />
                                    <Text>
                                        {value ? value.name : "Pilih File Business NIB"}
                                    </Text>
                                </TouchableOpacity>

                                {error && <Text style={{ color: "red", marginTop: 4 }}>{error.message}</Text>}
                            </View>
                        )}
                    />
                ) : (
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
                )
            }

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
                            {togglePerusahaanAtauIndividu ? "Alamat Kantor" : "Alamat Toko"}<Text style={{ color: "#FF0808" }}>*</Text>
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
                        <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#fff" }}>
                            <AlertlatLongAddressIcons width={16} height={16} />
                            <Text style={{ fontSize: 12, color: "#6F6F6F", marginLeft: 10, marginTop: 4 }}>
                                Isi alamat terlebih dahulu untuk menetapkan lokasi di peta dengan akurat
                            </Text>
                        </View>
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
            {togglePerusahaanAtauIndividu && (
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
