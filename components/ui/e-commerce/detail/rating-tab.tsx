import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Star } from 'lucide-react-native';

const RatingTab = () => {
  const ratingData = {
    average: 4.6,
    totalReviews: 500,
    breakdown: [
      { stars: 5, count: 280, percentage: 56 },
      { stars: 4, count: 150, percentage: 30 },
      { stars: 3, count: 50, percentage: 10 },
      { stars: 2, count: 15, percentage: 3 },
      { stars: 1, count: 5, percentage: 1 },
    ],
  };

  const reviews = [
    {
      id: 1,
      user: 'John Doe',
      rating: 5,
      comment: 'Excellent product quality and fast shipping!',
      date: '2 days ago',
    },
    {
      id: 2,
      user: 'Jane Smith',
      rating: 4,
      comment: 'Good value for money, recommended.',
      date: '1 week ago',
    },
    // ... more reviews
  ];

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
        <View className="bg-gray-50 p-4 rounded-lg mb-6">
          <View className="flex-row items-center mb-4">
            <Text className="text-3xl font-bold text-gray-800 mr-2">
              {ratingData.average}
            </Text>
            <View>
              {renderStars(Math.floor(ratingData.average))}
              <Text className="text-sm text-gray-500 mt-1">
                {ratingData.totalReviews} reviews
              </Text>
            </View>
          </View>

          {/* Rating Breakdown */}
          {ratingData.breakdown.map(item => (
            <View key={item.stars} className="flex-row items-center mb-2">
              <Text className="text-sm text-gray-600 w-8">{item.stars}★</Text>
              <View className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                <View
                  className="h-2 bg-yellow-400 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                />
              </View>
              <Text className="text-sm text-gray-500 w-8">{item.count}</Text>
            </View>
          ))}
        </View>

        {/* Recent Reviews */}
        <Text className="text-lg font-semibold text-gray-800 mb-4">
          Recent Reviews
        </Text>

        {reviews.map(review => (
          <View key={review.id} className="border-b border-gray-100 pb-4 mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="font-medium text-gray-800">{review.user}</Text>
              <Text className="text-sm text-gray-500">{review.date}</Text>
            </View>
            {renderStars(review.rating)}
            <Text className="text-gray-600 mt-2 leading-5">
              {review.comment}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default RatingTab;
