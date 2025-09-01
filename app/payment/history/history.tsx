import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  View,
  StatusBar,
  Text,
  SectionList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { transactionHistoryResponse } from '@/assets/data/transaksi';

// icons
import TransferIcon from '@/assets/icons/payment/transfer-icon';
import TopUpIcon from '@/assets/icons/payment/topup-icon';
import PaymentIcon from '@/assets/icons/payment/payment-icon';
import TransferReceiveIcon from '@/assets/icons/payment/transfer-receive-icon';
import { ListFilter } from 'lucide-react-native';

// components
import SearchInput from '@/components/ui/component-globals/search-input';
import { TransferHeader } from '@/components/ui/payment/transfer-header';
import { formatPrice } from '@/utils/format-currency/currency';
import ModalFilterHistory from '@/components/ui/payment/modal-filter-history';

const HistoryScreen = () => {
  const [search, setSearch] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [filters, setFilters] = useState<{
    timeSpan: 'last7days' | 'thismonth' | null;
    category: string | null;
    fromDate: Date | null;
    toDate: Date | null;
  }>({
    timeSpan: null,
    category: 'all',
    fromDate: null,
    toDate: null,
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      const formattedTime = `${displayHours}:${minutes} ${ampm}`;

      const today = now.toLocaleDateString('en-US', {
        weekday: 'long',
      });

      setLastUpdated(`Updated ${today}, ${formattedTime}`);
    };

    updateTime(); // initial call
    const interval = setInterval(updateTime, 60000); // update tiap 1 menit

    return () => clearInterval(interval);
  }, []);

  const filteredData =
    transactionHistoryResponse?.data?.filter(item => {
      const itemDate = new Date(item.date);
      console.log('Filtering item:', item.title, item.type);
      console.log('Filters:', filters);

      // Filter Time span
      if (filters?.timeSpan === 'last7days') {
        const last7 = new Date();
        last7.setDate(last7.getDate() - 7);
        if (itemDate < last7) return false;
      } else if (filters?.timeSpan === 'thismonth') {
        const now = new Date();
        if (
          itemDate.getMonth() !== now.getMonth() ||
          itemDate.getFullYear() !== now.getFullYear()
        ) {
          return false;
        }
      } else {
        // hanya gunakan fromDate/toDate kalau timeSpan tidak dipilih
        if (filters?.fromDate && itemDate < filters.fromDate) return false;
        if (filters?.toDate && itemDate > filters.toDate) return false;
      }

      // Filter by category
      if (filters?.category && filters.category !== 'all') {
        if (item.type.toLowerCase() !== filters.category.toLowerCase()) {
          return false;
        }
      }

      // Filter by search
      if (search && !item.title.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }

      return true;
    }) ?? [];
  console.log('Filtered Data:', filteredData);

  // masking nomor rekening / noreq
  const maskNumbers = (text: string) => {
    return text.replace(/\d{6,}/g, match => {
      if (match.length <= 6) return match;
      const first = match.slice(0, 3);
      const last = match.slice(-3);
      const masked = '*'.repeat(match.length - 6);
      return first + masked + last;
    });
  };

  // Grouping by month
  // Grouping by month, tapi tahun sebelumnya ditaruh di bawah
  const groupByMonth = (data: any[]) => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    // Pisahkan tahun ini vs sebelumnya
    const currentYearData = data.filter(
      item => new Date(item.date).getFullYear() === currentYear
    );
    const previousYearData = data.filter(
      item => new Date(item.date).getFullYear() < currentYear
    );

    // Helper untuk group by month
    const group = (items: any[]) =>
      items.reduce(
        (acc, item) => {
          const d = new Date(item.date);
          const month = d.getMonth();
          const year = d.getFullYear();

          let monthLabel =
            year === currentYear && month === currentMonth
              ? 'This Month'
              : d
                  .toLocaleString('default', {
                    month: 'short',
                    year: 'numeric',
                  })
                  .toUpperCase();

          if (!acc[monthLabel]) acc[monthLabel] = [];
          acc[monthLabel].push(item);
          return acc;
        },
        {} as Record<string, any[]>
      );

    const groupedCurrent = group(currentYearData);
    const groupedPrevious = group(previousYearData);

    // gabungkan: tahun sekarang dulu, lalu tahun sebelumnya
    return { ...groupedCurrent, ...groupedPrevious };
  };

  const grouped = groupByMonth(filteredData);

  const sections = Object.entries(grouped).map(([month, data]) => ({
    title: month,
    data: data as any[],
  }));

  const getIcon = (type: string) => {
    switch (type) {
      case 'topup':
        return (
          <View
            className="p-2"
            style={{ backgroundColor: '#D7FCE8', borderRadius: 16 }}
          >
            <TopUpIcon width={20} height={20} />
          </View>
        );
      case 'payment':
        return (
          <View
            className="p-2"
            style={{ backgroundColor: '#D7FCE8', borderRadius: 16 }}
          >
            <PaymentIcon width={20} height={20} />
          </View>
        );
      case 'transfer':
        return (
          <View
            className="p-2"
            style={{ backgroundColor: '#d7f5fc', borderRadius: 16 }}
          >
            <TransferIcon width={20} height={20} />
          </View>
        );
      case 'receive':
        return (
          <View
            className="p-2"
            style={{ backgroundColor: '#d7f5fc', borderRadius: 16 }}
          >
            <TransferReceiveIcon width={20} height={20} />
          </View>
        );
      default:
        return null;
    }
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => router.push('/payment/invoice')}
      className="flex-row items-center justify-between bg-white p-4  rounded-xl"
      style={{ borderWidth: 1, borderColor: '#EAEAEA' }}
    >
      <View className="flex-row items-center">
        {getIcon(item.type)}
        <View className="ml-2">
          <Text className="text-[14px] font-semibold">{item.title}</Text>
          <Text className="text-[12px] text-[#B3B3B3] my-1">{item.date}</Text>
          <Text className="text-[12px] text-[#6F6F6F]">
            {maskNumbers(item.description)}
          </Text>
        </View>
      </View>
      <View className="items-end">
        <View className="px-2 py-1 rounded bg-[#D7FCE8]">
          <Text
            className={`text-[12px] font-medium ${
              item.status === 'success' ? 'text-primary' : 'text-red-500'
            }`}
          >
            {item.status === 'success' ? 'Success' : 'Failed'}
          </Text>
        </View>
        <Text
          className={`text-[12px] font-semibold mt-1 ${
            item.amount >= 0 ? 'text-primary' : 'text-[#1F1F1F]'
          }`}
        >
          {`${item.amount >= 0 ? '+' : ''}${formatPrice(item.amount)}`}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <SafeAreaView
        edges={['top', 'bottom']}
        style={{ flex: 1, backgroundColor: '#f8f8f8' }}
      >
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          <TransferHeader
            title="History Transaction"
            subtitle="All your payment history is here"
            onBack={() => router.back()}
          />
        </View>

        <View style={{ marginTop: 160, paddingHorizontal: 16 }}>
          <View className="flex-row items-center">
            <SearchInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search"
              containerStyle={{
                backgroundColor: '#F6F6F6',
                flex: 1,
                marginRight: 12,
              }}
              inputStyle={{ color: '#B3B3B3' }}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              className="p-3 bg-[#F6F6F6] rounded-xl items-center justify-center top-[-8px]"
            >
              <ListFilter />
            </TouchableOpacity>
          </View>

          <SectionList
            sections={sections}
            keyExtractor={(item, index) => item.id.toString() + index}
            renderItem={renderItem}
            renderSectionHeader={({ section: { title } }) => (
              <View className="flex-row justify-between items-center mt-6 mb-3">
                <Text className="font-semibold text-[16px]">{title}</Text>
                {title === 'This Month' && (
                  <Text className="text-[#959595] text-[14px]">
                    {lastUpdated}
                  </Text>
                )}
              </View>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        </View>
        <ModalFilterHistory
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onApply={data => {
            console.log('Filters applied:', data);
            setFilters(data);
          }}
          onReset={() =>
            setFilters({
              timeSpan: null,
              category: 'all',
              fromDate: null,
              toDate: null,
            })
          }
        />
      </SafeAreaView>
    </>
  );
};

export default HistoryScreen;
