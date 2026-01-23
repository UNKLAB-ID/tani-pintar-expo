import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type DataPackageItem = {
  title: string;
  description: string;
  price: number;
  bestSeller?: boolean;
};

type Props = {
  item: DataPackageItem;
  selected: boolean;
  onPress: () => void;
};

export default function DataPackageCard({ item, selected, onPress }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.card, selected ? styles.cardSelected : styles.cardDefault]}
    >
      {/* Best Seller Badge */}
      {item.bestSeller && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Best Seller</Text>
        </View>
      )}

      {/* Title */}
      <Text style={styles.title}>{item.title}</Text>

      {/* Description */}
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>

      {/* Bottom Row */}
      <View style={styles.bottomRow}>
        <Text style={styles.price}>Rp{item.price.toLocaleString()}</Text>

        {/* Info Icon (dummy) */}
        <View style={styles.infoIcon}>
          <Text style={styles.infoText}>!</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    position: 'relative',
  },

  cardDefault: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  cardSelected: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#169953',
  },

  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#2E7D32',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },

  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
    paddingRight: 90, // supaya tidak nabrak badge
  },

  description: {
    fontSize: 12,
    color: '#9E9E9E',
    lineHeight: 16,
  },

  bottomRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },

  infoIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#169953',
    alignItems: 'center',
    justifyContent: 'center',
  },

  infoText: {
    color: '#169953',
    fontWeight: '700',
    fontSize: 12,
  },
});
