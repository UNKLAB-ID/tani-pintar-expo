import { View, Text } from 'react-native';

const Review = () => {
  return (
    <View className="flex flex-col items-center justify-center h-screen">
      <Text className="text-2xl font-bold mb-4">Review Page</Text>
      <p className="text-gray-600">
        This is the review page for the e-commerce application.
      </p>
    </View>
  );
};

export default Review;
