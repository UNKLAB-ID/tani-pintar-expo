import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MapPin, Star } from 'lucide-react-native';

interface CardSearchStoreProps {
  logo: string;
  store: string;
  rating: number;
  reviews: number;
  location: string;
  onPress?: () => void;
}

const CardSearchStore: React.FC<CardSearchStoreProps> = ({
  logo,
  store,
  rating,
  reviews,
  location,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginVertical: 6,
      }}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Image
        source={{ uri: logo }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          resizeMode: 'cover',
        }}
      />

      <View
        style={{
          flex: 1,
          marginLeft: 10,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: '600',
            color: '#111827',
            marginBottom: 2,
          }}
        >
          {store}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Star size={14} color="#FBBF24" fill="#FBBF24" />
          <Text
            style={{
              fontSize: 13,
              color: '#4B5563',
              marginLeft: 4,
            }}
          >
            {rating.toFixed(1)}{' '}
            <Text style={{ color: '#9CA3AF' }}>({reviews}) •</Text>
          </Text>

          <MapPin size={14} color="#9CA3AF" style={{ marginLeft: 4 }} />
          <Text
            style={{
              fontSize: 13,
              color: '#6B7280',
              marginLeft: 4,
            }}
          >
            {location}
          </Text>
        </View>
      </View>

      <View
        style={{
          height: '80%',
          borderRightWidth: 1,
          borderColor: '#E5E7EB',
          marginHorizontal: 12,
        }}
      />

      <TouchableOpacity onPress={onPress}>
        <Text
          style={{
            color: '#16A34A',
            fontSize: 13,
            fontWeight: '600',
          }}
        >
          View store
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default CardSearchStore;
