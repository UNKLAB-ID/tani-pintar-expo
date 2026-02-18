import TelkomselIcon from '@/assets/icons/global/telkomsel-icon';
import { TransferHeader } from '@/components/ui/payment/transfer-header';
import { router } from 'expo-router';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PaymentPlnScreen() {
  const insets = useSafeAreaInsets();
  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <SafeAreaView style={styles.container}>
        {/* HEADER */}
        <TransferHeader
          title="Payment"
          subtitle="Please select your payment"
          onBack={() => router.back()}
        />

        {/* CONTENT */}
        <View style={styles.contentWrapper}>
          {/* ===== Pulsa ===== */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Pulsa</Text>

            <View style={styles.pulsaContent}>
              <View style={styles.logoBox}>
                <TelkomselIcon style={styles.telkomselIcon} />
              </View>

              <View style={styles.pulsaInfo}>
                <Text style={styles.provider}>Telkomsel</Text>
                <Text style={styles.subText}>Phone number (085156178889)</Text>
                <Text style={styles.subText}>Price (Rp6.500)</Text>
              </View>
            </View>

            <View style={styles.softDivider} />

            <View style={styles.autopayBox}>
              <Text style={styles.autoPayTitle}>
                Enable autopay for worry free experience
              </Text>
              <Text style={styles.subText}>
                Automatically pay this transaction every 17th
              </Text>
            </View>
          </View>

          {/* ===== Promo ===== */}
          <TouchableOpacity style={styles.promoCard} activeOpacity={0.85}>
            <View>
              <Text style={styles.promoTitle}>Use your promo</Text>
              <Text style={styles.subText}>Save up to Rp1.000</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          {/* ===== Payment Method ===== */}
          <View style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.sectionTitle}>Payment Method</Text>
              <Text style={styles.link}>See All</Text>
            </View>

            <View style={styles.methodRow}>
              <View style={styles.bankBox}>
                <Image
                  source={require('@/assets/images/payment/bank/bca.png')}
                  style={styles.bcaIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.provider}>BCA Virtual Account</Text>
            </View>
          </View>

          {/* ===== Payment Details ===== */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Payment Details</Text>

            <View style={styles.detailRow}>
              <Text style={styles.subText}>Total price</Text>
              <Text style={styles.value}>Rp16.500</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.subText}>Admin fee</Text>
              <Text style={[styles.value, styles.free]}>Free</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.subText}>Service fee</Text>
              <Text style={styles.value}>Rp1.000</Text>
            </View>

            <View style={styles.softDivider} />

            <View style={styles.detailRow}>
              <Text style={styles.totalLabel}>Total Payment</Text>
              <Text style={styles.totalValue}>Rp17.500</Text>
            </View>
          </View>
        </View>

        {/* ===== Bottom Bar ===== */}
        <View style={[styles.bottomBar, { paddingBottom: 16 + insets.bottom }]}>
          <View>
            <Text style={styles.bottomHint}>Total Payment</Text>
            <Text style={styles.totalBottom}>Rp17.500</Text>
          </View>

          <TouchableOpacity style={styles.payButton} activeOpacity={0.9}>
            <Text style={styles.payText}>Pay Now</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },

  contentWrapper: {
    marginTop: -28,
    paddingHorizontal: 16,
    paddingBottom: 140,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },

  pulsaContent: {
    flexDirection: 'row',
    gap: 12,
  },

  logoBox: {
    width: 100,
    height: 47,
    justifyContent: 'center',
  },

  telkomselIcon: {
    width: 100,
    height: 47,
  },

  pulsaInfo: {
    flex: 1,
    justifyContent: 'center',
  },

  provider: {
    fontSize: 15,
    fontWeight: '600',
  },

  subText: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },

  autopayBox: {
    marginTop: 6,
  },

  autoPayTitle: {
    fontSize: 13,
    fontWeight: '500',
  },

  promoCard: {
    backgroundColor: '#e7f8ee',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  promoTitle: {
    fontSize: 14,
    fontWeight: '600',
  },

  arrow: {
    fontSize: 22,
    color: '#16a34a',
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  link: {
    fontSize: 13,
    color: '#16a34a',
    fontWeight: '500',
  },

  methodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },

  bankBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bcaIcon: {
    width: 28,
    height: 28,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  value: {
    fontSize: 13,
    fontWeight: '500',
  },

  free: {
    color: '#16a34a',
  },

  softDivider: {
    height: 1,
    backgroundColor: '#eef2f7',
    marginVertical: 12,
  },

  totalLabel: {
    fontSize: 15,
    fontWeight: '600',
  },

  totalValue: {
    fontSize: 15,
    fontWeight: '700',
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eef2f7',
  },

  bottomHint: {
    fontSize: 12,
    color: '#9ca3af',
  },

  totalBottom: {
    fontSize: 16,
    fontWeight: '700',
  },

  payButton: {
    backgroundColor: '#4f9d55',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
  },

  payText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
