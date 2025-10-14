import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Star } from 'lucide-react-native';

const reviews = [
  {
    id: 1,
    user: 'Ayu Rahma',
    product: 'H&L Semprotan Sprayer Manual [2 Liter]',
    variant: 'Kecil',
    rating: 4,
    comment: 'Packagingnya bagus ga ada yang cacat, pengirimannya super cepat',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMWFTm48Xvp_Qr3Yyndl8ll5qoCX3saj-NzQ&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMWFTm48Xvp_Qr3Yyndl8ll5qoCX3saj-NzQ&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMWFTm48Xvp_Qr3Yyndl8ll5qoCX3saj-NzQ&s',
    ],
    date: '06 Aug 2025',
  },
  {
    id: 2,
    user: 'Rizky Andika',
    product: 'H&L Semprotan Sprayer Manual [2 Liter]',
    variant: 'Kecil',
    rating: 5,
    comment: 'Barang sesuai deskripsi, semprotan kuat dan mudah digunakan!',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMWFTm48Xvp_Qr3Yyndl8ll5qoCX3saj-NzQ&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMWFTm48Xvp_Qr3Yyndl8ll5qoCX3saj-NzQ&s',
    ],
    date: '04 Aug 2025',
  },
  {
    id: 3,
    user: 'Nina Kartika',
    product: 'H&L Semprotan Sprayer Manual [2 Liter]',
    variant: 'Kecil',
    rating: 3,
    comment: 'Produk cukup baik, tapi pengiriman agak lama.',
    images: [],
    date: '02 Aug 2025',
  },
];

const RatingTab = () => {
  const totalReviews = reviews.length;
  const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
  const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

  const renderStars = (rating: any) => {
    return (
      <View className="flex-row">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            size={12}
            color={star <= rating ? '#F2C94C' : '#E5E5E5'}
            fill={star <= rating ? '#F2C94C' : '#E5E5E5'}
          />
        ))}
      </View>
    );
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        {/* Rating Summary */}
        <View className="bg-gray-50 pt-4 rounded-lg ">
          <View className="flex-row items-center mb-4">
            <Text className="text-3xl font-bold text-gray-800 mr-2">
              {averageRating.toFixed(1)}
            </Text>
            <View>
              {renderStars(Math.round(averageRating))}
              <Text className="text-sm text-gray-500 mt-1">
                {totalReviews} reviews
              </Text>
            </View>
          </View>
        </View>

        {/* Recent Reviews */}
        <Text className="text-lg font-semibold text-gray-800 mb-4">
          Recent Reviews
        </Text>
        {reviews.map(review => (
          <View key={review.id} className="border-b border-gray-100 pb-4 mb-4">
            <View className=" mb-2">
              <Text className="font-medium text-gray-800">
                {review.product}
              </Text>
              <Text className="text-sm text-gray-500">
                Variant: {review.variant}
              </Text>
            </View>
            {review.images.length > 0 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="my-2"
              >
                {review.images.map((img, index) => (
                  <Image
                    key={index}
                    source={{ uri: img }}
                    className="w-16 h-16 rounded-md mr-2 border border-gray-200"
                    resizeMode="cover"
                  />
                ))}
              </ScrollView>
            )}
            <Text className="text-gray-600 my-4 leading-5">
              {review.comment}
            </Text>
            {renderStars(review.rating)}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default RatingTab;
