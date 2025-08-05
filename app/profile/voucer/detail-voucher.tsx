import BackIcons from '@/assets/icons/global/back-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMemo } from 'react';
import VoucherTicketCard from '@/components/ui/profile/voucher-card';

const vouchers = [
  {
    id: 1,
    type: 'discount',
    title: 'Free discount',
    subtitle: 'Get free shipping with a max discount of Rp10.000',
    remaining: '5 DAYS LEFT',
    minTransaction: 'Rp10.000',
    validityPeriod: '20 May 2025, 23.59 WIB - 25 May 2025, 23.59 WIB',
    appliesTo: 'All products and stores',
    promoQuota: 'Quota will be updated every Sunday at 24.00 WIB',
    terms: `1. General Provisions\n- The Free Shipping Promo applies to transactions made through the TaniVerse application.\n- This promo only applies to deliveries within the areas determined by TaniVerse.\n- Valid during the specified promotional period and may change at any time without prior notice.\n\n2. Promo Terms of Use\n- Valid for new and existing users.\n- Minimum transaction can be applied (example: IDR 50,000), according to the provisions of the ongoing promo.\n- The maximum shipping subsidy will be informed on the checkout page (example: maximum subsidy of IDR 20,000).\n\n3. Promo Limitations\n- Does not apply to payment methods outside the TaniVerse system.\n- Promos cannot be combined with other promos or vouchers, unless stated otherwise.\n- One account can use only this promo a limited number of times (for example: 1x per day or 5x per month).\n- Users who are suspected of cheating or misusing the promo will have their promo rights revoked and may be subject to sanctions.\n\n4. Coverage Area\n- Free shipping only applies to the service area of logistics partners who work with TaniVerse.\n- Service availability may vary depending on the destination location.\n\n5. Changes and Termination of Promos\n- TaniVerse has the right to change, suspend, or terminate the promo at any time without prior notice.`,
  },
  {
    id: 2,
    type: 'shipping',
    title: 'Free Shipping',
    subtitle: 'Get free shipping with a max discount of Rp10.000',
    remaining: '5 DAYS LEFT',
    minTransaction: 'Rp10.000',
    validityPeriod: '20 May 2025, 23.59 WIB - 25 May 2025, 23.59 WIB',
    appliesTo: 'All products and stores',
    promoQuota: 'Quota will be updated every Sunday at 24.00 WIB',
    terms: `1. General Provisions\n- The Free Shipping Promo applies to transactions made through the TaniVerse application.\n- This promo only applies to deliveries within the areas determined by TaniVerse.\n- Valid during the specified promotional period and may change at any time without prior notice.\n\n2. Promo Terms of Use\n- Valid for new and existing users.\n- Minimum transaction can be applied (example: IDR 50,000), according to the provisions of the ongoing promo.\n- The maximum shipping subsidy will be informed on the checkout page (example: maximum subsidy of IDR 20,000).\n\n3. Promo Limitations\n- Does not apply to payment methods outside the TaniVerse system.\n- Promos cannot be combined with other promos or vouchers, unless stated otherwise.\n- One account can use only this promo a limited number of times (for example: 1x per day or 5x per month).\n- Users who are suspected of cheating or misusing the promo will have their promo rights revoked and may be subject to sanctions.\n\n4. Coverage Area\n- Free shipping only applies to the service area of logistics partners who work with TaniVerse.\n- Service availability may vary depending on the destination location.\n\n5. Changes and Termination of Promos\n- TaniVerse has the right to change, suspend, or terminate the promo at any time without prior notice.`,
  },
  // Tambahkan data voucher lain di sini jika diperlukan
];

const DetailVoucher = () => {
  const { id } = useLocalSearchParams();

  const voucher = useMemo(() => vouchers.find(v => v.id === Number(id)), [id]);

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className="bg-white h-full">
      <View
        className="flex-row items-center p-4"
        style={{ borderBottomWidth: 1, borderBottomColor: '#DEDEDE' }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcons width={24} height={24} fill="#000" />
        </TouchableOpacity>
        <Text className="text-black text-[16px] font-bold ml-3">
          Detail Voucher
        </Text>
      </View>

      <ScrollView className="px-4 pt-4 space-y-4">
        {/* Voucher Card Style */}
        <VoucherTicketCard
          type={(voucher?.type ?? 'discount') as 'discount' | 'shipping'}
          title={voucher?.title}
          description={voucher?.subtitle}
          daysLeft={Number(voucher?.remaining?.split(' ')[0])}
          minTransaction={
            Number(voucher?.minTransaction?.replace(/[^\d]/g, '')) || 0
          }
        />

        <View>
          <Text className="text-base font-bold text-black mb-2">
            Validity Period
          </Text>
          <Text className="text-sm text-[#444]">{voucher?.validityPeriod}</Text>
        </View>

        <View>
          <Text className="text-base font-bold text-black mb-2">
            Applies To
          </Text>
          <Text className="text-sm text-[#444]">{voucher?.appliesTo}</Text>
        </View>

        <View>
          <Text className="text-base font-bold text-black mb-2">
            Promo Quota
          </Text>
          <Text className="text-sm text-[#444]">{voucher?.promoQuota}</Text>
        </View>

        <View className="pb-10">
          <Text className="text-base font-bold text-black mb-2">
            Terms and Conditions
          </Text>
          <Text className="text-sm text-[#444] whitespace-pre-line">
            {voucher?.terms}
          </Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          elevation: 4, // untuk Android
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        }}
        className="bg-white p-4 shadow-md"
      >
        <View className="bg-primary justify-center items-center border border-primary rounded-xl p-4">
          <Text className="text-white text-[14px] font-semibold ">
            Use Voucher
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DetailVoucher;
