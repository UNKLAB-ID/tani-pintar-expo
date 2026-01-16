import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

const RecommendedProductSection = () => {
  const products = [
    {
      id: '1',
      name: 'Inpari 42 – Benih Padi Unggul',
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3',
      price: 50600,
      originalPrice: 55000,
      rating: 4.5,
      location: 'Bandung',
    },
    {
      id: '2',
      name: 'Benih Pertiwi Padi Super',
      image: 'https://images.unsplash.com/photo-1592982537447-6c1d9e0c4e8b',
      price: 50600,
      originalPrice: 55000,
      rating: 4.5,
      location: 'Purwokerto',
    },
    {
      id: '3',
      name: 'Benih Pertiwi Padi Super',
      image: 'https://images.unsplash.com/photo-1592982537447-6c1d9e0c4e8b',
      price: 50600,
      originalPrice: 55000,
      rating: 4.5,
      location: 'Purwokerto',
    },
  ];

  return (
    <View style={{ marginTop: 24 }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Recommendation</Text>
        <TouchableOpacity>
          <Text style={{ color: '#22C55E', fontSize: 14 }}>
            View E-Commerce
          </Text>
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {products.map(item => (
          <View
            key={item.id}
            style={{
              width: 170,
              marginRight: 12,
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: 10,
              shadowColor: '#000',
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: '100%',
                height: 110,
                borderRadius: 8,
                marginBottom: 8,
              }}
            />

            <Text numberOfLines={2} style={{ fontSize: 14, fontWeight: '500' }}>
              {item.name}
            </Text>

            <View style={{ marginTop: 4 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#16A34A',
                }}
              >
                Rp{item.price.toLocaleString('id-ID')}
              </Text>

              <Text
                style={{
                  fontSize: 12,
                  color: '#9CA3AF',
                  textDecorationLine: 'line-through',
                }}
              >
                Rp{item.originalPrice.toLocaleString('id-ID')}
              </Text>
            </View>

            <Text style={{ fontSize: 12, marginTop: 4 }}>
              ⭐ {item.rating}/5 · {item.location}
            </Text>

            <TouchableOpacity
              style={{
                marginTop: 8,
                borderWidth: 1,
                borderColor: '#22C55E',
                borderRadius: 8,
                paddingVertical: 6,
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  color: '#22C55E',
                  fontWeight: '500',
                }}
              >
                + Add to Cart
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default RecommendedProductSection;
