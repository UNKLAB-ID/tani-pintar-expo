import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import BackIcons from '@/assets/icons/global/back-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ModalKalenderProps {
    forms: any;
    modalKalender: boolean;
    setModalkalender: (value: boolean) => void;
    nameForm: string;
}

const ModalKalenderTani: React.FC<ModalKalenderProps> = ({
    modalKalender,
    setModalkalender,
    forms,
    nameForm,
}) => {
    const [selectedDates, setSelectedDates] = useState<{ [date: string]: any }>(
        {}
    );
    const insets = useSafeAreaInsets();

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const todayMonth = todayStr.slice(0, 7);
    const [currentMonth, setCurrentMonth] = useState(todayMonth);

    useEffect(() => {
        if (modalKalender) {
            const startStr = forms.getValues('start_date');
            const endStr = forms.getValues('end_date');

            if (startStr && endStr) {
                const start = new Date(startStr);
                const end = new Date(endStr);

                // Set currentMonth ke bulan start_date supaya kalender fokus ke bulan itu
                const newCurrentMonth = startStr.slice(0, 7);
                setCurrentMonth(newCurrentMonth >= todayMonth ? newCurrentMonth : todayMonth);

                // Buat objek selectedDates untuk di-highlight
                let marked: any = {};
                let current = new Date(start);
                while (current <= end) {
                    const d = current.toISOString().split('T')[0];
                    marked[d] = {
                        selected: true,
                        color: '#169953',
                        textColor: 'white',
                        startingDay: d === startStr,
                        endingDay: d === endStr,
                    };
                    current.setDate(current.getDate() + 1);
                }
                setSelectedDates(marked);
            } else {
                // Kalau belum ada tanggal, reset selectedDates dan currentMonth ke default
                setSelectedDates({});
                setCurrentMonth(todayMonth);
            }
        }
    }, [modalKalender, forms, todayMonth]);

    const handleDayPress = (day: any) => {
        const selectedDate = new Date(day.dateString);
        const startStr = forms.watch('start_date');
        const start = startStr ? new Date(startStr) : null;
        let newStartDate = forms.watch('start_date') || '';
        let newEndDate = forms.watch('end_date') || '';

        if (nameForm === 'start_date') {
            const end = new Date(selectedDate);
            end.setDate(end.getDate() + 6);

            newStartDate = day.dateString;
            newEndDate = end.toISOString().split('T')[0];

            forms.setValue('start_date', newStartDate);
            forms.setValue('end_date', newEndDate);

            // tandai periode
            let marked: any = {};
            let current = new Date(selectedDate);
            while (current <= end) {
                const d = current.toISOString().split('T')[0];
                marked[d] = {
                    selected: true,
                    color: '#169953',
                    textColor: 'white',
                    startingDay: d === day.dateString,
                    endingDay: d === end.toISOString().split('T')[0],
                };
                current.setDate(current.getDate() + 1);
            }
            setSelectedDates(marked);
        } else if (nameForm === 'end_date' && start) {
            if (selectedDate < start) {
                Alert.alert('Tanggal akhir tidak boleh kurang dari tanggal mulai.');
                return;
            }
            const maxEndDate = new Date(start);
            maxEndDate.setDate(maxEndDate.getDate() + 6);
            if (selectedDate > maxEndDate) {
                Alert.alert(
                    'Tanggal akhir tidak boleh lebih dari 7 hari setelah tanggal mulai.'
                );
                return;
            }

            newEndDate = day.dateString;
            forms.setValue('end_date', newEndDate);

            // tandai periode
            let marked: any = {};
            let current = new Date(start);
            while (current <= selectedDate) {
                const d = current.toISOString().split('T')[0];
                marked[d] = {
                    selected: true,
                    color: '#169953',
                    textColor: 'white',
                    startingDay: d === start.toISOString().split('T')[0],
                    endingDay: d === day.dateString,
                };
                current.setDate(current.getDate() + 1);
            }
            setSelectedDates(marked);
        } else {
            Alert.alert('Silakan pilih tanggal mulai terlebih dahulu.');
            return;
        }
    };

    const handleMonthChange = (month: { year: number; month: number }) => {
        const newMonth = `${month.year}-${String(month.month).padStart(2, '0')}`;
        // Kalau bulan baru >= bulan hari ini, update currentMonth
        if (newMonth >= todayMonth) {
            setCurrentMonth(newMonth);
        }
        // Kalau kurang dari bulan hari ini, abaikan (tidak ganti bulan)
    };

    // Disable arrow kiri jika sedang di bulan hari ini (tidak bisa mundur ke bulan sebelumnya)
    const disableArrowLeft = currentMonth === todayMonth;

    return (
        <Modal
            visible={modalKalender}
            transparent
            animationType="slide"
            statusBarTranslucent={true}
            onRequestClose={() => setModalkalender(false)}
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
                    onPressOut={() => setModalkalender(false)}
                />
                <View
                    style={{
                        backgroundColor: '#fff',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        height: 570,
                        paddingBottom: insets.bottom,
                    }}
                >
                    {/* Header */}
                    <View
                        className="flex-row items-center"
                        style={{
                            paddingTop: 20,
                            paddingBottom: 20,
                            paddingHorizontal: 16,
                        }}
                    >
                        <TouchableOpacity
                            className="flex-row items-center justify-center"
                            style={{ width: 25 }}
                            onPress={() => {
                                setModalkalender(false);
                            }}
                        >
                            <BackIcons width={17.42} height={14.88} />
                        </TouchableOpacity>
                        <View style={{ width: 'auto', marginLeft: 10 }}>
                            <Text
                                style={{ fontSize: 18, fontWeight: '600', textAlign: 'center' }}
                            >
                                Pilih tanggal penjemputanmu
                            </Text>
                        </View>
                    </View>

                    {/* Subtitle */}
                    <View style={{ paddingHorizontal: 16, paddingBottom: 10 }}>
                        <Text style={{ color: '#525252' }}>
                            Pilih Rentang Tanggal Penjemputan (Maksimal 7 hari)
                        </Text>
                    </View>

                    {/* Calendar */}
                    <Calendar
                        markingType={'period'}
                        markedDates={selectedDates}
                        onDayPress={handleDayPress}
                        theme={{
                            selectedDayBackgroundColor: '#169953',
                            todayTextColor: '#169953',
                            arrowColor: '#169953',
                        }}
                        minDate={todayStr}
                        current={currentMonth}
                        onMonthChange={handleMonthChange}
                        disableArrowLeft={disableArrowLeft}
                    />

                    {/* Action Buttons */}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            padding: 16,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => setModalkalender(false)}
                            style={{ marginRight: 20 }}
                        >
                            <Text style={{ color: '#169953', fontSize: 16 }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalkalender(false)}>
                            <Text
                                style={{ color: '#169953', fontSize: 16, fontWeight: '600' }}
                            >
                                OK
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ModalKalenderTani;
