import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

type ProductDescriptionProps = {
  description: string;
};

export default function ProductDescription({
  description,
}: ProductDescriptionProps) {
  const [expanded, setExpanded] = useState(false);

  const getDisplayText = () => {
    if (expanded) return description;
    const lines = description.split('\n');
    return lines.slice(0, 5).join('\n');
  };

  return (
    <View className="bg-white">
      <View className="px-4">
        <Text className="text-[14px]" style={{ color: '#BCBCBC' }}>
          {getDisplayText()}
        </Text>
      </View>

      <Pressable onPress={() => setExpanded(!expanded)}>
        <View className="px-5 py-5 mb-3">
          <Text
            className=" text-[12px] text-center"
            style={{ color: '#0B808F' }}
          >
            {expanded ? 'See Less' : 'See More'}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
