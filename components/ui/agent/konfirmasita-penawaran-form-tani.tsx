import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import ButtonKalenderAgent from './component/button-kalender';
import React from 'react';
import Location2Icons from '@/assets/icons/e-commerce/locations2-icons';
import KebutuhanInput from './component/kebutuhan-input';
import { Controller } from 'react-hook-form';
import CustomButton from '../component-globals/button-primary';

interface KonfirmasiPenawaranTaniFormProps {
    forms: any;
    setToggleKalender: (value: boolean) => void;
    setNameForm: (value: string) => void;
    setToggleSuccess: (value: boolean) => void;
}

const KonfirmasiPenawaranTaniForm: React.FC<
    KonfirmasiPenawaranTaniFormProps
> = ({ setToggleKalender, forms, setNameForm, setToggleSuccess }) => {
    const handlerKonfirmasiPengajuan = async () => {
        // Trigger validasi semua field yang ada di form (kecuali description tidak wajib)
        const isValid = await forms.trigger([
            'start_date',
            'end_date',
            'address',
            'jumlah_kebutuhan',
            'parameter_kebutuhan',
        ]);

        if (!isValid) {
            // Validasi gagal, error otomatis muncul di UI
            return;
        }

        // Ambil data form
        const data = forms.getValues();

        // Buat JSON object rapi
        const formDataJson = {
            startDate: data.start_date,
            endDate: data.end_date,
            pickupLocation: data.address,
            quantity: {
                amount: data.jumlah_kebutuhan,
                unit: data.parameter_kebutuhan,
            },
            note: data.description || '', // optional, default kosong jika tidak diisi
        };

        // Contoh: tampilkan json ke console
        console.log(
            'JSON data ready to submit:',
            JSON.stringify(formDataJson, null, 2)
        );

        setToggleSuccess(true)

        // Lanjutkan proses, misal API call:
        // await api.submitForm(formDataJson);
    };

    return (
        <View>
            <View>
                <Text
                    style={{
                        fontWeight: 600,
                        fontSize: 14,
                        marginBottom: 7,
                    }}
                >
                    Tanggal Penjemputan*
                </Text>
                <View className="flex-row justify-between items-center">
                    <View style={{ flex: 1, width: 179, marginRight: 7 }}>
                        <Controller
                            control={forms.control}
                            name="start_date"
                            rules={{ required: 'Tanggal awal wajib diisi' }}
                            render={({ field: { value, onChange } }) => (
                                <ButtonKalenderAgent
                                    setToggleKalender={setToggleKalender}
                                    value={value}
                                    nameForms="start_date"
                                    forms={forms}
                                    setNameForm={setNameForm}
                                    isDisable={false}
                                />
                            )}
                        />
                    </View>
                    <View style={{ flex: 1, width: 179 }}>
                        <Controller
                            control={forms.control}
                            name="end_date"
                            rules={{ required: 'Tanggal awal wajib diisi' }}
                            render={({ field: { value, onChange } }) => (
                                <ButtonKalenderAgent
                                    value={value}
                                    nameForms="end_date"
                                    forms={forms}
                                    setToggleKalender={setToggleKalender}
                                    setNameForm={setNameForm}
                                    isDisable={!forms.watch("start_date")}
                                />
                            )}
                        />
                    </View>
                </View>
            </View>
            <View className="my-4">
                <Text
                    style={{
                        fontWeight: 600,
                        fontSize: 14,
                        marginBottom: 7,
                    }}
                >
                    Lokasi Penjemputan*
                </Text>
                <Controller
                    control={forms.control}
                    name="address"
                    rules={{ required: 'Lokasi penjemputan wajib diisi' }}
                    render={({ field: { value, onChange } }) => (
                        <TouchableOpacity
                            style={{
                                borderWidth: 1,
                                borderColor: forms.formState.errors.address ? 'red' : '#000',
                                borderRadius: 12,
                                padding: 12,
                            }}
                            onPress={() => {
                                // misalnya buka modal pilih lokasi
                                onChange('Jl. Contoh Alamat 123');
                            }}
                        >
                            <View className="flex-row justify-between items-center">
                                <Text
                                    style={{
                                        fontWeight: 500,
                                        color: value ? '#525252' : '#C8C8C8',
                                    }}
                                >
                                    {value || 'Pilih lokasi'}
                                </Text>
                                <Location2Icons width={24} height={24} color={'#000'} />
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <Controller
                control={forms.control}
                name="jumlah_kebutuhan"
                rules={{
                    required: 'Jumlah kebutuhan wajib diisi',
                    min: { value: 1, message: 'Minimal 1' },
                }}
                render={({ field: { value, onChange } }) => (
                    <Controller
                        control={forms.control}
                        name="parameter_kebutuhan"
                        rules={{ required: 'Unit wajib dipilih' }}
                        render={({
                            field: { value: unitValue, onChange: onChangeUnit },
                        }) => (
                            <KebutuhanInput
                                label="Jumlah Kebutuhan*"
                                unitOptions={['Kg', 'Ton']}
                                value={value}
                                unit={unitValue}
                                onChangeValue={val => onChange(Number(val))}
                                onChangeUnit={onChangeUnit}
                                errorJumlah={
                                    forms.formState.errors.jumlah_kebutuhan?.message as string
                                }
                                errorUnit={
                                    forms.formState.errors.parameter_kebutuhan?.message as string
                                }
                            />
                        )}
                    />
                )}
            />
            <View>
                <Text
                    style={{
                        fontWeight: '600',
                        fontSize: 14,
                        marginBottom: 7,
                    }}
                >
                    Catatan
                </Text>
                <Controller
                    control={forms.control}
                    name="description"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="Masukan catatan disini..."
                            style={{
                                height: 160,
                                width: '100%',
                                borderWidth: 1,
                                borderColor: '#000',
                                borderRadius: 8,
                                padding: 10,
                                textAlignVertical: 'top',
                            }}
                            multiline
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
            </View>
            <View style={{ flex: 1, marginTop: 30 }}>
                <CustomButton
                    title="Konfirmasi"
                    onPress={() => handlerKonfirmasiPengajuan()}
                    className="py-[13px]"
                />
            </View>
        </View>
    );
};

export default KonfirmasiPenawaranTaniForm;
