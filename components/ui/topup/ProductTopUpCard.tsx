import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function PulsaCard({ item, selected, onPress }: any) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.card, selected ? styles.cardSelected : styles.cardDefault]}
    >
      {/* Nominal */}
      <Text style={styles.nominal}>{item.nominal.toLocaleString()}</Text>

      {/* Period */}
      <Text style={styles.period}>{item.period}</Text>

      {/* Price */}
      <Text style={styles.price}>Rp{item.price.toLocaleString()}</Text>

      {/* PROMO SLOT (SELALU ADA) */}
      <View style={styles.promoSlot}>
        {item.promo && (
          <>
            {item.originalPrice && (
              <Text style={styles.originalPrice}>
                Rp{item.originalPrice.toLocaleString()}
              </Text>
            )}
            <View style={styles.promoBadge}>
              <Text style={styles.promoText}>{item.promo}</Text>
            </View>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    minHeight: 140,
    width: '48%',
    justifyContent: 'space-between',
  },

  cardDefault: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  cardSelected: {
    backgroundColor: '#E8F9EE',
    borderWidth: 1,
    borderColor: '#169953',
  },

  nominal: {
    fontSize: 14,
    color: '#212121',
  },

  period: {
    fontSize: 12,
    color: '#9E9E9E',
    marginTop: 4,
  },

  price: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },

  promoSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 20, // 🔥 SLOT PROMO DIPAKSA ADA
    marginTop: 6,
  },

  originalPrice: {
    fontSize: 12,
    color: '#BDBDBD',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },

  promoBadge: {
    backgroundColor: '#FDECEA',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },

  promoText: {
    fontSize: 11,
    color: '#E53935',
    fontWeight: '500',
  },
});
