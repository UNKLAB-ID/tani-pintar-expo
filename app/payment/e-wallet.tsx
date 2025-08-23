import SearchIconPrimary from '@/assets/icons/global/search-icons';
import SearchInput from '@/components/ui/component-globals/search-input';
import ContactItem from '@/components/ui/payment/card-contact-item';
import { TransferHeader } from '@/components/ui/payment/transfer-header';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Text, View, StatusBar, TextInput, SectionList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CONTACTS = [
  { name: 'Angga Yunanda', phone: '877-999-888', initials: 'AY' },
  { name: 'Ahmad Sadikin', phone: ' 877-222-888', initials: 'AS' },
  { name: 'Ahmad Solihin', phone: '877-000-888', initials: 'AS' },
  { name: 'Anjayani', phone: '877-999-666', initials: 'AN' },
  { name: 'Bambang Pamungkas', phone: '877-999-999', initials: 'BP' },
  {
    name: 'Bambang Andree',
    phone: '877-999-000',
    image: require('@/assets/images/profile-default.png'),
  },
  {
    name: 'Caca Handika',
    phone: '877-999-111',
    image: require('@/assets/images/profile-default.png'),
  },
  { name: 'Cici Cucu', phone: '877-999-1234', initials: 'CC' },
];

const EwalletScreen = () => {
  const [search, setSearch] = useState('');

  // Group contacts by first letter
  const groupedContacts = useMemo(() => {
    const filtered = CONTACTS.filter(
      item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.phone.includes(search)
    );

    const groups: Record<string, typeof CONTACTS> = {};
    filtered.forEach(contact => {
      const firstLetter = contact.name.charAt(0).toUpperCase();
      if (!groups[firstLetter]) groups[firstLetter] = [];
      groups[firstLetter].push(contact);
    });

    // Sort alphabetically
    return Object.keys(groups)
      .sort()
      .map(letter => ({
        title: letter,
        data: groups[letter],
      }));
  }, [search]);

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
            title="Send to TaniPay"
            subtitle="select the contacts you want to transfer"
            onBack={() => router.back()}
          />
        </View>

        <View className=" p-4 bg-white mx-4 rounded-xl" style={{ top: 150 }}>
          {/* Search input */}
          <SearchInput
            value={search}
            onChangeText={setSearch}
            placeholder="Enter name or phone number"
          />

          <Text className="font-semibold text-[14px]">My Contact</Text>
          {/* Contact List */}
          <SectionList
            sections={groupedContacts}
            keyExtractor={(item, index) => item.name + index}
            renderItem={({ item }) => (
              <ContactItem
                name={item.name}
                phone={item.phone}
                image={item.image}
                initials={item.initials}
              />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <View className="flex-row justify-end ">
                <Text className="font-bold ">{title}</Text>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 250 }}
            showsVerticalScrollIndicator={true}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default EwalletScreen;
