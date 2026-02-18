import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { Text, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import ImagePickerInput from "../component-globals/input-images";

export type ProductFormData = {
    id_card_file: ImagePicker.ImagePickerAsset | null;
    productName: string;
    price: number;
    stock: number;
    description: string;
    category: string;
    condition: 'new' | 'used';
};

interface FormProductVendorProps {
    form: UseFormReturn<ProductFormData>;
}

const FormProductVendor: React.FC<FormProductVendorProps> = ({ form }) => {
    const { control } = form;

    return (
        <View style={{ marginVertical: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>Informasi Produk</Text>

            <View style={{ marginTop: 12 }}>
                <Controller
                    control={control}
                    name="id_card_file"
                    rules={{ required: 'KTP photo is required' }}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <>
                            <ImagePickerInput
                                value={value}
                                onChange={(image: ImagePicker.ImagePickerAsset) =>
                                    onChange(image)
                                }
                                required="*"
                                label="Unggah Gambar Produk "
                                error={!!error}
                                placeholder="Unggah 5 - 10 gambar untukmeningkatkan peluang penjualan"
                                textClassName="text-center"
                            />
                            {error && (
                                <Text style={{ color: '#EF4444', marginTop: 4, fontSize: 12 }}>
                                    {error.message}
                                </Text>
                            )}
                        </>
                    )}
                />
            </View>
        </View>
    );
};

export default FormProductVendor;
export { FormProductVendor };